"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FiChevronDown } from "react-icons/fi";
import Loader from "@/components/Loader";
import { useGetBrandOverview } from "@/hooks/useProfile";
import { type ChallengeItem, useGetBrandChallenges } from "@/hooks/useChallenges";

type PerformanceMetric = "engagements" | "submissions" | "participants";

const PERFORMANCE_METRICS: PerformanceMetric[] = [
  "engagements",
  "submissions",
  "participants",
];

const METRIC_CONFIG: Record<
  PerformanceMetric,
  { menuLabel: string; buttonLabel: string; barColor: string; cursorColor: string }
> = {
  engagements: {
    menuLabel: "Engagements",
    buttonLabel: "Engagement",
    barColor: "#9EC5FF",
    cursorColor: "rgba(158, 197, 255, 0.15)",
  },
  submissions: {
    menuLabel: "Submissions",
    buttonLabel: "Submissions",
    barColor: "#A8E6C4",
    cursorColor: "rgba(168, 230, 196, 0.2)",
  },
  participants: {
    menuLabel: "Participants",
    buttonLabel: "Participants",
    barColor: "#C5B8FF",
    cursorColor: "rgba(197, 184, 255, 0.2)",
  },
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] as const;

function formatCompactCount(value: number) {
  if (!Number.isFinite(value)) return "0";
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const compact = abs / 1_000_000;
    return `${compact % 1 === 0 ? compact.toFixed(0) : compact.toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    return new Intl.NumberFormat("en-US").format(Math.round(abs));
  }
  return String(Math.round(abs));
}

function formatRewards(value: number, symbol = "₦") {
  if (!Number.isFinite(value) || value <= 0) return `${symbol}0`;
  if (value >= 1_000_000) {
    return `${symbol}${(value / 1_000_000).toFixed(3)}M`;
  }
  if (value >= 1_000) {
    return `${symbol}${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return `${symbol}${Math.round(value).toLocaleString("en-NG")}`;
}

function truncateLabel(title: string, max = 11) {
  const trimmed = title.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd()}..`;
}

function challengeEngagement(challenge: ChallengeItem) {
  const views = Number(challenge.viewer_count) || 0;
  const shares = Number(challenge.share_count) || 0;
  const saves = Number(challenge.save_count) || 0;
  const derived = views + shares + saves;
  if (derived > 0) return derived;
  return Number(challenge.participant_count) || 0;
}

function challengeRewardMajor(challenge: ChallengeItem) {
  if (challenge.prize_pool_display) {
    const numeric = Number(String(challenge.prize_pool_display).replace(/[^\d.-]/g, ""));
    if (Number.isFinite(numeric)) return numeric;
  }
  return typeof challenge.prize_pool === "number" ? challenge.prize_pool / 100 : 0;
}

function publishedChallenges(challenges: ChallengeItem[]) {
  const publishedStatuses = new Set([
    "active",
    "published",
    "publishing",
    "judging",
    "completed",
    "closed",
  ]);

  return challenges.filter((challenge) => {
    const status = (challenge.status ?? "").toLowerCase();
    return (
      challenge.is_published ||
      challenge.is_funded ||
      publishedStatuses.has(status)
    );
  });
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] bg-[#F5F5F7] px-6 py-5">
      <p className="text-[16px] font-medium text-[#1E1F24]">{label}</p>
      <p className="mt-3 text-[26px] font-semibold leading-none tracking-[-0.03em] text-[#62636C]">
        {value}
      </p>
    </div>
  );
}

function DashboardTicketIcon() {
  return (
      <img src="/Brands Dp.svg" alt="Dashboard Ticket" width={48} height={48} />
    
  );
}

export default function Page() {
  const [performanceMetric, setPerformanceMetric] =
    useState<PerformanceMetric>("engagements");
  const [metricOpen, setMetricOpen] = useState(false);
  const metricMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!metricOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        metricMenuRef.current &&
        !metricMenuRef.current.contains(event.target as Node)
      ) {
        setMetricOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [metricOpen]);

  const { data: overview, isLoading: overviewLoading } = useGetBrandOverview();
  const { data: challengeData, isLoading: challengesLoading } =
    useGetBrandChallenges({ limit: 100, offset: 0 });

  const challenges = challengeData?.challenges ?? [];
  const visibleChallenges = useMemo(
    () => publishedChallenges(challenges),
    [challenges]
  );

  const totals = useMemo(() => {
    const totalChallenges =
      overview?.total_published_challenges ??
      challengeData?.total ??
      visibleChallenges.length;

    const totalParticipants = visibleChallenges.reduce(
      (sum, challenge) => sum + (Number(challenge.participant_count) || 0),
      0
    );

    const totalEngagement =
      overview?.total_engagement ??
      visibleChallenges.reduce(
        (sum, challenge) => sum + challengeEngagement(challenge),
        0
      );

    const totalRewards = visibleChallenges.reduce(
      (sum, challenge) => sum + challengeRewardMajor(challenge),
      0
    );

    return {
      totalChallenges,
      totalParticipants,
      totalEngagement,
      totalRewards,
    };
  }, [overview, challengeData?.total, visibleChallenges]);

  const performanceData = useMemo(() => {
    const metricValue = (challenge: ChallengeItem) => {
      if (performanceMetric === "submissions") {
        return Number(challenge.participant_count) || 0;
      }
      if (performanceMetric === "participants") {
        return Number(challenge.participant_count) || 0;
      }
      return challengeEngagement(challenge);
    };

    return [...visibleChallenges]
      .sort((a, b) => metricValue(b) - metricValue(a))
      .slice(0, 5)
      .map((challenge) => ({
        name: truncateLabel(challenge.title),
        value: metricValue(challenge),
      }));
  }, [visibleChallenges, performanceMetric]);

  const engagementTrend = useMemo(() => {
    const year = new Date().getFullYear();
    const points = MONTH_LABELS.map((label, index) => {
      const monthEnd = new Date(year, index + 1, 0, 23, 59, 59, 999);

      const value = visibleChallenges
        .filter((challenge) => {
          const created = new Date(challenge.created_at);
          return (
            Number.isFinite(created.getTime()) && created <= monthEnd
          );
        })
        .reduce((sum, challenge) => sum + challengeEngagement(challenge), 0);

      return { label, value };
    });

    return points;
  }, [visibleChallenges]);

  const latestEngagement =
    engagementTrend[engagementTrend.length - 1]?.value ?? totals.totalEngagement;

  const activeMetric = METRIC_CONFIG[performanceMetric];
  const isLoading = overviewLoading || challengesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] space-y-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-[#1E1F24]">
            Dashboard
          </h1>
          <p className="mt-1 text-[15px] text-[#747682]">
            Track your overall performance
          </p>
        </div>
        <DashboardTicketIcon />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Challenges"
          value={formatCompactCount(totals.totalChallenges)}
        />
        <StatCard
          label="Total Participants"
          value={formatCompactCount(totals.totalParticipants)}
        />
        <StatCard
          label="Total Engagement"
          value={formatCompactCount(totals.totalEngagement)}
        />
        <StatCard
          label="Total Rewards"
          value={formatRewards(totals.totalRewards)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className="rounded-[24px] border border-[#EEF0F4] bg-white px-6 py-5">
          <h2 className="text-[18px] font-semibold text-[#1E1F24]">
            Challenge Performance
          </h2>

          <div ref={metricMenuRef} className="relative mt-4 inline-block">
            <button
              type="button"
              onClick={() => setMetricOpen((open) => !open)}
              aria-expanded={metricOpen}
              aria-haspopup="listbox"
              className="inline-flex items-center gap-2 rounded-full border border-[#D7D9DE] bg-white px-4 py-2 text-[13px] font-medium text-[#62636C] transition hover:bg-[#FAFAFB]"
            >
              {activeMetric.buttonLabel}
              <FiChevronDown
                size={16}
                className={`transition ${metricOpen ? "rotate-180" : ""}`}
              />
            </button>

            {metricOpen && (
              <div
                role="listbox"
                className="absolute left-0 z-20 mt-2 min-w-[168px] overflow-hidden rounded-[14px] border border-[#EEF0F4] bg-white py-2 shadow-[0_12px_32px_rgba(16,24,40,0.12)]"
              >
                {PERFORMANCE_METRICS.map((metric) => {
                  const selected = performanceMetric === metric;
                  return (
                    <button
                      key={metric}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setPerformanceMetric(metric);
                        setMetricOpen(false);
                      }}
                      className={`block w-full px-4 py-2.5 text-left text-[14px] transition hover:bg-[#F8F8FA] ${
                        selected
                          ? "font-semibold text-[#1E1F24]"
                          : "font-normal text-[#62636C]"
                      }`}
                    >
                      {METRIC_CONFIG[metric].menuLabel}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 h-[250px] w-full">
            {performanceData.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-[16px] bg-[#FAFAFB] text-[13px] text-[#8B8D98]">
                Publish a challenge to see performance
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                  barCategoryGap="18%"
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#F0F1F4"
                    strokeDasharray="0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#747682" }}
                    interval={0}
                  />
                  <YAxis hide domain={[0, "auto"]} />
                  <Tooltip
                    cursor={{ fill: activeMetric.cursorColor }}
                    formatter={(value) => {
                      const numeric = Number(value) || 0;
                      return [
                        formatCompactCount(numeric),
                        activeMetric.menuLabel,
                      ];
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill={activeMetric.barColor}
                    radius={[10, 10, 10, 10]}
                    maxBarSize={42}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="rounded-[24px] border border-[#EEF0F4] bg-white px-6 py-5">
          <h2 className="text-[18px] font-semibold text-[#1E1F24]">
            Engagement Over Time
          </h2>
          <p className="mt-3 text-[34px] font-semibold leading-none tracking-[-0.03em] text-[#1E1F24]">
            {latestEngagement.toLocaleString("en-US")}
          </p>

          <div className="mt-6 h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={engagementTrend}
                margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#F0F1F4"
                  strokeDasharray="0"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#747682" }}
                />
                <YAxis hide domain={[0, "auto"]} />
                <Tooltip
                  formatter={(value) => [
                    (Number(value) || 0).toLocaleString("en-US"),
                    "Engagement",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0033FF"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "#0033FF" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
