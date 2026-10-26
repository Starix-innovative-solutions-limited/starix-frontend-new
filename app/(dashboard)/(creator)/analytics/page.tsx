"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, ArrowUp, ArrowDown, Bell, Plus, Minus, Search } from "lucide-react";
import { useGetMe } from "@/hooks/useAuth";
import { useDashboardSearch } from "@/components/dashboard/DashboardSearchProvider";
import {
  useEarnings,
  useRank,
  useChallenges,
  useEngagement,
  useStarixScore,
  useEngagementTrend,
  useTotalEngagements,
  useProfileClicks,
  type EngagementData,
} from "@/hooks/useAnalytics";

type PlatformKey = "All" | "Instagram" | "TikTok" | "YouTube";
type Comparison = { label?: string; percentage: number | null; positive: boolean } | null | undefined;
type Point = { x: string; y: number | null };

const PLATFORMS = ["instagram", "tiktok", "youtube"] as const;

const PLATFORM_META: Record<
  (typeof PLATFORMS)[number],
  { label: string; scoreColor: string; engagementColor: string }
> = {
  instagram: { label: "Instagram", scoreColor: "#21AE5F", engagementColor: "#8ED6AE" },
  tiktok: { label: "TikTok", scoreColor: "#FB6612", engagementColor: "#FFB586" },
  youtube: { label: "YouTube", scoreColor: "#B72ADB", engagementColor: "#DB8FF1" },
};

const RADAR_ORDER = ["engagement", "retention", "quality", "authenticity", "reach", "liveness"];

const previewRadar: Record<string, number>[] = [
  { instagram: 80, tiktok: 48, youtube: 56 },
  { instagram: 86, tiktok: 40, youtube: 72 },
  { instagram: 80, tiktok: 46, youtube: 74 },
  { instagram: 62, tiktok: 56, youtube: 56 },
  { instagram: 44, tiktok: 86, youtube: 60 },
  { instagram: 50, tiktok: 76, youtube: 54 },
];

const previewRankPoints: Point[] = [
  { x: "Mon", y: 40 },
  { x: "Tue", y: 34 },
  { x: "Wed", y: 36 },
  { x: "Thur", y: 33 },
  { x: "Fri", y: 22 },
  { x: "Sat", y: 21 },
  { x: "Sun", y: 23 },
];

const previewTrendPoints: Point[] = [
  { x: "Jan", y: 120 },
  { x: "Feb", y: 150 },
  { x: "Mar", y: 138 },
  { x: "Apr", y: 140 },
  { x: "May", y: 205 },
  { x: "Jun", y: 196 },
  { x: "Jul", y: 168 },
];

const previewSparkline: Point[] = [18, 21, 20, 24, 37, 43, 42].map((y, i) => ({ x: String(i), y }));

const activeChallengeBars = [
  { key: "ranked_count", name: "Ranked", color: "#E8BDF2" },
  { key: "under_review_count", name: "Under Review", color: "#FFF09D" },
  { key: "not_qualified_count", name: "Not Qualified", color: "#FFAFA4" },
] as const;

const hasVisiblePoints = (points?: Point[] | null) =>
  !!points?.some((point) => typeof point.y === "number" && point.y > 0);

const formatNumber = (value?: number | null) =>
  typeof value === "number" ? Math.round(value).toLocaleString("en-US") : "0";

const formatCompact = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return String(value);
};

const formatCurrency = (minor: number) =>
  (minor / 100).toLocaleString("en-NG", { style: "currency", currency: "NGN" });

/** Keeps the line inside the vertical band the design places it in. */
const paddedDomain = (points: Point[], topPad: number, bottomPad: number) => {
  const values = points.map((p) => p.y).filter((y): y is number => typeof y === "number");
  if (!values.length) return [0, 1] as [number, number];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || Math.max(Math.abs(max), 1);
  const total = span / (1 - topPad - bottomPad);
  return [min - total * bottomPad, max + total * topPad] as [number, number];
};

const AnalyticsPage = () => {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("All");

  const { data: user } = useGetMe();
  const { query, setQuery, placeholder, onSubmit } = useDashboardSearch();
  const { data: earnings, isLoading: earningsLoading } = useEarnings();
  const { data: rank, isLoading: rankLoading } = useRank();
  const { data: challenges } = useChallenges();
  const { data: engagement } = useEngagement();
  const { data: scoreData } = useStarixScore();
  const { data: trendData } = useEngagementTrend();
  const { data: totalEngagements } = useTotalEngagements();
  const { data: clicks } = useProfileClicks();

  const profileImage = user?.profile_picture_url?.trim() || null;

  const rankPoints = useMemo(() => {
    const points = rank?.weekly_chart?.points;
    return hasVisiblePoints(points) ? points! : previewRankPoints;
  }, [rank]);

  const trendPoints = useMemo(() => {
    const points = trendData?.monthly_chart.points;
    return hasVisiblePoints(points) ? points! : previewTrendPoints;
  }, [trendData]);

  const activeEngagement = useMemo(() => {
    if (!engagement) return null;
    return (engagement[activePlatform.toLowerCase()] as EngagementData | null) ?? engagement.overall;
  }, [engagement, activePlatform]);

  const engagementSparkline = useMemo(() => {
    const points = activeEngagement?.monthly_chart?.points;
    return hasVisiblePoints(points) ? points! : previewSparkline;
  }, [activeEngagement]);

  const radarSeries = useMemo(
    () =>
      scoreData?.spider.series?.length
        ? scoreData.spider.series.map((s) => s.platform.toLowerCase())
        : [...PLATFORMS],
    [scoreData]
  );

  const radarData = useMemo(() => {
    const dimensions = scoreData?.spider.dimensions ?? [];
    const series = scoreData?.spider.series ?? [];

    return RADAR_ORDER.map((dimension, orderIndex) => {
      const row: Record<string, string | number> = {
        metric: dimension.charAt(0).toUpperCase() + dimension.slice(1),
        full: 100,
      };
      if (series.length) {
        const index = dimensions.indexOf(dimension);
        series.forEach((s) => {
          row[s.platform.toLowerCase()] = index >= 0 ? s.values[index] ?? 0 : 0;
        });
      } else {
        Object.assign(row, previewRadar[orderIndex]);
      }
      return row;
    });
  }, [scoreData]);

  const liveStarixScore = Math.min(Math.max(Math.round(scoreData?.overall_score ?? 0), 0), 100);
  const bestPlatform = scoreData?.best_performing_platform;

  const soloMinor = earnings?.creator_earnings[0]?.total_minor ?? 0;
  const teamMinor = earnings?.circle_earnings[0]?.total_minor ?? 0;
  const lifetimeMinor = earnings?.lifetime_earnings[0]?.total_minor ?? 0;

  const activeChallengeTotal = challenges?.active.total_count ?? 0;
  const activeBarMax = Math.max(
    ...activeChallengeBars.map((bar) => challenges?.active[bar.key] ?? 0),
    1
  );

  const completedBars = [
    { name: "Not Qualified", value: challenges?.completed.not_qualified_count ?? 0, color: "#FFBCC0" },
    { name: "Ranked", value: challenges?.completed.ranked_count ?? 0, color: "#E8BFF7" },
    { name: "Finalist", value: 0, color: "#A9D5F0" },
    { name: "Winner", value: 0, color: "#A3E3C0" },
  ];
  const completedMax = Math.max(...completedBars.map((bar) => bar.value), 1);

  const engagementTotal = PLATFORMS.reduce(
    (sum, platform) => sum + (totalEngagements?.per_platform[platform]?.value ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E1F24]">
      <header className="mb-[44px] flex flex-col gap-5 pt-[6px] md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold leading-[30px] tracking-[-0.03em] text-[#111111]">
            Analytics
          </h1>
          <p className="mt-[3px] text-[12px] leading-4 text-[#5E5E60]">
            Track your performance, monitor growth, and visibility
          </p>
        </div>

        <div className="flex items-center gap-[22px]">
          <label className="relative block min-w-0 flex-1 md:w-[376px] md:flex-none">
            <Search
              size={16}
              strokeWidth={1.75}
              className="pointer-events-none absolute left-[17px] top-1/2 -translate-y-1/2 text-[#5E5E60]"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onSubmit();
                }
              }}
              placeholder={placeholder}
              className="h-12 w-full rounded-full border border-[#EBEBED] bg-white pl-[45px] pr-5 text-[14px] text-[#1E1F24] shadow-[0_2px_6px_rgba(16,24,40,0.04)] outline-none placeholder:text-[#5E5E60] focus:border-[#0033FF]"
            />
          </label>

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#EBEBED] bg-white text-[#1E1F24] shadow-[0_2px_6px_rgba(16,24,40,0.04)]"
          >
            <Bell size={19} strokeWidth={1.5} />
          </button>

          <Link
            href="/profile"
            aria-label="Profile"
            className="block h-12 w-12 shrink-0 rounded-full bg-[conic-gradient(#1835BD_0deg,#1835BD_180deg,#F08A4B_180deg,#F08A4B_360deg)] p-[2.5px]"
          >
            <span className="block h-full w-full rounded-full bg-white p-[2px]">
              <span className="relative block h-full w-full overflow-hidden rounded-full bg-[#F5F6F8]">
                {profileImage && (
                  <Image src={profileImage} alt="Profile" fill sizes="48px" className="object-cover" />
                )}
              </span>
            </span>
          </Link>
        </div>
      </header>

      {/* Row 1 */}
      <section className="mb-[34px] grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[228fr_231fr_470fr]">
        <div className="flex min-h-[241px] flex-col overflow-hidden rounded-[16px] bg-[#E5FFE4] xl:h-[241px]">
          <div className="px-[17px] pt-[18px]">
            <CardTitle label="Total Earnings" />
            {earningsLoading ? (
              <p className="mt-[7px] text-[27px] font-semibold leading-[34px] text-[#A0A8A2]">Loading...</p>
            ) : (
              <Money
                minor={lifetimeMinor}
                className="mt-[7px] block text-[27px] font-semibold leading-[34px] tracking-[-0.02em] text-[#0D1812]"
                centsClassName="text-[#868C93]"
              />
            )}
            <ViewLink href="/portfolio" label="View Wallet" className="mt-[5px]" />
          </div>

          <div className="flex flex-1 items-end justify-center pt-3">
            <EarningsGauge solo={soloMinor} team={teamMinor} />
          </div>

          <div className="flex justify-between border-t border-[#CFEFCC] px-[17px] pb-[14px] pt-[7px] text-[11px] leading-4 text-[#132316]">
            <div>
              <p className="font-medium">Solo Earnings</p>
              <Money minor={soloMinor} className="font-medium" centsClassName="text-[#868C93]" />
            </div>
            <div className="text-right">
              <p className="font-medium">Team Earnings</p>
              <Money minor={teamMinor} className="font-medium" centsClassName="text-[#868C93]" />
            </div>
          </div>
        </div>

        <div className="flex min-h-[241px] flex-col rounded-[16px] bg-[#E9F6FF] px-[17px] pb-4 pt-[18px] xl:h-[241px]">
          <CardTitle label="Global Rank" />
          {rankLoading ? (
            <p className="mt-[7px] text-[27px] font-semibold leading-[34px] text-[#9AA6B2]">Loading...</p>
          ) : (
            <div className="mt-[7px] flex items-center gap-[10px]">
              <span className="text-[27px] font-semibold leading-[34px] tracking-[-0.02em] text-[#111317]">
                {rank?.current_rank != null ? rank.current_rank.toLocaleString("en-US") : "—"}
              </span>
              <RankDelta direction={rank?.direction} delta={rank?.delta_count ?? 0} />
            </div>
          )}
          <ViewLink href="/dashboard" label="View Leaderboard" className="mt-[5px]" />

          <div className="mt-[14px] min-h-[113px] flex-1 rounded-[10px] bg-white/85">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rankPoints} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                <CartesianGrid
                  vertical={false}
                  stroke="#EEF0F3"
                  horizontalCoordinatesGenerator={({ offset }) => evenLines(offset, 4)}
                />
                <XAxis
                  dataKey="x"
                  axisLine={false}
                  tickLine={false}
                  height={24}
                  tickMargin={8}
                  interval={0}
                  tick={{ fontSize: 9, fill: "#7F8085" }}
                />
                <YAxis hide reversed domain={paddedDomain(rankPoints, 0.2, 0.2)} />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#3DBE7E"
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[16px] border border-[#EEEEEE] bg-white md:col-span-2 xl:col-span-1 xl:h-[241px]">
          <div className="flex items-start justify-between px-[17px] pt-[18px]">
            <div>
              <CardTitle label="Total Challenges" />
              <p className="mt-[7px] text-[27px] font-semibold leading-[34px] tracking-[-0.02em] text-[#111317]">
                {formatNumber(challenges?.lifetime_challenge_count)}
              </p>
            </div>
            <ViewLink href="/challenges" label="View Challenge" />
          </div>

          <div className="grid flex-1 grid-cols-1 border-t border-[#EEEEEE] sm:grid-cols-2">
            <div className="border-b border-[#EEEEEE] px-4 pb-[11px] pt-[14px] sm:border-b-0 sm:border-r">
              <ColumnHeader label="Active Challenges" value={activeChallengeTotal} />
              <div className="mt-[16px] space-y-[3px]">
                {activeChallengeBars.map((bar) => {
                  const value = challenges?.active[bar.key] ?? 0;
                  return (
                    <div key={bar.key}>
                      <p className="text-[8.5px] leading-[10px] text-[#84858A]">{bar.name}</p>
                      <div className="relative mt-[5px] h-[16px]">
                        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#F2F2F4]" />
                        <div
                          className="relative flex h-full min-w-[44px] items-center gap-[3px] rounded-[5px] border border-[#ECECEE] bg-white p-[2px]"
                          style={{ width: `${Math.max((value / activeBarMax) * 100, 12)}%` }}
                        >
                          <span
                            className="h-full flex-1 rounded-[3px]"
                            style={{ backgroundColor: bar.color }}
                          />
                          <span className="pr-[3px] text-[8.5px] font-semibold leading-none text-[#1E1F24]">
                            {value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col px-4 pb-[14px] pt-[14px]">
              <ColumnHeader label="Completed Challenges" value={challenges?.completed.total_count ?? 0} />
              <div className="relative mt-2 flex flex-1 items-end justify-around">
                <div className="pointer-events-none absolute inset-x-0 bottom-[18px] top-1 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((line) => (
                    <span key={line} className="h-px bg-[#F2F2F4]" />
                  ))}
                </div>
                {completedBars.map((bar) => (
                  <div key={bar.name} className="relative flex w-[44px] flex-col items-center">
                    <div className="flex w-[41px] flex-col items-center rounded-[7px] border border-[#ECECEE] bg-white p-[2px]">
                      <span className="py-[2px] text-[8.5px] font-semibold leading-[10px] text-[#1E1F24]">
                        {bar.value}
                      </span>
                      <span
                        className="w-full rounded-[5px]"
                        style={{
                          height: `${Math.max((bar.value / completedMax) * 62, 14)}px`,
                          backgroundColor: bar.color,
                        }}
                      />
                    </div>
                    <span className="mt-[6px] whitespace-nowrap text-[8.5px] leading-[10px] text-[#6B6B70]">
                      {bar.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 2 */}
      <section className="mb-[32px] overflow-hidden rounded-[16px] border border-[#EEEEEE] bg-white">
        <div className="flex min-h-[65px] flex-wrap items-center justify-between gap-3 px-[17px] py-[17px]">
          <h2 className="text-[19px] font-semibold leading-6 tracking-[-0.01em] text-[#131315]">
            Engagement Breakdown
          </h2>
          <div className="flex flex-wrap gap-[10px]">
            {(["All", "Instagram", "TikTok", "YouTube"] as PlatformKey[]).map((filter) => {
              const isActive = activePlatform === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActivePlatform(filter)}
                  className={`h-[31px] rounded-full border px-4 text-[14px] leading-none transition ${
                    isActive
                      ? "border-[#1E35B9] bg-[#EEF5FF] font-medium text-[#1E35B9]"
                      : "border-[#E1E1E4] bg-white text-[#5F5F61] hover:border-[#C9C9CE]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 border-t border-[#EEEEEE] sm:grid-cols-2 xl:grid-cols-4">
          {(["followers", "likes", "views", "comments"] as const).map((key, index) => {
            const metric = activeEngagement?.[key];
            const borders = [
              "border-b sm:border-r xl:border-b-0",
              "border-b xl:border-b-0 xl:border-r",
              "border-b sm:border-b-0 sm:border-r",
              "",
            ][index];

            return (
              <div
                key={key}
                className={`flex items-center justify-between gap-3 border-[#EEEEEE] px-[17px] py-[17px] ${borders}`}
              >
                <div className="min-w-0">
                  <p className="text-[14px] font-medium capitalize leading-[18px] text-[#18171C]">{key}</p>
                  <p className="mt-[5px] text-[26px] font-semibold leading-8 tracking-[-0.02em] text-[#111317]">
                    {formatNumber(metric?.value)}
                  </p>
                  <ComparisonText
                    comparison={metric?.comparison}
                    suffix="than last month"
                    className="mt-[5px]"
                  />
                </div>
                <Sparkline
                  points={engagementSparkline}
                  margin={{ top: 22, bottom: 30 }}
                  className="hidden h-[79px] w-[72px] sm:block"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Row 3 */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[340fr_292fr_294fr]">
        <div className="flex min-h-[344px] flex-col overflow-hidden rounded-[16px] border border-[#EEEEEE] bg-white xl:h-[344px]">
          <div className="flex items-start justify-between gap-3 px-[17px] pb-[18px] pt-[17px]">
            <div className="min-w-0">
              <h3 className="flex items-center gap-[6px] text-[20px] font-semibold leading-[26px] tracking-[-0.02em] text-[#111317]">
                <Image src="/candyyy.webp" alt="" width={18} height={18} className="shrink-0" />
                Starix Score Breakdown
              </h3>
              <p className="mt-[6px] max-w-[275px] text-[10px] leading-[15.5px] text-[#5E5E60]">
                A real-time measure of your creator performance, visibility, and brand readiness.
                {bestPlatform && (
                  <>
                    {" "}Your best performing social account is{" "}
                    <span className="font-medium text-[#1E35B9]">
                      {PLATFORM_META[bestPlatform.toLowerCase() as keyof typeof PLATFORM_META]?.label ??
                        bestPlatform}
                      .
                    </span>
                  </>
                )}
              </p>
            </div>
            <ScoreRing score={liveStarixScore} />
          </div>

          <div className="flex h-[34px] items-center justify-between border-y border-[#EEEEEE] px-[17px] text-[12.5px] text-[#636365]">
            {PLATFORMS.map((platform) => {
              const value = scoreData?.per_platform?.[platform];
              return (
                <span key={platform} className="flex items-center gap-[6px]">
                  <span
                    className="h-[9px] w-[9px] rounded-[2px]"
                    style={{ backgroundColor: PLATFORM_META[platform].scoreColor }}
                  />
                  {PLATFORM_META[platform].label} {typeof value === "number" ? Math.round(value) : "—"}
                </span>
              );
            })}
          </div>

          <div className="min-h-[200px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius={66} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <PolarGrid stroke="#E3E3E7" />
                <PolarAngleAxis dataKey="metric" tick={<RadarTick />} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  dataKey="full"
                  stroke="none"
                  fill="#EDEDF0"
                  fillOpacity={0.6}
                  isAnimationActive={false}
                />
                {radarSeries.map((platform) => (
                  <Radar
                    key={platform}
                    dataKey={platform}
                    stroke={PLATFORM_META[platform as keyof typeof PLATFORM_META]?.scoreColor ?? "#0033FF"}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    fill="transparent"
                    fillOpacity={0}
                    isAnimationActive={false}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex min-h-[344px] flex-col rounded-[16px] border border-[#EEEEEE] bg-white px-[17px] pb-3 pt-[17px] xl:h-[344px]">
          <h3 className="text-[16px] font-medium leading-5 text-[#1E1F24]">Engagement Trend</h3>
          <p className="mt-[8px] text-[26px] font-semibold leading-8 tracking-[-0.02em] text-[#111317]">
            {formatNumber(trendData?.lifetime_engagement_count)}
          </p>

          <div className="mt-[32px] min-h-[210px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendPoints} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid
                  vertical={false}
                  stroke="#EFEFF1"
                  horizontalCoordinatesGenerator={({ offset }) => evenLines(offset, 9)}
                />
                <XAxis
                  dataKey="x"
                  axisLine={false}
                  tickLine={false}
                  height={46}
                  tickMargin={30}
                  interval={0}
                  padding={{ left: 12, right: 12 }}
                  tick={{ fontSize: 11, fill: "#767678" }}
                />
                <YAxis hide domain={paddedDomain(trendPoints, 0.29, 0.39)} />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#3352C5"
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-[26px] md:col-span-2 xl:col-span-1 xl:h-[344px]">
          <div className="rounded-[16px] border border-[#EEEEEE] bg-white xl:h-[158px]">
            <div className="px-[17px] pb-[14px] pt-[17px]">
              <h3 className="text-[16px] font-medium leading-5 text-[#1E1F24]">Total Engagements</h3>
              <div className="mt-[8px] flex items-center gap-4">
                <p className="shrink-0 text-[26px] font-semibold leading-8 tracking-[-0.02em] text-[#111317]">
                  {formatNumber(totalEngagements?.lifetime_engagement_count)}
                </p>
                <div className="flex flex-1 gap-[7px]">
                  {PLATFORMS.map((platform) => {
                    const value = totalEngagements?.per_platform[platform]?.value ?? 0;
                    return (
                      <span
                        key={platform}
                        className="h-[5px] min-w-[20px] rounded-full"
                        style={{
                          flexGrow: engagementTotal ? Math.max(Math.sqrt(value / engagementTotal), 0.3) : 1,
                          backgroundColor: value > 0 ? PLATFORM_META[platform].engagementColor : "#ECECEF",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#EEEEEE] px-[17px] pb-[14px] pt-[12px]">
              {PLATFORMS.map((platform, index) => {
                const data = totalEngagements?.per_platform[platform];
                const align = ["items-start", "items-center", "items-end"][index];
                return (
                  <div key={platform} className={`flex flex-col ${align}`}>
                    <span className="flex items-center gap-[6px] text-[12px] leading-4 text-[#636365]">
                      <span
                        className="h-[8px] w-[8px] rounded-[2px]"
                        style={{ backgroundColor: PLATFORM_META[platform].engagementColor }}
                      />
                      {PLATFORM_META[platform].label}
                    </span>
                    <span className="mt-[3px] flex items-center gap-[3px] text-[12px] leading-4 text-[#1E1F24]">
                      {formatCompact(data?.value ?? 0)}
                      <InlineDelta comparison={data?.comparison} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 rounded-[16px] border border-[#EEEEEE] bg-white px-[17px] pb-[17px] pt-[17px] xl:h-[160px]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[16px] font-medium leading-5 text-[#1E1F24]">Profile Click-Throughs</h3>
                <p className="mt-[8px] text-[26px] font-semibold leading-8 tracking-[-0.02em] text-[#111317]">
                  {formatNumber(clicks?.unique_clicks_count)}
                </p>
                <ComparisonText
                  comparison={clicks?.comparison}
                  suffix={`from ${clicks?.comparison?.label ?? "last month"}`}
                  showDirectionWord={false}
                  className="mt-[3px] text-[12px]"
                />
              </div>
              <Sparkline
                points={previewSparkline}
                margin={{ top: 30, bottom: 18 }}
                className="h-[82px] w-[110px] shrink-0"
              />
            </div>
            <p className="mt-[6px] text-[11.5px] leading-[17px] text-[#5E5E60]">
              People who clicked through to your social media accounts after viewing your Starix profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const evenLines = (offset: { top?: number; height?: number }, count: number) => {
  const top = offset.top ?? 0;
  const height = offset.height ?? 0;
  return Array.from({ length: count }, (_, i) => top + (height * i) / (count - 1));
};

const CardTitle = ({ label }: { label: string }) => (
  <div className="flex items-center gap-[6px]">
    <Image src="/coin.webp" alt="" width={15} height={15} className="shrink-0" />
    <span className="text-[15.5px] font-medium leading-5 text-[#081F0D]">{label}</span>
  </div>
);

const ViewLink = ({ href, label, className = "" }: { href: string; label: string; className?: string }) => (
  <Link
    href={href}
    className={`inline-flex items-center gap-[6px] text-[13px] leading-4 text-[#56635A] transition hover:text-[#1E1F24] ${className}`}
  >
    {label}
    <ArrowRight size={14} strokeWidth={1.5} />
  </Link>
);

const Money = ({
  minor,
  className = "",
  centsClassName = "",
}: {
  minor: number;
  className?: string;
  centsClassName?: string;
}) => {
  const text = formatCurrency(minor);
  const dot = text.lastIndexOf(".");
  return (
    <span className={className}>
      {dot === -1 ? text : text.slice(0, dot)}
      {dot !== -1 && <span className={centsClassName}>{text.slice(dot)}</span>}
    </span>
  );
};

const RankDelta = ({ direction, delta }: { direction?: string; delta: number }) => {
  if (!direction || direction === "flat" || direction === "new") {
    return direction === "new" ? (
      <span className="text-[12px] font-semibold text-[#1E9E5A]">New</span>
    ) : null;
  }
  const isUp = direction === "up";
  const Icon = isUp ? ArrowUp : ArrowDown;
  return (
    <span
      className={`flex items-center gap-[2px] text-[12px] font-semibold ${
        isUp ? "text-[#1E9E5A]" : "text-[#E5484D]"
      }`}
    >
      {isUp ? "+" : "-"}
      {delta.toLocaleString("en-US")}
      <Icon size={12} strokeWidth={2} />
    </span>
  );
};

const ComparisonText = ({
  comparison,
  suffix,
  showDirectionWord = true,
  className = "",
}: {
  comparison: Comparison;
  suffix: string;
  showDirectionWord?: boolean;
  className?: string;
}) => {
  if (!comparison || comparison.percentage === null) {
    return <p className={`text-[11px] leading-4 text-[#8B8D98] ${className}`}>No change {suffix.replace(/^than /, "from ")}</p>;
  }
  const Icon = comparison.positive ? Plus : Minus;
  const directionWord = comparison.positive ? "higher" : "lower";
  return (
    <p
      className={`flex items-center gap-[3px] text-[11px] leading-4 ${
        comparison.positive ? "text-[#1E9E5A]" : "text-[#E5484D]"
      } ${className}`}
    >
      <Icon size={12} strokeWidth={1.75} />
      {Math.abs(comparison.percentage)}% {showDirectionWord ? `${directionWord} ` : ""}
      {suffix}
    </p>
  );
};

const InlineDelta = ({ comparison }: { comparison: Comparison }) => {
  if (!comparison || comparison.percentage === null) return null;
  const Icon = comparison.positive ? ArrowUp : ArrowDown;
  return (
    <span
      className={`flex items-center text-[10px] font-semibold ${
        comparison.positive ? "text-[#1E9E5A]" : "text-[#E5484D]"
      }`}
    >
      {comparison.positive ? "+" : "-"}
      {Math.abs(comparison.percentage)}%
      <Icon size={10} strokeWidth={2} />
    </span>
  );
};

const ColumnHeader = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2 text-[10px] font-medium leading-3 text-[#1E1E20]">
    <span className="shrink-0">{label}</span>
    <span className="h-px flex-1 border-t border-dotted border-[#E4E4E7]" />
    <span className="shrink-0">{value}</span>
  </div>
);

const Sparkline = ({
  points,
  margin,
  className = "",
}: {
  points: Point[];
  margin: { top: number; bottom: number };
  className?: string;
}) => (
  <div className={`shrink-0 rounded-[8px] bg-[#F8F8FA] ${className}`}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={points} margin={{ ...margin, right: 0, left: 0 }}>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#34C38A"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const GAUGE = { width: 168, cx: 84, cy: 86, radius: 78, stroke: 11, innerRadius: 64 };

const polar = (angle: number, radius = GAUGE.radius) => {
  const rad = (angle * Math.PI) / 180;
  return { x: GAUGE.cx + radius * Math.cos(rad), y: GAUGE.cy - radius * Math.sin(rad) };
};

const arcPath = (fromAngle: number, toAngle: number, radius = GAUGE.radius) => {
  const start = polar(fromAngle, radius);
  const end = polar(toAngle, radius);
  const largeArc = fromAngle - toAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};

const EarningsGauge = ({ solo, team }: { solo: number; team: number }) => {
  const total = solo + team;
  // Angle between segment endpoints: visible 7px gap plus both round caps.
  const gapAngle = ((7 + GAUGE.stroke) / GAUGE.radius) * (180 / Math.PI);
  const split = total > 0 ? 180 - (solo / total) * 180 : 0;

  return (
    <svg
      width={GAUGE.width}
      height={GAUGE.cy}
      viewBox={`0 0 ${GAUGE.width} ${GAUGE.cy}`}
      className="block overflow-hidden"
      aria-hidden
    >
      <path d={arcPath(180, 0, GAUGE.innerRadius)} fill="none" stroke="#C5EFC2" strokeWidth={3} />
      {total === 0 ? (
        <path d={arcPath(186, -6)} fill="none" stroke="#CDEFCB" strokeWidth={GAUGE.stroke} strokeLinecap="round" />
      ) : (
        <>
          {solo > 0 && (
            <path
              d={arcPath(186, team > 0 ? split + gapAngle / 2 : -6)}
              fill="none"
              stroke="#6BA0FF"
              strokeWidth={GAUGE.stroke}
              strokeLinecap="round"
            />
          )}
          {team > 0 && (
            <path
              d={arcPath(solo > 0 ? split - gapAngle / 2 : 186, -6)}
              fill="none"
              stroke="#FF8E73"
              strokeWidth={GAUGE.stroke}
              strokeLinecap="round"
            />
          )}
        </>
      )}
    </svg>
  );
};

const ScoreRing = ({ score }: { score: number }) => {
  const size = 78;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative h-[78px] w-[78px] shrink-0">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#C9DAFF" strokeWidth={6} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0033FF"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
        />
        <circle cx={size / 2} cy={size / 2} r={28} fill="none" stroke="#B9CEFF" strokeWidth={2} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image src="/candyyy.webp" alt="" width={11} height={11} />
        <span className="text-[23px] font-semibold leading-[26px] tracking-[-0.02em] text-[#0033FF]">
          {score}
        </span>
      </div>
    </div>
  );
};

type RadarTickProps = {
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  payload?: { value: string };
};

const RadarTick = ({ x = 0, y = 0, cx = 0, cy = 0, payload }: RadarTickProps) => {
  const dx = x - cx;
  const dy = y - cy;
  const length = Math.hypot(dx, dy) || 1;
  const push = 2;
  const tx = x + (dx / length) * push;
  const ty = y + (dy / length) * push;
  const anchor = Math.abs(dx) < 4 ? "middle" : dx > 0 ? "start" : "end";
  return (
    <text x={tx} y={ty} textAnchor={anchor} dominantBaseline="central" fontSize={9} fill="#77787C">
      {payload?.value}
    </text>
  );
};

export default AnalyticsPage;
