"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import {
  type ChallengeItem,
  useGetBrandChallenge,
  useGetChallengeLeaderboard,
} from "@/hooks/useChallenges";

type BrandProfileRightSidebarProps = {
  challenge?: ChallengeItem;
  totalChallenges?: number;
  isLoading?: boolean;
  showViewActiveButton?: boolean;
};

const platformIcons: Record<string, string> = {
  youtube: "/yt.svg",
  instagram: "/ig.svg",
  tiktok: "/tt.svg",
};

const eligibilityLabels: Record<string, string> = {
  anyone: "Creators & Circles",
  creators: "Creators Only",
  circles: "Creator Circles Only",
};

const objectiveLabels: Record<string, string> = {
  engagement: "Engagement",
  quality_engagement: "Engagement",
  awareness: "Awareness",
  visibility: "Awareness",
  ugc: "User Generated Content",
  balanced: "User Generated Content",
  virality: "Product Launch",
  conversions: "Sales",
};

function formatHashtags(
  hashtags?: string,
  required?: string[]
): string {
  if (hashtags?.trim()) return hashtags.trim();
  if (!required?.length) return "—";
  return required
    .filter(Boolean)
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    .join(" ");
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[68px] items-center justify-between gap-5 border-t border-[#EEF0F4] py-4">
      <span className="shrink-0 text-[14px] font-medium text-[#62636C]">
        {label}
      </span>
      <div className="min-w-0 text-right text-[14px] font-medium text-[#62636C]">
        {children}
      </div>
    </div>
  );
}

export default function BrandProfileRightSidebar({
  challenge,
  totalChallenges,
  isLoading: isChallengesLoading,
  showViewActiveButton = false,
}: BrandProfileRightSidebarProps) {
  const { data: detail } = useGetBrandChallenge(challenge?.id, {
    enabled: Boolean(challenge?.id),
  });
  const { data: leaderboard, isLoading: isLeaderboardLoading } =
    useGetChallengeLeaderboard(
    challenge?.id,
    { enabled: Boolean(challenge?.id) }
  );

  if (isChallengesLoading) {
    return (
      <div className="rounded-[24px] border border-[#E4E7EC] px-6 py-12 text-center">
        <p className="text-[13px] text-[#8B8D98]">Loading challenges...</p>
      </div>
    );
  }

  if (!challenge && totalChallenges === 0) {
    return (
      <div className="rounded-[28px] border border-[#E4E7EC] bg-white p-4">
        <div className="aspect-[1] overflow-hidden rounded-[18px] bg-[#F8F8FA]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/trphy.svg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-[#1E1F24]">
          No Active Challenges
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[#747682]">
          Track the overview of an active challenge here
        </p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="rounded-[24px] border border-[#E4E7EC] px-6 py-10 text-center">
        <p className="text-[15px] font-semibold text-[#1E1F24]">
          No active challenges
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#747682]">
          Your active challenge leaderboard will appear here.
        </p>
      </div>
    );
  }

  const data = (detail ?? challenge) as ChallengeItem & {
    objective?: string;
    campaign_objective?: string;
    hashtags?: string;
    required_hashtags?: string[];
    submission_eligibility?: string;
    platforms?: string[];
  };
  const entries = (leaderboard?.entries ?? []).slice(0, 3);
  const savedObjective = data.campaign_objective ?? data.objective;
  const objective =
    objectiveLabels[savedObjective ?? ""] ||
    savedObjective?.replaceAll("_", " ") ||
    "—";
  const hashtags = formatHashtags(data.hashtags, data.required_hashtags);
  const challengeHref = challenge.id
    ? `/brand/challenges/${encodeURIComponent(challenge.id)}`
    : "/brand/challenges";
  const platforms = data.platforms ?? [];

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E4E7EC] bg-white">
        <div className="px-5 pt-5">
          <div className="flex items-start justify-between gap-4">
            <h2 className="min-w-0 text-[18px] font-semibold leading-snug text-[#1E1F24]">
              {challenge.title}
            </h2>
            <Link
              href={challengeHref}
              aria-label="View challenge"
              className="shrink-0 rounded-full p-1 text-[#1E1F24] transition hover:bg-[#F5F6F8]"
            >
              <FiArrowRight size={25} />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-[#EEF0F4]">
            {isLeaderboardLoading ? (
              <p className="py-8 text-center text-[13px] text-[#8B8D98]">
                Loading leaderboard...
              </p>
            ) : entries.length === 0 ? (
              <p className="py-8 text-center text-[13px] text-[#8B8D98]">
                No submissions yet.
              </p>
            ) : (
              entries.map((entry, index) => {
                const score =
                  entry.final_score ?? entry.challenge_score ?? 0;
                return (
                  <div
                    key={entry.user_id}
                    className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 py-4"
                  >
                    <BrandAvatar
                      name={entry.username}
                      src={entry.profile_picture_url}
                      className="h-10 w-10 border-2 border-[#83B5FF]"
                      letterClassName="text-xs"
                    />
                    <span className="text-[14px] font-semibold text-[#62636C]">
                      #{entry.rank || index + 1}
                    </span>
                    <span className="truncate text-[14px] font-medium text-[#62636C]">
                      {index === 0 && (
                        <span className="mr-2 text-[#FFCC00]">★</span>
                      )}
                      {entry.username || "Creator"}
                    </span>
                    <div className="flex items-center gap-2">
                      {entry.rank_direction === "up" ? (
                        <span className="text-[20px] text-[#12B76A]">↑</span>
                      ) : entry.rank_direction === "down" ? (
                        <span className="text-[20px] text-[#F04438]">↓</span>
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D0D5DD]" />
                      )}
                      <span className="text-[16px] font-semibold tabular-nums text-[#1E1F24]">
                        {Math.round(Number(score) || 0)}
                      </span>
                      <span className="relative h-5 w-5">
                        <Image
                          src="/dashlogo.svg"
                          fill
                          alt="Starix score"
                          className="object-contain"
                        />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-[#FCFCFD] px-5">
          <DetailRow label="Objective">
            <span className="inline-flex items-center gap-1.5 capitalize">
              <FiHeart size={16} />
              {objective}
            </span>
          </DetailRow>
          <DetailRow label="Hashtags">
            <span className="line-clamp-2">{hashtags}</span>
          </DetailRow>
          <DetailRow label="Open to">
            {eligibilityLabels[data.submission_eligibility ?? ""] || "—"}
          </DetailRow>
          <DetailRow label="Platforms">
            {platforms.length ? (
              <span className="inline-flex items-center justify-end gap-2.5">
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
            ) : (
              "—"
            )}
          </DetailRow>
        </div>

        {showViewActiveButton && (
          <div className="flex justify-start border-t border-[#EEF0F4] px-5 py-5">
            <Link
              href="/brand/challenges"
              className="inline-flex w-1/2 items-center justify-center whitespace-nowrap rounded-full border border-[#8B8D98] bg-white px-4 py-2.5 text-[12px] font-medium text-[#1E1F24] transition hover:bg-[#FAFAFB]"
            >
              View Active Challenges
            </Link>
          </div>
        )}
    </div>
  );
}
