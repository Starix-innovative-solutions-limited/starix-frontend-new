"use client";

import React, { useState } from "react";

interface ViewPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName?: string;
}

type PortfolioPlatform = "Instagram" | "TikTok" | "YouTube";

const platforms: PortfolioPlatform[] = ["Instagram", "TikTok", "YouTube"];

const ViewPortfolioModal = ({
  isOpen,
  onClose,
  creatorName = "Jason Oluwamapadarijimi",
}: ViewPortfolioModalProps) => {
  const [activePlatform, setActivePlatform] =
    useState<PortfolioPlatform>("Instagram");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="relative flex max-h-[88vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="shrink-0 px-6 pt-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.04em] text-[#1E1F24]">
                {creatorName}’s Porfolio
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
            {platforms.map((platform) => {
              const isActive = activePlatform === platform;

              return (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`relative pb-4 text-[14px] font-semibold transition ${
                    isActive ? "text-[#114BF6]" : "text-[#62636C]"
                  }`}
                >
                  {platform}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-1/2 h-[4px] w-[42px] -translate-x-1/2 rounded-full bg-[#114BF6]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6">
          {activePlatform === "Instagram" && <InstagramPortfolioGrid />}
          {activePlatform === "TikTok" && <TikTokPortfolioGrid />}
          {activePlatform === "YouTube" && <YouTubePortfolioGrid />}
        </div>
      </div>
    </div>
  );
};

const PlaceholderCard = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-[8px] bg-[#F4F4F5] ${className}`} />
);

const InstagramPortfolioGrid = () => {
  return (
    <div className="space-y-6">
      <PlaceholderCard className="h-[420px] w-full" />
      <PlaceholderCard className="h-[220px] w-full" />
      <PlaceholderCard className="h-[72px] w-full" />
    </div>
  );
};

const TikTokPortfolioGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <PlaceholderCard className="h-[500px]" />
      <PlaceholderCard className="h-[500px]" />
      <PlaceholderCard className="h-[40px]" />
      <PlaceholderCard className="h-[40px]" />
    </div>
  );
};

const YouTubePortfolioGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <PlaceholderCard key={index} className="h-[165px]" />
      ))}
    </div>
  );
};

export default ViewPortfolioModal;