"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiInfo, FiSearch, FiX } from "react-icons/fi";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import {
  type ChallengeItem,
  type ChallengeLeaderboardEntry,
  submittedCount,
  useGetBrandChallenge,
  useGetBrandChallengeLeaderboard,
} from "@/hooks/useChallenges";
import { formatCompactNaira } from "@/lib/formatMoney";
import { useDashboardSearch } from "@/components/dashboard/DashboardSearchProvider";

const PAGE_SIZE = 5;

type ChallengeDetail = ChallengeItem & {
  total_engagements?: number;
  engagement_count?: number;
  weekly_engagement_growth?: number;
};

type LeaderboardRow = ChallengeLeaderboardEntry & {
  full_name?: string;
  engagement_count?: number;
  engagements?: number;
};

const platformIcons: Record<string, string> = {
  youtube: "/yt.webp",
  instagram: "/ig.webp",
  tiktok: "/tt.webp",
};

function formatPostedAgo(dateString?: string) {
  if (!dateString) return "Just now";
  const elapsed = Date.now() - new Date(dateString).getTime();
  if (!Number.isFinite(elapsed) || elapsed < 0) return "Just now";
  const hours = Math.floor(elapsed / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDate(dateString?: string) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (!Number.isFinite(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Sparkline({ color = "#12B76A" }: { color?: string }) {
  return (
    <svg viewBox="0 0 140 48" className="h-12 w-32 shrink-0" aria-hidden>
      <path
        d="M2 36c16-14 26-18 38-14 14 5 20 4 28-12 9-16 28-10 54-4"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MetricCard({
  title,
  value,
  growth,
  subtitle,
  className,
}: {
  title: string;
  value: string;
  growth?: number;
  subtitle?: string;
  className: string;
}) {
  return (
    <div className={`rounded-[20px] px-6 py-5 ${className}`}>
      <p className="text-[16px] font-medium text-[#1E1F24]">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[36px] font-semibold leading-none tracking-[-0.04em] text-[#1E1F24]">
            {value}
          </p>
          {growth !== undefined && (
            <p className="mt-3 text-[13px] font-medium text-[#16854C]">
              {growth >= 0 ? "+" : ""}
              {growth.toLocaleString()} this week
            </p>
          )}
          {subtitle && (
            <p className="mt-3 text-[13px] font-medium text-[#747682]">
              {subtitle}
            </p>
          )}
        </div>
        <Sparkline />
      </div>
    </div>
  );
}

function entryPlatforms(entry: LeaderboardRow) {
  if (entry.platforms?.length) return entry.platforms;
  if (entry.selected_platform) return [entry.selected_platform];
  return [];
}

function rankTrend(entry: LeaderboardRow): "up" | "down" | "same" {
  const direction = (entry.rank_direction ?? "").toLowerCase();
  if (direction === "up") return "up";
  if (direction === "down") return "down";
  if (
    entry.previous_rank != null &&
    entry.rank != null &&
    entry.previous_rank !== entry.rank
  ) {
    return entry.previous_rank > entry.rank ? "up" : "down";
  }
  return "same";
}

export default function BrandChallengePerformancePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const challengeId = params.id;
  const { query: search, setQuery: setSearch, placeholder } = useDashboardSearch();
  const [page, setPage] = useState(1);
  const [showNotice, setShowNotice] = useState(true);

  const { data: challenge, isLoading: isLoadingChallenge } =
    useGetBrandChallenge(challengeId);
  const {
    data: leaderboard,
    isLoading: isLoadingLeaderboard,
    isError: isLeaderboardError,
  } = useGetBrandChallengeLeaderboard(challengeId);

  const detail = challenge as ChallengeDetail | undefined;
  const rows = useMemo(
    () => (leaderboard?.entries ?? []) as LeaderboardRow[],
    [leaderboard?.entries]
  );
  const query = search.trim().toLowerCase();
  const filteredRows = useMemo(
    () =>
      rows.filter((entry) => {
        if (!query) return true;
        const platforms = entryPlatforms(entry).join(" ");
        const score = entry.final_score ?? entry.challenge_score ?? "";
        const name = entry.display_name || entry.full_name || entry.username || "";
        return `${entry.rank} ${name} ${platforms} ${score}`
          .toLowerCase()
          .includes(query);
      }),
    [query, rows]
  );

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const visibleRows = filteredRows.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (isLoadingChallenge) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[14px] text-[#747682]">
        Loading challenge...
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="py-20 text-center">
        <p className="text-[18px] font-semibold text-[#1E1F24]">
          Challenge not found
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-5 rounded-full border border-[#D0D5DD] px-5 py-2.5 text-[14px]"
        >
          Go back
        </button>
      </div>
    );
  }

  const now = Date.now();
  const start = new Date(detail.start_date).getTime();
  const end = new Date(detail.end_date).getTime();
  const daysLeft = Number.isFinite(end)
    ? Math.max(0, Math.ceil((end - now) / 86_400_000))
    : 0;
  const progress =
    Number.isFinite(start) && Number.isFinite(end) && end > start
      ? Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
      : 0;
  const leaderboardEngagement = rows.reduce(
    (sum, entry) =>
      sum +
      Number(
        entry.total_engagement ??
          entry.engagement_count ??
          entry.engagements ??
          0
      ),
    0
  );
  const totalEngagement =
    detail.total_engagement ??
    detail.total_engagements ??
    detail.engagement_count ??
    leaderboardEngagement;
  const totalSubmissions = submittedCount(detail);
  const isCompleted = ["completed", "closed"].includes(
    (detail.status ?? "").toLowerCase()
  );

  return (
    <div className="mx-auto w-full max-w-[1120px] pb-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-[15px] font-medium text-[#1E1F24]"
      >
        <FiArrowLeft className="text-[#8B8D98]" size={18} />
        Back
      </button>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold tracking-[-0.03em] text-[#1E1F24] md:text-[32px]">
            {detail.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#8B8D98]">
            <span
              className={`text-[12px] font-medium ${
                isCompleted ? "text-[#62636C]" : "text-[#12B76A]"
              }`}
            >
              {isCompleted ? "Completed Challenge" : "Verified Challenge"}
            </span>
            <span>{formatPostedAgo(detail.created_at)}</span>
            <span>|</span>
            <span>
              {formatCompactNaira(
                detail.prize_pool_display ||
                  (Number(detail.prize_pool) || 0) / 100,
                detail.currency_symbol || "₦"
              )}{" "}
              prize pool
            </span>
          </div>
        </div>
        <Link
          href={`/brand/submissions?challenge_id=${challengeId}`}
          className="inline-flex h-12 shrink-0 items-center rounded-full border border-[#8B8D98] px-6 text-[14px] font-medium text-[#1E1F24] transition hover:bg-[#F9FAFB]"
        >
          View All Posts
        </Link>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Submissions"
          value={totalSubmissions.toLocaleString()}
          growth={isCompleted ? undefined : detail.submissions_this_week}
          subtitle={isCompleted ? "All ranked" : undefined}
          className={isCompleted ? "bg-[#F8F8FA]" : "bg-[#E7F8E9]"}
        />
        <MetricCard
          title="Total Engagement"
          value={totalEngagement.toLocaleString()}
          growth={detail.weekly_engagement_growth}
          className={isCompleted ? "bg-[#F8F8FA]" : "bg-[#F8EAF8]"}
        />
        <div
          className={`rounded-[20px] px-6 py-5 ${
            isCompleted ? "bg-[#F8F8FA]" : "bg-[#E8F3FF]"
          }`}
        >
          <p className="text-[16px] font-medium text-[#1E1F24]">
            Challenge Progress
          </p>
          {isCompleted ? (
            <div className="mt-4 grid grid-cols-[28px_1fr_1fr] items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1769E0] text-[16px] font-semibold text-[#1769E0]">
                ✓
              </span>
              <p className="text-[11px] leading-relaxed text-[#8B8D98]">
                Start Date
                <br />
                <span className="text-[#62636C]">{formatDate(detail.start_date)}</span>
              </p>
              <p className="text-right text-[11px] leading-relaxed text-[#8B8D98]">
                End Date
                <br />
                <span className="text-[#62636C]">{formatDate(detail.end_date)}</span>
              </p>
            </div>
          ) : (
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="text-[36px] font-semibold leading-none tracking-[-0.04em] text-[#1E1F24]">
                {daysLeft}
                <span className="ml-2 text-[16px] font-medium tracking-normal">
                  Days Left
                </span>
              </p>
              <p className="pb-1 text-right text-[11px] leading-relaxed text-[#8B8D98]">
                End Date
                <br />
                <span className="text-[#62636C]">{formatDate(detail.end_date)}</span>
              </p>
            </div>
          )}
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#CDE4FF]">
            <div
              className="h-full rounded-full bg-[#6BA4FF]"
              style={{ width: `${isCompleted ? 100 : progress}%` }}
            />
          </div>
        </div>
      </div>

      {!isCompleted && showNotice && (
        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#E4E7EC] bg-white px-5 py-4">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C0C3CE] text-[#8B8D98]">
            <FiInfo size={12} />
          </span>
          <p className="flex-1 text-[14px] leading-relaxed text-[#62636C]">
            Winners of the challenge will be automatically selected within a
            week after the Challenge end date, according to the leaderboard
            positions by then.
          </p>
          <button
            type="button"
            onClick={() => setShowNotice(false)}
            aria-label="Dismiss"
            className="text-[#8B8D98]"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      <section className="mt-9">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1E1F24]">
            Challenge Leaderboard
          </h2>
          <div className="relative w-full sm:w-[360px]">
            <FiSearch
              className="absolute top-1/2 left-4 -translate-y-1/2 text-[#8B8D98]"
              size={16}
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder={placeholder}
              className="h-11 w-full rounded-full border border-[#E4E7EC] bg-white pr-4 pl-11 text-[13px] text-[#1E1F24] outline-none placeholder:text-[#8B8D98] focus:border-[#0033FF]"
            />
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[72px_minmax(220px,1.4fr)_140px_140px_90px] gap-4 border-b border-[#E4E7EC] px-1 pb-4 text-[14px] font-medium text-[#8B8D98]">
              <span>Rank</span>
              <span>Username</span>
              <span>Engagements</span>
              <span>Platforms</span>
              <span className="text-right">Score</span>
            </div>

            {isLoadingLeaderboard ? (
              <p className="py-12 text-center text-[13px] text-[#747682]">
                Loading leaderboard...
              </p>
            ) : isLeaderboardError ? (
              <p className="py-12 text-center text-[13px] text-[#D12B1F]">
                Couldn’t load this leaderboard. Refresh and try again.
              </p>
            ) : visibleRows.length === 0 ? (
              <p className="py-12 text-center text-[13px] text-[#747682]">
                {totalSubmissions > 0
                  ? `${totalSubmissions} submission${
                      totalSubmissions === 1 ? " is" : "s are"
                    } in. Ranked creators appear here after scoring finishes.`
                  : "No leaderboard entries yet."}
              </p>
            ) : (
              visibleRows.map((entry, index) => {
                const platforms = entryPlatforms(entry);
                const score = entry.final_score ?? entry.challenge_score ?? 0;
                const name =
                  entry.display_name ||
                  entry.full_name ||
                  entry.username ||
                  "Creator";
                const trend = rankTrend(entry);
                return (
                  <div
                    key={
                      entry.submission_id ||
                      entry.entrant_id ||
                      entry.user_id ||
                      `${entry.rank}-${index}`
                    }
                    className="grid min-h-[80px] grid-cols-[72px_minmax(220px,1.4fr)_140px_140px_90px] items-center gap-4 border-b border-[#EEF0F4] px-1"
                  >
                    <span className="text-[14px] font-medium text-[#62636C]">
                      #{entry.rank || (page - 1) * PAGE_SIZE + index + 1}
                    </span>
                    <div className="flex min-w-0 items-center gap-3">
                      <BrandAvatar
                        name={name}
                        src={entry.profile_picture_url}
                        className="h-10 w-10 border-2 border-[#83B5FF]"
                        letterClassName="text-xs"
                      />
                      <span className="truncate text-[14px] font-medium text-[#62636C]">
                        {name}
                      </span>
                    </div>
                    <span className="text-[14px] text-[#62636C]">
                      {Number(
                        entry.total_engagement ??
                          entry.engagement_count ??
                          entry.engagements ??
                          0
                      ).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-2.5">
                      {platforms.map((platform) => {
                        const key = platform.toLowerCase();
                        const src = platformIcons[key];
                        return src ? (
                          <Image
                            key={key}
                            src={src}
                            width={22}
                            height={22}
                            alt={platform}
                            className="h-[22px] w-[22px] object-contain"
                          />
                        ) : null;
                      })}
                    </span>
                    <span className="flex items-center justify-end gap-2 text-[15px] font-semibold text-[#1E1F24]">
                      {trend === "up" ? (
                        <span className="text-[#12B76A]">↑</span>
                      ) : trend === "down" ? (
                        <span className="text-[#F04438]">↓</span>
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D0D5DD]" />
                      )}
                      {Math.round(Number(score) || 0)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#8B8D98] px-5 text-[14px] font-medium text-[#62636C] disabled:opacity-40"
          >
            Back <FiArrowLeft />
          </button>
          <div className="flex items-center gap-3 text-[14px] text-[#8B8D98]">
            <span className="rounded-lg bg-[#F9FAFB] px-3 py-2 font-medium text-[#1E1F24]">
              {page}
            </span>
            {totalPages > 1 && (
              <>
                <span>...</span>
                <span>{totalPages}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#8B8D98] px-5 text-[14px] font-medium text-[#62636C] disabled:opacity-40"
          >
            Next <FiArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}
