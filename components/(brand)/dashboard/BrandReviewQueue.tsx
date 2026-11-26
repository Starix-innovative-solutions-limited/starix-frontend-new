"use client";

import { Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiArrowRight } from "react-icons/hi2";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import Loader from "@/components/Loader";
import {
  useGetBrandChallengeSubmissions,
  type BrandSubmissionRow,
} from "@/hooks/useChallenges";

const platformIcons: Record<string, string> = {
  instagram: "/ig.webp",
  tiktok: "/tt.webp",
  youtube: "/yt.webp",
  youtube_shorts: "/yt.webp",
};

function reviewBucket(status?: string) {
  const value = (status ?? "").toLowerCase();
  if (
    ["approved", "accepted", "ranked", "winner", "finalist"].includes(value)
  ) {
    return "approved" as const;
  }
  if (["rejected", "not_qualified", "disqualified", "declined"].includes(value)) {
    return "other" as const;
  }
  return "pending" as const;
}

function platformOf(row: BrandSubmissionRow) {
  const raw =
    row.selected_platform ||
    row.links?.[0]?.platform ||
    row.platforms?.[0] ||
    "";
  const key = raw.toLowerCase();
  if (key.includes("tiktok")) return "tiktok";
  if (key.includes("youtube") || key.includes("short")) return "youtube";
  if (key.includes("instagram")) return "instagram";
  return key || "post";
}

function formatCount(value?: number | null) {
  const amount = Number(value) || 0;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(amount);
}

function ReviewQueueContent() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challenge_id");
  const { rows, isLoading, challenges } = useGetBrandChallengeSubmissions(
    challengeId,
    { limit: 100 }
  );

  const summary = useMemo(() => {
    const pending = rows.filter((row) => reviewBucket(row.status) === "pending");
    const approved = rows.filter((row) => reviewBucket(row.status) === "approved");
    const platforms = rows.reduce<Record<string, number>>((counts, row) => {
      const platform = platformOf(row);
      counts[platform] = (counts[platform] ?? 0) + 1;
      return counts;
    }, {});
    const queue = [...pending, ...approved].slice(0, 4);
    return { pending, approved, platforms, queue };
  }, [rows]);

  const challengeTitle =
    challenges.find((challenge) => challenge.id === challengeId)?.title ||
    rows.find((row) => row.challenge_id === challengeId)?.challenge_title;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-[20px] font-semibold text-[#1E1F24]">
          Review Queue
        </h3>
        <p className="text-[13px] leading-relaxed text-[#747682]">
          {challengeId && challengeTitle
            ? `Social posts submitted to ${challengeTitle}.`
            : "Social posts waiting across your challenges."}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#F5F6F8] p-4">
              <p className="text-[12px] text-[#747682]">Pending</p>
              <p className="mt-1 text-[24px] font-semibold text-[#1E1F24]">
                {summary.pending.length}
              </p>
            </div>
            <div className="rounded-2xl bg-[#ECFEF4] p-4">
              <p className="text-[12px] text-[#1E874B]">Approved</p>
              <p className="mt-1 text-[24px] font-semibold text-[#1E1F24]">
                {summary.approved.length}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["instagram", "tiktok", "youtube"] as const).map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F6F8] px-3 py-1.5 text-[12px] font-medium text-[#344054]"
              >
                <Image
                  src={platformIcons[platform]}
                  alt=""
                  width={14}
                  height={14}
                />
                {summary.platforms[platform] ?? 0}
              </span>
            ))}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-[15px] font-semibold text-[#1E1F24]">
                Latest posts
              </h4>
              {challengeId ? (
                <Link
                  href={`/brand/challenges/${challengeId}`}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0033FF]"
                >
                  Challenge <HiArrowRight />
                </Link>
              ) : null}
            </div>

            {summary.queue.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[#E4E7EC] px-4 py-8 text-center">
                <p className="text-[14px] font-medium text-[#1E1F24]">
                  No posts yet
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#747682]">
                  Creator posts on Instagram, TikTok, and YouTube will line up here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {summary.queue.map((row, index) => {
                  const name =
                    row.display_name || row.full_name || row.username || "Creator";
                  const platform = platformOf(row);
                  const icon = platformIcons[platform];
                  const bucket = reviewBucket(row.status);
                  const postUrl = row.content_url || row.links?.[0]?.content_url;
                  return (
                    <a
                      key={`${row.submission_id || row.user_id || name}-${platform}-${index}`}
                      href={postUrl || "#"}
                      target={postUrl ? "_blank" : undefined}
                      rel={postUrl ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-2xl border border-[#EFF0F3] px-3 py-3 transition hover:bg-[#FAFAFB]"
                    >
                      <BrandAvatar
                        name={name}
                        src={row.profile_picture_url}
                        className="h-10 w-10"
                        letterClassName="text-[13px]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-[13px] font-semibold text-[#1E1F24]">
                            {name}
                          </p>
                          {icon ? (
                            <Image src={icon} alt="" width={14} height={14} />
                          ) : null}
                        </div>
                        <p className="truncate text-[12px] text-[#747682]">
                          {row.challenge_title || "Challenge"} ·{" "}
                          {formatCount(row.total_engagement)} engagements
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                          bucket === "approved"
                            ? "bg-[#ECFEF4] text-[#1E874B]"
                            : "bg-[#FFF7ED] text-[#C2410C]"
                        }`}
                      >
                        {bucket === "approved" ? "Approved" : "Pending"}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function BrandReviewQueue() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      }
    >
      <ReviewQueueContent />
    </Suspense>
  );
}
