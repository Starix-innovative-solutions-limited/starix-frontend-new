"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import BrandSubmissionsGallery from "@/components/(brand)/submissions/BrandSubmissionsGallery";
import { useGetBrandChallenge } from "@/hooks/useChallenges";
import { useDashboardSearch } from "@/components/dashboard/DashboardSearchProvider";

function SubmissionsContent() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challenge_id");
  const { data: challenge } = useGetBrandChallenge(challengeId || undefined, {
    enabled: Boolean(challengeId),
  });
  const { query } = useDashboardSearch();

  const title = useMemo(() => {
    if (!challengeId) return "Submissions";
    return challenge?.title
      ? `Submissions · ${challenge.title}`
      : "Submissions";
  }, [challengeId, challenge?.title]);

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.025em] text-[#101828]">
            {title}
          </h1>
          <p className="mt-1 text-[14px] text-[#667085]">
            Review creator posts submitted to your chalenges.
          </p>
        </div>
        {challengeId ? (
          <Link
            href={`/brand/challenges/${challengeId}`}
            className="text-[13px] font-semibold text-[#0033FF]"
          >
            Back to challenge
          </Link>
        ) : null}
      </div>

      <BrandSubmissionsGallery challengeId={challengeId} query={query} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <SubmissionsContent />
    </Suspense>
  );
}
