"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import EditProfileModal from "@/components/(creator)/dashboard/EditProfileModal";
import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";
import ViewPortfolioModal from "@/components/(creator)/dashboard/ViewPortfolioModal";
import { FiSearch } from "react-icons/fi";
import { useGetMe } from "@/hooks/useAuth";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useParams, useRouter } from "next/navigation";
import {
  useGetCreatorProfile,
  useGetCreatorMetrics,
  useGetCreatorCircles,
  useUpdateCreatorProfile,
  type CreatorCircle,
  type CreatorMetricsResponse,
  type UpdateCreatorProfilePayload,
} from "@/hooks/useProfile";
import { useGetMyCircle, type MyCircle } from "@/hooks/useCircles";

type Circle = CreatorCircle | MyCircle;

const CIRCLES_PER_PAGE = 4;



const UserProfilePage = () => {
  const router = useRouter();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);


  const routeUsernameOrId =
  typeof params?.username === "string"
    ? params.username
    : typeof params?.id === "string"
      ? params.id
      : null;

const { data: authUser, isLoading: isAuthLoading } = useGetMe();

const isOwnProfile =
  !routeUsernameOrId ||
  routeUsernameOrId === authUser?.username ||
  routeUsernameOrId === authUser?.id;

const viewedUsername = isOwnProfile
  ? authUser?.username ?? ""
  : routeUsernameOrId ?? "";

  
const { data: viewedProfile, isLoading: isViewedProfileLoading } =
  useGetCreatorProfile(viewedUsername, {
    enabled: !!viewedUsername && !isOwnProfile,
  });

const { data: metricsData, isLoading: isMetricsLoading } = useGetCreatorMetrics(
  viewedUsername,
  { enabled: !!viewedUsername }
);

const metrics = metricsData as CreatorMetricsResponse | null | undefined;

const profile = isOwnProfile ? authUser : viewedProfile;
  

  const circlesUsername = profile?.username ?? viewedUsername;

  const { data: myCirclesData, isLoading: isMyCirclesLoading } = useGetMyCircle(
  page,
  CIRCLES_PER_PAGE,
  { enabled: isOwnProfile }
);


const globalRankGrowth =
  typeof metrics?.global_rank === "number" &&
  typeof metrics?.previous_rank === "number" &&
  metrics.previous_rank !== metrics.global_rank
    ? `${Math.abs(metrics.previous_rank - metrics.global_rank)} ${
        metrics.previous_rank > metrics.global_rank ? "↑" : "↓"
      }`
    : undefined;

const { data: creatorCirclesData, isLoading: isCreatorCirclesLoading } =
  useGetCreatorCircles(
    circlesUsername,
    page,
    CIRCLES_PER_PAGE,
    { enabled: !isOwnProfile && !!circlesUsername }
  );

const circlesData = isOwnProfile ? myCirclesData : creatorCirclesData;

const isCirclesLoading = isOwnProfile
  ? isMyCirclesLoading
  : isCreatorCirclesLoading;

  const updateProfileMutation = useUpdateCreatorProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [scoreVisibility, setScoreVisibility] = useState("anyone");

  // After OAuth redirect to /profile#platform=...&status=connected — reopen the modal
  useEffect(() => {
    if (typeof window === "undefined" || !isOwnProfile) return;

    const hashParams = new URLSearchParams(
      window.location.hash.replace(/^#/, "")
    );
    if (hashParams.get("platform") || hashParams.get("status")) {
      setIsSocialsOpen(true);
    }
  }, [isOwnProfile]);

  const creatorCircles: Circle[] = circlesData?.items ?? [];

  const visibleCircles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return creatorCircles;

    return creatorCircles.filter((circle) =>
      circle.name.toLowerCase().includes(query)
    );
  }, [creatorCircles, searchQuery]);

  console.log({
  circlesUsername,
  circlesData,
  creatorCircles,
  visibleCircles,
});

  const totalPages = Math.max(1, circlesData?.total_pages ?? 1);

  const displayName =
  `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim() ||
  profile?.username ||
  "Creator";

const username = profile?.username ? `@${profile.username}` : "";

const isProfileLoading =
  isOwnProfile ? isAuthLoading && !authUser : isViewedProfileLoading && !viewedProfile;

  const profileImage = profile?.profile_picture_url?.trim() || null;
  const bannerImage = profile?.banner_url?.trim() || null;

  const starixScore = Math.round(profile?.starix_score ?? 0);
  const publicProfileScore = Math.round(profile?.starix_score ?? 100);

  const publicGlobalRankLabel =
    typeof metrics?.global_rank === "number" ? `#${metrics.global_rank}` : "#1";

  const ownGlobalRankLabel =
    typeof metrics?.global_rank === "number"
      ? new Intl.NumberFormat("en-US").format(metrics.global_rank)
      : "---";

  const profileScoreLabel = isOwnProfile ? starixScore : publicProfileScore;

  const completedChallenges = profile?.total_completed_challenges ?? 0;

  const engagements = profile?.lifetime_engagements ?? 0;

  const totalEngagementLabel =
    engagements >= 1000000
      ? `${(engagements / 1000000).toFixed(1)}M`
      : engagements >= 1000
        ? `${Math.round(engagements / 1000)}K`
        : String(engagements);

  const niches = profile?.niches?.length ? profile.niches : [];

  const handleSaveProfile = (payload: UpdateCreatorProfilePayload) => {
    updateProfileMutation.mutate(payload, {
      onSuccess: (updatedUser) => {
        if (updatedUser?.starix_score_visibility) {
          setScoreVisibility(
            updatedUser.starix_score_visibility === "private" ? "only-me" : "anyone"
          );
        }

        setIsModalOpen(false);
      },
    });
  };

  const formatCompactNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return String(value);
};

const formatMinorCurrency = (currency: string, minor: number) => {
  const major = minor / 100;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(major);
};


const primaryEarning =
  metrics?.lifetime_earnings?.find((earning) => earning.currency === "NGN") ??
  metrics?.lifetime_earnings?.[0];

const totalEarningsLabel = primaryEarning
  ? formatMinorCurrency(primaryEarning.currency, primaryEarning.total_minor)
  : "₦0.00";

const totalEngagementValue = metrics?.lifetime_engagement ?? engagements;
const totalEngagementCardLabel = formatCompactNumber(totalEngagementValue);

const globalRankLabel = isOwnProfile ? ownGlobalRankLabel : publicGlobalRankLabel;

const canShowScore = typeof profile?.starix_score === "number";

  const handleViewHistory = () => {
    router.push("/creator-circles/earnings");
  };

  const getRoleBadgeStyles = (roleType: string) => {
    switch (roleType) {
      case "admin":
        return "bg-[#FFF0FD] text-[#D847FF]";
      case "manager":
        return "bg-[#F3E6FF] text-[#A62DFF]";
      default:
        return "bg-[#F5FBFF] text-[#3379A5]";
    }
  };

  const handleOpenAnalytics = () => {
    router.push("/analytics");
  };

  const PLATFORM_ICON_MAP: Record<string, { icon: string; label: string }> = {
  youtube: { icon: "/yt.svg", label: "YouTube" },
  instagram: { icon: "/ig.svg", label: "Instagram" },
  tiktok: { icon: "/tt.svg", label: "TikTok" },
};

const ConnectedPlatformIcons = ({
  platforms,
}: {
  platforms: { platform: string; username: string }[];
}) => {
  if (!platforms.length) return null;



  return (
    <div className="flex items-center gap-2">
      {platforms.map((item) => {
        const platform = PLATFORM_ICON_MAP[item.platform.toLowerCase()];
        if (!platform) return null;

        return (
          <img
            key={`${item.platform}-${item.username}`}
            src={platform.icon}
            alt={platform.label}
            className="h-6 w-6"
            title={item.username}
          />
        );
      })}
    </div>
  );
};

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-[#1E1F24] antialiased">
      <div className="relative h-[230px] w-full overflow-hidden bg-[#EAF2FF]">
      {bannerImage ? (
          <Image
            src={bannerImage}
            alt="User profile cover"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#EAF2FF]" aria-label="No banner image" />
        )}
      </div>

      <main className="relative px-8 pb-8">
        <section className="relative pt-[86px]">
          <div className="absolute -top-[72px] left-0">
            <div className="flex h-[138px] w-[138px] items-center justify-center rounded-full bg-[conic-gradient(#114BF6_0deg,#114BF6_180deg,#FF7A1A_180deg,#FF7A1A_360deg)] p-[5px] shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-100">
              {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={displayName}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-[#F5F6F8]" aria-label="No profile picture" />
                )}
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-4 flex items-center gap-3">
            {isOwnProfile && (
              <button
                onClick={() => setIsSocialsOpen(true)}
                className="h-[48px] rounded-full border border-[#8B8D98] bg-white px-6 text-[14px] font-semibold text-[#1E1F24] transition hover:bg-gray-50"
              >
                Connect Socials
              </button>
            )}

            <button
              onClick={() => setIsPortfolioOpen(true)}
              className="h-[48px] rounded-full border border-[#8B8D98] bg-white px-6 text-[14px] font-semibold text-[#1E1F24] transition hover:bg-gray-50"
            >
              View Portfolio
            </button>

            {isOwnProfile && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-[48px] rounded-full border border-[#8B8D98] bg-white px-6 text-[14px] font-semibold text-[#1E1F24] transition hover:bg-gray-50"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="flex items-start justify-between gap-8">
            <div className="max-w-[920px]">
              <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.04em] text-[#111217]">
                {isProfileLoading ? "Loading..." : displayName}
              </h1>
              <p className="mt-1 text-[13px] font-medium text-[#747682]">
                {username}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#62636C]">
                <span>
                  <span className="font-semibold text-[#1E1F24]">
                    {completedChallenges}
                  </span>{" "}
                  Challenges completed
                </span>
                <span className="text-[#D9D9D9]">•</span>
                <span>
                  <span className="font-semibold text-[#1E1F24]">
                    {totalEngagementLabel}
                  </span>{" "}
                  Engagements
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ConnectedPlatformIcons
                  platforms={profile?.connected_platforms ?? []}
                />

                {niches.map((niche) => (
                  <span
                    key={niche}
                    className="rounded-full bg-[#F5FBFF] px-2.5 py-1 text-[12px] font-medium capitalize text-[#3379A5]"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>

            {canShowScore && (
              <div className="mt-[58px] mr-7 hidden shrink-0 md:block">
                <ScoreRing score={profileScoreLabel} />
              </div>
            )}
          </div>

          <p className="mt-8 max-w-[920px] text-[16px] leading-[1.65] text-[#62636C]">
            {profile?.bio ||
              "Meet a world-class photographer who calls the vibrant city of Toronto, Canada, home. As the visionary founder of Reckless Studios, they have dedicated their career to capturing stunning visuals that tell compelling stories. This photographer transforms ordinary moments into extraordinary works of art."}
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        <StatCard
          tone="green"
          icon="/coin.svg"
          label="Total Earnings"
          value={totalEarningsLabel}
          action={isOwnProfile ? "View History" : undefined}
          onClick={isOwnProfile ? handleOpenAnalytics : undefined}
        />

        <StatCard
          tone="pink"
          icon="/diamonddd.svg"
          label="Total Engagement"
          value={isOwnProfile ? totalEngagementCardLabel : totalEngagementLabel}
          action={isOwnProfile ? "View Trend" : undefined}
          showMiniTrend={isOwnProfile}
          onClick={isOwnProfile ? handleOpenAnalytics : undefined}
        />

        <StatCard
          tone="blue"
          icon="/coin.svg"
          label="Global Rank"
          value={globalRankLabel}
          action={isOwnProfile ? "View Leaderboard" : undefined}
          growth={isOwnProfile ? globalRankGrowth : undefined}
          decorative={!isOwnProfile}
          onClick={isOwnProfile ? handleOpenAnalytics : undefined}
        />
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#1E1F24]">
              Circles
            </h2>

            <div className="relative w-[270px]">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B8D98]" />
              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search your Circles"
                className="h-[44px] w-full rounded-full border border-[#E5E7EB] bg-white pl-12 pr-5 text-[13px] font-medium text-[#1E1F24] outline-none placeholder:text-[#747682]"
              />
            </div>
          </div>

          <div className="divide-y divide-[#EFF0F3] border-y border-[#EFF0F3]">
            {isCirclesLoading ? (
              <div className="py-10 text-center text-sm text-[#747682]">
                Loading circles...
              </div>
            ) : visibleCircles.length > 0 ? (
              visibleCircles.map((circle) => (
                <CircleRow
                  key={circle.circle_id}
                  circle={circle}
                  roleClassName={getRoleBadgeStyles(circle.role)}
                />
              ))
            ) : (
              <div className="py-10 text-center text-sm text-[#747682]">
                No circles found.
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              disabled={!circlesData?.prev_url}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="flex h-[44px] items-center gap-2 rounded-full border border-[#8B8D98] bg-white px-6 text-[14px] font-medium text-[#62636C] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous <GoArrowLeft size={18} />
            </button>

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#1E1F24]">
              {circlesData?.page ?? page}
            </span>
            <span>...</span>
            <span>{totalPages}</span>

            <button
              disabled={!circlesData?.next_url}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="flex h-[44px] items-center gap-2 rounded-full border border-[#8B8D98] bg-white px-6 text-[14px] font-medium text-[#62636C] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <GoArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {isOwnProfile && (
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentProfile={{
            profileImage: profileImage ?? "",
            bannerImage: bannerImage ?? "",
            scoreVisibility,
          }}
          onSave={handleSaveProfile}
        />
      )}

      {isOwnProfile && (
        <ConnectSocialsModal
          isOpen={isSocialsOpen}
          onClose={() => setIsSocialsOpen(false)}
        />
      )}

      <ViewPortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        username={viewedUsername}
        creatorName={displayName}
      />
    </div>
  );
};

const ScoreRing = ({ score }: { score: number }) => {
  const clampedScore = Math.min(100, Math.max(0, score));

  return (
    <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#EAF2FF] p-[5px]">
      <div className="flex h-full w-full items-center justify-center rounded-full border-[5px] border-[#114BF6] bg-white">
        <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full border-[4px] border-[#99D5FF]">
          <img src="/candyyy.svg" alt="star"/>
          <span className="text-[26px] font-semibold leading-none tracking-[-0.05em] text-[#0033FF]">
            {clampedScore}
          </span>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  tone,
  icon,
  label,
  value,
  suffix,
  action,
  growth,
  decorative = false,
  showMiniTrend = false,
  onClick,
}: {
  tone: "green" | "pink" | "blue";
  icon: string;
  label: string;
  value: string;
  suffix?: string;
  action?: string;
  growth?: string;
  decorative?: boolean;
  showMiniTrend?: boolean;
  
  onClick?: () => void;
}) => {
  const toneClass = {
    green: "bg-[#E8FFE9]",
    pink: "bg-[#FFF0FD]",
    blue: "bg-[#EAF6FF]",
  }[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-[140px] overflow-hidden rounded-[14px] ${toneClass} p-5 text-left transition hover:brightness-[0.99]`}
    >
      <div className="mb-3 flex items-center gap-2">
        <img src={icon} alt="" className="h-5 w-5 object-contain" />
        <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-[#1E1F24]">
          {label}
        </h3>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-[30px] font-semibold leading-none tracking-[-0.05em] text-[#1E1F24]">
          {value}
          {suffix && <span className="font-medium text-[#747682]">{suffix}</span>}
        </span>
        {growth && (
          <span className="text-[12px] font-semibold text-[#14A66B]">
            {growth}
          </span>
        )}
      </div>

      {action && (
      <div className="mt-3 flex items-center gap-2 text-[13px] font-medium text-[#62636C]">
        {action} <GoArrowRight size={18} />
      </div>
    )}

      {showMiniTrend && (
        <div className="absolute bottom-5 right-5 h-[48px] w-[105px]">
          <img src="/Stroke.svg" alt="" className="h-full w-full object-contain" />
        </div>
      )}

      {decorative && (
        <div className="absolute right-8 top-6 h-[70px] w-[70px] rounded-full bg-[#FFDF5A]" />
      )}
    </button>
  );
};

const CircleRow = ({
  circle,
  roleClassName,
}: {
  circle: Circle;
  roleClassName: string;
}) => {
  const members = circle.members ?? [];
  const visibleMembers = members.slice(0, 3);
  const extraMembers = Math.max(0, members.length - visibleMembers.length);

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px] bg-[#F5F6F8]">
        {circle.profile_picture_url?.trim() ? (
          <Image
            src={circle.profile_picture_url}
            alt={circle.name}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="h-full w-full bg-[#F5F6F8]"
            aria-label="No circle profile picture"
          />
        )}
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-[17px] font-semibold tracking-[-0.02em] text-[#62636C]">
            {circle.name}
          </h4>
          <p className="mt-0.5 text-[13px] font-medium text-[#747682]">
            {circle.active_challenge_count} Active Challenges
            <span className="mx-2 text-[#D9D9D9]">•</span>
            Ranked {circle.global_rank ? `${circle.global_rank} Globally` : "250k Globally"}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden items-center -space-x-2 sm:flex">
          {visibleMembers.map((member, index) => (
            <div
              key={member.user_id || index}
              className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-gray-100"
            >
              {member.profile_picture_url?.trim() ? (
                <img
                  src={member.profile_picture_url}
                  alt="Circle member"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="h-full w-full bg-[#F5F6F8]"
                  aria-label="No member profile picture"
                />
              )}
            </div>
          ))}

          {extraMembers > 0 && (
            <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#C9E9FF] text-[10px] font-semibold text-[#050E81]">
              +{extraMembers}
            </div>
          )}
        </div>

        <span
          className={`rounded-full p-2 text-[12px] font-medium capitalize ${roleClassName}`}
        >
          {circle.role}
        </span>
      </div>
    </div>
  );
};



export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-sm text-gray-400">Loading profile...</div>
      }
    >
      <UserProfilePage />
    </Suspense>
  );
}