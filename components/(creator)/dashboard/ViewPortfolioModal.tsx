"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  useGetCreatorPortfolio,
  type PortfolioPlatform,
} from "@/hooks/useProfile";

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
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
                <a
                  key={item.id}
                  href={item.content_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-[16px] border border-[#EFF0F3] transition hover:border-[#C7CBD7]"
                >
                  <div className="relative aspect-[4/5] max-h-[320px] w-full bg-[#F4F4F5]">
                    {item.cover_image_url ? (
                      <Image
                        src={item.cover_image_url}
                        alt={`${item.platform} submission`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[12px] text-[#747682]">
                        No preview
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold capitalize text-[#1E1F24]">
                        {item.platform.replace("_", " ")} · {item.content_type}
                      </p>
                      <p className="truncate text-[11px] text-[#747682]">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-[#8B8D98] px-4 py-1.5 text-[11px] font-semibold text-[#1E1F24]">
                      View Content
                    </span>
                  </div>
                </a>
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
