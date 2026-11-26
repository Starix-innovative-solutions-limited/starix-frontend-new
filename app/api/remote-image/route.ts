import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REDIRECTS = 4;
const MAX_BYTES = 4_500_000;

function isTrustedMediaHost(hostname: string) {
  return (
    hostname.endsWith(".blob.core.windows.net") ||
    hostname.endsWith(".amazonaws.com") ||
    hostname === "cdn.starixapp.com" ||
    hostname.endsWith(".starixapp.com") ||
    hostname === "res.cloudinary.com"
  );
}

function decodeMediaRef(ref: string) {
  try {
    return Buffer.from(ref, "base64url").toString("utf8");
  } catch {
    return "";
  }
}

function looksLikeImage(contentType: string, url: string) {
  if (
    contentType.startsWith("image/") ||
    contentType === "application/octet-stream" ||
    contentType === "binary/octet-stream" ||
    contentType === ""
  ) {
    return true;
  }
  return /\.(avif|gif|jpe?g|png|webp)(\?|$)/i.test(url);
}

async function readUpstream(source: URL) {
  let current = source;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const upstream = await fetch(current.toString(), {
      cache: "no-store",
      redirect: "manual",
      headers: { Accept: "image/avif,image/webp,image/*,*/*" },
    });

    if ([301, 302, 303, 307, 308].includes(upstream.status)) {
      const location = upstream.headers.get("location");
      if (!location) return { error: "Image redirect is missing a location" as const };
      const next = new URL(location, current);
      if (next.protocol !== "https:" || !isTrustedMediaHost(next.hostname)) {
        return { error: "Image redirect host is not allowed" as const };
      }
      current = next;
      continue;
    }

    return { upstream, finalUrl: current };
  }

  return { error: "Image redirect limit reached" as const };
}

/**
 * Same-origin image proxy so ad blockers cannot abort cover URLs
 * that contain words like "banner", and so production can follow the
 * short-lived S3 redirect those URLs return.
 */
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("k") ?? "";
  const source = decodeMediaRef(key);

  let parsed: URL;
  try {
    parsed = new URL(source);
  } catch {
    return NextResponse.json({ detail: "Invalid image URL" }, { status: 400 });
  }

  if (parsed.protocol !== "https:" || !isTrustedMediaHost(parsed.hostname)) {
    return NextResponse.json({ detail: "Unsupported image host" }, { status: 400 });
  }

  let resolved: Awaited<ReturnType<typeof readUpstream>>;
  try {
    resolved = await readUpstream(parsed);
  } catch {
    return NextResponse.json({ detail: "Image host unreachable" }, { status: 502 });
  }

  if ("error" in resolved) {
    return NextResponse.json({ detail: resolved.error }, { status: 502 });
  }

  const { upstream, finalUrl } = resolved;
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { detail: "Image could not be loaded" },
      { status: upstream.status || 502 }
    );
  }

  const contentType = (upstream.headers.get("Content-Type") || "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  if (!looksLikeImage(contentType, finalUrl.toString())) {
    return NextResponse.json({ detail: "Not an image" }, { status: 415 });
  }

  const bytes = Buffer.from(await upstream.arrayBuffer());
  if (bytes.byteLength > MAX_BYTES) {
    return NextResponse.redirect(finalUrl, 302);
  }

  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": contentType.startsWith("image/") ? contentType : "image/jpeg",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
