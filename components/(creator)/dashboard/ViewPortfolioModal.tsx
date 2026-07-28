"use client";

import React, { useState } from "react";
import { FaRegHeart, FaRegComment, FaRetweet } from "react-icons/fa";
import { FiBarChart2, FiShare2 } from "react-icons/fi";
import { MdVerified } from "react-icons/md";


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
            {platforms.map((platform) => {
              const isActive = activePlatform === platform;

              return (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`relative pb-4 text-[13px] font-semibold transition ${
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
          {activePlatform === "YouTube" ? (
            <div className="space-y-6">
              <PortfolioSubmissionCard variant="youtube" status="Finalist" />
              <PortfolioSubmissionCard variant="youtube" brand="Figma" status="Winner" />
            </div>
          ) : (
            <div className="space-y-6">
              <PortfolioSubmissionCard variant="social" status="Finalist" />
              <PortfolioSubmissionCard variant="social" brand="Figma" status="Winner" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PortfolioSubmissionCard = ({
  brand = "Nivea",
  status = "Finalist",
  variant = "social",
}: {
  brand?: string;
  status?: "Finalist" | "Winner";
  variant?: "social" | "youtube";
}) => {
  const isYouTube = variant === "youtube";
  return (
    <div className="rounded-[24px] border border-[#EFF0F3] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-[#F4F4F5]" />

          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-[#114BF6]" />
              <p className="text-[13px] font-semibold text-[#1E1F24]">
                Jason · {brand}  
              </p>
              <MdVerified className="text-[#22C55E] shrink-0" size={13} />
            </div>

            <div className="mt-1 flex gap-1.5">
              {["Beauty", "Family and lifestyle", "Fashion"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#DDEAF7] px-2 py-0.5 text-[9px] font-medium text-[#3379A5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button className="rounded-full border border-[#8B8D98] px-5 py-2 text-[12px] font-semibold text-[#1E1F24]">
          View Content
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#62636C]">
        <span>Ranked {status === "Winner" ? "1st" : "29th"} Globally</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] ${
            status === "Winner"
              ? "bg-[#ECFEF4] text-[#1E874B]"
              : "bg-[#F5FBFF] text-[#245BFF]"
          }`}
        >
          {status}
        </span>
      </div>

      <h4 className="mt-3 text-[13px] font-semibold text-[#1E1F24]">
        UGC Creators Needed for Skincare Product set Launch
      </h4>

      <p className="mt-1 text-[10px] leading-relaxed text-[#747682]">
        NIVEA is launching its new Radiance Boost Skincare Collection and is looking for authentic,
        engaging user-generated content that highlights real skin journeys, glow transformations,
        and everyday skincare routines.
      </p>

      <div
        className={`mt-5 rounded-[14px] bg-[#F4F4F5] ${
          isYouTube ? "h-[220px]" : "h-[430px]"
        }`}
      />

      <div className="mt-4 flex items-center justify-between text-[12px] font-medium text-[#62636C]">
      <div className="flex p-2 items-center gap-4">
        <span className="flex items-center gap-1">
          <FiBarChart2 className="text-[12px]" />
          24.3k
        </span>

        <span className="flex items-center gap-1">
          <FaRegHeart className="text-[12px]" />
          15.6k
        </span>

        <span className="flex items-center gap-1">
          <FaRegComment className="text-[12px]" />
          3.1k
        </span>

        <span className="flex items-center gap-1">
          <FaRetweet className="text-[12px]" />
          964
        </span>
      </div>

        <span><FiShare2 className="text-[12px]" /></span>
      </div>
    </div>
  );
};

export default ViewPortfolioModal;