"use client";

import React, { useMemo, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import ChallengeCard from "./ChallengeCard";
import PostCard from "../PostCard";
import { useRouter } from "next/navigation";

type Challenge = {
  id: string;
  title: string;
  description: string;
  prize: string;     // "$400"
  timeLeft: string;  // "7 days"
  status?: "new" | "joined" | "post" | "submissions" | "winnings";
};

const ChallengeGrid = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [filterOpen, setFilterOpen] = useState(false);

  // ✅ Filter selection
  const [filter, setFilter] = useState<
    "ALL" | "PRIZE_HIGH" | "PRIZE_LOW" | "ENDING_SOON" | "NEWEST"
  >("ALL");

  // ✅ Dummy data for now (replace with API later)
  const challenges: Challenge[] = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => ({
        id: `ch_${i + 1}`,
        title: i % 2 === 0 ? "Tiktok Brand" : "Instagram UGC Sprint",
        description:
          "From brands running high-impact challenges to creators winning rewards and building...",
        prize: i % 3 === 0 ? "$1200" : i % 3 === 1 ? "$400" : "$150",
        timeLeft: i % 3 === 0 ? "2 days" : i % 3 === 1 ? "7 days" : "14 days",
        status:
          i % 5 === 0
            ? "joined"
            : i % 5 === 1
            ? "new"
            : i % 5 === 2
            ? "post"
            : i % 5 === 3
            ? "submissions"
            : "winnings",
      })),
    []
  );

  const tabs = [
    { id: 0, label: "New", count: "20+" },
    { id: 1, label: "Joined", count: "20" },
    { id: 2, label: "Post", count: "20" },
    { id: 3, label: "Submissions", count: "20" },
    { id: 4, label: "Winnings", count: "20" },
  ];

  // Helpers for filtering/sorting
  const parsePrize = (p: string) => Number(p.replace(/[^0-9.]/g, "")) || 0;
  const parseDays = (t: string) => {
    // expects "7 days", "2 days"
    const n = Number(t.split(" ")[0]);
    return Number.isFinite(n) ? n : 9999;
  };

  // ✅ Tab-filtered source list
  const tabFiltered = useMemo(() => {
    const tabKey =
      activeTab === 0
        ? "new"
        : activeTab === 1
        ? "joined"
        : activeTab === 2
        ? "post"
        : activeTab === 3
        ? "submissions"
        : "winnings";

    return challenges.filter((c) => c.status === tabKey);
  }, [activeTab, challenges]);

  // ✅ Apply filter choice (works now)
  const filtered = useMemo(() => {
    let list = [...tabFiltered];

    if (filter === "PRIZE_HIGH") {
      list.sort((a, b) => parsePrize(b.prize) - parsePrize(a.prize));
    }

    if (filter === "PRIZE_LOW") {
      list.sort((a, b) => parsePrize(a.prize) - parsePrize(b.prize));
    }

    if (filter === "ENDING_SOON") {
      list.sort((a, b) => parseDays(a.timeLeft) - parseDays(b.timeLeft));
    }

    if (filter === "NEWEST") {
      // Dummy newest: reverse list
      list.reverse();

      // 🔌 BACKEND DEV TO DO:
      // sort by created_at descending from API
    }

    // ALL => no sorting changes (keeps current order)
    return list;
  }, [filter, tabFiltered]);

  const onPickFilter = (next: typeof filter) => {
    setFilter(next);
    setFilterOpen(false);
  };

  return (
    <motion.div className="py-10 mt-5">
      {/* Tabs + Filter */}
      <motion.div className="flex items-center justify-between mb-8 gap-3">
        <div className="flex items-center justify-between gap-1 border-b-[0.4px] border-dark p-2 px-4 max-md:overflow-x-auto grow max-w-3xl scrollbar-none">
  {tabs.map((tab) => {
    const isActive = activeTab === tab.id;

    return (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        type="button"
        className={`
          flex items-center gap-2
          px-5 py-2
          text-sm font-medium
          whitespace-nowrap
          transition-all duration-200
          ${
            isActive
              ? "bg-white text-gray-500 rounded-full"   // ACTIVE → ellipse
              : "text-gray-500 hover:bg-gray-100 rounded-full"
          }
        `}
      >
        {tab.label}

        {tab.count !== undefined && (
          <span
            className={`
              text-xs px-2 py-[2px] rounded-full
              ${
                isActive
                  ? "bg-white text-gray-900 font-semibold"   // active badge
                  : "bg-white text-gray-400 border border-gray-200" // faint inactive badge
              }
            `}
          >
            {tab.count}
          </span>
        )}
      </button>
    );
  })}
</div>


        {/* ✅ Working Filter Dropdown */}
        <div className="relative">
         <button
            type="button"
            onClick={() => setFilterOpen((p) => !p)}
            className="
                flex items-center gap-2
                px-5 py-2.5
                text-gray-600
                hover:bg-gray-100
                rounded-full        /* makes ellipse */
                border border-gray-200
                bg-white
                transition-colors
            "
            >
            <IoFilterOutline className="text-lg" />
            <span className="text-sm font-medium">Filter</span>
            </button>


          {filterOpen && (
            <>
              {/* click-away overlay */}
              <button
                type="button"
                aria-label="close"
                onClick={() => setFilterOpen(false)}
                className="fixed inset-0 z-40"
              />

              <div className="absolute right-0 top-12 z-50 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm ${
                    filter === "ALL" ? "text-secondary-100 font-semibold" : "text-gray-700"
                  }`}
                  onClick={() => onPickFilter("ALL")}
                  type="button"
                >
                  All
                </button>

                <button
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm ${
                    filter === "NEWEST" ? "text-secondary-100 font-semibold" : "text-gray-700"
                  }`}
                  onClick={() => onPickFilter("NEWEST")}
                  type="button"
                >
                  Newest
                </button>

                <button
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm ${
                    filter === "ENDING_SOON"
                      ? "text-secondary-100 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => onPickFilter("ENDING_SOON")}
                  type="button"
                >
                  Ending soon
                </button>

                <button
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm ${
                    filter === "PRIZE_HIGH"
                      ? "text-secondary-100 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => onPickFilter("PRIZE_HIGH")}
                  type="button"
                >
                  Prize: High → Low
                </button>

                <button
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm ${
                    filter === "PRIZE_LOW"
                      ? "text-secondary-100 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => onPickFilter("PRIZE_LOW")}
                  type="button"
                >
                  Prize: Low → High
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={variants?.containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Tabs 0-1 show Challenges */}
        {activeTab <= 1 &&
          filtered.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              index={index}
              post={activeTab === 1}
              // ✅ enable ellipsis actions
              onView={() => router.push(`/challenges/${challenge.id}`)}
              onJoin={() => router.push(`/challenges/${challenge.id}?action=join`)}
              onLeaderboard={() => router.push(`/challenges/${challenge.id}/leaderboard`)}
            />
          ))}

        {/* Tabs 2+ show Posts */}
        {activeTab >= 2 &&
          filtered.slice(0, 6).map((c) => (
            <PostCard
              key={c.id}
              // ✅ tie filters to post display too
              viewSubmitLink={activeTab === 2}
              isWin={activeTab === 4}
              price={c.prize}
              // Optional: use the challenge id as the details link for now
              link={`/challenges/${c.id}`}

              // 🔌 BACKEND DEV TO DO:
              // Provide real postId + post link + shareUrl from API
            />
          ))}
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-500">
          No results for this tab + filter.
        </div>
      )}
    </motion.div>
  );
};

export default ChallengeGrid;
