"use client";

import Image from "next/image";
import { FiHeart, FiPlay } from "react-icons/fi";
import { BsFileEarmarkFill } from "react-icons/bs";
import {
  type ChallengeItem,
  type ChallengeMedia,
  useGetBrandChallenge,
} from "@/hooks/useChallenges";

type ChallengeDetail = ChallengeItem & {
  objective?: string;
  campaign_objective?: string;
  hashtags?: string;
  required_hashtags?: string[];
  submission_eligibility?: string;
  platforms?: string[];
  brief_document_url?: string;
  brief_document_original_filename?: string;
  prize_amounts?: Array<number | string>;
  prize_amounts_display?: string[];
  num_winners?: number;
};

const objectiveLabels: Record<string, string> = {
  quality_engagement: "Engagement",
  visibility: "Awareness",
  balanced: "User Generated Content",
  virality: "Product Launch",
  conversions: "Sales",
};

const eligibilityLabels: Record<string, string> = {
  anyone: "Creators & Circles",
  creators: "Creators Only",
  circles: "Creator Circles Only",
};

const platformIcons: Record<string, string> = {
  youtube: "/yt.svg",
  instagram: "/ig.svg",
  tiktok: "/tt.svg",
};

const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[60px] items-center justify-between gap-5 border-t border-[#EEF0F4] py-3.5">
      <span className="shrink-0 text-[14px] font-medium text-[#62636C]">
        {label}
      </span>
      <div className="min-w-0 text-right text-[14px] font-medium text-[#62636C]">
        {children}
      </div>
    </div>
  );
}

function documentName(url?: string, originalName?: string) {
  if (originalName) return originalName;
  if (!url) return "Challenge-brief.pdf";
  try {
    const path = new URL(url).pathname;
    return decodeURIComponent(path.split("/").pop() || "Challenge-brief.pdf");
  } catch {
    return decodeURIComponent(url.split("/").pop() || "Challenge-brief.pdf");
  }
}

function formatPrize(value: number | string | undefined) {
  if (value === undefined) return "₦0";
  if (typeof value === "string") {
    if (value.includes("₦")) return value;
    const numeric = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(numeric)
      ? `₦${numeric.toLocaleString("en-NG")}`
      : value;
  }
  return `₦${value.toLocaleString("en-NG")}`;
}

function Sample({
  media,
}: {
  media: ChallengeMedia;
}) {
  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#F2F4F7]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.media_url}
        alt=""
        className="h-full w-full object-cover"
      />
      {media.media_type === "video" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[#0033FF] shadow-sm">
            <FiPlay size={9} className="ml-0.5 fill-current" />
          </span>
        </span>
      )}
    </div>
  );
}

export default function BrandChallengeDetailRightSidebar({
  challengeId,
}: {
  challengeId: string;
}) {
  const { data: response, isLoading } = useGetBrandChallenge(challengeId);
  const detail = response as ChallengeDetail | undefined;

  if (isLoading) {
    return (
      <div className="rounded-[24px] border border-[#E4E7EC] px-6 py-12 text-center text-[13px] text-[#8B8D98]">
        Loading challenge details...
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="rounded-[24px] border border-[#E4E7EC] px-6 py-12 text-center text-[13px] text-[#8B8D98]">
        Challenge details are unavailable.
      </div>
    );
  }

  const savedObjective = detail.campaign_objective ?? detail.objective;
  const objective =
    objectiveLabels[savedObjective ?? ""] ||
    savedObjective?.replaceAll("_", " ") ||
    "—";
  const hashtags =
    detail.hashtags?.trim() ||
    detail.required_hashtags?.filter(Boolean).join(" ") ||
    "—";
  const samples = (detail.media ?? [])
    .filter((item) => Boolean(item.media_url))
    .slice(0, 6);
  const displayPrizes =
    detail.prize_amounts_display?.length
      ? detail.prize_amounts_display
      : (detail.prize_amounts ?? []).map((value) => {
          const numeric =
            typeof value === "number"
              ? value
              : Number(value.replace(/[^\d.-]/g, ""));
          return Number.isFinite(numeric) ? numeric / 100 : value;
        });
  const winnerCount =
    detail.num_winners ?? displayPrizes.length;
  const totalPool =
    detail.prize_pool_display ||
    `₦${((Number(detail.prize_pool) || 0) / 100).toLocaleString("en-NG")}`;
  const pdfName = documentName(
    detail.brief_document_url,
    detail.brief_document_original_filename
  );

  return (
    <div className="space-y-5">
      <section className="rounded-[22px] border border-[#E4E7EC] bg-white px-5 pt-5">
        <h2 className="pb-3 text-[17px] font-semibold text-[#1E1F24]">
          Challenge Detail
        </h2>
        <DetailRow label="Objective">
          <span className="inline-flex items-center gap-1.5 capitalize">
            <FiHeart size={15} />
            {objective}
          </span>
        </DetailRow>
        <DetailRow label="Hashtags">
          <span className="line-clamp-2">{hashtags}</span>
        </DetailRow>
        <DetailRow label="Open to">
          {eligibilityLabels[detail.submission_eligibility ?? ""] || "—"}
        </DetailRow>
        <DetailRow label="Platforms">
          {detail.platforms?.length ? (
            <span className="inline-flex items-center justify-end gap-2">
              {detail.platforms.map((platform) => {
                const src = platformIcons[platform.toLowerCase()];
                return src ? (
                  <Image
                    key={platform}
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
      </section>

      <section className="rounded-[22px] border border-[#E4E7EC] bg-white p-5">
        <h2 className="text-[17px] font-semibold text-[#1E1F24]">
          Brief, Samples &amp; Guidelines
        </h2>

        {detail.brief_document_url ? (
          <div className="mt-4 flex items-center gap-3 border-b border-[#EEF0F4] pb-4">
            <BsFileEarmarkFill
              size={38}
              className="shrink-0 text-[#6BA6FF]"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-[#62636C]">
                {pdfName}
              </p>
              <p className="mt-0.5 text-[12px] text-[#8B8D98]">Uploaded</p>
            </div>
            <a
              href={detail.brief_document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-[#8B8D98] px-4 py-2 text-[12px] font-medium text-[#1E1F24]"
            >
              View
            </a>
          </div>
        ) : (
          <p className="mt-4 border-b border-[#EEF0F4] pb-4 text-[13px] text-[#8B8D98]">
            No brief uploaded
          </p>
        )}

        {samples.length ? (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-0.5">
            {samples.map((media, index) => (
              <Sample
                key={media.id || `${media.media_url}-${index}`}
                media={media}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-[13px] text-[#8B8D98]">No sample media</p>
        )}
      </section>

      <section className="rounded-[22px] border border-[#E4E7EC] bg-white p-5">
        <h2 className="text-[17px] font-semibold text-[#1E1F24]">
          Reward Configuration
        </h2>
        <div className="mt-3">
          <DetailRow label="Total Reward Pool">{totalPool}</DetailRow>
          <DetailRow label="Number of Winners">{winnerCount}</DetailRow>
        </div>
        {displayPrizes.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {displayPrizes.slice(0, 9).map((prize, index) => (
              <div
                key={`${prize}-${index}`}
                className="rounded-xl bg-[#F8F8FA] px-2.5 py-3"
              >
                <p className="text-[12px] font-semibold text-[#62636C]">
                  {ordinals[index] || `${index + 1}th`}
                </p>
                <p className="mt-2 truncate text-[12px] font-medium text-[#62636C]">
                  {formatPrize(prize)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
