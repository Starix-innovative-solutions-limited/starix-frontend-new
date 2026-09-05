"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useGetMe } from "@/hooks/useAuth";
import { useGetBrandChallenges } from "@/hooks/useChallenges";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import EditBrandProfileModal from "@/components/(brand)/profile/EditBrandProfileModal";
import { useModal } from "@/hooks/useModal";

const activeStatuses = new Set(["active", "published", "publishing", "judging"]);

function formatMetric(value?: number | null) {
  if (value === undefined || value === null) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}

function toTagList(value: unknown): string[] {
  if (!value) return [];

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value.flatMap(toTagList);
  }

  if (typeof value === "object") {
    const item = value as { name?: unknown; label?: unknown };
    return toTagList(item.name ?? item.label);
  }

  return [];
}

export default function Page() {
  const { open } = useModal();
  const { profile: storedProfile } = useAuthStore();
  const { data: me } = useGetMe();
  const { data: challengeData } = useGetBrandChallenges({
    limit: 100,
    offset: 0,
  });

  const profile = (me ?? storedProfile) as
    | (typeof storedProfile & {
        logo_url?: string | null;
        global_rank?: number | null;
        brand_rank?: number | null;
        rank?: number | null;
        description?: string | null;
        website_or_social_link?: string | null;
      })
    | null;
  const logoUrl =
    profile?.logo_url?.trim() ||
    profile?.profile_picture_url?.trim() ||
    undefined;
  const bannerUrl = profile?.banner_url?.trim() || undefined;
  const challenges = challengeData?.challenges ?? [];
  const activeChallenges = challenges.filter((challenge) =>
    activeStatuses.has((challenge.status ?? "").toLowerCase())
  );
  const totalChallenges = challengeData?.total ?? challenges.length;
  const totalEngagement = profile?.lifetime_engagements;
  const rank = profile?.global_rank ?? profile?.brand_rank ?? profile?.rank;
  const tags = Array.from(
    new Set(
      [
        ...toTagList(profile?.niches),
        ...toTagList(profile?.industry),
      ].filter(Boolean)
    )
  ).slice(0, 4);
  const bio =
    profile?.bio ||
    profile?.description ||
    "Tell creators about your brand, your story, and the campaigns you run.";

  return (
    <div className="min-h-full bg-white">
      <main className="min-w-0">
        <div className="relative h-[190px] overflow-hidden bg-gradient-to-br from-[#EAF1FF] via-[#DDEBFF] to-[#F4E9FF] sm:h-[235px]">
          {bannerUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bannerUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="relative px-5 pb-10 sm:px-10">
          <div className="-mt-[74px] flex items-start justify-between gap-5">
            <BrandAvatar
              name={profile?.brand_name}
              src={logoUrl}
              className="h-[120px] w-[120px] border-4 border-white shadow-[0_8px_24px_rgba(16,24,40,0.12)] sm:h-[148px] sm:w-[148px]"
              letterClassName="text-4xl sm:text-5xl"
            />
            <button
              type="button"
              onClick={() =>
                open(
                  <EditBrandProfileModal
                    brandName={profile?.brand_name || "Brand"}
                    website={profile?.website_or_social_link}
                    bio={profile?.bio || profile?.description}
                    profilePictureUrl={logoUrl}
                    bannerUrl={bannerUrl}
                  />,
                  { bare: true }
                )
              }
              className="mt-[94px] shrink-0 rounded-full border border-[#8B8D98] bg-white px-5 py-2.5 text-[14px] font-medium text-[#1E1F24] transition hover:bg-[#F9FAFB] sm:mt-[96px]"
            >
              Edit Profile
            </button>
          </div>

          <h1 className="mt-5 text-[28px] font-semibold tracking-[-0.025em] text-[#101828] sm:text-[32px]">
            {profile?.brand_name || "Brand Profile"}
          </h1>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-[15px] text-[#747682]">
            <span>
              {activeChallenges.length} Active Challenge
              {activeChallenges.length === 1 ? "" : "s"}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#D0D5DD]" />
            <span>{rank ? `Ranked ${rank} Globally` : "Global rank pending"}</span>
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[#F5FBFF] px-2 py-1 text-[12px] font-medium lowercase text-[#4082A5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="mt-6 max-w-[920px] text-[16px] leading-[1.65] text-[#747682]">
            {bio}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[18px] bg-[#E8FBE9] p-5">
              <p className="text-[17px] font-semibold text-[#1E1F24]">
                Total Challenges
              </p>
              <p className="mt-2 text-[36px] font-semibold leading-none tracking-[-0.03em] text-[#1E1F24]">
                {formatMetric(totalChallenges)}
              </p>
              <Link
                href="/brand/challenges"
                className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#62636C] hover:text-[#0033FF]"
              >
                View All <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="rounded-[18px] bg-[#FDECFB] p-5">
              <p className="text-[17px] font-semibold text-[#1E1F24]">
                Total Engagement
              </p>
              <p className="mt-2 text-[36px] font-semibold leading-none tracking-[-0.03em] text-[#1E1F24]">
                {formatMetric(totalEngagement)}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#62636C]">
                View Analytics <span aria-hidden>→</span>
              </span>
            </div>

            <div className="rounded-[18px] bg-[#E8FBE9] p-5">
              <p className="text-[17px] font-semibold text-[#1E1F24]">
                Active Challenges
              </p>
              <p className="mt-2 text-[36px] font-semibold leading-none tracking-[-0.03em] text-[#1E1F24]">
                {activeChallenges.length}
              </p>
              <Link
                href="/brand/challenges"
                className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#62636C] hover:text-[#0033FF]"
              >
                Track Submissions <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
