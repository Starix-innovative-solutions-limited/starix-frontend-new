/**
 * Compact Naira display for cards/lists: ₦200k, ₦1.5M, ₦2B.
 * Accepts a numeric amount or a display string like "₦200,000.00".
 */
export function formatCompactNaira(
  amount: number | string | null | undefined,
  symbol = "₦"
): string {
  let value: number;

  if (typeof amount === "string") {
    const cleaned = amount.replace(/[^\d.-]/g, "");
    value = Number(cleaned);
  } else {
    value = amount ?? 0;
  }

  if (!Number.isFinite(value)) return `${symbol}0`;

  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  const trim = (n: number) =>
    n % 1 === 0 ? String(Math.round(n)) : n.toFixed(1).replace(/\.0$/, "");

  if (abs >= 1_000_000_000) {
    return `${sign}${symbol}${trim(abs / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${symbol}${trim(abs / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${sign}${symbol}${trim(abs / 1_000)}k`;
  }

  return `${sign}${symbol}${Math.round(abs)}`;
}
