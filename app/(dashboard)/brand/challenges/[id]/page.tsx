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
  useGetBrandChallenge,
  useGetChallengeLeaderboard,
} from "@/hooks/useChallenges";
import { formatCompactNaira } from "@/lib/formatMoney";

const PAGE_SIZE = 5;

type ChallengeDetail = ChallengeItem & {
  total_engagement?: number;
  total_engagements?: number;
  engagement_count?: number;
  weekly_submission_growth?: number;
  weekly_engagement_growth?: number;
};

type LeaderboardRow = ChallengeLeaderboardEntry & {
  full_name?: string;
  engagement_count?: number;
  engagements?: number;
  platforms?: string[];
};

const platformIcons: Record<string, string> = {
  youtube: "/yt.svg",
  instagram: "/ig.svg",
  tiktok: "/tt.svg",
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
    <svg viewBox="0 0 112 42" className="h-10 w-28" aria-hidden>
      <path
        d="M2 34c14-13 23-17 34-13 13 5 18 4 25-10 8-15 26-9 49-5"
        fill="none"
        stroke={color}
        strokeWidth="1.7"
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
    <div className={`rounded-[18px] p-5 ${className}`}>
      <p className="text-[16px] font-semibold text-[#1E1F24]">{title}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-[#1E1F24]">
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

export default function BrandChallengePerformancePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const challengeId = params.id;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showNotice, setShowNotice] = useState(true);

  const { data: challenge, isLoading: isLoadingChallenge } =
    useGetBrandChallenge(challengeId);
  const { data: leaderboard, isLoading: isLoadingLeaderboard } =
    useGetChallengeLeaderboard(challengeId);

  const detail = challenge as ChallengeDetail | undefined;
  const rows = (leaderboard?.entries ?? []) as LeaderboardRow[];
  const query = search.trim().toLowerCase();
  const filteredRows = useMemo(
    () =>
      rows.filter((entry) => {
        if (!query) return true;
        const platforms = entry.platforms?.join(" ") ?? "";
        const score = entry.final_score ?? entry.challenge_score ?? "";
        return `${entry.rank} ${entry.username} ${entry.full_name ?? ""} ${platforms} ${score}`
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
      sum + Number(entry.engagement_count ?? entry.engagements ?? 0),
    0
  );
  const totalEngagement =
    detail.total_engagement ??
    detail.total_engagements ??
    detail.engagement_count ??
    leaderboardEngagement;
  const isCompleted = ["completed", "closed"].includes(
    (detail.status ?? "").toLowerCase()
  );

  return (
    <div className="mx-auto w-full max-w-[1180px] pb-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#1E1F24]"
      >
        <FiArrowLeft className="text-[#747682]" /> Back
      </button>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em] text-[#1E1F24]">
            {detail.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-[#62636C]">
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                isCompleted
                  ? "bg-[#F2F4F7] text-[#62636C]"
                  : "bg-[#ECFEF4] text-[#1E874B]"
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
          className="shrink-0 rounded-full border border-[#8B8D98] px-6 py-3 text-[14px] font-semibold text-[#1E1F24] transition hover:bg-[#F9FAFB]"
        >
          View All Posts
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Submissions"
          value={(detail.participant_count ?? 0).toLocaleString()}
          growth={
            isCompleted ? undefined : detail.weekly_submission_growth
          }
          subtitle={isCompleted ? "All ranked" : undefined}
          className={isCompleted ? "bg-[#F8F8FA]" : "bg-[#E8FBE9]"}
        />
        <MetricCard
          title="Total Engagement"
          value={totalEngagement.toLocaleString()}
          growth={detail.weekly_engagement_growth}
          className={isCompleted ? "bg-[#F8F8FA]" : "bg-[#FDECFB]"}
        />
        <div
          className={`rounded-[18px] p-5 ${
            isCompleted ? "bg-[#F8F8FA]" : "bg-[#E8F5FF]"
          }`}
        >
          <p className="text-[16px] font-semibold text-[#1E1F24]">
            Challenge Progress
          </p>
          {isCompleted ? (
            <div className="mt-4 grid grid-cols-[28px_1fr_1fr] items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1769E0] text-[16px] font-bold text-[#1769E0]">
                ✓
              </span>
              <p className="text-[10px] leading-relaxed text-[#62636C]">
                Start Date
                <br />
                {formatDate(detail.start_date)}
              </p>
              <p className="text-right text-[10px] leading-relaxed text-[#62636C]">
                End Date
                <br />
                {formatDate(detail.end_date)}
              </p>
            </div>
          ) : (
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-[32px] font-semibold leading-none text-[#1E1F24]">
                {daysLeft}
                <span className="ml-1 text-[15px] font-medium">Days Left</span>
              </p>
              <p className="text-right text-[10px] leading-relaxed text-[#62636C]">
                End Date
                <br />
                {formatDate(detail.end_date)}
              </p>
            </div>
          )}
          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#CDE9FA]">
            <div
              className="h-full rounded-full bg-[#70A8FF]"
              style={{ width: `${isCompleted ? 100 : progress}%` }}
            />
          </div>
        </div>
      </div>

      {!isCompleted && showNotice && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#E4E7EC] bg-[#FCFCFD] px-5 py-4">
          <FiInfo className="mt-0.5 shrink-0 text-[#8B8D98]" size={20} />
          <p className="flex-1 text-[14px] leading-relaxed text-[#62636C]">
            Winners of the challenge will be automatically selected within a
            week after the Challenge end date, according to the leaderboard
            positions by then.
          </p>
          <button
            type="button"
            onClick={() => setShowNotice(false)}
            aria-label="Dismiss"
            className="text-[#747682]"
          >
            <FiX size={19} />
          </button>
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1E1F24]">
            Challenge Leaderboard
          </h2>
          <div className="relative w-full sm:w-[370px]">
            <FiSearch
              className="absolute top-1/2 left-4 -translate-y-1/2 text-[#8B8D98]"
              size={17}
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search rank, creator, platform or score"
              className="w-full rounded-full border border-[#E4E7EC] py-2.5 pr-4 pl-11 text-[13px] outline-none placeholder:text-[#8B8D98] focus:border-[#0033FF]"
            />
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[64px_minmax(220px,1fr)_140px_140px_80px] gap-4 border-b border-[#E4E7EC] px-1 pb-4 text-[14px] font-medium text-[#62636C]">
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
            ) : visibleRows.length === 0 ? (
              <p className="py-12 text-center text-[13px] text-[#747682]">
                No leaderboard entries yet.
              </p>
            ) : (
              visibleRows.map((entry, index) => {
                const platforms = entry.platforms ?? [];
                const score =
                  entry.final_score ?? entry.challenge_score ?? 0;
                return (
                  <div
                    key={entry.user_id}
                    className="grid min-h-[76px] grid-cols-[64px_minmax(220px,1fr)_140px_140px_80px] items-center gap-4 border-b border-[#EEF0F4] px-1"
                  >
                    <span className="text-[14px] font-medium text-[#62636C]">
                      #{entry.rank || (page - 1) * PAGE_SIZE + index + 1}
                    </span>
                    <div className="flex min-w-0 items-center gap-3">
                      <BrandAvatar
                        name={entry.full_name || entry.username}
                        src={entry.profile_picture_url}
                        className="h-10 w-10 border-2 border-[#83B5FF]"
                        letterClassName="text-xs"
                      />
                      <span className="truncate text-[14px] font-medium text-[#62636C]">
                        {entry.full_name || entry.username || "Creator"}
                      </span>
                    </div>
                    <span className="text-[14px] text-[#62636C]">
                      {Number(
                        entry.engagement_count ?? entry.engagements ?? 0
                      ).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-3">
                      {platforms.map((platform) => {
                        const key = platform.toLowerCase();
                        const src = platformIcons[key];
                        return src ? (
                          <Image
                            key={key}
                            src={src}
                            width={20}
                            height={20}
                            alt={platform}
                            className="h-5 w-5 object-contain"
                          />
                        ) : null;
                      })}
                    </span>
                    <span className="flex items-center justify-end gap-2 text-[15px] font-semibold text-[#1E1F24]">
                      {entry.rank_direction === "up" ? (
                        <span className="text-[#12B76A]">↑</span>
                      ) : entry.rank_direction === "down" ? (
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

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-2 rounded-full border border-[#8B8D98] px-5 py-2.5 text-[14px] text-[#62636C] disabled:opacity-40"
          >
            Back <FiArrowLeft />
          </button>
          <div className="flex items-center gap-3 text-[14px] text-[#62636C]">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#8B8D98] px-5 py-2.5 text-[14px] text-[#62636C] disabled:opacity-40"
          >
            Next <FiArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}
