"use client";

import { useEffect, useRef, useState } from "react";
import { FiBookmark, FiShare2, FiLink } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa6";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import {
  useShareChallenge,
  useToggleChallengeSave,
} from "@/hooks/useChallenges";
import { useDashboardNotice } from "@/store/useDashboardNoticeStore";

type ChallengeSaveShareActionsProps = {
  challengeId: string;
  title?: string;
  isSaved?: boolean;
  iconSize?: number;
};

const SHARE_CHANNELS = [
  { id: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
  { id: "instagram", label: "Instagram", Icon: FaInstagram },
  { id: "tiktok", label: "TikTok", Icon: FaTiktok },
  { id: "x", label: "X", Icon: FaXTwitter },
  { id: "facebook", label: "Facebook", Icon: FaFacebookF },
  { id: "link", label: "Copy link", Icon: FiLink },
] as const;

function fallbackShareUrl(challengeId: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/dashboard/challenge/${challengeId}`;
}

function shareCaption(title: string) {
  return `Check out this Starix challenge: ${title}`;
}

function isBareHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function cleanShareUrl(value: string, fallback: string) {
  const trimmed = value.trim();
  if (trimmed && !/\s/.test(trimmed) && isBareHttpUrl(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/https?:\/\/[^\s]+/i);
  return match?.[0] ?? fallback;
}

export default function ChallengeSaveShareActions({
  challengeId,
  title = "Starix Challenge",
  isSaved = false,
  iconSize = 15,
}: ChallengeSaveShareActionsProps) {
  const notice = useDashboardNotice();
  const saveMutation = useToggleChallengeSave(challengeId);
  const shareMutation = useShareChallenge();
  const [saved, setSaved] = useState(isSaved);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const resolveShareUrl = async (medium: string) => {
    try {
      const result = await shareMutation.mutateAsync({
        challengeId,
        medium,
      });
      if (result.share_url?.trim()) {
        return cleanShareUrl(result.share_url, fallbackShareUrl(challengeId));
      }
    } catch {
      // Use the local challenge URL if analytics share fails.
    }
    return fallbackShareUrl(challengeId);
  };

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!challengeId || saveMutation.isPending) return;

    try {
      const result = await saveMutation.mutateAsync();
      setSaved(result.is_saved);
      notice.success(
        result.is_saved
          ? "Challenge saved"
          : "Challenge removed from saved"
      );
    } catch {
      notice.error("Couldn’t update saved challenges");
    }
  };

  const copyText = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  const openChannel = async (medium: string, url: string) => {
    const caption = shareCaption(title);
    const encodedUrl = encodeURIComponent(url);
    const encodedCaption = encodeURIComponent(caption);

    if (medium === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodedCaption}%20${encodedUrl}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (medium === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (medium === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedCaption}&url=${encodedUrl}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    if (medium === "instagram") {
      await copyText(url);
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      notice.success("Link copied. Paste it in Instagram to share.");
      return;
    }
    if (medium === "tiktok") {
      await copyText(url);
      window.open("https://www.tiktok.com/", "_blank", "noopener,noreferrer");
      notice.success("Link copied. Paste it in TikTok to share.");
      return;
    }

    await copyText(url);
    notice.success("Challenge link copied");
  };

  const handleShareChannel = async (medium: string) => {
    const url = await resolveShareUrl(medium);
    if (!url) {
      notice.error("Couldn’t create a share link");
      return;
    }
    try {
      await openChannel(medium, url);
    } catch {
      notice.error("Couldn’t share this challenge");
    }
    setMenuOpen(false);
  };

  const handleNativeShare = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!challengeId) return;

    if (typeof navigator.share !== "function") {
      setMenuOpen((open) => !open);
      return;
    }

    const url = await resolveShareUrl("native");
    if (!url) {
      notice.error("Couldn’t create a share link");
      return;
    }

    try {
      await navigator.share({
        title,
        text: shareCaption(title),
        url,
      });
    } catch {
      setMenuOpen(true);
    }
  };

  return (
    <div
      ref={menuRef}
      className="relative flex items-center gap-2.5"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <button
        type="button"
        aria-label={saved ? "Remove saved challenge" : "Save challenge"}
        disabled={!challengeId || saveMutation.isPending}
        onClick={handleSave}
        className={`transition-colors cursor-pointer disabled:opacity-50 ${
          saved ? "text-[#0033FF]" : "hover:text-[#111827]"
        }`}
      >
        {saved ? (
          <FaBookmark size={iconSize} />
        ) : (
          <FiBookmark size={iconSize} />
        )}
      </button>

      <button
        type="button"
        aria-label="Share challenge"
        aria-expanded={menuOpen}
        disabled={!challengeId || shareMutation.isPending}
        onClick={handleNativeShare}
        className="hover:text-[#111827] transition-colors cursor-pointer disabled:opacity-50"
      >
        <FiShare2 size={iconSize} />
      </button>

      {menuOpen ? (
        <div className="absolute right-0 bottom-8 z-30 w-[188px] rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_12px_32px_rgba(16,24,40,0.12)]">
          {SHARE_CHANNELS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => void handleShareChannel(id)}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[12px] font-medium text-[#1E1F24] hover:bg-[#F5F6F8]"
            >
              <Icon size={14} className="shrink-0 text-[#62636C]" />
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
