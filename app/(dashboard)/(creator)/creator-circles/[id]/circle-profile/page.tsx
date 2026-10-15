"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { GoArrowLeft, GoArrowRight, GoCheckCircleFill } from "react-icons/go";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import {
  useGetCircleProfile,
  useGetCurrentUser,
  useGetCircleChallenges,
  type CircleChallengeFilter,
} from "@/hooks/useCircles";
import BannerUploadModal from "@/components/(creator)/dashboard/BannerUploadModal";
import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";
import SettingsModal from "@/components/(creator)/dashboard/SettingsModal";
import InviteMemberModal from "@/components/(creator)/dashboard/InviteMemberModal";
import { hasSocialOAuthCallback } from "@/lib/socialOAuth";
import { formatCompactNaira } from "@/lib/formatMoney";

const PLATFORM_ICON_MAP: Record<string, { icon: string; label: string }> = {
  youtube: { icon: "/yt.svg", label: "YouTube" },
  youtube_shorts: { icon: "/yt.svg", label: "YouTube" },
  instagram: { icon: "/ig.svg", label: "Instagram" },
  tiktok: { icon: "/tt.svg", label: "TikTok" },
};

const CHALLENGE_TABS: { id: CircleChallengeFilter; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "saved", label: "Saved" },
];

const CircleProfilePage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data: profile, isLoading } = useGetCircleProfile(id);
  const { data: currentUser } = useGetCurrentUser();
  const currentUserId = currentUser?.id;

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CircleChallengeFilter>("active");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (hasSocialOAuthCallback()) setIsConnectModalOpen(true);
  }, []);

  const circle = profile;

  const viewerRole =
    circle?.role ??
    circle?.members?.find((member) => member.user_id === currentUserId)?.role;
  const isAdmin =
    viewerRole === "admin" || viewerRole === "manager";

  const { data: challengesData, isLoading: isChallengesLoading } =
    useGetCircleChallenges(id, activeTab, page, 5, { enabled: !!id });

  const members = circle?.members ?? [];
  const visibleMembers = members.slice(0, 4);
  const extraMembers = Math.max(0, members.length - visibleMembers.length);

  const platforms = useMemo(() => {
    return (circle?.connected_platforms ?? [])
      .map((item) => (typeof item === "string" ? item : item.platform))
      .filter(Boolean);
  }, [circle?.connected_platforms]);

  const niches = circle?.niches ?? [];
  const activeChallengeCount = circle?.active_challenge_count ?? 0;
  const challengeTotal =
    activeTab === "active"
      ? activeChallengeCount
      : challengesData?.total_items ?? 0;
  const totalPages = Math.max(1, challengesData?.total_pages ?? 1);

  const visibleChallenges = useMemo(() => {
    const items = challengesData?.items ?? [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.brand_name.toLowerCase().includes(query)
    );
  }, [challengesData?.items, searchQuery]);

  const earningsMinor = circle?.all_time_earnings_minor ?? 0;
  const earningsLabel = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(earningsMinor / 100);

  const views = circle?.all_time_views ?? 0;
  const viewsLabel =
    views >= 1_000_000
      ? `${(views / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
      : views >= 1_000
        ? `${Math.round(views / 1000)}K`
        : String(views);

  const viewsDelta = circle?.views_delta_percentage ?? 0;
  const viewsDirection = circle?.views_direction ?? (viewsDelta > 0 ? "up" : viewsDelta < 0 ? "down" : "flat");
  const circleScore = Math.round(circle?.circle_score ?? 0);

  if (isLoading) {
    return <div className="p-20 text-center text-sm text-[#747682]">Loading Circle Profile...</div>;
  }
  if (!circle) {
    return <div className="p-20 text-center text-red-500">Circle not found.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-white font-sans text-[#1E1F24] antialiased">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        circleId={id}
        currentData={id}
      />
      <BannerUploadModal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
        circleId={id}
      />
      <ConnectSocialsModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        circleId={id}
      />
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        circleId={id}
      />

      <div className="relative h-[178px] w-full overflow-hidden bg-[#EAF2FF]">
        {circle.banner_url ? (
          <Image
            src={circle.banner_url}
            alt={`${circle.name} cover`}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-[#EAF2FF]" aria-label="No banner image" />
        )}
        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsBannerModalOpen(true)}
            className="absolute inset-0 cursor-pointer"
            aria-label="Upload banner"
          />
        )}
      </div>

      <main className="relative px-8 pb-10">
        <section className="relative pt-[72px]">
          <div className="absolute -top-[78px] left-0">
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-[28px] bg-[#F5F6F8] shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
              {circle.profile_picture_url ? (
                <Image
                  src={circle.profile_picture_url}
                  alt={circle.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#F5F6F8] text-4xl font-semibold uppercase text-[#62636C]">
                  {circle.name?.charAt(0) ?? "?"}
                </div>
              )}
            </div>
          </div>

          <div className="absolute right-0 top-4 z-20 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(true)}
              className="h-[40px] rounded-full border border-[#8B8D98] bg-white px-5 text-[13px] font-medium text-[#1E1F24] transition hover:bg-gray-50"
            >
              Invite Member
            </button>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#8B8D98] bg-white hover:bg-gray-50"
              aria-label="Circle settings"
            >
              <Image
                src="/vectros.webp"
                alt="Settings"
                width={20}
                height={22}
                unoptimized
              />
            </button>
          </div>

          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.04em] text-[#111217]">
            {circle.name}
          </h1>

          <div className="relative mt-3 inline-flex">
            <div className="group relative">
              <div className="flex cursor-pointer items-center -space-x-2">
                {visibleMembers.map((member) => (
                  <div
                    key={member.user_id}
                    className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-[#F5F6F8]"
                  >
                    {member.profile_picture_url ? (
                      <img
                        src={member.profile_picture_url}
                        alt={member.username ?? "Member"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#E5E7EB]" />
                    )}
                  </div>
                ))}
                {extraMembers > 0 && (
                  <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#C9E9FF] text-[10px] font-semibold text-[#050E81]">
                    +{extraMembers}
                  </div>
                )}
              </div>

              <div className="pointer-events-none absolute top-full left-0 z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-3 opacity-0 shadow-xl transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                <p className="mb-2 px-2 text-[12px] font-semibold text-gray-400">
                  Circle Members
                </p>
                {members.map((member) => (
                  <div
                    key={member.user_id}
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50"
                  >
                    <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                      {member.profile_picture_url && (
                        <img
                          src={member.profile_picture_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="text-[12px]">
                      <p className="font-medium">
                        {member.username ?? member.full_name ?? "Member"}
                      </p>
                      <p className="text-[10px] capitalize text-gray-500">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-2 text-[13px] font-medium text-[#747682]">
            <span className="font-semibold text-[#1E1F24]">{activeChallengeCount}</span>{" "}
            Active Challenges
            <span className="mx-2 text-[#D9D9D9]">•</span>
            {circle.global_rank
              ? `Ranked ${circle.global_rank} Globally`
              : "Unranked"}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {platforms.map((platform) => {
              const meta = PLATFORM_ICON_MAP[platform.toLowerCase()];
              if (!meta) return null;
              return (
                <img
                  key={platform}
                  src={meta.icon}
                  alt={meta.label}
                  title={meta.label}
                  className="h-6 w-6"
                />
              );
            })}

            {niches.map((niche) => (
              <span
                key={niche}
                className="rounded-full bg-[#F5FBFF] px-2.5 py-1 text-[12px] font-medium capitalize text-[#3379A5]"
              >
                {niche}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          <button
            type="button"
            onClick={() =>
              router.push(`/creator-circles/${id}/circle-profile/earnings`)
            }
            className="h-[140px] rounded-[14px] bg-[#E8FFE9] p-5 text-left transition hover:brightness-[0.99]"
          >
            <div className="mb-3 flex items-center gap-2">
              <img src="/coin.svg" alt="" className="h-5 w-5 object-contain" />
              <h3 className="text-[18px] font-semibold tracking-[-0.03em]">
                Total Earnings
              </h3>
            </div>
            <p className="text-[30px] font-semibold leading-none tracking-[-0.05em]">
              {earningsLabel}
            </p>
            <p className="mt-3 flex items-center gap-2 text-[13px] font-medium text-[#62636C]">
              View History <GoArrowRight size={18} />
            </p>
          </button>

          <button
            type="button"
            onClick={() => router.push("/analytics")}
            className="relative h-[140px] overflow-hidden rounded-[14px] bg-[#FFF0FD] p-5 text-left transition hover:brightness-[0.99]"
          >
            <div className="mb-3 flex items-center gap-2">
              <img src="/diamonddd.svg" alt="" className="h-5 w-5 object-contain" />
              <h3 className="text-[18px] font-semibold tracking-[-0.03em]">
                Total Engagement
              </h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[30px] font-semibold leading-none tracking-[-0.05em]">
                {viewsLabel}
              </span>
              <span className="text-[12px] font-medium text-[#747682]">Views</span>
            </div>
            <p className="mt-3 flex items-center gap-2 text-[13px] font-medium text-[#62636C]">
              View Trend <GoArrowRight size={18} />
            </p>
            <div className="absolute bottom-5 right-5 h-[48px] w-[105px]">
              <div className="mb-1 text-right text-[10px] font-semibold">
                {viewsDirection === "down" ? (
                  <span className="text-[#EF4444]">{Math.abs(viewsDelta)}% ↓</span>
                ) : viewsDirection === "up" ? (
                  <span className="text-[#0CC963]">{viewsDelta}% ↑</span>
                ) : (
                  <span className="text-[#9CA3AF]">0% ↑</span>
                )}
              </div>
              <img src="/Stroke.svg" alt="" className="h-[32px] w-full object-contain" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => router.push("/analytics")}
            className="flex h-[140px] items-center justify-between rounded-[14px] bg-[#EAF6FF] p-5 text-left transition hover:brightness-[0.99]"
          >
            <div className="min-w-0 pr-3">
              <div className="mb-2 flex items-center gap-2">
                <img src="/dashlogo.webp" alt="" className="h-5 w-5 object-contain" />
                <h3 className="text-[18px] font-semibold tracking-[-0.03em]">
                  Circle Score
                </h3>
              </div>
              <p className="max-w-[190px] text-[10px] leading-tight text-[#62636C]">
                Circle score is the average of the starix score of all the members.
              </p>
              <p className="mt-3 flex items-center gap-2 text-[13px] font-medium text-[#62636C]">
                View Breakdown <GoArrowRight size={18} />
              </p>
            </div>
            <ScoreRing score={circleScore} />
          </button>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#1E1F24]">
              Circle Challenges ({challengeTotal})
            </h2>
            <div className="relative w-[220px]">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B8D98]" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search Challenges"
                className="h-[44px] w-full rounded-full border border-[#E5E7EB] bg-white pl-12 pr-5 text-[13px] font-medium text-[#1E1F24] outline-none placeholder:text-[#747682]"
              />
            </div>
          </div>

          <div className="mb-2 flex items-center gap-8 border-b border-[#EAECF0]">
            {CHALLENGE_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "active"
                  ? activeChallengeCount
                  : isActive
                    ? challengesData?.total_items
                    : undefined;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setPage(1);
                    setSearchQuery("");
                  }}
                  className={`relative pb-3 text-[14px] font-medium transition-colors ${
                    isActive ? "text-[#0033FF]" : "text-[#667085] hover:text-[#101828]"
                  }`}
                >
                  {tab.label}
                  {typeof count === "number" ? ` (${count})` : ""}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#0033FF]" />
                  )}
                </button>
              );
            })}
          </div>

          {isChallengesLoading ? (
            <div className="py-16 text-center text-sm text-[#747682]">
              Loading challenges...
            </div>
          ) : visibleChallenges.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <img src="/circle.svg" alt="" className="mb-6 h-[120px] w-[120px]" />
              <h3 className="mb-2 text-[20px] font-semibold">No {activeTab} challenges</h3>
              <p className="mb-8 max-w-[400px] text-[14px] text-[#62636C]">
                {searchQuery
                  ? `No matches for “${searchQuery}”.`
                  : "Your team hasn't joined any challenges yet."}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => router.push("/challenges/recommended")}
                  className="rounded-full bg-[#0033FF] px-6 py-3 font-semibold text-[#FAFAFA]"
                >
                  Find Challenges
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[#EFF0F3] border-y border-[#EFF0F3]">
              {visibleChallenges.map((item) => (
                <ChallengeRow key={item.challenge_id} item={item} />
              ))}
            </div>
          )}

          {visibleChallenges.length > 0 && (
            <div className="mt-5 flex items-center justify-between">
              <button
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-[44px] items-center gap-2 rounded-full border border-[#8B8D98] bg-white px-6 text-[14px] font-medium text-[#62636C] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous <GoArrowLeft size={18} />
              </button>

              <div className="flex items-center gap-3 text-[14px] font-medium text-[#62636C]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#1E1F24]">
                  {page}
                </span>
                {totalPages > 1 && (
                  <>
                    <span>...</span>
                    <span>{totalPages}</span>
                  </>
                )}
              </div>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                className="flex h-[44px] items-center gap-2 rounded-full border border-[#8B8D98] bg-white px-6 text-[14px] font-medium text-[#62636C] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <GoArrowRight size={18} />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const ScoreRing = ({ score }: { score: number }) => {
  const clampedScore = Math.min(100, Math.max(0, Math.round(score)));

  return (
    <div className="relative h-[82px] w-[82px] shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="76%"
          outerRadius="100%"
          data={[{ value: clampedScore }]}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={20}
            fill="#245BFF"
            background={{ fill: "#C5D8FF" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[26px] font-semibold tracking-[-0.04em] text-[#245BFF]">
        {clampedScore}
      </div>
    </div>
  );
};

function formatStatusLabel(status?: string) {
  if (!status) return "Active";
  const labels: Record<string, string> = {
    awaiting_review: "Awaiting Review",
    under_review: "Under Review",
    in_progress: "In Progress",
    approved: "Approved",
    not_qualified: "Not Qualified",
    ranked: "Ranked",
    winner: "Winner",
    finalist: "Finalist",
    saved: "Saved",
  };
  if (labels[status]) return labels[status];
  return status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusStyle(status?: string) {
  switch (status?.toLowerCase()) {
    case "winner":
      return "bg-[#ECFDF3] text-[#027A48]";
    case "ranked":
      return "bg-[#F9F0FF] text-[#9E77ED]";
    case "finalist":
      return "bg-[#EFF8FF] text-[#175CD3]";
    case "under_review":
    case "awaiting_review":
      return "bg-[#FFFAEB] text-[#B54708]";
    case "not_qualified":
      return "bg-[#FEF3F2] text-[#B42318]";
    default:
      return "bg-[#F3F4F6] text-[#6B7280]";
  }
}

const ChallengeRow = ({
  item,
}: {
  item: {
    challenge_id: string;
    title: string;
    brand_name: string;
    brand_logo_url: string | null;
    prize_pool: number;
    status: string;
  };
}) => {
  const prize = formatCompactNaira(item.prize_pool / 100, "₦");

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <Link
        href={`/dashboard/challenge/${item.challenge_id}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#EAECF0] bg-[#F2F4F7]">
          <Image
            src={item.brand_logo_url || "/dash-logo.webp"}
            alt={item.brand_name || "Brand"}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold leading-snug text-[#101828]">
            {item.title}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-[#667085]">
            <span className="truncate">{item.brand_name || "Brand"}</span>
            <GoCheckCircleFill className="shrink-0 text-[#12B76A]" size={14} />
            <span className="text-[#D0D5DD]">•</span>
            <span className="whitespace-nowrap">{prize} prize pool</span>
          </div>
        </div>
      </Link>
      <span
        className={`inline-flex min-w-[110px] justify-center rounded-full px-3 py-1.5 text-[12px] font-semibold ${getStatusStyle(item.status)}`}
      >
        {formatStatusLabel(item.status)}
      </span>
    </div>
  );
};

export default function CircleProfileRoute() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-sm text-gray-400">Loading circle...</div>
      }
    >
      <CircleProfilePage />
    </Suspense>
  );
};
