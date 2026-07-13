"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import Link from "next/link";
import { useGetMe } from "@/hooks/useAuth";
import { FiBell } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { useEarnings, useRank, useChallenges, useEngagement, useStarixScore, 
  EngagementData, useEngagementTrend, useTotalEngagements, useProfileClicks } from "@/hooks/useAnalytics";

type PlatformKey = "All" | "Instagram" | "TikTok" | "YouTube";

const previewRankPoints = [
  { x: "Mon", y: 42 },
  { x: "Tue", y: 38 },
  { x: "Wed", y: 35 },
  { x: "Thu", y: 31 },
  { x: "Fri", y: 28 },
  { x: "Sat", y: 24 },
  { x: "Sun", y: 22 },
];

const previewTrendPoints = [
  { x: "Jan", y: 120 },
  { x: "Feb", y: 180 },
  { x: "Mar", y: 150 },
  { x: "Apr", y: 240 },
  { x: "May", y: 310 },
  { x: "Jun", y: 420 },
  { x: "Jul", y: 380 },
];

const hasVisiblePoints = (points?: { y: number | null }[]) =>
  !!points?.some((point) => typeof point.y === "number" && point.y > 0);



const PLATFORM_DATA: Record<
  PlatformKey,
  {
    followers: string;
    likes: string;
    views: string;
    comments: string;
    score: number;
    totalEngagements: string;
    profileClicks: string;
    topAccount: string;
    changeText: string;
    trend: { name: string; value: number }[];
    radar: { metric: string; instagram: number; tiktok: number; youtube: number }[];
  }
> = {
  All: {
    followers: "800,000",
    likes: "800,000",
    views: "800,000",
    comments: "800,000",
    score: 82,
    totalEngagements: "257,378",
    profileClicks: "1,248",
    topAccount: "Instagram",
    changeText: "+ 12% higher than last month",
    trend: [
      { name: "Jan", value: 180 },
      { name: "Feb", value: 220 },
      { name: "Mar", value: 205 },
      { name: "Apr", value: 215 },
      { name: "May", value: 310 },
      { name: "Jun", value: 330 },
      { name: "Jul", value: 285 },
    ],
    radar: [
      { metric: "Engagement", instagram: 90, tiktok: 62, youtube: 74 },
      { metric: "Retention", instagram: 76, tiktok: 55, youtube: 68 },
      { metric: "Quality", instagram: 82, tiktok: 68, youtube: 75 },
      { metric: "Authenticity", instagram: 70, tiktok: 80, youtube: 64 },
      { metric: "Reach", instagram: 78, tiktok: 72, youtube: 83 },
      { metric: "Liveness", instagram: 84, tiktok: 60, youtube: 72 },
    ],
  },
  Instagram: {
    followers: "234,000",
    likes: "118,000",
    views: "620,000",
    comments: "42,000",
    score: 82,
    totalEngagements: "234k",
    profileClicks: "1,248",
    topAccount: "Instagram",
    changeText: "+ 29% higher than last month",
    trend: [
      { name: "Jan", value: 120 },
      { name: "Feb", value: 160 },
      { name: "Mar", value: 145 },
      { name: "Apr", value: 170 },
      { name: "May", value: 260 },
      { name: "Jun", value: 280 },
      { name: "Jul", value: 246 },
    ],
    radar: [
      { metric: "Engagement", instagram: 90, tiktok: 40, youtube: 45 },
      { metric: "Retention", instagram: 76, tiktok: 38, youtube: 42 },
      { metric: "Quality", instagram: 82, tiktok: 36, youtube: 46 },
      { metric: "Authenticity", instagram: 70, tiktok: 35, youtube: 40 },
      { metric: "Reach", instagram: 78, tiktok: 42, youtube: 45 },
      { metric: "Liveness", instagram: 84, tiktok: 39, youtube: 43 },
    ],
  },
  TikTok: {
    followers: "310,000",
    likes: "1.2M",
    views: "2.8M",
    comments: "96,000",
    score: 65,
    totalEngagements: "1.2M",
    profileClicks: "892",
    topAccount: "TikTok",
    changeText: "+ 15% higher than last month",
    trend: [
      { name: "Jan", value: 140 },
      { name: "Feb", value: 190 },
      { name: "Mar", value: 210 },
      { name: "Apr", value: 205 },
      { name: "May", value: 260 },
      { name: "Jun", value: 300 },
      { name: "Jul", value: 330 },
    ],
    radar: [
      { metric: "Engagement", instagram: 45, tiktok: 72, youtube: 42 },
      { metric: "Retention", instagram: 40, tiktok: 66, youtube: 44 },
      { metric: "Quality", instagram: 42, tiktok: 65, youtube: 45 },
      { metric: "Authenticity", instagram: 39, tiktok: 80, youtube: 43 },
      { metric: "Reach", instagram: 44, tiktok: 88, youtube: 48 },
      { metric: "Liveness", instagram: 41, tiktok: 70, youtube: 40 },
    ],
  },
  YouTube: {
    followers: "450,000",
    likes: "640,000",
    views: "1.9M",
    comments: "58,000",
    score: 76,
    totalEngagements: "450k",
    profileClicks: "1,036",
    topAccount: "YouTube",
    changeText: "+ 8% higher than last month",
    trend: [
      { name: "Jan", value: 100 },
      { name: "Feb", value: 130 },
      { name: "Mar", value: 165 },
      { name: "Apr", value: 160 },
      { name: "May", value: 220 },
      { name: "Jun", value: 250 },
      { name: "Jul", value: 238 },
    ],
    radar: [
      { metric: "Engagement", instagram: 42, tiktok: 40, youtube: 76 },
      { metric: "Retention", instagram: 40, tiktok: 44, youtube: 84 },
      { metric: "Quality", instagram: 46, tiktok: 45, youtube: 75 },
      { metric: "Authenticity", instagram: 40, tiktok: 43, youtube: 78 },
      { metric: "Reach", instagram: 45, tiktok: 48, youtube: 72 },
      { metric: "Liveness", instagram: 43, tiktok: 40, youtube: 68 },
    ],
  },
};



const miniTrendData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 40 },
  { name: "Wed", value: 36 },
  { name: "Thu", value: 44 },
  { name: "Fri", value: 86 },
  { name: "Sat", value: 92 },
  { name: "Sun", value: 78 },
];

const activeChallenges = [
  { name: "Ranked", value: 21, color: "#D9A6E8" },
  { name: "Under Review", value: 15, color: "#F4E7A4" },
  { name: "Not Qualified", value: 9, color: "#F9B4B4" },
];

const completedChallenges = [
  { name: "Not Qualified", value: 21, color: "#FFB7C5" },
  { name: "Ranked", value: 21, color: "#D7A3E8" },
  { name: "Finalist", value: 32, color: "#A9D3ED" },
  { name: "Winner", value: 62, color: "#9FDCBE" },
];

const scoreBreakdown = [
  { name: "Instagram", value: 82, color: "#46C989" },
  { name: "TikTok", value: 65, color: "#FF8A3D" },
  { name: "YouTube", value: 76, color: "#B24ADB" },
];

const AnalyticsPage = () => {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("All");
  const platform = PLATFORM_DATA[activePlatform];
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data: trendData, isLoading: trendLoading } = useEngagementTrend();
  const { data: clicks } = useProfileClicks();

  const { data: user } = useGetMe();
  const profileImage = user?.profile_picture_url?.trim() || null;

  const trendPoints = useMemo(() => {
    const points = trendData?.monthly_chart.points;
  
    if (points?.some((point) => typeof point.y === "number" && point.y > 0)) {
      return points;
    }
  
    return previewTrendPoints;
  }, [trendData]);

const { data: totalEngagements } = useTotalEngagements();
const { data: rank, isLoading: rankLoading } = useRank();

const rankChartPoints = useMemo(() => {
  const points = rank?.weekly_chart?.points;

  if (points?.some((point) => typeof point.y === "number" && point.y > 0)) {
    return points;
  }

  return previewRankPoints;
}, [rank]);

const formatCompact = (val: number) => {
  if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
  if (val >= 1000) return (val / 1000).toFixed(0) + "k";
  return val.toString();
};

 

  const getDeltaDisplay = (direction: string, delta: number) => {
    if (direction === "new") return "New";
    if (direction === "flat") return "Flat";
    // API says: "up" means rank improved (lower number), 
    // so an "up" rank usually looks like +delta or green
    return `${direction === "up" ? "+" : "-"}${delta}`;
  };

  const { data: engagement } = useEngagement();
  const ComparisonBadge = ({ comparison }: { 
  comparison?: { percentage: number | null; positive: boolean } | null 
}) => {
  if (!comparison || comparison.percentage === null) {
    return <p className="mt-1 text-[12px] font-medium text-[#747682]"> — </p>;
  } 
  return (
    <p className={`mt-1 text-[12px] font-medium ${comparison.positive ? "text-[#14A66B]" : "text-red-500"}`}>
      {comparison.positive ? "+" : "-"}{comparison.percentage}% higher than last month
    </p>
  );
};

// Resolve active platform data dynamically
const activeEngagement = useMemo(() => {
  if (!engagement) return null;
  
  const key = activePlatform.toLowerCase();

  return (engagement[key] as EngagementData) ?? engagement.overall;
}, [engagement, activePlatform]);

  const { data: challenges} = useChallenges();
  const activeData = useMemo(() => {

    if (!challenges || challenges.active.total_count === 0) return activeChallenges;

  return [

    { name: "Ranked", value: challenges.active.ranked_count, color: "#D9A6E8" },

    { name: "Under Review", value: challenges.active.under_review_count, color: "#F4E7A4" },

    { name: "Not Qualified", value: challenges.active.not_qualified_count, color: "#F9B4B4" },

  ];

}, [challenges]);

const { data: scoreData } = useStarixScore();

// Transform spider data for Recharts
const radarData = useMemo(() => {
  const dimensions = scoreData?.spider.dimensions ?? 
    ["engagement", "retention", "quality", "reach", "liveness", "authenticity"];
  
  if (!scoreData?.spider.series || scoreData.spider.series.length === 0) {
    return dimensions.map(dim => ({ 
        metric: dim.charAt(0).toUpperCase() + dim.slice(1), 
        placeholder: 0 
    }));
  }

  return dimensions.map((dim, index) => {
    const row: any = { metric: dim.charAt(0).toUpperCase() + dim.slice(1) };
    scoreData.spider.series.forEach(s => {
      row[s.platform] = s.values[index] ?? 0;
    });
    return row;
  });
}, [scoreData]);

const radarDisplayData =
  scoreData?.spider.series?.length ? radarData : platform.radar;

const completedData = useMemo(() => {
  // If challenges data hasn't loaded yet, return empty buckets with 0 values
  // This prevents the chart from flickering or throwing errors
  if (!challenges || challenges.completed.total_count === 0) return completedChallenges;
  return [
    { 
      name: "Not Qualified", 
      value: challenges.completed.not_qualified_count ?? 0, 
      color: "#FFB7C5" 
    },
    { 
      name: "Ranked", 
      value: challenges.completed.ranked_count ?? 0, 
      color: "#D7A3E8" 
    },
    { 
      name: "Finalist", 
      value: 0, 
      color: "#A9D3ED" 
    },
    { 
      name: "Winner", 
      value: 0, 
      color: "#9FDCBE" 
    },
  ];
}, [challenges]);

  const { data: earnings, isLoading } = useEarnings();


  const formatCurrency = (minor: number) => {
  return (minor / 100).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });
};

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeChallengeTotal = activeData.reduce((sum, item) => sum + item.value, 0);
  const maxCompletedChallengeValue = Math.max(...completedData.map((item) => item.value), 1);

  const engagementCards = useMemo(
    () => [
      { label: "Followers", value: platform.followers },
      { label: "Likes", value: platform.likes },
      { label: "Views", value: platform.views },
      { label: "Comments", value: platform.comments },
    ],
    [platform]
  );

  const liveStarixScore = Math.min(
    Math.max(Math.round(scoreData?.overall_score ?? 0), 0),
    100
  );

  const soloEarningsMinor = earnings?.creator_earnings[0]?.total_minor ?? 0;
const teamEarningsMinor = earnings?.circle_earnings[0]?.total_minor ?? 0;
const totalSplitMinor = soloEarningsMinor + teamEarningsMinor;

const earningsChartData =
  totalSplitMinor > 0
    ? [
        {
          name: "Solo",
          value: (soloEarningsMinor / totalSplitMinor) * 100,
          fill: "#5B7CFA",
        },
        {
          name: "Team",
          value: (teamEarningsMinor / totalSplitMinor) * 100,
          fill: "#FF8A6B",
        },
      ]
    : [
        { name: "Solo", value: 72, fill: "#5B7CFA" },
        { name: "Team", value: 28, fill: "#FF8A6B" },
      ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E1F24]">
      <header className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-[-0.03em]">Analytics</h1>
          <p className="mt-1 text-[12px] font-medium text-[#747682]">
            Track your performance, monitor growth, and visibility
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-[390px]">
            <svg className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B8D98]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21 21-4.35-4.35" />
              <circle cx="11" cy="11" r="7" />
            </svg>
            <input
              placeholder="Search Starix"
              className="h-[48px] w-full rounded-full border border-[#EFF0F3] bg-white pl-12 pr-5 text-[13px] font-medium shadow-[0_2px_10px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#8B8D98]"
            />
          </div>

          <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EFF0F3] bg-white"
            >
              <FiBell />
          </button>


          <Link href="/profile" className="block cursor-pointer">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#245BFF] bg-gray-100">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="h-full w-full rounded-full bg-[#F5F6F8]"
                aria-label="No profile picture"
              />
            )}
            </div>
          </Link>
        </div>
      </header>

      <section className="mb-7 grid grid-cols-[0.95fr_0.95fr_1.9fr] gap-6">
      <div className="rounded-[24px] bg-[#E8FFE9] p-5">
        <CardLabel label="Total Earnings" />

        {isLoading ? (
          <h2 className="mt-1 text-[28px] font-semibold text-gray-400">Loading...</h2>
        ) : (
          <>
            <h2 className="mt-1 text-[28px] font-semibold tracking-[-0.04em]">
              {earnings?.lifetime_earnings[0]
                ? formatCurrency(earnings.lifetime_earnings[0].total_minor)
                : "₦0.00"}
            </h2>

            <p className="mt-1 text-[12px] font-semibold text-[#62636C]">
              View Wallet →
            </p>

            <div className="relative mx-auto mt-2 h-[104px] w-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="78%"
                  innerRadius="82%"
                  outerRadius="100%"
                  barSize={10}
                  data={earningsChartData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={20}
                    background={{ fill: "#CFF8D5" }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-0 flex justify-between text-[10px] font-semibold text-[#1E1F24]">
              <span>
                Solo Earnings
                <br />
                {earnings?.creator_earnings[0]
                  ? formatCurrency(earnings.creator_earnings[0].total_minor)
                  : "₦0.00"}
              </span>

              <span className="text-right">
                Team Earnings
                <br />
                {earnings?.circle_earnings[0]
                  ? formatCurrency(earnings.circle_earnings[0].total_minor)
                  : "₦0.00"}
              </span>
            </div>
          </>
        )}
      </div>

        <div className="rounded-[24px] bg-[#EAF6FF] p-5">
          <CardLabel label="Global Rank" />
          
          {rankLoading ? (
            <h2 className="mt-1 text-[27px] font-semibold text-gray-400">Loading...</h2>
          ) : (
            <>
              <h2 className="mt-1 text-[27px] font-semibold tracking-[-0.04em]">
                {rank?.current_rank?.toLocaleString() ?? "—"} 
                <span className={`text-[12px] ml-2 ${rank?.direction === "up" ? "text-[#009F61]" : "text-red-500"}`}>
                  {getDeltaDisplay(rank?.direction || "flat", rank?.delta_count || 0)}
                </span>
              </h2>
              <p className="mt-1 text-[12px] font-semibold text-[#62636C]">View Leaderboard →</p>
            </>
          )}

          <div className="mt-5 h-[116px] min-h-[116px] min-w-0 rounded-[12px] bg-white/80 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rankChartPoints}>
                <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#747682" }} />
                {/* We use domain based on y_min/y_max from the API */}
                <YAxis
                  domain={[
                    rank?.weekly_chart?.y_min ?? 20,
                    rank?.weekly_chart?.y_max ?? 45,
                  ]}
                  reversed
                  hide
                />
              <Line 
                    type="monotone" 
                    dataKey="y" 
                    stroke="#46D39B" 
                    strokeWidth={2} 
                    dot={false} 
                    connectNulls={false} // This handles the gap for future days
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#EFF0F3] bg-white">
          <div className="flex items-start justify-between px-5 py-4">
            <div>
              <CardLabel label="Total Challenges" />
              <h2 className="mt-1 text-[28px] font-semibold tracking-[-0.04em]">
                {challenges?.lifetime_challenge_count ?? 0}
              </h2>
            </div>
            <button className="text-[12px] font-semibold text-[#62636C]">View Challenge →</button>
          </div>

          <div className="grid grid-cols-2 border-t border-[#EFF0F3]">
            <div className="border-r border-[#EFF0F3] p-4">
              <div className="mb-2 flex justify-between text-[10px] font-semibold">
                <span>Active Challenges</span>
                <span>{challenges?.active.total_count ?? 0}</span>
              </div>
              <div className="space-y-3">
                {activeData.map((item) => (
                  <div key={item.name}>
                    <div className="mb-1 flex justify-between text-[9px] text-[#62636C]">
                      <span>{item.name}</span>
                      {/* If challenges is loading or data is missing, this defaults to 0 */}
                      <span>{item.value ?? 0}</span>
                    </div>

                    <div className="h-2 rounded-full bg-[#F7F7F8]">
                      <div 
                        className="h-full rounded-full" 
                        style={{
                          width: `${activeChallengeTotal ? (item.value / activeChallengeTotal) * 100 : 0}%`,
                          backgroundColor: item.color,
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2 flex justify-between text-[10px] font-semibold">
                <span>Completed Challenges</span>
                <span>{challenges?.completed.total_count ?? 0}</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={completedData} margin={{ top: 18, right: 8, left: 8, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: "#62636C" }} />
                  <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={28}>
                    {completedData.map((entry) => (
                      
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                  <LabelList
                    dataKey="value"
                    position="top"
                    fill="#62636C"
                    fontSize={9}
                    fontWeight={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-7 overflow-hidden rounded-[24px] border border-[#EFF0F3] bg-white">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-[18px] font-semibold">Engagement Breakdown</h2>

          <div className="flex gap-2">
            {(["All", "Instagram", "TikTok", "YouTube"] as PlatformKey[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActivePlatform(filter)}
                className={`rounded-full border px-5 py-2 text-[13px] font-semibold transition ${
                  activePlatform === filter
                    ? "border-[#245BFF] bg-[#F5FAFF] text-[#245BFF]"
                    : "border-[#EFF0F3] bg-white text-[#62636C]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 border-t border-[#EFF0F3]">
          { (["followers", "likes", "views", "comments"] as const).map((key, index) => {
              // 1. Get the current platform's metric block
              const metricBlock = activeEngagement ? activeEngagement[key] : { value: 0, comparison: null };
              
              return (
                <div key={key} className={`p-5 ${index !== 3 ? "border-r border-[#EFF0F3]" : ""}`}>
                  <p className="text-[15px] font-medium text-[#62636C] capitalize">{key}</p>
                  <h3 className="mt-1 text-[28px] font-semibold tracking-[-0.04em]">
                    {metricBlock?.value?.toLocaleString() ?? 0}
                  </h3>
                  
                  {/* 2. Pass the comparison object here */}
                  <ComparisonBadge comparison={metricBlock?.comparison} />
                </div>
              );
          })}
        </div>
      </section>

      <section className="grid grid-cols-[1.25fr_1.05fr_1.05fr] gap-6">
        <div className="min-h-[350px] rounded-[24px] border border-[#EFF0F3] bg-white">
          <div className="flex items-start justify-between border-b border-[#EFF0F3] p-5">
            <div>
              <h3 className="flex items-center gap-2 text-[18px] font-semibold">
                <span><img src="/candyyy.svg" alt="" /></span> Starix Score
              </h3>
              <p className="mt-2 max-w-[285px] text-[10px] leading-relaxed text-[#62636C]">
                Performance score: <span className="font-semibold text-[#245BFF]">{scoreData?.best_performing_platform ?? "0"}</span>
              </p>
            </div>

            <div className="relative h-[86px] w-[86px]">
              <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="76%"
                outerRadius="100%"
                data={[{ value: liveStarixScore }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={20}
                  fill="#245BFF"
                  background={{ fill: "#EAF2FF" }}
                />
              </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center text-[24px] font-semibold text-[#245BFF]">
                {liveStarixScore}
              </div>
            </div>
          </div>

          <div className="flex gap-4 px-5 py-3">
            {Object.entries(scoreData?.per_platform || {}).map(([platform, score]) => (
              <div key={platform} className="text-[12px] font-medium text-[#62636C]">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}: {score ?? 0}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-4 h-[185px] w-[270px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarDisplayData}>
                <PolarGrid stroke="#E9ECF2" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "#747682" }} />
                
                {/* This forces the rings to show even at 0 */}
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                {scoreData?.spider.series?.length ? (
                  scoreData.spider.series.map((s, i) => (
                    <Radar
                      key={s.platform}
                      name={s.platform}
                      dataKey={s.platform}
                      stroke={["#46C989", "#FF8A3D", "#B24ADB"][i]}
                      fill={["#46C989", "#FF8A3D", "#B24ADB"][i]}
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  ))
                ) : (
                  <>
                    <Radar dataKey="instagram" stroke="#46C989" fill="#46C989" fillOpacity={0.12} strokeWidth={2} />
                    <Radar dataKey="tiktok" stroke="#FF8A3D" fill="#FF8A3D" fillOpacity={0.12} strokeWidth={2} />
                    <Radar dataKey="youtube" stroke="#B24ADB" fill="#B24ADB" fillOpacity={0.12} strokeWidth={2} />
                  </>
                )}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#EFF0F3] bg-white p-5">
          <h3 className="text-[16px] font-semibold">Engagement Trend</h3>
          <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">
            {trendData?.lifetime_engagement_count.toLocaleString() ?? "0"}
          </h2>

          <div className="mt-5 h-[280px] min-h-[280px] min-w-0">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendPoints}>
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="x" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "#62636C" }} 
                />
                <YAxis 
                  domain={[trendData?.monthly_chart.y_min ?? 0, trendData?.monthly_chart.y_max ?? 1000000]} 
                  hide 
                />
                <Area
                  type="monotone"
                  dataKey="y"
                  stroke="#245BFF"
                  strokeWidth={1.5}
                  fill="#245BFF"
                  fillOpacity={0.03}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-[#EFF0F3] bg-white p-5">
            <h3 className="text-[15px] font-semibold">Total Engagements</h3>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">
              {totalEngagements?.lifetime_engagement_count?.toLocaleString() ?? "0"}
            </h2>

            <div className="mt-3 flex gap-3">
              {/* Visual Progress Bars */}
              {["instagram", "tiktok", "youtube"].map((platform) => {
                  const color = platform === "instagram" ? "#70D0A2" : platform === "tiktok" ? "#F5A07E" : "#C477D9";
                  return (
                      <span 
                          key={platform} 
                          className="h-1.5 flex-1 rounded-full" 
                          style={{ backgroundColor: totalEngagements?.per_platform[platform] ? color : "#E5E7EB" }} 
                      />
                  );
              })}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-[12px] text-[#62636C]">
              {["instagram", "tiktok", "youtube"].map((platform) => {
                const data = totalEngagements?.per_platform[platform];
                const color = platform === "instagram" ? "#70D0A2" : platform === "tiktok" ? "#F5A07E" : "#C477D9";
                
                // Formatting the trend percentage
                const trend = data?.comparison?.percentage 
                  ? `${data.comparison.positive ? "+" : "-"}${data.comparison.percentage}%` 
                  : "%";

                return (
                  <LegendMetric 
                    key={platform}
                    color={color} 
                    label={platform.charAt(0).toUpperCase() + platform.slice(1)} 
                    value={`${formatCompact(data?.value ?? 0)} ${trend}`} 
                  />
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] border border-[#EFF0F3] bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-semibold">Profile Click-Throughs</h3>
                <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">
                  {clicks?.unique_clicks_count ?? 0}
                </h2>
                
                {/* Dynamic comparison text */}
                <p className={`mt-1 text-[12px] font-medium ${clicks?.comparison?.positive ? "text-[#14A66B]" : "text-red-500"}`}>
                  {clicks?.comparison 
                    ? `${clicks.comparison.positive ? "+" : "-"}${clicks.comparison.percentage}% from last month`
                    : "—"
                  }
                </p>
              </div>
              <MiniSparkline large />
            </div>

            <p className="mt-4 max-w-[280px] text-[12px] leading-relaxed text-[#747682]">
              People who clicked through to your social media accounts after viewing your Starix profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const CardLabel = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2">
    <img src="/coin.svg" alt="" />
    <span className="text-[15px] font-semibold text-[#1E1F24]">{label}</span>
  </div>
);

const MiniSparkline = ({ large = false }: { large?: boolean }) => {
  const width = large ? 115 : 78;

  return (
    <div
      className={`${large ? "h-[72px] w-[115px]" : "h-[72px] w-[78px]"} shrink-0 rounded-[10px] bg-[#FAFAFB] p-2`}
    >
      <ResponsiveContainer width={width - 16} height={56}>
        <LineChart data={miniTrendData}>
        <Line
          type="monotone"
          dataKey="y"
          stroke="#54D1A0"
          strokeWidth={1.5}
          dot={false}
        />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const LegendMetric = ({ color, label, value }: { color: string; label: string; value: string }) => {
  // Now value looks like "234k +6.5%"
  const parts = value.split(" ");
  const mainValue = parts[0];
  const trend = parts[1] || "";

  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-[3px]" style={{ backgroundColor: color }} />
        <span className="text-[#62636C] font-medium text-[12px]">{label}</span>
      </div>
      <p className="mt-1 text-[#62636C] text-[12px] font-medium">
        {mainValue}{""}
        <span className="text-[#27AE60] text-[10px]">{trend}↑</span>
      </p>
    </div>
  );
};

export default AnalyticsPage;