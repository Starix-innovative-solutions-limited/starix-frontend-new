/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import { FiSearch, FiChevronDown, FiInfo } from "react-icons/fi";
import { GoCheckCircleFill, GoPlus } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WithdrawModal from "./WithdrawModal";
import JoinRequestModal from "./JoinRequestModal";
import JoinCircleModal from "./JoinCircleModal";
import ShareScoreModal from "./ShareScoreModal";
import { useGetMe } from "@/hooks/useAuth";
import { useGetMyStarixScore, useGetGlobalLeaderboard } from "@/hooks/useProfile";
import { useGetWithdrawalAccount, useGetEarningsSummary } from "@/hooks/useWallet";
import { useGetOpenCircles, useRequestToJoin, useGetLeaderboard , useGetEarningDetail, useGetRecommendedChallenges} from "@/hooks/useCircles";
import {
  useGetRecommendedChallenges as useGetCreatorRecommendedChallenges,
  useGetTrendingChallenges as useGetCreatorTrendingChallenges,
  useGetChallengeById,
  useGetChallengeLeaderboard,
  type ChallengeItem,
} from "@/hooks/useChallenges";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import { formatCompactNaira } from "@/lib/formatMoney";
import { FaCircle } from "react-icons/fa6";

function formatViewCount(count?: number) {
  const value = count ?? 0;
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M views`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k views`;
  }
  return `${value} view${value === 1 ? "" : "s"}`;
}

function challengePrizeLabel(challenge: ChallengeItem) {
  return formatCompactNaira(
    challenge.prize_pool_display ||
      (typeof challenge.prize_pool === "number"
        ? challenge.prize_pool / 100
        : 0),
    challenge.currency_symbol || "₦"
  );
}



const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function extractEarningRouteParams(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  const isCircleEarningsPage =
    segments[0] === "creator-circles" &&
    !!segments[1] &&
    segments[2] === "circle-profile" &&
    segments[3] === "earnings";

  const circleId = isCircleEarningsPage ? segments[1] : null;
  const challengeId = isCircleEarningsPage ? segments[4] ?? null : null;

  return {
    isCircleEarningsPage,
    circleId: circleId && UUID_RE.test(circleId) ? circleId : null,
    challengeId: challengeId && UUID_RE.test(challengeId) ? challengeId : null,
  };
}

type CircleLeaderboardEntry = {
  circle_id: string;
  rank: number;
  name: string;
  profile_picture_url?: string | null;
  member_count?: number;
  rank_direction?: "up" | "down" | "stable" | string;
  circle_score: number;
};
type CircleLeaderboardData = {
  entries?: CircleLeaderboardEntry[];
  my_circle?: CircleLeaderboardEntry;
};

const RightSideBar = ({ className, collapsed, setCollapsed }: any) => {
  const pathname = usePathname();
  const { isCircleEarningsPage, circleId, challengeId } = React.useMemo(
    () => extractEarningRouteParams(pathname),
    [pathname]
  );
  const { data: selectedDetail } = useGetEarningDetail(
    circleId ?? "",
    challengeId ?? "",
    {
      enabled: !!circleId && !!challengeId,
    }
  );
  const { data: userProfile } = useGetMe();

  const currentUsername = (userProfile as any)?.username ?? null;

  

  const { data: openCircles = [] } = useGetOpenCircles();
  const joinRequestMutation = useRequestToJoin();

  const [isJoinRequestModalOpen, setIsJoinRequestModalOpen] = useState(false);
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<any>(null);

  const { data: scoreData } = useGetMyStarixScore();
  const { data: leaderboardData } = useGetGlobalLeaderboard(currentUsername);
  const { data: activeAccount, isLoading: isLoadingAccount } = useGetWithdrawalAccount();

  const [earningsPeriod, setEarningsPeriod] = useState<"this_month" | "all_time">("this_month");
  const { data: earningsSummary, isLoading: isLoadingEarnings } = useGetEarningsSummary({
    period: earningsPeriod,
    currency: "NGN",
    tz: "Africa/Lagos",
  });


  const isChallengeView      = pathname.includes("/dashboard/challenge/");
  const isChallengesListPage = pathname.startsWith("/challenges");
  const isPortfolioPage      = pathname.startsWith("/portfolio");

  const challengeIdFromPath = React.useMemo(() => {
    if (!isChallengeView) return null;
    const match = pathname.match(/\/dashboard\/challenge\/([^/]+)/);
    const id = match?.[1] ?? null;
    return id && UUID_RE.test(id) ? id : null;
  }, [isChallengeView, pathname]);

  const { data: challengeDetail } = useGetChallengeById(
    challengeIdFromPath ?? ""
  );
  const { data: challengeLeaderboard } = useGetChallengeLeaderboard(
    challengeIdFromPath ?? undefined,
    { enabled: Boolean(challengeIdFromPath) }
  );
 

  const isCreatorProfileView =
  (pathname.includes("/circle-profile") ||
    pathname.includes("/creator-profile") ||
    pathname.includes("/creator-circles/creator-profile")) &&
  !isCircleEarningsPage;

  // Top-level circles listing — no UUID in path
  const isCreatorCirclesPage =
    pathname === "/creator-circles" ||
    pathname.includes("/creator-circles/explore");

 
 

  const { data: circleLeaderboard } = useGetLeaderboard(circleId ?? "", 0, {
  enabled: !!circleId,
}) as { data?: CircleLeaderboardData };

const { data: recommendedData } = useGetRecommendedChallenges(circleId ?? "", {
  enabled: !!circleId && isCreatorProfileView,
});

  const {
    data: sidebarRecommendedData,
    isLoading: isLoadingSidebarRecommended,
  } = useGetCreatorRecommendedChallenges(3, 0);
  const {
    data: sidebarTrendingData,
    isLoading: isLoadingSidebarTrending,
  } = useGetCreatorTrendingChallenges(3, 0);

  const sidebarRecommended = React.useMemo(
    () =>
      ((sidebarRecommendedData?.challenges ?? []) as ChallengeItem[]).slice(
        0,
        3
      ),
    [sidebarRecommendedData]
  );
  const sidebarTrending = React.useMemo(
    () =>
      ((sidebarTrendingData?.challenges ?? []) as ChallengeItem[]).slice(0, 3),
    [sidebarTrendingData]
  );

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isShareScoreOpen, setIsShareScoreOpen] = useState(false);

  const shareDisplayName =
    [userProfile?.first_name, userProfile?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    userProfile?.username ||
    "Creator";

  const handleJoinClick = (circle: any) => {
    setSelectedCircle(circle);
    if (circle.is_public) {
      joinRequestMutation.mutate(circle.circle_id);
    } else {
      setIsPrivateModalOpen(true);
    }
  };

  const activeStarixScore = scoreData?.starix_score ?? 0;

  const renderedLeaderboard = React.useMemo(() => {
    const currentUser = {
      id: 0,
      name: "You",
      score: activeStarixScore,
      trend: "neutral",
      avatar: (userProfile as any)?.profile_picture_url?.trim() || null,
      isUser: true,
    };

    if (!leaderboardData?.entries) {
      return [
        { id: 1, name: "—", score: 0, trend: "neutral", avatar: null,   isUser: false },
        { id: 2, name: "—", score: 0, trend: "neutral", avatar: null,   isUser: false },
        { id: 3, name: "—", score: 0, trend: "neutral", avatar: null,   isUser: false },
        currentUser,
      ];
    }

    const list = leaderboardData.entries.map((entry: any) => ({
      id:     entry.rank,
      name:   entry.full_name || entry.username || "Creator",
      score:  entry.starix_score,
      trend:
      entry.rank_direction === "same" || entry.rank_direction === "stable"
        ? "neutral"
        : entry.rank_direction,
      avatar: entry.profile_picture_url?.trim() || null,
      isUser: entry.user_id === leaderboardData.viewer_entry?.user_id,
    }));

    const userInList = list.some((item: any) => item.isUser);
    if (!userInList) {
      const viewer = leaderboardData.viewer_entry;
      list.push({
        id:     viewer?.rank ?? 0,
        name:   currentUser.name,
        score:  viewer?.starix_score ?? activeStarixScore,
        trend:  viewer
          ? viewer.rank_direction === "stable" ? "neutral" : viewer.rank_direction
          : "neutral",
        avatar: currentUser.avatar,
        isUser: true,
      });
    }

    return list;
  }, [leaderboardData, activeStarixScore, userProfile, currentUsername]);

  const challengeLeaderboardRows = React.useMemo(() => {
    const entries = challengeLeaderboard?.entries ?? [];
    const viewerId = (userProfile as any)?.id as string | undefined;

    const mapEntry = (entry: {
      rank: number;
      user_id?: string;
      username: string;
      profile_picture_url?: string | null;
      challenge_score?: number | null;
      final_score?: number | null;
      rank_direction?: string;
    }) => {
      const isUser =
        entry.username === currentUsername ||
        (viewerId ? entry.user_id === viewerId : false);
      return {
        id: entry.rank,
        name: entry.username || "Creator",
        score: entry.final_score ?? entry.challenge_score ?? 0,
        avatar: entry.profile_picture_url?.trim() || null,
        isUser,
        trend:
          entry.rank_direction === "up"
            ? "up"
            : entry.rank_direction === "down"
              ? "down"
              : "neutral",
      };
    };

    const mapped = entries.map(mapEntry);
    const topRows = mapped.filter((row) => !row.isUser).slice(0, 3);
    const viewerEntry = mapped.find((row) => row.isUser);

    const youRow = {
      id:
        viewerEntry?.id ||
        challengeLeaderboard?.requester_rank ||
        0,
      name: "You",
      score: viewerEntry?.score ?? 0,
      avatar:
        viewerEntry?.avatar ||
        (userProfile as any)?.profile_picture_url?.trim() ||
        null,
      isUser: true,
      trend: viewerEntry?.trend ?? "neutral",
    };

    return { topRows, youRow };
  }, [challengeLeaderboard, currentUsername, userProfile]);

  const challengeWinnersCount = React.useMemo(() => {
    const detail = challengeDetail as Record<string, unknown> | null | undefined;
    if (!detail) return null;

    const fromNum = Number(detail.num_winners);
    if (Number.isFinite(fromNum) && fromNum > 0) return Math.round(fromNum);

    const display = detail.prize_amounts_display;
    if (Array.isArray(display) && display.length > 0) return display.length;

    const amounts = detail.prize_amounts;
    if (Array.isArray(amounts) && amounts.length > 0) return amounts.length;

    return null;
  }, [challengeDetail]);

  const plainBalanceValue = earningsSummary?.total
    ? parseFloat(earningsSummary.total.replace(/[^0-9.]/g, ""))
    : 0;


    
  return (
    <aside
      className={`
        fixed md:static top-0 right-0 z-50
        h-screen bg-white border-l border-gray-100 flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[88px]" : "w-[416px]"}
        ${className}
      `}
    >
      {/* TOP SECTION */}
      <div className={`flex items-center pt-6 pb-6 px-6 gap-4 ${collapsed ? "flex-col justify-start" : "justify-between"}`}>
        <button
          onClick={setCollapsed}
          className={`shrink-0 transition-all duration-300 active:scale-95 ${collapsed ? "opacity-0 pointer-events-none translate-x-[-10px]" : "opacity-100"}`}
        >
          <Image src="/close.svg" alt="Toggle Sidebar" width={40} height={40} className="object-contain" />
        </button>
        {!collapsed ? (
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
            <input type="text" placeholder="Search Starix" className="w-full bg-[#F8FAFC] border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder:text-[#9CA3AF]" />
          </div>
        ) : (
          <button onClick={setCollapsed} className="p-3 rounded-full bg-[#F8FAFC] text-[#9CA3AF] hover:text-[#0047FF] transition-all duration-300 -translate-y-[150%]">
            <FiSearch size={20} />
          </button>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className={`flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar ${collapsed ? "hidden" : "block"}`}>

        {isCircleEarningsPage ? (
        /* ── Earning Insight (Transaction Detail) ── */
        <div className="space-y-8 ">
          <div className="p-2">
            <h3 className="text-[20px] font-semibold text-[#1E1F24] mb-4">Transaction Detail</h3>
            
            {/* Header Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative shrink-0">
                {selectedDetail?.brand_logo_url?.trim() ? (
                  <Image
                    src={selectedDetail.brand_logo_url}
                    width={56}
                    height={56}
                    alt="Brand"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-[#F5F6F8]" aria-label="No brand logo" />
                )}
                <div className="absolute bottom-0 right-0 bg-[#0CC963] rounded-full p-1 border-2 border-white leading-none flex items-center justify-center">
                  <GoPlus className="text-white text-[10px] rotate-45" />
                </div>
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#62636C] leading-snug">
                  {selectedDetail?.title || "Loading..."}
                </h4>
                <p className="text-[12px] text-[#747682] font-medium mt-1">
                  {selectedDetail?.paid_out_members || 0} members payout 
                  <span className="mx-0.5">•</span> 
                  {selectedDetail?.credited_at ? new Date(selectedDetail.credited_at).toLocaleDateString() : "Just now"}
                </p>
              </div>
            </div>
            
            {/* Amount and Status */}
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-semibold text-[#62636C]">
                + ₦{((selectedDetail?.gross_prize ?? 0) / 100).toLocaleString()}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                selectedDetail?.credit_status === 'Successful' 
                  ? 'bg-[#03FC6C1A] text-[#27AE60]' 
                  : 'bg-[#FFF8DB] text-[#665201]'
              }`}>
                {selectedDetail?.credit_status || "Pending"}
              </span>
            </div>
          </div>
          
          <hr className="border-[#EFF0F3]" />
          
          {/* Payout Breakdown */}
          <div className="p-2">
            <h4 className="text-[16px] font-semibold text-[#1E1F24] mb-8">Payout Autosplitting on this Challenge</h4>
            <div className="space-y-6">
              {selectedDetail?.payout_splits?.map((member: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                    {member.profile_picture_url?.trim() ? (
                      <Image
                        src={member.profile_picture_url}
                        fill
                        alt={member.full_name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#F5F6F8]" aria-label="No profile picture" />
                    )}
                    </div>
                    <span className="text-[14px] font-medium text-[#62636C]">{member.full_name}</span>
                  </div>
                  <span className="text-[14px] font-semibold text-[#62636C]">{member.split_percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        ) : isCreatorProfileView ? (
          /* ── Circle Profile sidebar ─────────────────────────────────────────
             Route: /creator-circles/[uuid]/circle-profile
             circleId is extracted from the UUID in the URL above.
             circleLeaderboard comes from GET /circles/leaderboard?circle_id=[uuid]
          ── */
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Challenges For Your Circle</h4>
                <Link href="/challenges" className="flex items-center">
                  <HiArrowRight className="text-[#1E1F24] cursor-pointer hover:text-blue-600 transition-colors" size={20} />
                </Link>
              </div>
              <div className="px-2 pb-4 space-y-1">
                {recommendedData?.items?.length > 0 ? (
                  recommendedData.items.map((item: any) => (
                    <div key={item.challenge_id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all">
                      <div className="flex items-center gap-3">
                        <Image src={item.brand_logo_url || "/default.svg"} width={40} height={40} alt={item.brand_name} className="rounded-full object-cover" />
                        <div>
                          <h5 className="text-[12px] font-semibold text-[#62636C] leading-tight truncate w-32">{item.title}</h5>
                          <div className="flex items-center gap-1 mt-1 text-[12px] text-[#747682] font-medium">
                            <span>{item.brand_name}</span>
                            <GoCheckCircleFill className="text-green-500 text-[10px]" />
                            <span className="text-[#D9D9D9]">•</span>
                            <span>₦{(item.prize_pool / 100).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-2 py-2 bg-white border border-[#E5E7EB] rounded-full text-[12px] font-medium text-[#1E1F24] hover:bg-gray-50 transition-all">
                        Submit
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-2 text-xs text-gray-400">No recommendations found.</p>
                )}
              </div>
            </div>

            {/* Circle Leaderboard
                `entries` = global ranking list
                `my_circle` = rank context for the current circle (highlighted) */}
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Circle Leaderboard</h4>
                <HiArrowRight className="text-[#1E1F24]" size={20} />
              </div>
              <div className="pb-4">
                {circleLeaderboard?.entries?.length ? (
                  circleLeaderboard.entries.map((entry: any) => {
                    const isCurrentCircle = entry.circle_id === circleId;
                    return (
                      <div
                        key={entry.circle_id}
                        className={`flex items-center justify-between py-4 px-5 border-t border-[#EFF0F3] first:border-t-0 ${isCurrentCircle ? "bg-[#F0F7FF]" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[14px] font-semibold text-[#62636C] w-6">#{entry.rank}</span>
                          <div className="relative w-10 h-10 shrink-0">
                            <Image
                              src={entry.profile_picture_url || "/circle.svg"}
                              fill
                              alt={entry.name}
                              className="object-cover rounded-full"
                            />
                            {entry.member_count && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#C9E9FF] border border-white rounded-full flex items-center justify-center">
                                <span className="text-[#050E81] text-[10px] font-semibold leading-none">{entry.member_count}</span>
                              </div>
                            )}
                          </div>
                          <span className={`text-[14px] font-semibold truncate w-32 ${isCurrentCircle ? "text-[#0033FF]" : "text-[#62636C]"}`}>
                            {entry.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {entry.rank_direction === "up" ? (
                            <span className="text-green-500 text-[16px]">↑</span>
                          ) : entry.rank_direction === "down" ? (
                            <span className="text-red-500 text-[16px]">↓</span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-gray-300" />
                          )}
                          <span className="text-[14px] font-semibold text-[#1E1F24]">{entry.circle_score}</span>
                          <Image src="/contact star.webp" width={16} height={16} alt="score" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="px-5 py-6 text-[13px] text-gray-400 text-center">No leaderboard data yet.</p>
                )}

                {/* Always show the current circle's rank context at the bottom
                    if it didn't appear in the top entries (my_circle from API) */}
                {circleLeaderboard?.my_circle &&
                  !circleLeaderboard.entries?.some((e: any) => e.circle_id === circleId) && (
                  <div className="flex items-center justify-between py-4 px-5 border-t border-[#EFF0F3] bg-[#F0F7FF]">
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-semibold text-[#62636C] w-6">#{circleLeaderboard.my_circle.rank}</span>
                      <div className="relative w-10 h-10 shrink-0">
                        <Image
                          src={circleLeaderboard.my_circle.profile_picture_url || "/circle.svg"}
                          fill
                          alt={circleLeaderboard.my_circle.name}
                          className="object-cover rounded-full"
                        />
                      </div>
                      <span className="text-[14px] font-semibold text-[#0033FF] truncate w-32">
                        {circleLeaderboard.my_circle.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {circleLeaderboard.my_circle.rank_direction === "up" ? (
                        <span className="text-green-500 text-[16px]">↑</span>
                      ) : circleLeaderboard.my_circle.rank_direction === "down" ? (
                        <span className="text-red-500 text-[16px]">↓</span>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                      )}
                      <span className="text-[14px] font-semibold text-[#1E1F24]">{circleLeaderboard.my_circle.circle_score}</span>
                      <Image src="/contact star.webp" width={16} height={16} alt="score" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        ) : isCreatorCirclesPage ? (
          /* ── Creator Circles listing page ── */
          <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#EFF0F3]">
              <h4 className="font-semibold text-[#1E1F24] text-[16px]">Open Circles</h4>
              <Link href="/creator-circles/explore" className="flex items-center gap-1.5 text-[14px] font-semibold text-[#1E1F24] hover:text-blue-600 transition-all">
                View All <HiArrowRight size={16} />
              </Link>
            </div>
            <div className="p-2 space-y-1">
              {openCircles && openCircles.length > 0 ? (
                openCircles.map((circle: any) => (
                  <div key={circle.circle_id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 shrink-0">
                        <Image src={circle.profile_picture_url || "/circle.svg"} fill alt={circle.name} className="object-cover rounded-full" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#C9E9FF] border-2 border-white rounded-full flex items-center justify-center">
                          <span className="text-[#050E81] text-[12px] font-semibold leading-none">{circle.members?.length || 0}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-[14px] font-semibold text-[#62636C] leading-tight">{circle.name}</h5>
                        <p className="text-[12px] text-[#747682] font-medium mt-0.5">
                          {circle.members?.length || 0} Members <span className="text-[#D9D9D9] mx-1">•</span> Ranked #{circle.global_rank} Globally
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleJoinClick(circle)} className="px-2 py-2 border border-[#8B8D98] rounded-full text-[12px] font-medium text-[#1E1F24] hover:bg-white hover:border-blue-600 hover:text-blue-600 transition-all">
                      Join
                    </button>
                  </div>
                ))
              ) : (
                <p className="p-4 text-xs text-gray-400 text-center">No open circles found.</p>
              )}
            </div>
          </div>

        ) : isPortfolioPage ? (
          /* ── Portfolio page ── */
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[16px] font-semibold text-[#1E1F24]">Total Earnings</h4>
                <div className="relative group">
                  <button className="flex items-center gap-1 text-[14px] font-medium text-[#1E1F24] bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-all">
                    {earningsPeriod === "all_time" ? "All Time" : "This Month"} <FiChevronDown size={16} />
                  </button>
                  <div className="hidden group-hover:block absolute right-0 top-full bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 w-32">
                    <button onClick={() => setEarningsPeriod("this_month")} className={`block w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 ${earningsPeriod === "this_month" ? "text-[#0047FF]" : "text-[#62636C]"}`}>This Month</button>
                    <button onClick={() => setEarningsPeriod("all_time")} className={`block w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 ${earningsPeriod === "all_time" ? "text-[#0047FF]" : "text-[#62636C]"}`}>All Time</button>
                  </div>
                </div>
              </div>
              {isLoadingEarnings ? (
                <div className="py-4 flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#8C9FFF] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-gray-400 font-medium">Fetching summary...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline mb-2">
                    <span className="text-[28px] font-semibold text-[#1E1F24] tracking-tight">{earningsSummary?.total || "₦0.00"}</span>
                  </div>
                  {earningsSummary?.comparison ? (
                    <div className={`flex items-center gap-1 text-[13px] font-semibold ${earningsSummary.comparison.positive ? "text-[#22C55E]" : "text-red-500"}`}>
                      <span>{earningsSummary.comparison.positive ? "↑" : "↓"} {earningsSummary.comparison.percentage}%</span>
                      <span className="text-[#747682] font-medium">{earningsSummary.comparison.positive ? "higher" : "lower"} than {earningsSummary.comparison.label}</span>
                    </div>
                  ) : earningsPeriod === "all_time" ? (
                    <div className="flex items-center gap-1.5 text-[#747682] text-[12px] font-medium">
                      <FiInfo size={14} className="text-[#9CA3AF]" />
                      <span>Recommended challenges increase chances to Earn</span>
                    </div>
                  ) : null}
                </>
              )}
            </div>
            <div className="bg-[#F9F9FB] border border-[#EFF0F3] rounded-[24px] p-6 shadow-xs">
              <h4 className="text-[16px] font-semibold text-[#1E1F24] mb-5">Withdrawal Account</h4>
              {isLoadingAccount ? (
                <div className="flex items-center gap-2 py-1">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : activeAccount && activeAccount.is_active ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center shrink-0 w-10 h-10 bg-white rounded-full border border-gray-50 p-1">
                      <Image src={activeAccount.bank_logo_url || "/dashlogo.svg"} width={32} height={32} alt="Bank Logo" className="object-contain" onError={(e) => { (e.target as any).src = "/dashlogo.svg"; }} />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[14px] font-semibold text-[#1E1F24] truncate">
                        {activeAccount.account_number} <span className="text-[#9CA3AF] font-medium">• {activeAccount.bank_name}</span>
                      </h5>
                      <p className="text-[12px] text-[#62636C] mt-0.5 truncate">{activeAccount.account_name}</p>
                    </div>
                  </div>
                  <button onClick={() => setIsWithdrawModalOpen(true)} className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-full text-[11px] font-semibold text-[#1E1F24] hover:bg-gray-50 active:scale-95 transition-all shrink-0">Change</button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-[#62636C]">No payout destination saved.</p>
                  <button onClick={() => setIsWithdrawModalOpen(true)} className="px-3 py-2 bg-[#111827] text-white rounded-full text-[11px] font-semibold hover:bg-black active:scale-95 transition-all">Link Bank</button>
                </div>
              )}
            </div>
          </div>

        ) : isChallengesListPage ? (
          /* ── Challenges listing page ── */
          <div className="space-y-6">
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFF0F3]">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Recommended For You</h4>
                <Link href="/challenges/recommended"><HiArrowRight className="text-[#1E1F24] cursor-pointer hover:text-blue-600 transition-colors" size={20} /></Link>
              </div>
              <div className="px-2 pb-2 space-y-1">
                {isLoadingSidebarRecommended ? (
                  <p className="px-3 py-6 text-center text-[12px] text-[#747682]">Loading...</p>
                ) : sidebarRecommended.length === 0 ? (
                  <p className="px-3 py-6 text-center text-[12px] text-[#747682]">
                    No recommended challenges yet.
                  </p>
                ) : (
                  sidebarRecommended.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 p-3 hover:bg-gray-50 rounded-2xl transition-all"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BrandAvatar
                          name={item.brand_name}
                          src={item.brand_profile_picture_url}
                          className="h-10 w-10 shrink-0"
                          letterClassName="text-sm"
                        />
                        <div className="min-w-0">
                          <h5 className="text-[13px] font-semibold text-[#62636C] truncate max-w-[140px]">
                            {item.title}
                          </h5>
                          <div className="flex items-center gap-1 mt-0.5 text-[12px] text-[#747682]">
                            <span className="truncate max-w-[72px]">
                              {item.brand_name || "Brand"}
                            </span>
                            {(item.is_funded || item.is_published) && (
                              <GoCheckCircleFill className="text-green-500 text-[10px] shrink-0" />
                            )}
                            <span className="text-[#D9D9D9]">•</span>
                            <span className="shrink-0">
                              {challengePrizeLabel(item)} prize pool
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/dashboard/challenge/${item.id}`}
                        className="px-4 py-2 border border-[#E5E7EB] rounded-full text-[12px] font-semibold text-[#1E1F24] hover:bg-white transition-all shrink-0"
                      >
                        Submit
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-4 border-b mb-4 border-[#EFF0F3]">
                <h4 className="font-semibold text-[#1E1F24] text-[16px]">Trending Challenges</h4>
                <Link href="/challenges/trending"><HiArrowRight className="text-[#1E1F24] hover:text-blue-600 transition-colors" size={20} /></Link>
              </div>
              <div className="px-5 pb-6 space-y-6">
                {isLoadingSidebarTrending ? (
                  <p className="py-4 text-center text-[12px] text-[#747682]">Loading...</p>
                ) : sidebarTrending.length === 0 ? (
                  <p className="py-4 text-center text-[12px] text-[#747682]">
                    No trending challenges yet.
                  </p>
                ) : (
                  sidebarTrending.map((c) => (
                    <Link
                      key={c.id}
                      href={`/dashboard/challenge/${c.id}`}
                      className="block space-y-1 hover:opacity-80 transition-opacity"
                    >
                      <h5 className="text-[13px] font-semibold text-[#62636C] leading-snug line-clamp-2">
                        {c.title}
                      </h5>
                      <div className="flex items-center">
                        <div className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden mr-1.5 shrink-0 bg-gray-100">
                          <Image
                            src={c.brand_profile_picture_url || "/dash-logo.svg"}
                            fill
                            alt={c.brand_name || "Brand"}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-[#747682] font-medium min-w-0">
                          <span className="shrink-0">{formatViewCount(c.viewer_count)}</span>
                          <span className="text-[#D9D9D9]">•</span>
                          <span className="truncate">{c.brand_name || "Brand"}</span>
                          {(c.is_funded || c.is_published) && (
                            <GoCheckCircleFill className="text-green-500 text-[11px] shrink-0" />
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

        ) : isChallengeView ? (
          /* ── Individual challenge view ── */
          <div className="space-y-5">
            <div className="bg-[#F5F6F8] rounded-[24px] p-5 relative overflow-hidden min-h-[168px]">
              <p className="text-[#1E1F24] text-[14px] font-medium">Prize Pool</p>
              <h3 className="text-[#0047FF] text-[28px] font-semibold mt-2 leading-none tracking-tight">
                {(challengeDetail as any)?.prize_pool_display ||
                  (typeof (challengeDetail as any)?.prize_pool === "number"
                    ? `₦${Math.round(
                        (challengeDetail as any).prize_pool / 100
                      ).toLocaleString("en-NG")}`
                    : "₦0.00")}
              </h3>
              <p className="text-[#62636C] font-medium leading-snug text-[13px] mt-4 max-w-[58%] relative z-10">
                Prize pool will be shared equally between the{" "}
                <span className="text-[#FD6C1D] font-semibold">
                  top {challengeWinnersCount ?? "…"} submission
                  {challengeWinnersCount === 1 ? "" : "s"}
                </span>{" "}
                for this challenge.
              </p>
              <div className="pointer-events-none absolute -bottom-6 -right-4 h-[140px] w-[140px]">
                <Image
                  src="/gem.svg"
                  alt="Prize"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <h4 className="font-semibold text-[#1E1F24] text-[15px]">
                  Challenge Leader-board
                </h4>
                <HiArrowRight className="text-[#1E1F24]" size={18} />
              </div>

              <div className="px-5 pb-3">
                <div className="grid grid-cols-[92px_minmax(0,1fr)_auto] gap-2 text-[11px] font-medium text-[#9CA3AF] pb-2">
                  <span>Rank</span>
                  <span>Username</span>
                  <span className="text-right">Challenge Score</span>
                </div>

                {challengeLeaderboardRows.topRows.length === 0 &&
                !challengeLeaderboard?.entries?.length ? (
                  <div className="divide-y divide-[#F3F4F6]">
                    <p className="py-5 text-center text-[12px] text-[#747682]">
                      No leaderboard entries yet.
                    </p>
                    <div className="grid grid-cols-[92px_minmax(0,1fr)_auto] gap-2 items-center py-3.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="relative h-7 w-7 rounded-full p-[2px] shrink-0"
                          style={{
                            background:
                              "linear-gradient(90deg, #FD6C1D 50%, #0033FF 50%)",
                          }}
                        >
                          <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                            {challengeLeaderboardRows.youRow.avatar ? (
                              <Image
                                src={challengeLeaderboardRows.youRow.avatar}
                                fill
                                alt="You"
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-[#F5F6F8]" />
                            )}
                          </div>
                        </div>
                        <span className="text-[13px] font-semibold text-[#62636C]">
                          {challengeLeaderboardRows.youRow.id
                            ? `#${challengeLeaderboardRows.youRow.id}`
                            : "—"}
                        </span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#1E1F24] truncate pr-2">
                        You
                      </span>
                      <div className="flex items-center justify-end gap-1.5 shrink-0">
                        <span className="text-gray-300 text-[10px]">
                          <FaCircle />
                        </span>
                        <span className="text-[13px] font-semibold text-[#1E1F24] tabular-nums">
                          {Math.round(
                            Number(challengeLeaderboardRows.youRow.score) || 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-[#F3F4F6]">
                    {challengeLeaderboardRows.topRows.map((user, idx) => (
                      <div
                        key={`${user.id}-${user.name}-${idx}`}
                        className="grid grid-cols-[92px_minmax(0,1fr)_auto] gap-2 items-center py-3.5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="relative h-7 w-7 rounded-full p-[2px] shrink-0 bg-[#73A4FF]">
                            <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                              {user.avatar ? (
                                <Image
                                  src={user.avatar}
                                  fill
                                  alt={user.name}
                                  className="object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-[#F5F6F8]" />
                              )}
                            </div>
                          </div>
                          <span className="text-[13px] font-semibold text-[#62636C]">
                            {user.id ? `#${user.id}` : "—"}
                          </span>
                        </div>
                        <span className="text-[13px] text-[#62636C] truncate pr-2">
                          {user.name}
                        </span>
                        <div className="flex items-center justify-end gap-1.5 shrink-0">
                          {user.trend === "up" ? (
                            <span className="text-green-500 text-[13px] font-semibold">
                              ↑
                            </span>
                          ) : user.trend === "down" ? (
                            <span className="text-red-500 text-[13px] font-semibold">
                              ↓
                            </span>
                          ) : (
                            <span className="text-gray-300 text-[10px]">
                              <FaCircle />
                            </span>
                          )}
                          <span className="text-[13px] font-semibold text-[#1E1F24] tabular-nums">
                            {Math.round(Number(user.score) || 0)}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="grid grid-cols-[92px_minmax(0,1fr)_auto] gap-2 items-center py-3.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="relative h-7 w-7 rounded-full p-[2px] shrink-0"
                          style={{
                            background:
                              "linear-gradient(90deg, #FD6C1D 50%, #0033FF 50%)",
                          }}
                        >
                          <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                            {challengeLeaderboardRows.youRow.avatar ? (
                              <Image
                                src={challengeLeaderboardRows.youRow.avatar}
                                fill
                                alt="You"
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-[#F5F6F8]" />
                            )}
                          </div>
                        </div>
                        <span className="text-[13px] font-semibold text-[#62636C]">
                          {challengeLeaderboardRows.youRow.id
                            ? `#${challengeLeaderboardRows.youRow.id}`
                            : "—"}
                        </span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#1E1F24] truncate pr-2">
                        You
                      </span>
                      <div className="flex items-center justify-end gap-1.5 shrink-0">
                        {challengeLeaderboardRows.youRow.trend === "up" ? (
                          <span className="text-green-500 text-[13px] font-semibold">
                            ↑
                          </span>
                        ) : challengeLeaderboardRows.youRow.trend === "down" ? (
                          <span className="text-red-500 text-[13px] font-semibold">
                            ↓
                          </span>
                        ) : (
                          <span className="text-gray-300 text-[10px]">
                            <FaCircle />
                          </span>
                        )}
                        <span className="text-[13px] font-semibold text-[#1E1F24] tabular-nums">
                          {Math.round(
                            Number(challengeLeaderboardRows.youRow.score) || 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        ) : (
          /* ── Default: Dashboard global view ── */
          <div className="space-y-6">
            <div className="bg-[#F5FBFF] border border-[#EBF2FF] rounded-[24px] p-6 relative">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[#1E1F24] text-[20px] font-semibold tracking-tight">Starix Score</h4>
                  <p className="text-[#62636C] text-[10px] font-normal mt-1 leading-normal max-w-[240px]">
                    A real-time measure of your creator performance, visibility, and brand readiness
                  </p>
                </div>
                <div className="relative w-12 h-12 shrink-0">
                  <Image src="/dashlogo.svg" fill alt="Star Icon" className="object-contain" />
                </div>
              </div>
              <div className="w-full h-[12px] bg-[#D4EBFF] rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-[#4082FF] rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min(Math.max(activeStarixScore, 0), 100)}%` }} />
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="text-[40px] font-medium text-[#1E1F24] leading-none tracking-tight">
                  {activeStarixScore}<span className="text-[20px] text-[#747682] font-medium ml-0.5">/100</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsShareScoreOpen(true)}
                  className="border border-[#8B8D98] text-[#1E1F24] px-5 py-2.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Share Score
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#EFF0F3] rounded-[24px] overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-6 py-5">
                <h4 className="font-semibold text-[#1E1F24] text-[16px] ">Global Leaderboard</h4>
                <HiArrowRight className="text-[#1E1F24]" size={20} />
              </div>
              <div className="pb-2 border-t border-[#EFF0F3]">
                {renderedLeaderboard.map((user: any, idx: number) => (
                  <div key={idx} className={`flex items-center justify-between py-4 px-6 border-t border-[#EFF0F3] first:border-t-0 ${user.isUser ? "bg-[#F5FBFF]" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-semibold text-[#62636C] w-8">{user.id === 0 ? "—" : `#${user.id}`}</span>
                      <div 
                        className={`
                          relative w-8 h-8 rounded-full overflow-hidden p-[2px]
                          ${user.isUser 
                            ? "bg-gradient-to-r from-[#FD6C1D] to-[#73A4FF] border-[2px] border-transparent" 
                            : "border-[#73A4FF] border-[2px]"}
                        `}
                        
                      >
                        {/* The inner container masks the background, leaving a 4px visible border */}
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          {user.avatar ? (
                            <Image
                              src={user.avatar}
                              fill
                              alt={user.name}
                              sizes="32px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-[#F5F6F8]" aria-label="No profile picture" />
                          )}
                        </div>
                        
                      </div>
                      <span className={`text-[14px] font-semibold ${user.isUser ? "text-[#1E1F24]" : "text-[#62636C]"}`}>{user.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {user.trend === "up" ? <span className="text-green-500 text-[14px] font-semibold">↑</span>
                       : user.trend === "down" ? <span className="text-red-500 text-[14px] font-semibold">↓</span>
                       : <span className="text-gray-300 text-[14px] font-semibold"><FaCircle /></span>}
                      <span className="text-[14px] font-semibold text-[#1E1F24]">{user.score}</span>
                      <Image src="/contact star.webp" width={16} height={16} alt="points" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL INJECTIONS */}
      <ShareScoreModal
        isOpen={isShareScoreOpen}
        onClose={() => setIsShareScoreOpen(false)}
        score={activeStarixScore}
        displayName={shareDisplayName}
        avatarUrl={
          userProfile?.profile_picture_url?.trim() ||
          (userProfile as { profile_picture?: string | null } | undefined)
            ?.profile_picture?.trim() ||
          null
        }
      />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} balance={plainBalanceValue} />
      <JoinCircleModal
        isOpen={isPrivateModalOpen}
        onClose={() => setIsPrivateModalOpen(false)}
        circleId={selectedCircle?.circle_id}
        circleName={selectedCircle?.name}
        circleLogo={selectedCircle?.profile_picture_url}
      />
      <JoinRequestModal
        isOpen={isJoinRequestModalOpen}
        onClose={() => setIsJoinRequestModalOpen(false)}
        circleId={selectedCircle?.circle_id}
        circleName={selectedCircle?.name}
        circleLogo={selectedCircle?.profile_picture_url}
      />
    </aside>
  );
};

export default RightSideBar;