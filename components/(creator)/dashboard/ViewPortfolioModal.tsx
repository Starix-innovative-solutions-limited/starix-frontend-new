"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  useGetCreatorPortfolio,
  type CreatorPortfolioItem,
  type PortfolioPlatform,
} from "@/hooks/useProfile";
import {
  FiBarChart2,
  FiHeart,
  FiMessageSquare,
  FiRepeat,
  FiShare2,
} from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";

interface ViewPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
  creatorName?: string;
}

type PortfolioTab = "Instagram" | "TikTok" | "YouTube";

const platforms: PortfolioTab[] = ["Instagram", "TikTok", "YouTube",];

const tabToPlatform: Record<PortfolioTab, PortfolioPlatform> = {
  Instagram: "instagram",
  TikTok: "tiktok",
  YouTube: "youtube",
};

const PAGE_SIZE = 10;

function compactMetric(value: number | null) {
  if (value == null) return "—";
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function outcomeLabel(outcome: CreatorPortfolioItem["challenge"]["outcome"]) {
  if (outcome === "winner") return "Winner";
  if (outcome === "finalist") return "Finalist";
  return "Ranked";
}

function outcomeClass(outcome: CreatorPortfolioItem["challenge"]["outcome"]) {
  if (outcome === "winner") return "bg-[#ECFDF3] text-[#027A48]";
  if (outcome === "finalist") return "bg-[#EFF8FF] text-[#175CD3]";
  return "bg-[#F2F4F7] text-[#475467]";
}

const ViewPortfolioModal = ({
  isOpen,
  onClose,
  username,
  creatorName = "Creator",
}: ViewPortfolioModalProps) => {
  const [activePlatform, setActivePlatform] =
    useState<PortfolioTab>("Instagram");
  const [page, setPage] = useState(1);

  const platform = tabToPlatform[activePlatform];

  const {
    data: portfolio,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetCreatorPortfolio(
    username,
    { platform, page, page_size: PAGE_SIZE },
    { enabled: isOpen && !!username }
  );

  const items = portfolio?.items ?? [];
  const totalPages = portfolio?.total_pages ?? 0;

  const errorMessage = useMemo(() => {
    if (!isError) return null;
    if (error instanceof Error) return error.message;
    return "Failed to load portfolio.";
  }, [isError, error]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[88vh] w-full max-w-[660px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="shrink-0 px-6 pt-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.04em] text-[#1E1F24]">
                {creatorName}’s Portfolio
              </h3>

              <p className="mt-2 max-w-[520px] text-[13px] leading-[1.55] text-[#747682]">
                A starix portfolio is populated by Challenge submissions and
                link externally to the platform they were originally posted on.
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close portfolio modal"
              className="mt-1 text-[28px] leading-none text-[#62636C] transition hover:text-[#1E1F24]"
            >
              ×
            </button>
          </div>

          <div className="mt-8 flex items-center gap-10 border-b border-[#EFF0F3]">
            {platforms.map((tab) => {
              const isActive = activePlatform === tab;

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActivePlatform(tab);
                    setPage(1);
                  }}
                  className={`relative pb-4 text-[13px] font-semibold transition ${
                    isActive ? "text-[#114BF6]" : "text-[#62636C]"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-1/2 h-[4px] w-[42px] -translate-x-1/2 rounded-full bg-[#114BF6]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6">
          {!username ? (
            <p className="py-10 text-center text-[13px] text-[#747682]">
              Creator username is required to load portfolio.
            </p>
          ) : isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[180px] animate-pulse rounded-[16px] bg-[#F4F4F5]"
                />
              ))}
            </div>
          ) : isError ? (
            <p className="py-10 text-center text-[13px] text-red-500">
              {errorMessage}
            </p>
          ) : items.length === 0 ? (
            <p className="py-10 text-center text-[13px] text-[#747682]">
              No {activePlatform} submissions in this portfolio yet.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[20px] border border-[#E4E7EC] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0">
                        <div className="absolute left-0 top-0 h-9 w-9 overflow-hidden rounded-full border border-white bg-[#F2F4F7]">
                          {item.creator.profile_picture_url ? (
                            <Image
                              src={item.creator.profile_picture_url}
                              alt={item.creator.display_name}
                              fill
                              sizes="36px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-[12px] font-semibold text-[#667085]">
                              {item.creator.display_name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-[#F2F4F7]">
                          {item.brand.profile_picture_url ? (
                            <Image
                              src={item.brand.profile_picture_url}
                              alt={item.brand.brand_name}
                              fill
                              sizes="28px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-[9px] font-semibold text-[#667085]">
                              {item.brand.brand_name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1 truncate text-[13px] font-semibold text-[#1E1F24]">
                          <span className="truncate">{item.creator.display_name}</span>
                          <span className="text-[#98A2B3]">·</span>
                          <span className="truncate">{item.brand.brand_name}</span>
                          {item.brand.is_verified && (
                            <GoCheckCircleFill
                              className="shrink-0 text-[#12B76A]"
                              size={12}
                            />
                          )}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {(item.creator.niches ?? []).slice(0, 3).map((niche) => (
                            <span
                              key={niche}
                              className="rounded-full border border-[#D7EAF2] px-2 py-0.5 text-[9px] capitalize text-[#4384A1]"
                            >
                              {niche}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <a
                        href={item.content_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[#8B8D98] px-4 py-2 text-[11px] font-medium text-[#1E1F24] hover:bg-gray-50"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        disabled
                        title="Portfolio removal requires backend support"
                        className="cursor-not-allowed rounded-full border border-[#8B8D98] px-4 py-2 text-[11px] font-medium text-[#1E1F24] opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[11px] text-[#667085]">
                    <span>
                      Ranked {item.challenge.final_rank}
                      {item.challenge.final_rank === 1
                        ? "st"
                        : item.challenge.final_rank === 2
                          ? "nd"
                          : item.challenge.final_rank === 3
                            ? "rd"
                            : "th"}{" "}
                      Globally
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${outcomeClass(
                        item.challenge.outcome
                      )}`}
                    >
                      {outcomeLabel(item.challenge.outcome)}
                    </span>
                  </div>

                  <h4 className="mt-3 text-[13px] font-semibold text-[#344054]">
                    {item.challenge.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#667085]">
                    {item.challenge.description}
                  </p>

                  <a
                    href={item.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-4 block aspect-[16/9] max-h-[330px] w-full overflow-hidden rounded-[12px] bg-[#F4F4F5]"
                  >
                    {item.cover_image_url ? (
                      <Image
                        src={item.cover_image_url}
                        alt={`${item.creator.display_name}'s ${item.platform} challenge post`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[12px] text-[#747682]">
                        No preview
                      </div>
                    )}
                  </a>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#667085]">
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1">
                        <FiBarChart2 size={13} />
                        {compactMetric(item.engagement.views_count)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiHeart size={13} />
                        {compactMetric(item.engagement.likes_count)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMessageSquare size={13} />
                        {compactMetric(item.engagement.comments_count)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiRepeat size={13} />
                        {compactMetric(item.engagement.shares_count)}
                      </span>
                    </div>
                    <a
                      href={item.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share or open post"
                      className="rounded-full p-1.5 hover:bg-[#F2F4F7]"
                    >
                      <FiShare2 size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-full border border-[#8B8D98] px-4 py-2 text-[12px] font-semibold text-[#1E1F24] disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-[12px] text-[#747682]">
                Page {portfolio?.page ?? page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-[#8B8D98] px-4 py-2 text-[12px] font-semibold text-[#1E1F24] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPortfolioModal;
