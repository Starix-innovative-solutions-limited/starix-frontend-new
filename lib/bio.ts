/** Creator profile bios: 100 words, capped at the API’s 500-character limit. */
export const BIO_MAX_WORDS = 100;
export const BIO_MAX_CHARS = 500;

export function countBioWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function clampBio(text: string) {
  const byChars = text.slice(0, BIO_MAX_CHARS);
  const words = byChars.trim().split(/\s+/).filter(Boolean);
  if (words.length <= BIO_MAX_WORDS) return byChars;
  return words.slice(0, BIO_MAX_WORDS).join(" ");
}

export function normalizeBio(text: string) {
  const clamped = clampBio(text).trim();
  return clamped ? clamped : null;
}
