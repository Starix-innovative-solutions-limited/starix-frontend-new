"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch as SearchIcon, FiSliders as FilterIcon } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import {
  useGetJoinedActiveChallenges,
  useGetJoinedCompletedChallenges,
  useGetSavedChallenges,
  type JoinedChallengeItem,
} from "@/hooks/useChallenges";
import Loader from "@/components/Loader";
import { formatCompactNaira } from "@/lib/formatMoney";

type ChallengesTab = "Active" | "Completed" | "Saved";

const PAGE_SIZE = 8;
const TABS: ChallengesTab[] = ["Active", "Completed", "Saved"];

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
  };
  if (labels[status]) return labels[status];
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
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
    case "approved":
      return "bg-[#ECFDF3] text-[#027A48]";
    case "in_progress":
      return "bg-[#EEF4FF] text-[#3538CD]";
    default:
      return "bg-[#F3F4F6] text-[#6B7280]";
  }
}

function prizeLabel(item: {
  prize_pool?: number;
  prize_pool_formatted?: string;
  currency?: string;
}) {
  if (typeof item.prize_pool === "number") {
    return formatCompactNaira(item.prize_pool / 100, "₦");
  }
  if (item.prize_pool_formatted) {
    return formatCompactNaira(item.prize_pool_formatted, "₦");
  }
  return "₦0";
}

function buildPageItems(current: number, total: number) {
  if (total <= 1) return [1];
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const items: Array<number | "ellipsis"> = [1];
  if (current > 3) items.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let page = start; page <= end; page += 1) items.push(page);

  if (current < total - 2) items.push("ellipsis");
  items.push(total);
  return items;
}

const ChallengesPage = () => {
  const [activeTab, setActiveTab] = useState<ChallengesTab>("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: activeData,
    isLoading: activeLoading,
    isError: activeError,
  } = useGetJoinedActiveChallenges(page, PAGE_SIZE, {
    enabled: activeTab === "Active",
  });

  const {
    data: completedData,
    isLoading: completedLoading,
    isError: completedError,
  } = useGetJoinedCompletedChallenges(page, PAGE_SIZE, {
    enabled: activeTab === "Completed",
  });

  const {
    data: savedData,
    isLoading: savedLoading,
    isError: savedError,
  } = useGetSavedChallenges(page, PAGE_SIZE, {
    enabled: activeTab === "Saved",
  });

  const isLoading =
    activeTab === "Active"
      ? activeLoading
      : activeTab === "Completed"
        ? completedLoading
        : savedLoading;

  const isError =
    activeTab === "Active"
      ? activeError
      : activeTab === "Completed"
        ? completedError
        : savedError;

  const currentPageData = useMemo(() => {
    if (activeTab === "Active") return activeData;
    if (activeTab === "Completed") return completedData;
    return savedData;
  }, [activeTab, activeData, completedData, savedData]);

  const normalizedChallenges = useMemo(() => {
    if (activeTab === "Active") {
      return (activeData?.items ?? []).map((item: JoinedChallengeItem) => ({
        id: item.challenge_id,
        title: item.title,
        brand_name: item.brand_name,
        brand_logo_url: item.brand_logo_url,
        prize: prizeLabel(item),
        status: item.status,
        statusLabel: formatStatusLabel(item.status),
      }));
    }

    if (activeTab === "Completed") {
      return (completedData?.items ?? []).map((item: JoinedChallengeItem) => ({
        id: item.challenge_id,
        title: item.title,
        brand_name: item.brand_name,
        brand_logo_url: item.brand_logo_url,
        prize: prizeLabel(item),
        status: item.status,
        statusLabel: formatStatusLabel(item.status),
      }));
    }

    return (savedData?.items ?? []).map((item) => ({
      id: item.challenge_id,
      title: item.title,
      brand_name: item.brand_name,
      brand_logo_url: item.brand_logo_url,
      prize: prizeLabel(item),
      status: "saved",
      statusLabel: "Saved",
    }));
  }, [activeTab, activeData, completedData, savedData]);

  const filteredChallenges = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return normalizedChallenges;
    return normalizedChallenges.filter(
      (challenge) =>
        challenge.title?.toLowerCase().includes(query) ||
        challenge.brand_name?.toLowerCase().includes(query)
    );
  }, [normalizedChallenges, searchQuery]);

  const totalPages = Math.max(
    1,
    currentPageData?.total_pages ??
      (currentPageData?.total_items
        ? Math.ceil(currentPageData.total_items / PAGE_SIZE)
        : 1)
  );
  const totalItems = currentPageData?.total_items ?? filteredChallenges.length;
  const pageItems = buildPageItems(page, totalPages);

  const handleTabChange = (tab: ChallengesTab) => {
    setActiveTab(tab);
    setPage(1);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white font-['Geist']">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="min-w-0">
          <h1 className="text-[22px] md:text-[24px] font-semibold text-[#101828] tracking-tight">
            Challenges
          </h1>
          <p className="text-[#667085] text-[13px] mt-1">
            {isLoading
              ? "Loading your challenges..."
              : `You have ${totalItems} ${
                  activeTab === "Active"
                    ? "active"
                    : activeTab === "Completed"
                      ? "completed"
                      : "saved"
                } challenge${totalItems === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 border border-[#D0D5DD] rounded-full text-[13px] font-medium text-[#344054] hover:bg-gray-50 transition-all cursor-pointer"
          >
            <FilterIcon className="text-base" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <div className="relative w-[160px] sm:w-[220px] md:w-[280px]">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085] text-base" />
            <input
              type="text"
              placeholder="Search Starix"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D0D5DD] rounded-full text-[13px] text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500/15"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 border-b border-[#EAECF0]">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={`relative pb-3 text-[14px] font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? "text-[#0033FF]"
                : "text-[#667085] hover:text-[#101828]"
            }`}
          >
            {tab}
            {activeTab === tab ? (
              <motion.div
                layoutId="challenges-active-tab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0033FF] rounded-full"
              />
            ) : null}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="w-full py-24 flex flex-col items-center justify-center gap-3">
          <Loader />
          <p className="text-xs text-[#667085] font-medium">
            Loading {activeTab.toLowerCase()} challenges...
          </p>
        </div>
      ) : null}

      {isError ? (
        <div className="w-full my-6 p-6 text-center bg-red-50/50 border border-red-100 rounded-[24px]">
          <p className="text-sm font-semibold text-[#D12B1F]">
            Couldn’t load {activeTab.toLowerCase()} challenges. Please try
            again.
          </p>
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {filteredChallenges.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center py-16 px-4 text-center"
              >
                <Image
                  src="/dashlogo.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="mb-4"
                />
                <h3 className="text-[#101828] text-[16px] font-semibold mb-1">
                  No {activeTab} Challenges
                </h3>
                <p className="text-[#667085] text-[13px] max-w-sm leading-relaxed">
                  {searchQuery
                    ? `No matches for “${searchQuery}”. Try a different search.`
                    : activeTab === "Active"
                      ? "Join a challenge and submit an entry to see it here."
                      : activeTab === "Completed"
                        ? "Completed challenges will show up here once judging finishes."
                        : "Save a challenge to keep it here for later."}
                </p>
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-5 px-5 py-2.5 bg-[#0033FF] hover:bg-blue-700 text-white font-semibold text-[13px] rounded-full transition cursor-pointer"
                  >
                    Clear Search
                  </button>
                ) : null}
              </motion.div>
            ) : (
              filteredChallenges.map((item) => (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-5 border-b border-[#EAECF0] hover:bg-[#F9FAFB]/40 transition-colors"
                >
                  <Link
                    href={`/dashboard/challenge/${item.id}`}
                    className="flex items-center gap-4 min-w-0 flex-1"
                  >
                    <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden border border-[#EAECF0] bg-[#F2F4F7] shrink-0">
                      <Image
                        src={item.brand_logo_url || "/dash-logo.svg"}
                        alt={item.brand_name || "Brand"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[#101828] font-semibold text-[14px] md:text-[15px] leading-snug truncate">
                        {item.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5 text-[12px] md:text-[13px] text-[#667085] font-medium">
                        <span className="truncate max-w-[120px] md:max-w-none">
                          {item.brand_name || "Brand"}
                        </span>
                        <GoCheckCircleFill
                          className="text-[#12B76A] shrink-0"
                          size={14}
                        />
                        <span className="text-[#D0D5DD]">•</span>
                        <span className="whitespace-nowrap">
                          {item.prize} prize pool
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="shrink-0">
                    {activeTab === "Saved" ? (
                      <Link
                        href={`/dashboard/challenge/${item.id}`}
                        className="inline-flex px-4 py-2 border border-[#D0D5DD] rounded-full text-[12px] font-semibold text-[#101828] hover:bg-white transition-all"
                      >
                        Continue Submission
                      </Link>
                    ) : (
                      <span
                        className={`inline-flex min-w-[110px] justify-center px-3 py-1.5 rounded-full text-[12px] font-semibold ${getStatusStyle(item.status)}`}
                      >
                        {item.statusLabel}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      ) : null}

      {!isLoading && !isError && filteredChallenges.length > 0 ? (
        <div className="flex items-center justify-between mt-8 pb-16">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-full text-[13px] font-medium text-[#344054] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <HiArrowLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {pageItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 text-center text-[#667085] text-sm"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  className={`h-9 w-9 rounded-lg text-[13px] font-semibold transition-colors ${
                    page === item
                      ? "bg-[#F2F4F7] text-[#101828]"
                      : "text-[#667085] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-full text-[13px] font-medium text-[#344054] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <HiArrowRight size={16} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ChallengesPage;
