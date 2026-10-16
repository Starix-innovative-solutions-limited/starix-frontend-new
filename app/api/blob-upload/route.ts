import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAzureBlobUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".blob.core.windows.net")
    );
  } catch {
    return false;
  }
}

/**
 * Same-origin proxy for local Azure PUTs.
 * Browser CORS only allowlists localhost:3000; this keeps other local ports working.
 */
export async function PUT(request: Request) {
  const uploadUrl = request.headers.get("x-starix-upload-url");
  if (!uploadUrl || !isAzureBlobUrl(uploadUrl)) {
    return NextResponse.json({ detail: "Invalid upload URL" }, { status: 400 });
  }

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    const name = key.toLowerCase();
    if (name === "content-type" || name.startsWith("x-ms-")) {
      headers.set(key, value);
    }
  });

  const body = await request.arrayBuffer();
  const azureResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers,
    body,
  });

  return new NextResponse(azureResponse.body, {
    status: azureResponse.status,
    headers: {
      "Content-Type":
        azureResponse.headers.get("Content-Type") || "text/plain",
    },
  });
}
