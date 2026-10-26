import type { ChallengeItem } from "@/hooks/useChallenges";

type ChallengeLike = ChallengeItem | Record<string, unknown> | null | undefined;

function asRecord(challenge: ChallengeLike): Record<string, unknown> {
  return challenge && typeof challenge === "object"
    ? (challenge as Record<string, unknown>)
    : {};
}

function firstNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
      return value;
    }
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value.replace(/,/g, ""));
      if (Number.isFinite(parsed) && parsed >= 0) return parsed;
    }
  }
  return 0;
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

export function parseChallengeTimestamp(value?: string | null) {
  if (!value) return null;
  const raw = value.trim();
  if (!raw) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [year, month, day] = raw.split("-").map(Number);
    return new Date(year, month - 1, day, 23, 59, 59).getTime();
  }

  const parsed = new Date(raw).getTime();
  return Number.isNaN(parsed) ? null : parsed;
}

export function getChallengeViewCount(challenge: ChallengeLike) {
  const item = asRecord(challenge);
  return firstNumber(
    item.viewer_count,
    item.view_count,
    item.views,
    item.total_views,
    item.impression_count
  );
}

export function getChallengeApplicationCount(challenge: ChallengeLike) {
  const item = asRecord(challenge);
  return Math.max(
    firstNumber(item.total_submissions),
    firstNumber(item.participant_count),
    firstNumber(item.application_count),
    firstNumber(item.applications_count),
    firstNumber(item.pending_engagement_submissions),
    firstNumber(item.measured_submissions)
  );
}

export function getChallengeEndDate(challenge: ChallengeLike) {
  const item = asRecord(challenge);
  return firstString(
    item.end_date,
    item.ends_at,
    item.close_date,
    item.closing_date,
    item.deadline,
    item.score_freezes_at
  );
}

export function formatCompactCount(value: number) {
  const amount = Math.max(0, Math.round(value));
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return amount.toLocaleString("en-US");
}

export function formatChallengeTimeLeft(endDate?: string | null) {
  const endAt = parseChallengeTimestamp(endDate);
  if (endAt == null) return null;

  const ms = endAt - Date.now();
  if (ms <= 0) return "Closed";

  const hours = Math.max(1, Math.floor(ms / (1000 * 60 * 60)));
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function formatChallengeClosesIn(endDate?: string | null) {
  const timeLeft = formatChallengeTimeLeft(endDate);
  if (!timeLeft) return null;
  if (timeLeft === "Closed") return "Closed";
  return `Closes in ${timeLeft}`;
}
