"use client";

import { useState } from "react";

type BrandAvatarProps = {
  name?: string | null;
  src?: string | null;
  className?: string;
  /** Tailwind text size for the letter when no image (e.g. "text-lg") */
  letterClassName?: string;
};

function brandInitial(name?: string | null) {
  const trimmed = name?.trim();
  if (!trimmed) return "B";
  return trimmed.charAt(0).toUpperCase();
}

export default function BrandAvatar({
  name,
  src,
  className = "h-10 w-10",
  letterClassName = "text-sm",
}: BrandAvatarProps) {
  const url = src?.trim() || "";
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(url) && !failed;
  const letter = brandInitial(name);

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name || "Brand"}
        onError={() => setFailed(true)}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name || "Brand"}
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] font-semibold text-[#0033FF] ${letterClassName} ${className}`}
    >
      {letter}
    </div>
  );
}
