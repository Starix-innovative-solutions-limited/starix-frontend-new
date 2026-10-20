"use client";

import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import CreateChallenge, {
  LOCAL_DRAFT_KEY,
} from "@/components/(brand)/challenge/CreateChallenge";
import ChallengeCreatedModal from "@/components/(brand)/challenge/ChallengeCreatedModal";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import BrandChallengeCard, {
  BrandChallengeCardData,
} from "@/components/(brand)/challenge/BrandChallengeCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useGetMe } from "@/hooks/useAuth";
import {
  ChallengeItem,
  ChallengeStatus,
  useBrandChallengeDetails,
  useGetBrandChallenges,
} from "@/hooks/useChallenges";
import Loader from "@/components/Loader";
import { variants } from "@/constant";
import { getChallengePreviewImages } from "@/lib/challengeMedia";
import { formatCompactNaira } from "@/lib/formatMoney";

const TABS = [
  { id: "active", label: "Active" },
  { id: "drafts", label: "Drafts" },
  { id: "completed", label: "Completed" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type LocalDraftSummary = {
  title: string;
  prizePool: number;
  images: string[];
};

function readLocalDraftSummary(): LocalDraftSummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      form?: { title?: string; prize_pool?: string };
      media?: Array<{ url?: string }>;
    };
    return {
      title: parsed.form?.title?.trim() || "Untitled challenge",
      prizePool: Number(parsed.form?.prize_pool) || 0,
      images:
        parsed.media
          ?.map((item) => item.url)
          .filter((url): url is string => Boolean(url)) ?? [],
    };
  } catch {
    return null;
  }
}

function formatPostedAgo(dateString?: string) {
  if (!dateString) return "Just now";
  const ms = Date.now() - new Date(dateString).getTime();
  if (Number.isNaN(ms) || ms < 0) return "Just now";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  const days = Math.floor(hours / 24);
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function formatClosesIn(endDate?: string) {
  if (!endDate) return null;
  const ms = new Date(endDate).getTime() - Date.now();
  if (Number.isNaN(ms)) return null;
  if (ms <= 0) return "Closed";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  if (hours < 24) return `Closes in ${Math.max(hours, 1)}h`;
  const days = Math.floor(hours / 24);
  return `Closes in ${days}d`;
}

function normalizeStatus(status?: string): TabId | "other" {
  const value = (status ?? "").toLowerCase();
  if (
    value === "active" ||
    value === "published" ||
    value === "publishing" ||
    value === "judging"
  ) {
    return "active";
  }
  if (value === "draft") return "drafts";
  if (value === "completed" || value === "closed") return "completed";
  return "other";
}

function mapChallengeToCard(
  challenge: ChallengeItem
): BrandChallengeCardData & { status: TabId | "other" } {
  const images = getChallengePreviewImages(challenge, 4);

  return {
    id: challenge.id,
    title: challenge.title,
    visibility: "Public",
    closesIn: formatClosesIn(challenge.end_date),
    // Brand dashboard cards always show Verified (list summaries omit is_funded).
    verified: true,
    postedAgo: formatPostedAgo(challenge.created_at),
    prizePool: formatCompactNaira(
      // API stores prize_pool in kobo; prize_pool_display is already major units.
      challenge.prize_pool_display ||
        (typeof challenge.prize_pool === "number"
          ? challenge.prize_pool / 100
          : 0),
      challenge.currency_symbol || "₦"
    ),
    submissions: challenge.participant_count ?? 0,
    images,
    status: normalizeStatus(challenge.status),
  };
}

function tabToApiStatus(tab: TabId): ChallengeStatus | undefined {
  // "active" includes published/publishing — fetch all and filter client-side.
  if (tab === "active") return undefined;
  if (tab === "drafts") return "draft";
  if (tab === "completed") return "completed";
  return undefined;
}

export default function Page() {
  const { open } = useModal();
  const queryClient = useQueryClient();
  const { profile: storeProfile, userType } = useAuthStore();
  const { data: me, isLoading: meLoading } = useGetMe();
  const [hasMounted, setHasMounted] = useState(false);
  const [localDraft, setLocalDraft] = useState<LocalDraftSummary | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("active");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setHasMounted(true);
    setLocalDraft(readLocalDraftSummary());
    const requestedTab = new URLSearchParams(window.location.search).get("tab");
    if (TABS.some((tab) => tab.id === requestedTab)) {
      setActiveTab(requestedTab as TabId);
    }
  }, []);

  const profile = me ?? storeProfile;
  const logoUrl =
    profile?.logo_url?.trim() ||
    profile?.profile_picture_url?.trim() ||
    undefined;
  const role = (
    profile?.user_type ||
    userType ||
    ""
  ).toLowerCase();
  const isBrand = role === "brand";
  const emailVerified = profile?.is_email_verified !== false;
  const canFetchBrandChallenges =
    hasMounted && !meLoading && isBrand && emailVerified;

  // Flutterwave (test/live) redirects here after checkout.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const funded = params.get("funded");
    const challengeId = params.get("challenge_id") || undefined;
    const status = (
      params.get("status") ||
      params.get("payment_status") ||
      ""
    ).toLowerCase();

    const success =
      funded === "1" ||
      status === "successful" ||
      status === "success" ||
      status === "completed";
    const failed =
      status === "cancelled" ||
      status === "canceled" ||
      status === "failed";

    if (!success && !failed) return;

    if (success) {
      open(
        <ChallengeCreatedModal challengeId={challengeId} />,
        { bare: true }
      );
    } else {
      toast.error("Payment was not completed. Challenge remains a draft.");
    }

    queryClient.invalidateQueries({ queryKey: ["brands", "challenges"] });
    queryClient.invalidateQueries({ queryKey: ["challenges"] });

    const url = new URL(window.location.href);
    [
      "funded",
      "challenge_id",
      "status",
      "payment_status",
      "tx_ref",
      "transaction_id",
    ].forEach((key) => url.searchParams.delete(key));
    window.history.replaceState({}, "", url.pathname + url.search);
  }, [open, queryClient]);

  const { data, isLoading, isError, error } = useGetBrandChallenges(
    {
      status: tabToApiStatus(activeTab),
      limit: 50,
      offset: 0,
    },
    { enabled: canFetchBrandChallenges }
  );

  const apiStatus = (error as { response?: { status?: number } })?.response
    ?.status;
  const apiDetail = (error as { response?: { data?: { detail?: unknown } } })
    ?.response?.data?.detail;
  const forbiddenDetail =
    typeof apiDetail === "string"
      ? apiDetail
      : "This account is not a verified brand.";

  const challengeIds = useMemo(
    () => (data?.challenges ?? []).map((c) => c.id),
    [data?.challenges]
  );

  const { byId: detailsById, isLoading: detailsLoading } =
    useBrandChallengeDetails(challengeIds, {
      enabled: challengeIds.length > 0,
    });

  const challenges = useMemo(() => {
    const items = (data?.challenges ?? []).map((summary) => {
      const detail = detailsById[summary.id];
      const merged: ChallengeItem = detail
        ? {
            ...summary,
            ...detail,
            media: detail.media ?? summary.media,
            is_funded: detail.is_funded ?? summary.is_funded,
            is_published: detail.is_published ?? summary.is_published,
            banner_url: detail.banner_url ?? summary.banner_url,
          }
        : summary;
      return mapChallengeToCard(merged);
    });
    const query = search.trim().toLowerCase();

    return items.filter((c) => {
      const matchesTab = c.status === activeTab;
      const matchesSearch =
        !query || c.title.toLowerCase().includes(query);
      return matchesTab && matchesSearch;
    });
  }, [data?.challenges, detailsById, activeTab, search]);

  const selectTab = (tab: TabId) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.pathname + url.search);
  };

  const handleOpenCreate = () => {
    open(
      <CreateChallenge
        onLocalDraftSaved={(title) => {
          setLocalDraft(
            readLocalDraftSummary() ?? { title, prizePool: 0, images: [] }
          );
          selectTab("drafts");
          setSearch("");
        }}
        onCreated={(challenge) => {
          setLocalDraft(null);
          selectTab(
            challenge.status?.toLowerCase() === "draft" ? "drafts" : "active"
          );
          setSearch("");
          void queryClient.refetchQueries({
            queryKey: ["brands", "challenges"],
          });
        }}
      />,
      { bare: true }
    );
  };

  const handleOpenLocalDraft = () => {
    open(
      <CreateChallenge
        onLocalDraftSaved={(title) => {
          setLocalDraft(
            readLocalDraftSummary() ?? { title, prizePool: 0, images: [] }
          );
          selectTab("drafts");
        }}
        onCreated={() => {
          setLocalDraft(null);
          selectTab("drafts");
          setSearch("");
          void queryClient.refetchQueries({
            queryKey: ["brands", "challenges"],
          });
        }}
      />,
      { bare: true }
    );
  };

  const handleOpenDraft = (challengeId: string) => {
    const draft = detailsById[challengeId];
    if (!draft) {
      toast.error("This draft is still loading. Please try again.");
      return;
    }

    open(
      <CreateChallenge
        draft={draft}
        onCreated={() => {
          selectTab("drafts");
          setSearch("");
          void queryClient.refetchQueries({
            queryKey: ["brands", "challenges"],
          });
        }}
      />,
      { bare: true }
    );
  };

  const showLocalDraft =
    activeTab === "drafts" &&
    Boolean(localDraft) &&
    (!search.trim() ||
      localDraft!.title.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants?.containerVariants}
        className="flex flex-col gap-6"
      >
        <motion.div
          variants={variants?.headerVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <h1 className="text-[28px] leading-tight font-semibold text-[#101828]">
              Challenges
            </h1>
            <p className="mt-1 text-[14px] text-[#62636C] sm:text-[15px]">
              Create and manage campaign-based challenges
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleOpenCreate}
              className="rounded-full p-3 text-[14px] font-semibold border border-[#8B8D98] text-[#1E1F24] transition-opacity hover:opacity-90"
            >
              Create Challenge
            </button>
            
          </div>
        </motion.div>

        <div className="scrollbar-none flex gap-6 overflow-x-auto border-b border-[#F2F4F7]">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => selectTab(tab.id)}
                className={`relative pb-3 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-[#101828]"
                    : "text-[#98A2B3] hover:text-[#62636C]"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="brandChallengesTab"
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#0033FF]"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative w-full">
          <FiSearch className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your Challenges"
            className="w-full rounded-full border border-[#E4E7EC] bg-white py-3 pr-4 pl-10 text-[14px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#0033FF] focus:ring-2 focus:ring-[#0033FF]/10"
          />
        </div>

        {hasMounted && (!isBrand || !emailVerified) && !meLoading ? (
          <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-6 py-8 text-center">
            <p className="text-[14px] font-semibold text-[#B54708]">
              {!isBrand
                ? "Brand challenges require a brand account"
                : "Verify your brand email to manage challenges"}
            </p>
            <p className="mt-2 text-[13px] text-[#62636C]">
              {!isBrand
                ? `You're signed in as “${role || "unknown"}”. Log out and sign in with your brand account.`
                : "Swagger requires a verified brand. Finish email verification, then reload this page."}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {!isBrand ? (
                <a
                  href="/login"
                  className="rounded-full bg-[#0033FF] px-5 py-2.5 text-[14px] font-semibold text-white"
                >
                  Switch account
                </a>
              ) : (
                <a
                  href={`/verify-email?role=brand&email=${encodeURIComponent(profile?.email || "")}`}
                  className="rounded-full bg-[#0033FF] px-5 py-2.5 text-[14px] font-semibold text-white"
                >
                  Verify email
                </a>
              )}
            </div>
          </div>
        ) : null}

        {(!hasMounted ||
          meLoading ||
          (canFetchBrandChallenges && (isLoading || detailsLoading))) && (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Loader />
            <p className="text-[13px] font-medium text-[#62636C]">
              Loading challenges...
            </p>
          </div>
        )}

        {canFetchBrandChallenges && isError && (
          <div className="rounded-2xl border border-red-100 bg-red-50/60 px-6 py-8 text-center">
            <p className="text-[14px] font-semibold text-[#D12B1F]">
              {apiStatus === 403
                ? "Brand account not allowed to list challenges"
                : "Could not load challenges. Please try again."}
            </p>
            <p className="mt-2 text-[13px] text-[#62636C]">
              {apiStatus === 403
                ? `${forbiddenDetail} Make sure you’re logged in as a brand with a verified email (and that /auth/me shows is_email_verified: true).`
                : "Check your connection and refresh."}
            </p>
            <p className="mt-3 text-[12px] text-[#98A2B3]">
              Account: {profile?.email || "—"} · role: {role || "—"} ·
              email verified: {String(profile?.is_email_verified)} ·
              verified: {String(profile?.is_verified)}
            </p>
          </div>
        )}

        {canFetchBrandChallenges &&
        !isLoading &&
        !detailsLoading &&
        !isError &&
        challenges.length === 0 &&
        !showLocalDraft ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E4E7EC] bg-white py-20 text-center">
            <p className="text-[16px] font-medium text-[#101828]">
              No challenges found
            </p>
            <p className="mt-1 text-[14px] text-[#62636C]">
              Try another tab or create a new challenge
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-5 rounded-full bg-[#0033FF] px-5 py-2.5 text-[14px] font-semibold text-white"
            >
              Create Challenge
            </button>
          </div>
        ) : null}

        {showLocalDraft ||
        (canFetchBrandChallenges &&
          !isLoading &&
          !detailsLoading &&
          !isError &&
          challenges.length > 0) ? (
          <motion.div
            variants={variants?.containerVariants}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {showLocalDraft && localDraft ? (
              <BrandChallengeCard
                challenge={{
                  id: "local-draft",
                  title: localDraft.title,
                  visibility: "Public",
                  verified: false,
                  postedAgo: "Saved locally",
                  prizePool: formatCompactNaira(localDraft.prizePool, "₦"),
                  submissions: 0,
                  images: localDraft.images,
                  status: "drafts",
                }}
                onOpenDraft={handleOpenLocalDraft}
              />
            ) : null}
            {!isError
              ? challenges.map((challenge) => (
                  <BrandChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onOpenDraft={handleOpenDraft}
                  />
                ))
              : null}
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}
