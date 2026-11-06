import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

/**
 * Same-origin image proxy so ad blockers cannot abort cover URLs
 * that contain words like "banner".
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

  const emptyGif = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    "base64"
  );

  let upstream: Response;
  try {
    upstream = await fetch(parsed.toString(), {
      cache: "no-store",
      redirect: "follow",
    });
  } catch {
    return new NextResponse(emptyGif, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store",
      },
    });
  }
  if (!upstream.ok || !upstream.body) {
    return new NextResponse(emptyGif, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store",
      },
    });
  }

  const contentType = upstream.headers.get("Content-Type") || "image/jpeg";
  const looksLikeImage =
    contentType.startsWith("image/") ||
    contentType === "application/octet-stream" ||
    contentType === "binary/octet-stream";
  if (!looksLikeImage) {
    return NextResponse.json({ detail: "Not an image" }, { status: 400 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
