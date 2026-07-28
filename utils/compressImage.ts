import imageCompression from "browser-image-compression";

const IMAGE_MIME_RE = /^image\/(jpeg|jpg|png|webp)$/i;

export async function compressImageForUpload(file: File): Promise<File> {
  if (!IMAGE_MIME_RE.test(file.type)) return file;

  return imageCompression(file, {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    preserveExif: false,
    fileType: file.type,
    initialQuality: 0.78,
  });
}
