"use client";

import { useRouter } from "next/navigation";
import { FiPlay } from "react-icons/fi";

export type CollageMedia = {
  url?: string;
  type?: "image" | "video";
  duration?: string;
};

export type BrandChallengeCardData = {
  id: string;
  title: string;
  visibility?: "Public" | "Private";
  closesIn?: string | null;
  verified?: boolean;
  postedAgo: string;
  prizePool: string;
  submissions: number;
  /** Collage layout size (1–4). Images beyond 4 are ignored by the page mapper. */
  mediaCount?: number;
  media?: CollageMedia[];
};

type LayoutVariant = 1 | 2 | 3 | 4;

function MediaTile({
  media,
  className,
}: {
  media?: CollageMedia;
  className?: string;
}) {
  const isVideo = media?.type === "video";

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-[#E8EAED] ${className ?? ""}`}
    >
      {media?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#E8EAED] via-[#F2F3F5] to-[#DEE1E6]" />
      )}
      {isVideo && (
        <div className="absolute bottom-2 left-2 z-[1] flex items-center gap-1 rounded-md bg-black/50 px-1.5 py-0.5 text-white">
          <FiPlay className="h-3 w-3 fill-white" />
          {media?.duration && (
            <span className="text-[10px] leading-none font-medium">
              {media.duration}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function MediaCollage({
  count = 3,
  media = [],
}: {
  count?: LayoutVariant;
  media?: CollageMedia[];
}) {
  if (count === 1) {
    return (
      <div className="h-[168px] overflow-hidden rounded-xl">
        <MediaTile media={media[0]} className="h-full w-full" />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid h-[168px] grid-cols-2 gap-1.5 overflow-hidden rounded-xl">
        <MediaTile media={media[0]} className="h-full w-full" />
        <MediaTile media={media[1]} className="h-full w-full" />
      </div>
    );
  }

  if (count === 4) {
    return (
      <div className="grid h-[168px] grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden rounded-xl">
        {[0, 1, 2, 3].map((i) => (
          <MediaTile key={i} media={media[i]} className="h-full w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-[168px] grid-cols-2 gap-1.5 overflow-hidden rounded-xl">
      <MediaTile media={media[0]} className="h-full w-full" />
      <div className="grid h-full grid-rows-2 gap-1.5">
        <MediaTile media={media[1]} className="h-full w-full" />
        <MediaTile media={media[2]} className="h-full w-full" />
      </div>
    </div>
  );
}

export default function BrandChallengeCard({
  challenge,
}: {
  challenge: BrandChallengeCardData;
}) {
  const router = useRouter();
  const rawCount = challenge.mediaCount ?? challenge.media?.length ?? 2;
  const safeCount: LayoutVariant =
    rawCount === 1 || rawCount === 2 || rawCount === 4
      ? rawCount
      : 3;

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-[#E0E1E6] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] font-medium leading-tight sm:text-[10px]">
          <span className="text-[#62636C]">
            {challenge.visibility ?? "Public"} Challenge
          </span>
          {challenge.closesIn ? (
            <>
              <span className="text-[12px] text-[#747682]">|</span>
              <span className="font-medium text-[#D12B1F]">
                {challenge.closesIn}
              </span>
            </>
          ) : null}
          {challenge.verified ? (
            <>
              <span className="text-[12px] text-[#747682]">|</span>
              <span className="rounded-full bg-[#ECFEF4] px-2 py-0.5 font-medium text-[#1E874B]">
                Verified
              </span>
            </>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => router.push(`/brand/analytics`)}
          className="shrink-0 rounded-full border border-[#D0D5DD] px-3 py-1 text-[12px] font-medium text-[#344054] transition-colors hover:bg-gray-50"
        >
          View
        </button>
      </div>

      <h3 className="line-clamp-2 text-[14px] leading-snug font-semibold text-[#1E1F24] sm:text-[17px]">
        {challenge.title}
      </h3>

      <p className="flex flex-wrap items-center gap-x-1.5 text-[12px] font-medium text-[#62636C] sm:text-[13px]">
        <span>{challenge.postedAgo}</span>
        <span className="text-[16px] text-[#CDCED7]">•</span>
        <span>{challenge.prizePool} prize pool</span>
        <span className="text-[16px] text-[#CDCED7]">•</span>
        <span>{challenge.submissions} Submissions</span>
      </p>

      <MediaCollage count={safeCount} media={challenge.media ?? []} />
    </article>
  );
}
