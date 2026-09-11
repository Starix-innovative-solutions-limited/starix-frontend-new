type ChallengeMediaSource = {
  id?: string;
  banner_url?: string | null;
  media?: Array<{
    media_url?: string | null;
    display_order?: number | null;
  }> | null;
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickStableRandomSubset<T>(items: T[], count: number, seed: string) {
  if (items.length <= count) return items;

  const copy = [...items];
  let seedNum = hashString(seed || "challenge-media");

  for (let i = copy.length - 1; i > 0; i -= 1) {
    seedNum = (seedNum * 1103515245 + 12345) & 0x7fffffff;
    const j = seedNum % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

/** Up to 4 brand-uploaded preview images; shuffles when more than 4 exist. */
export function getChallengePreviewImages(
  challenge: ChallengeMediaSource,
  max = 4
): string[] {
  const ordered = (challenge.media ?? [])
    .filter((item) => Boolean(item.media_url?.trim()))
    .sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
    )
    .map((item) => item.media_url!.trim());

  const picked =
    ordered.length > max
      ? pickStableRandomSubset(ordered, max, challenge.id ?? challenge.banner_url ?? "media")
      : ordered;

  if (picked.length > 0) return picked;

  const banner = challenge.banner_url?.trim();
  return banner ? [banner] : [];
}
