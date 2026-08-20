"use client";

import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/useModal";

type ChallengeCreatedModalProps = {
  challengeId?: string;
  shareUrl?: string;
};

export default function ChallengeCreatedModal({
  challengeId,
  shareUrl,
}: ChallengeCreatedModalProps) {
  const { close } = useModal();

  const resolveShareUrl = () => {
    if (shareUrl) return shareUrl;
    if (typeof window === "undefined") return "";
    if (challengeId) {
      return `${window.location.origin}/dashboard/challenge/${challengeId}`;
    }
    return window.location.href;
  };

  const handleShare = async () => {
    const url = resolveShareUrl();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Starix Challenge",
          text: "Check out this challenge on Starix",
          url,
        });
        return;
      }
    } catch {
      // Fall through to clipboard if share is cancelled/unavailable
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Challenge link copied");
    } catch {
      toast.error("Couldn’t copy link");
    }
  };

  return (
    <div className="w-[min(82vw,500px)] rounded-[28px] bg-white p-[26px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-square overflow-hidden rounded-[25px] bg-[#DBF0FF]">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-[26px] right-[26px] z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#667085] shadow-[0_1px_3px_rgba(16,24,40,0.1)] transition hover:text-[#101828]"
        >
          <FiX size={20} strokeWidth={2} />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/trphy.svg"
          alt=""
          className="h-full w-full object-cover select-none"
          draggable={false}
        />
      </div>

      <div className="pt-[26px] pb-2 text-center">
        <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#1E1F24]">
          Challenge Created!
        </h2>
        <p className="mx-auto mt-3 max-w-[345px] text-[16px] leading-[1.55] font-normal text-[#62636C]">
          Your challenge has been funded and will start receiving creator
          submissions soon.
        </p>

        <button
          type="button"
          onClick={handleShare}
          className="mt-8 rounded-full bg-[#0033FF] px-7 py-[15px] text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(0,51,255,0.2)] transition hover:opacity-95 active:scale-[0.99]"
        >
          Share Link
        </button>
      </div>
    </div>
  );
}
