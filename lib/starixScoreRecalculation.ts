const STORAGE_KEY = "starix-score-recalculation-requested-at";

export function markStarixScoreRecalculationRequested() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
}

export function isStarixScoreRecalculationPending(
  lastCalculatedAt?: string | null
) {
  if (typeof window === "undefined") return false;
  const requestedAt = Number(window.localStorage.getItem(STORAGE_KEY));
  if (!Number.isFinite(requestedAt) || requestedAt <= 0) return false;

  const calculatedAt = lastCalculatedAt
    ? new Date(lastCalculatedAt).getTime()
    : 0;
  if (Number.isFinite(calculatedAt) && calculatedAt > requestedAt) {
    window.localStorage.removeItem(STORAGE_KEY);
    return false;
  }
  return true;
}
