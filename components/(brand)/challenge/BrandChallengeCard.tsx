"use client";

import { useRouter } from "next/navigation";
import ChallengeMediaGrid from "@/components/(creator)/challenge/ChallengeMediaGrid";

export type BrandChallengeCardData = {
  id: string;
  title: string;
  visibility?: "Public" | "Private";
  closesIn?: string | null;
  verified?: boolean;
  postedAgo: string;
  prizePool: string;
  submissions: number;
  images?: string[];
};

export default function BrandChallengeCard({
  challenge,
}: {
  challenge: BrandChallengeCardData;
}) {
  const router = useRouter();

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
          onClick={() => router.push(`/brand/challenges/${challenge.id}`)}
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

      <ChallengeMediaGrid
        images={challenge.images ?? []}
        className="h-[157px] w-full"
        emptyLabel="No sample media yet"
      />
    </article>
  );
}
