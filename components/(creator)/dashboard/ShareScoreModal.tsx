"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { toBlob, toJpeg, toPng } from "html-to-image";
import { useGetMe } from "@/hooks/useAuth";
import { useGetCreatorProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/store/useAuthStore";

type SharePlatform = "instagram" | "tiktok" | "youtube";

type ShareScoreModalProps = {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  displayName?: string | null;
  avatarUrl?: string | null;
};

const CARD_BG = "#D4F0FF";
const SCORE_BLUE = "#0033FF";
const RING_BLUE = "#114BF6";
const EXPORT_EDGE = 2880;

const PLATFORM_URL: Record<SharePlatform, string> = {
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
  youtube: "https://www.youtube.com/",
};

const PLATFORM_LABEL: Record<SharePlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

const PHOTO_KEYS = [
  "profile_picture_url",
  "profile_picture",
  "profile_image",
  "avatar_url",
  "avatar",
  "photo_url",
  "image_url",
] as const;

function firstNonEmpty(...values: Array<string | null | undefined>) {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed && trimmed !== "null" && trimmed !== "undefined") return trimmed;
  }
  return null;
}

function asUrl(value: unknown): string | null {
  if (typeof value === "string") return firstNonEmpty(value);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return asUrl(record.url) || asUrl(record.src) || asUrl(record.href);
  }
  return null;
}

function photoFromUser(user: unknown, depth = 0): string | null {
  if (!user || typeof user !== "object" || depth > 2) return null;
  const record = user as Record<string, unknown>;
  for (const key of PHOTO_KEYS) {
    const found = asUrl(record[key]);
    if (found) return found;
  }
  return photoFromUser(record.profile, depth + 1) || photoFromUser(record.user, depth + 1);
}

function nameFromUser(user: unknown) {
  if (!user || typeof user !== "object") return null;
  const record = user as Record<string, unknown>;
  const first =
    typeof record.first_name === "string" ? record.first_name.trim() : "";
  const last =
    typeof record.last_name === "string" ? record.last_name.trim() : "";
  return firstNonEmpty(
    `${first} ${last}`.trim(),
    typeof record.display_name === "string" ? record.display_name : null,
    typeof record.username === "string" ? record.username : null
  );
}

function toPossessive(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "Your";
  return /s$/i.test(trimmed) ? `${trimmed}'` : `${trimmed}'s`;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function loadImage(src: string, cors = false): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    if (cors) img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function urlToDataUrl(src: string): Promise<string | null> {
  try {
    const response = await fetch(src, { mode: "cors", credentials: "omit" });
    if (response.ok) {
      const blob = await response.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    }
  } catch {
    // Fall through to canvas draw with CORS.
  }

  try {
    const img = await loadImage(src, true);
    if (!img) return null;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx || !canvas.width || !canvas.height) return null;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

function wrapCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);

  lines.forEach((entry, index) => {
    ctx.fillText(entry, x, y + index * lineHeight);
  });
}

async function renderShareCardPng(opts: {
  name: string;
  score: number;
  avatarUrl?: string | null;
}): Promise<Blob> {
  const scale = 3;
  const width = 1080 * scale;
  const height = 1290 * scale;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.scale(scale, scale);

  const w = 1080;
  const h = 1290;
  const clamped = Math.min(100, Math.max(0, Math.round(opts.score)));
  const possessive = toPossessive(opts.name);

  roundRect(ctx, 0, 0, w, h, 48);
  ctx.fillStyle = CARD_BG;
  ctx.fill();
  ctx.save();
  roundRect(ctx, 0, 0, w, h, 48);
  ctx.clip();

  const [logo, avatar, star, collage] = await Promise.all([
    loadImage("/n-logo.svg"),
    opts.avatarUrl ? loadImage(opts.avatarUrl, false) : Promise.resolve(null),
    loadImage("/candyyy.svg"),
    loadImage("/improve.svg"),
  ]);

  if (logo) {
    const logoW = 180;
    const logoH = (logo.height / Math.max(logo.width, 1)) * logoW;
    ctx.drawImage(logo, (w - logoW) / 2, 56, logoW, logoH);
  }

  const avatarY = 168;
  const avatarR = 36;
  ctx.beginPath();
  ctx.arc(w / 2, avatarY, avatarR + 4, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  if (avatar) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(w / 2, avatarY, avatarR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      avatar,
      w / 2 - avatarR,
      avatarY - avatarR,
      avatarR * 2,
      avatarR * 2
    );
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(w / 2, avatarY, avatarR, 0, Math.PI * 2);
    ctx.fillStyle = "#E5E7EB";
    ctx.fill();
    ctx.fillStyle = SCORE_BLUE;
    ctx.font = "600 28px Geist, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((opts.name.trim()[0] || "S").toUpperCase(), w / 2, avatarY);
    ctx.textBaseline = "alphabetic";
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#5B5D66";
  ctx.font = "500 28px Geist, system-ui, sans-serif";
  ctx.fillText(possessive, w / 2, 242);

  ctx.fillStyle = SCORE_BLUE;
  ctx.font = "700 64px Geist, system-ui, sans-serif";
  ctx.fillText("Starix Score", w / 2, 318);

  const ringX = w / 2;
  const ringY = 478;
  const outerR = 118;
  const innerR = 96;
  const trackWidth = 12;

  ctx.beginPath();
  ctx.arc(ringX, ringY, outerR, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(17, 75, 246, 0.18)";
  ctx.lineWidth = trackWidth;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(
    ringX,
    ringY,
    outerR,
    -Math.PI / 2,
    -Math.PI / 2 + (clamped / 100) * Math.PI * 2
  );
  ctx.strokeStyle = RING_BLUE;
  ctx.lineCap = "round";
  ctx.lineWidth = trackWidth;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(ringX, ringY, innerR, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  if (star) {
    ctx.drawImage(star, ringX - 16, ringY - 52, 32, 32);
  }

  ctx.fillStyle = SCORE_BLUE;
  ctx.font = "700 78px Geist, system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(String(clamped), ringX, ringY + 22);
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#6B7280";
  ctx.font = "400 26px Geist, system-ui, sans-serif";
  wrapCenteredText(
    ctx,
    "A real-time measure of your creator performance, visibility, and brand readiness",
    w / 2,
    640,
    520,
    36
  );

  if (collage) {
    ctx.drawImage(collage, 0, h - 360, w, 360);
  }

  ctx.restore();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((result) => resolve(result), "image/png");
  });

  if (blob) return blob;
  throw new Error("Could not export image");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/png";
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

function ShareScoreRing({ score }: { score: number }) {
  const size = 118;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, Math.round(score)));
  const progress = (clamped / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(17,75,246,0.16)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={RING_BLUE}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center rounded-full bg-white"
        style={{ inset: 10 }}
      >
        <img
          src="/candyyy.svg"
          alt=""
          className="mb-0.5 h-4 w-4 object-contain"
        />
        <span className="text-[34px] font-semibold leading-none tracking-tight text-[#0033FF]">
          {clamped}
        </span>
      </div>
    </div>
  );
}

export default function ShareScoreModal({
  isOpen,
  onClose,
  score,
  displayName,
  avatarUrl,
}: ShareScoreModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"download" | SharePlatform | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [embeddedPhoto, setEmbeddedPhoto] = useState<string | null>(null);

  const { data: me } = useGetMe();
  const storeUser = useAuthStore((state) => state.profile || state.user);
  const username = firstNonEmpty(
    typeof me?.username === "string" ? me.username : null,
    typeof (storeUser as { username?: string } | null)?.username === "string"
      ? (storeUser as { username?: string }).username
      : null
  );

  const { data: creatorProfile } = useGetCreatorProfile(username ?? "", {
    enabled: isOpen && !!username,
  });

  const photo = useMemo(
    () =>
      firstNonEmpty(
        avatarUrl,
        photoFromUser(me),
        photoFromUser(creatorProfile),
        photoFromUser(storeUser)
      ),
    [avatarUrl, creatorProfile, me, storeUser]
  );

  const name =
    firstNonEmpty(
      displayName,
      nameFromUser(me),
      nameFromUser(creatorProfile),
      nameFromUser(storeUser)
    ) || "Creator";
  const possessive = toPossessive(name);
  const clampedScore = Math.min(100, Math.max(0, Math.round(score)));
  const shareText = `${possessive} Starix Score is ${clampedScore}. A real-time measure of creator performance, visibility, and brand readiness on Starix.`;
  const visiblePhoto = embeddedPhoto || (!avatarFailed ? photo : null);

  useEffect(() => {
    setAvatarFailed(false);
    setEmbeddedPhoto(null);
    if (!photo) return;

    let cancelled = false;
    urlToDataUrl(photo).then((dataUrl) => {
      if (!cancelled && dataUrl) setEmbeddedPhoto(dataUrl);
    });

    return () => {
      cancelled = true;
    };
  }, [photo]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const captureCard = useCallback(async () => {
    const node = cardRef.current;

    if (node) {
      const pixelRatio = Math.min(
        6,
        EXPORT_EDGE / Math.max(node.offsetWidth, 1)
      );
      const exportOptions = {
        cacheBust: true,
        pixelRatio,
        skipAutoScale: true,
        backgroundColor: CARD_BG,
        canvasWidth: Math.round(node.offsetWidth * pixelRatio),
        canvasHeight: Math.round(node.offsetHeight * pixelRatio),
        fetchRequestInit: {
          mode: "cors" as RequestMode,
          credentials: "omit" as RequestCredentials,
        },
      };

      try {
        const pngBlob = await toBlob(node, {
          ...exportOptions,
          type: "image/png",
        });
        if (pngBlob) return pngBlob;

        const pngUrl = await toPng(node, exportOptions);
        return dataUrlToBlob(pngUrl);
      } catch {
        try {
          const jpegUrl = await toJpeg(node, {
            ...exportOptions,
            quality: 0.95,
          });
          return dataUrlToBlob(jpegUrl);
        } catch {
          // Fall through to canvas renderer.
        }
      }
    }

    const exportPhoto = embeddedPhoto || photo;
    return renderShareCardPng({
      name,
      score: clampedScore,
      avatarUrl: exportPhoto,
    });
  }, [clampedScore, embeddedPhoto, name, photo]);

  const handleDownload = async () => {
    setBusy("download");
    try {
      const blob = await captureCard();
      const extension = blob.type.includes("jpeg") ? "jpg" : "png";
      downloadBlob(blob, `starix-score.${extension}`);
      toast.success("High-quality score card saved");
    } catch {
      toast.error("Couldn’t download your score card");
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async (platform: SharePlatform) => {
    setBusy(platform);
    try {
      const blob = await captureCard();
      const extension = blob.type.includes("jpeg") ? "jpg" : "png";
      const file = new File([blob], `starix-score.${extension}`, {
        type: blob.type || "image/png",
      });
      const payload = {
        files: [file],
        title: "My Starix Score",
        text: shareText,
      };

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share(payload);
        return;
      }

      downloadBlob(blob, file.name);
      try {
        await navigator.clipboard.writeText(shareText);
      } catch {
        // Clipboard can fail in some browsers; still open the platform.
      }
      toast.success(
        `Image saved and caption copied. Open ${PLATFORM_LABEL[platform]} to share.`
      );
      window.open(PLATFORM_URL[platform], "_blank", "noopener,noreferrer");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error(`Couldn’t share to ${PLATFORM_LABEL[platform]}`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/55 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-score-title"
            className="relative w-full max-w-[400px]"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            

            <div className="overflow-hidden rounded-[28px] bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[22px] bg-[#D4F0FF]"
              >
                <div className="flex flex-col items-center px-5 pt-5 text-center">
                  <img
                    src="/n-logo.svg"
                    alt="starix"
                    className="h-4 w-auto object-contain"
                  />

                  <div className="relative mt-2.5 h-9 w-9 overflow-hidden rounded-full bg-[#E5E7EB] ring-2 ring-white">
                    {visiblePhoto ? (
                      // Native img avoids Next image-host restrictions that were hiding the photo.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={visiblePhoto}
                        alt={name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                        onError={() => {
                          if (embeddedPhoto && photo && visiblePhoto === embeddedPhoto) {
                            setEmbeddedPhoto(null);
                            return;
                          }
                          setAvatarFailed(true);
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[12px] font-semibold text-[#0033FF]">
                        {(name[0] || "S").toUpperCase()}
                      </div>
                    )}
                  </div>

                  <p className="mt-1.5 text-[13px] font-medium text-[#5B5D66]">
                    {possessive}
                  </p>
                  <h2 className="mt-0.5 text-[28px] font-semibold leading-none tracking-tight text-[#0033FF]">
                    Starix Score
                  </h2>

                  <div className="mt-3.5">
                    <ShareScoreRing score={clampedScore} />
                  </div>

                  <p className="relative z-[1] mt-3 max-w-[200px] text-[11px] leading-[16px] text-[#6B7280]">
                    A real-time measure of your creator performance, visibility,
                    and brand readiness
                  </p>
                </div>

                <div className="relative mt-1 h-[128px] w-full overflow-hidden">
                  <img
                    src="/improve.svg"
                    alt=""
                    className="absolute inset-x-0 bottom-0 h-[210px] w-full object-cover object-bottom"
                  />
                </div>
              </div>

              <div className="px-2 pb-1 pt-4 text-center">
                <h3
                  id="share-score-title"
                  className="text-[17px] font-semibold tracking-tight text-[#1E1F24]"
                >
                  Share your Starix Score
                </h3>
                <p className="mx-auto mt-1 max-w-[260px] text-[12px] leading-[17px] text-[#62636C]">
                  Share your starix score on your socials for bragging rights as a
                  verified creator.
                </p>

                <div className="mt-4 flex items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleShare("instagram")}
                    disabled={busy !== null}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E0E1E6] transition hover:bg-[#F8F9FB] disabled:opacity-50"
                    aria-label="Share on Instagram"
                  >
                    <img src="/ig.svg" alt="" className="h-[18px] w-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare("tiktok")}
                    disabled={busy !== null}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E0E1E6] transition hover:bg-[#F8F9FB] disabled:opacity-50"
                    aria-label="Share on TikTok"
                  >
                    <img src="/tt.svg" alt="" className="h-[18px] w-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare("youtube")}
                    disabled={busy !== null}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E0E1E6] transition hover:bg-[#F8F9FB] disabled:opacity-50"
                    aria-label="Share on YouTube"
                  >
                    <img src="/yt.svg" alt="" className="h-3 w-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={busy !== null}
                    className="h-10 rounded-full bg-[#0033FF] px-5 text-[13px] font-semibold text-white transition hover:bg-[#0029CC] disabled:opacity-50"
                  >
                    {busy === "download" ? "Saving..." : "Download"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
