/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { FiBarChart2, FiMail, FiClock, FiFileText } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import SubmitEntryModal from "@/components/(creator)/dashboard/SubmitEntryModal";
import { useGetChallengeById } from "@/hooks/useChallenges";
import { formatCompactNaira } from "@/lib/formatMoney";
import Loader from "@/components/Loader";

function formatTimeAgo(dateString?: string) {
  if (!dateString) return "Just now";
  const hours = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60)
  );
  if (Number.isNaN(hours) || hours < 0) return "Just now";
  if (hours < 1) return "Just now";
  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
}

function formatClosesIn(endDate?: string) {
  if (!endDate) return null;
  const ms = new Date(endDate).getTime() - Date.now();
  if (Number.isNaN(ms)) return null;
  if (ms <= 0) return "Closed";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  if (hours < 24) return `Closes in ${Math.max(hours, 1)}h`;
  return `Closes in ${Math.floor(hours / 24)}d`;
}

function isVideoUrl(url: string, mediaType?: string) {
  if (mediaType === "video") return true;
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

const ChallengeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const challengeId = params?.id as string;
  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useGetChallengeById(challengeId);

  const isPartial = Boolean((challenge as any)?._partial);
  const detailErrorStatus =
    (challenge as any)?._detailErrorStatus ??
    (error as { response?: { status?: number } })?.response?.status;

  const mediaItems = useMemo(() => {
    const media = challenge?.media ?? [];
    return [...media]
      .sort(
        (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)
      )
      .filter((m: any) => Boolean(m.media_url));
  }, [challenge?.media]);

  const requirements = useMemo(() => {
    if (!challenge) return [];
    const items: string[] = [];

    if (challenge.platforms?.length) {
      items.push(
        `Post on: ${challenge.platforms
          .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(", ")}`
      );
    }
    if (challenge.required_hashtags?.length) {
      items.push(
        `Required hashtags: ${challenge.required_hashtags
          .map((tag: string) => (tag.startsWith("#") ? tag : `#${tag}`))
          .join(" ")}`
      );
    }
    if (challenge.required_mentions?.length) {
      items.push(
        `Required mentions: ${challenge.required_mentions
          .map((m: string) => (m.startsWith("@") ? m : `@${m}`))
          .join(" ")}`
      );
    }
    if (challenge.posting_rules?.trim()) {
      items.push(challenge.posting_rules.trim());
    }
    if (challenge.submission_eligibility) {
      const eligibility =
        challenge.submission_eligibility === "anyone"
          ? "Open to anyone"
          : challenge.submission_eligibility === "creators"
            ? "Individual creators only"
            : challenge.submission_eligibility === "circles"
              ? "Creator circles only"
              : challenge.submission_eligibility;
      items.push(`Eligibility: ${eligibility}`);
    }
    if (challenge.num_winners) {
      items.push(
        `${challenge.num_winners} winner${challenge.num_winners === 1 ? "" : "s"}`
      );
    }
    if (challenge.prize_amounts_display?.length) {
      items.push(
        `Prize breakdown: ${challenge.prize_amounts_display.join(" · ")}`
      );
    }

    return items;
  }, [challenge]);

  const closesIn = formatClosesIn(challenge?.end_date);
  const prizeLabel = formatCompactNaira(
    challenge?.prize_pool_display ||
      (typeof challenge?.prize_pool === "number"
        ? challenge.prize_pool / 100
        : 0),
    challenge?.currency_symbol || "₦"
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <Loader />
        <p className="text-[13px] font-medium text-[#667085]">
          Loading challenge...
        </p>
      </div>
    );
  }

  if (isError || !challenge) {
    return (
      <div className="mx-auto max-w-[1200px] px-2 py-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-full p-2 text-[#1E1F24] transition-colors hover:bg-gray-50"
        >
          <HiArrowLeft size={24} />
        </button>
        <div className="rounded-2xl border border-red-100 bg-red-50/60 px-6 py-10 text-center">
          <p className="text-[15px] font-semibold text-[#D12B1F]">
            Couldn’t load this challenge
          </p>
          <p className="mt-2 text-[13px] text-[#667085]">
            {detailErrorStatus === 500
              ? "The challenge detail API returned a server error (500). This is a backend issue — CORS often appears as a side effect when that happens."
              : "It may be unpublished, expired, or unavailable."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1200px] bg-white font-geist">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-full p-2 text-[#1E1F24] transition-colors hover:bg-gray-50"
        >
          <HiArrowLeft size={24} />
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="max-w-[640px] text-[20px] leading-tight font-semibold text-[#1E1F24] md:text-[26px]">
            {challenge.title}
          </h1>
          {isPartial ? (
            <p className="mt-2 text-[12px] text-[#B54708]">
              Showing limited challenge data — full detail API is currently
              failing on the backend
              {detailErrorStatus ? ` (${detailErrorStatus})` : ""}.
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="whitespace-nowrap rounded-full border border-[#E5E7EB] px-3 py-2.5 text-[13px] font-semibold text-[#1E1F24] transition-all hover:bg-gray-50 sm:px-6 sm:text-[14px]"
          >
            {challenge.is_saved ? "Saved" : "Save Challenge"}
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="whitespace-nowrap rounded-full bg-[#0047FF] px-3 py-2.5 text-[13px] font-semibold text-white shadow-md transition-all hover:bg-blue-700 sm:px-6 sm:text-[14px]"
          >
            Submit Entry
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
          <Image
            src={challenge.brand_profile_picture_url || "/dash-logo.svg"}
            alt={challenge.brand_name || "Brand"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-semibold text-[#111827]">
              {challenge.brand_name || "Brand"}
            </span>
            {challenge.is_funded ? (
              <MdVerified className="text-[#22C55E]" size={14} />
            ) : null}
            <span className="ml-2 text-[12px] font-medium text-[#9CA3AF]">
              • {formatTimeAgo(challenge.created_at)}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {challenge.category_name ? (
              <span className="rounded-full bg-[#F5FBFF] px-2 py-0.5 text-[10px] font-semibold text-[#3379A5]">
                {challenge.category_name}
              </span>
            ) : null}
            {(challenge.platforms ?? []).map((platform: string) => (
              <span
                key={platform}
                className="rounded-full bg-[#F5FBFF] px-2 py-0.5 text-[10px] font-semibold capitalize text-[#3379A5]"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold">
        <span className="text-[#1E1F24]">{prizeLabel} prize pool</span>
        {closesIn ? (
          <>
            <span className="text-[#E5E7EB]">|</span>
            <span className="text-[#D12B1F]">{closesIn}</span>
          </>
        ) : null}
        {challenge.is_funded || challenge.is_published ? (
          <>
            <span className="text-[#E5E7EB]">|</span>
            <span className="rounded-full bg-[#ECFEF4] px-1.5 py-0.5 text-[#1E874B]">
              Verified Challenge
            </span>
          </>
        ) : null}
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-2 text-[14px] font-semibold text-[#1E1F24]">
            About This Challenge
          </h2>
          <p className="text-[14px] leading-[1.6] whitespace-pre-wrap text-[#62636C]">
            {challenge.description || "No description provided."}
          </p>
          {challenge.brand_bio ? (
            <p className="mt-3 text-[13px] leading-[1.6] text-[#747682]">
              About {challenge.brand_name}: {challenge.brand_bio}
            </p>
          ) : null}
        </section>

        {(challenge.prize_amounts_display?.length ?? 0) > 0 ? (
          <section>
            <h2 className="mb-2 text-[14px] font-semibold text-[#1E1F24]">
              Prize Breakdown
            </h2>
            <ul className="space-y-2 text-[14px] text-[#62636C]">
              {challenge.prize_amounts_display.map(
                (amount: string, index: number) => (
                  <li key={`${amount}-${index}`} className="flex gap-2">
                    <span className="font-medium text-[#1E1F24]">
                      {index + 1}
                      {index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}
                    </span>
                    <span>{amount}</span>
                  </li>
                )
              )}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="mb-1 text-[20px] font-semibold text-[#1E1F24]">
            Sample Content and Attachments
          </h2>
          <p className="mb-4 text-[12px] font-normal text-[#9CA3AF]">
            Sample media uploaded by the brand for this challenge
          </p>

          {mediaItems.length > 0 ? (
            <div className="no-scrollbar flex gap-4 overflow-x-auto">
              {mediaItems.map((item: any, i: number) => {
                const url = item.media_url as string;
                const video = isVideoUrl(url, item.media_type);
                return (
                  <div
                    key={item.id || url || i}
                    className="relative h-[260px] min-w-[250px] overflow-hidden rounded-[24px] bg-gray-100"
                  >
                    {video ? (
                      <video
                        src={url}
                        className="h-full w-full object-cover"
                        controls
                        playsInline
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={url}
                        alt={item.original_filename || "Sample media"}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E4E7EC] px-6 py-10 text-center text-[13px] text-[#667085]">
              No sample media attached to this challenge.
            </div>
          )}

          {challenge.brief_document_url ? (
            <a
              href={challenge.brief_document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E4E7EC] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1E1F24] transition hover:bg-gray-50"
            >
              <FiFileText size={16} />
              View brief document
            </a>
          ) : null}
        </section>

        <section>
          <h2 className="mb-1 text-[20px] font-semibold text-[#1E1F24]">
            Mandatory Requirements
          </h2>
          <p className="mb-4 text-[12px] text-[#62636C]">
            Your content must meet the requirements below to be considered for
            this challenge
          </p>
          <div className="divide-y divide-[#F3F4F6] border-t border-[#F3F4F6]">
            {requirements.length > 0 ? (
              requirements.map((req, idx) => (
                <div key={idx} className="flex gap-2 py-3 text-[12px]">
                  <span className="font-medium text-[#62636C]">{idx + 1}.</span>
                  <p className="text-[12px] font-medium whitespace-pre-wrap text-[#62636C]">
                    {req}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-6 text-[13px] text-[#667085]">
                No additional requirements were provided for this challenge.
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="mt-8 flex items-center justify-between border-t border-[#F3F4F6] pt-8 text-[#62636C]">
        <div className="flex gap-6 text-[10px] font-medium">
          <span className="flex items-center gap-1.5">
            <FiBarChart2 size={18} /> {challenge.viewer_count ?? 0}
          </span>
          <span className="flex items-center gap-1.5">
            <FiMail size={18} /> {challenge.participant_count ?? 0}
          </span>
          {closesIn ? (
            <span className="flex items-center gap-1.5">
              <FiClock size={18} /> {closesIn.replace("Closes in ", "")}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="text-[12px] font-medium hover:text-[#111827]"
        >
          Read Terms of Service Here
        </button>
      </footer>

      <SubmitEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        challengeId={challenge.id}
        platforms={challenge.platforms}
        requirements={requirements}
      />
    </div>
  );
};

export default ChallengeDetailPage;
