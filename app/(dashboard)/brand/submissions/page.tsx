"use client";

import { Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import Loader from "@/components/Loader";
import { useGetBrandChallengeSubmissions } from "@/hooks/useChallenges";
import { useDashboardSearch } from "@/components/dashboard/DashboardSearchProvider";
import { matchesDashboardQuery } from "@/lib/dashboardSearch";

const platformIcons: Record<string, string> = {
  youtube: "/yt.webp",
  youtube_shorts: "/yt.webp",
  instagram: "/ig.webp",
  tiktok: "/tt.webp",
  x: "/x.svg",
};

function formatCapturedAt(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SubmissionsContent() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challenge_id");
  const { rows, challenges, isLoading, isError, pendingCount, totalSubmitted } =
    useGetBrandChallengeSubmissions(challengeId);
  const { query } = useDashboardSearch();
  const visibleRows = useMemo(
    () =>
      rows.filter((entry) =>
        matchesDashboardQuery(
          query,
          entry.display_name,
          entry.username,
          entry.challenge_title,
          entry.selected_platform,
          ...(entry.platforms ?? [])
        )
      ),
    [query, rows]
  );

  const title = useMemo(() => {
    if (!challengeId) return "Submissions";
    return challenges[0]?.title
      ? `Submissions · ${challenges[0].title}`
      : "Submissions";
  }, [challengeId, challenges]);

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em] text-[#101828]">
            {title}
          </h1>
          <p className="mt-1 text-[14px] text-[#667085]">
            Review creator posts submitted to your challenges
          </p>
        </div>
        {challengeId ? (
          <Link
            href={`/brand/challenges/${challengeId}`}
            className="text-[13px] font-semibold text-[#0033FF]"
          >
            Back to challenge
          </Link>
        ) : null}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <Loader />
          <p className="text-[13px] font-medium text-[#62636C]">
            Loading submissions...
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-100 bg-red-50/60 px-6 py-10 text-center">
          <p className="text-[15px] font-semibold text-[#D12B1F]">
            Couldn’t load submissions
          </p>
          <p className="mt-2 text-[13px] text-[#62636C]">
            Refresh the page or open this challenge again.
          </p>
        </div>
      ) : visibleRows.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#E4E7EC] bg-white py-20 text-center">
          <p className="text-[16px] font-medium text-[#101828]">
            {query.trim()
              ? `No matches for “${query.trim()}”`
              : totalSubmitted > 0
              ? "Submissions are still being scored"
              : "No submissions yet"}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-[#667085]">
            {totalSubmitted > 0
              ? `${totalSubmitted} post${totalSubmitted === 1 ? " has" : "s have"} been received${
                  pendingCount > 0 ? `, including ${pendingCount} still pending a score` : ""
                }. Ranked posts appear here once scoring finishes.`
              : "When creators submit posts to your challenges, they will show up here."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[24px] border border-[#E4E7EC] bg-white">
          <div className="hidden grid-cols-[minmax(220px,1.4fr)_minmax(180px,1fr)_120px_100px_90px] gap-4 border-b border-[#E4E7EC] px-5 py-4 text-[13px] font-medium text-[#62636C] md:grid">
            <span>Creator</span>
            <span>Challenge</span>
            <span>Platforms</span>
            <span>Engagement</span>
            <span className="text-right">Score</span>
          </div>
          {visibleRows.map((entry, index) => {
            const name =
              entry.display_name || entry.username || "Creator";
            const platforms =
              entry.platforms?.length
                ? entry.platforms
                : entry.selected_platform
                  ? [entry.selected_platform]
                  : [];
            const captured = formatCapturedAt(entry.engagement_captured_at);
            return (
              <div
                key={
                  entry.submission_id ||
                  `${entry.challenge_id}-${entry.user_id}-${index}`
                }
                className="grid gap-3 border-b border-[#EEF0F4] px-5 py-4 last:border-b-0 md:grid-cols-[minmax(220px,1.4fr)_minmax(180px,1fr)_120px_100px_90px] md:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <BrandAvatar
                    name={name}
                    src={entry.profile_picture_url}
                    className="h-10 w-10 border-2 border-[#83B5FF]"
                    letterClassName="text-xs"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[#1E1F24]">
                      {name}
                    </p>
                    {captured ? (
                      <p className="text-[12px] text-[#8B8D98]">{captured}</p>
                    ) : null}
                  </div>
                </div>
                <p className="truncate text-[13px] text-[#62636C]">
                  {entry.challenge_title || "Challenge"}
                </p>
                <div className="flex items-center gap-2">
                  {platforms.length ? (
                    platforms.map((platform) => {
                      const key = platform.toLowerCase();
                      const src = platformIcons[key];
                      return src ? (
                        <Image
                          key={`${key}-${index}`}
                          src={src}
                          width={20}
                          height={20}
                          alt={platform}
                          className="h-5 w-5 object-contain"
                        />
                      ) : (
                        <span
                          key={`${key}-${index}`}
                          className="text-[12px] capitalize text-[#62636C]"
                        >
                          {platform}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-[13px] text-[#8B8D98]">—</span>
                  )}
                </div>
                <p className="text-[14px] text-[#62636C]">
                  {Number(entry.total_engagement ?? 0).toLocaleString()}
                </p>
                <div className="flex items-center justify-between gap-2 md:justify-end">
                  <span className="text-[14px] font-semibold text-[#1E1F24]">
                    {Math.round(entry.final_score ?? entry.challenge_score ?? 0)}
                  </span>
                  {entry.content_url ? (
                    <a
                      href={entry.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#0033FF]"
                      aria-label="Open submitted post"
                    >
                      <FiArrowUpRight size={18} />
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <SubmissionsContent />
    </Suspense>
  );
}
