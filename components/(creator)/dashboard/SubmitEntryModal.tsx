"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter, FaCheck } from "react-icons/fa6";
import type { IconType } from "react-icons";
import toast from "react-hot-toast";
import SubmitSuccessModal from "./SubmitSuccessModal";
import { useSubmitChallengeEntry } from "@/hooks/useChallenges";

type PlatformKey = "instagram" | "x" | "youtube" | "tiktok" | "youtube_shorts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeId: string;
  platforms?: string[] | null;
  requirements?: string[];
}

const PLATFORM_META: Record<
  PlatformKey,
  {
    label: string;
    Icon: IconType;
    placeholder: string;
    pattern: RegExp;
  }
> = {
  instagram: {
    label: "Instagram post",
    Icon: FaInstagram,
    placeholder: "https://www.instagram.com/reel/… or /p/…",
    pattern:
      /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p|tv)\/[A-Za-z0-9_-]+/i,
  },
  x: {
    label: "X (Twitter) post",
    Icon: FaXTwitter,
    placeholder: "https://x.com/…/status/…",
    pattern:
      /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+/i,
  },
  youtube: {
    label: "YouTube post",
    Icon: FaYoutube,
    placeholder: "https://youtube.com/watch?v=… or /shorts/…",
    pattern:
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/).+/i,
  },
  youtube_shorts: {
    label: "YouTube Shorts",
    Icon: FaYoutube,
    placeholder: "https://youtube.com/shorts/…",
    pattern:
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/).+/i,
  },
  tiktok: {
    label: "TikTok post",
    Icon: FaTiktok,
    placeholder: "https://www.tiktok.com/@user/video/…",
    pattern:
      /^(https?:\/\/)?((www|vm|vt)\.)?tiktok\.com\/.+/i,
  },
};

function normalizePlatform(value: string): PlatformKey | null {
  const key = value.trim().toLowerCase().replace(/\s+/g, "_");
  if (key === "twitter") return "x";
  if (key in PLATFORM_META) return key as PlatformKey;
  return null;
}

function getApiErrorMessage(error: unknown, fallback: string) {
  const detail = (error as { response?: { data?: { detail?: unknown } } })
    ?.response?.data?.detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail)) {
    const msgs = detail
      .map((item) =>
        typeof item === "object" && item && "msg" in item
          ? String((item as { msg: string }).msg)
          : null
      )
      .filter(Boolean);
    if (msgs.length) return msgs.join(", ");
  }
  return fallback;
}

const SubmitEntryModal = ({
  isOpen,
  onClose,
  challengeId,
  platforms,
  requirements = [],
}: ModalProps) => {
  const submitEntry = useSubmitChallengeEntry();
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState(
    "Your entry has been successfully submitted."
  );

  const requiredPlatforms = useMemo(() => {
    const fromChallenge = (platforms ?? [])
      .map(normalizePlatform)
      .filter((p): p is PlatformKey => Boolean(p));

    // De-dupe while preserving order
    return Array.from(new Set(fromChallenge));
  }, [platforms]);

  useEffect(() => {
    if (!isOpen) return;
    setCheckedItems(requirements.map(() => false));
    setLinks(
      Object.fromEntries(requiredPlatforms.map((platform) => [platform, ""]))
    );
    setErrors(
      Object.fromEntries(requiredPlatforms.map((platform) => [platform, false]))
    );
    setShowSuccess(false);
    submitEntry.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only when modal opens / challenge inputs change
  }, [isOpen, challengeId, requirements, requiredPlatforms]);

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <SubmitSuccessModal
        isOpen={true}
        message={successMessage}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
        onFindMore={() => {
          setShowSuccess(false);
          onClose();
        }}
      />
    );
  }

  const handleInputChange = (platform: PlatformKey, value: string) => {
    setLinks((prev) => ({ ...prev, [platform]: value }));
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [platform]: false }));
      return;
    }
    const isValid = PLATFORM_META[platform].pattern.test(value.trim());
    setErrors((prev) => ({ ...prev, [platform]: !isValid }));
  };

  const handleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const hasErrors = requiredPlatforms.some((platform) => errors[platform]);
  const allLinksFilled = requiredPlatforms.every(
    (platform) => (links[platform] ?? "").trim().length > 0
  );
  const allRequirementsChecked =
    requirements.length === 0 ||
    (checkedItems.length === requirements.length &&
      checkedItems.every(Boolean));
  const canSubmit =
    Boolean(challengeId) &&
    requiredPlatforms.length > 0 &&
    allRequirementsChecked &&
    allLinksFilled &&
    !hasErrors &&
    !submitEntry.isPending;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      const data = await submitEntry.mutateAsync({
        challengeId,
        payload: {
          links: requiredPlatforms.map((platform) => ({
            content_url: links[platform].trim(),
          })),
        },
      });
      setSuccessMessage(
        data?.message || "Your entry has been successfully submitted."
      );
      setShowSuccess(true);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Could not submit your entry. Please try again."
        )
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[540px] max-h-[90vh] overflow-y-auto rounded-[32px] relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <IoClose size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-[24px] font-semibold text-[#1E1F24]">
            Submit Your Entry
          </h2>
          <p className="text-[#62636C] text-[14px] mt-2 leading-relaxed">
            Confirm your submission meets the challenge requirements then paste
            one post link per required platform.
          </p>

          <div className="mt-8 bg-[#F9FAFB] border border-[#F3F4F6] rounded-[24px] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F3F4F6]">
              <span className="text-[16px] font-semibold text-[#62636C]">
                Confirm Mandatory Requirements met
              </span>
            </div>
            <div className="bg-white">
              {requirements.length > 0 ? (
                requirements.map((req, idx) => (
                  <label
                    key={`${req}-${idx}`}
                    className="flex items-start gap-4 px-6 py-4 border-b border-[#F9FAFB] cursor-pointer hover:bg-gray-50 transition-colors group"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={checkedItems[idx] ?? false}
                      onChange={() => handleCheck(idx)}
                    />
                    <div
                      className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all ${
                        checkedItems[idx]
                          ? "border-[#0047FF] bg-[#0047FF]"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {checkedItems[idx] ? (
                        <FaCheck className="text-white w-3 h-3" />
                      ) : null}
                    </div>
                    <span className="text-[14px] text-[#62636C] font-normal whitespace-pre-wrap">
                      {req}
                    </span>
                  </label>
                ))
              ) : (
                <div className="px-6 py-5 text-[13px] text-[#667085]">
                  No additional mandatory requirements for this challenge.
                </div>
              )}
            </div>
          </div>

          {requiredPlatforms.length > 0 ? (
            <div
              className={`grid gap-4 mt-8 ${
                requiredPlatforms.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {requiredPlatforms.map((platform) => {
                const meta = PLATFORM_META[platform];
                const Icon = meta.Icon;
                return (
                  <div key={platform} className="space-y-2">
                    <label className="flex items-center gap-2 text-[16px] font-semibold text-[#62636C]">
                      <Icon className="text-[#62636C]" /> {meta.label}
                    </label>
                    <input
                      type="url"
                      value={links[platform] ?? ""}
                      onChange={(e) =>
                        handleInputChange(platform, e.target.value)
                      }
                      placeholder={meta.placeholder}
                      className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-[14px] outline-none transition-all ${
                        errors[platform]
                          ? "border-red-500 ring-1 ring-red-100"
                          : "border-[#E5E7EB] focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-[13px] text-[#B54708]">
              This challenge has no required platforms configured, so an entry
              can’t be submitted yet.
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full mt-8 py-4 rounded-full text-white font-semibold text-[15px] transition-all shadow-lg ${
              canSubmit
                ? "bg-[#0047FF] hover:bg-blue-700 active:scale-[0.98]"
                : "bg-[#8CA8FF] cursor-not-allowed"
            }`}
          >
            {submitEntry.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitEntryModal;
