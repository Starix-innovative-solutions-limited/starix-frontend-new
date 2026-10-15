import { api } from "@/lib/api";
import { compressImageForUpload } from "@/utils/compressImage";

/** POST /media/upload-url — available targets */
export type MediaUploadTarget =
  | "profile_picture"
  | "user_banner"
  | "challenge_sample_media"
  | "challenge_brief"
  | "circle_profile_picture"
  | "circle_banner";

/** Schema allowlist + target subsets (e.g. video/mp4 for sample media) */
export type MediaContentType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "application/pdf"
  | "video/mp4";

export type UploadUrlRequest = {
  target: MediaUploadTarget;
  filename: string;
  content_type: MediaContentType | string;
};

export type UploadUrlResponse = {
  upload_url: string;
  object_key: string;
  public_url: string;
  expires_in: number;
  upload_headers: Record<string, string>;
};

const MB = 1024 * 1024;

const TARGET_RULES: Record<
  MediaUploadTarget,
  { mimeTypes: readonly string[]; maxBytes: number }
> = {
  profile_picture: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxBytes: 5 * MB,
  },
  user_banner: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxBytes: 5 * MB,
  },
  challenge_sample_media: {
    mimeTypes: ["image/jpeg", "image/png", "video/mp4"],
    maxBytes: 20 * MB,
  },
  challenge_brief: {
    mimeTypes: ["application/pdf"],
    maxBytes: 50 * MB,
  },
  circle_profile_picture: {
    mimeTypes: ["image/jpeg", "image/png"],
    maxBytes: 5 * MB,
  },
  circle_banner: {
    mimeTypes: ["image/jpeg", "image/png"],
    maxBytes: 5 * MB,
  },
};

function normalizeContentType(type: string): string {
  if (type === "image/jpg") return "image/jpeg";
  return type;
}

function assertValidUpload(file: File, target: MediaUploadTarget) {
  const rules = TARGET_RULES[target];
  const contentType = normalizeContentType(file.type);

  if (!rules.mimeTypes.includes(contentType)) {
    throw new Error(
      `Unsupported file type for ${target}. Allowed: ${rules.mimeTypes.join(", ")}`
    );
  }

  if (file.size > rules.maxBytes) {
    const maxMb = rules.maxBytes / MB;
    throw new Error(`File must be ${maxMb}MB or smaller.`);
  }

  if (!file.name || file.name.length > 255) {
    throw new Error("Filename must be between 1 and 255 characters.");
  }
}

function resolveUploadHeaders(
  uploadHeaders: Record<string, string> | undefined,
  contentType: string
): Record<string, string> {
  const headers: Record<string, string> = { ...(uploadHeaders ?? {}) };

  // Never forward our API token to Azure.
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === "authorization") {
      delete headers[key];
    }
  }

  if (!Object.keys(headers).some((key) => key.toLowerCase() === "content-type")) {
    headers["Content-Type"] = contentType;
  }

  if (!Object.keys(headers).some((key) => key.toLowerCase() === "x-ms-blob-type")) {
    headers["x-ms-blob-type"] = "BlockBlob";
  }

  return headers;
}

/**
 * POST /media/upload-url — mint a single-use Azure PUT URL, headers, and public_url.
 * Does not persist the URL on any parent resource.
 */
export async function requestMediaUploadUrl(
  payload: UploadUrlRequest
): Promise<UploadUrlResponse> {
  const { data } = await api.post<UploadUrlResponse>("/media/upload-url", {
    target: payload.target,
    filename: payload.filename,
    content_type: normalizeContentType(payload.content_type),
  });
  return data;
}

/**
 * PUT raw file bytes to the returned upload_url.
 * Uses upload_headers from the API (Content-Type, x-ms-blob-type, etc.).
 * Never sends the API Bearer token.
 */
export async function putFileToUploadUrl(
  uploadUrl: string,
  file: Blob,
  uploadHeaders: Record<string, string>
): Promise<void> {
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: uploadHeaders,
    body: file,
  });

  const status = uploadResponse.status;
  if (status < 200 || status >= 300) {
    throw new Error(`Upload failed with status ${status}`);
  }
}

/** @deprecated Use putFileToUploadUrl */
export const putFileToPresignedUrl = putFileToUploadUrl;

/**
 * Full client flow: validate → compress images → request URL → PUT to Azure → return public_url.
 * Caller must persist public_url on the parent resource via the relevant create/update endpoint.
 */
export async function uploadMediaFile(
  file: File,
  target: MediaUploadTarget
): Promise<string> {
  assertValidUpload(file, target);

  const isImage = /^image\//i.test(file.type);
  const uploadFile = isImage ? await compressImageForUpload(file) : file;

  // Re-check size after compression
  assertValidUpload(uploadFile, target);

  const contentType = normalizeContentType(uploadFile.type);
  const { upload_url, public_url, upload_headers } = await requestMediaUploadUrl({
    target,
    filename: uploadFile.name || file.name,
    content_type: contentType,
  });

  await putFileToUploadUrl(
    upload_url,
    uploadFile,
    resolveUploadHeaders(upload_headers, contentType)
  );

  return public_url;
}

/** @deprecated Prefer MediaUploadTarget — kept for gradual migration */
export type UploadTarget = MediaUploadTarget;
