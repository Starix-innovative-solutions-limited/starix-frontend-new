"use client";

import React, { useMemo, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import ChallengeCard from "./ChallengeCard";
import PostCard from "../PostCard";
import { useRouter } from "next/navigation";
import FilterModal from "./FilterModal"; // Path to your new FilterModal

// --- Types ---
type ChallengeStatus = "new" | "joined" | "post" | "submissions" | "winnings";

interface Challenge {
  id: string;
  title: string;
  description: string;
  prize: string;
  timeLeft: string;
  status: ChallengeStatus;
}

type FilterType = "ALL" | "PRIZE_HIGH" | "PRIZE_LOW" | "ENDING_SOON" | "NEWEST";

const ChallengeGrid = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("ALL");

  // ✅ Dummy data mapping
  const challenges: Challenge[] = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: `ch_${i + 1}`,
        title: i % 2 === 0 ? "Tiktok Brand Challenge" : "Instagram UGC Sprint",
        description: "From brands running high-impact challenges to creators winning rewards...",
        prize: i % 3 === 0 ? "$1200" : i % 3 === 1 ? "$400" : "$150",
        timeLeft: i % 3 === 0 ? "2 days" : i % 3 === 1 ? "7 days" : "14 days",
        status: (["new", "joined", "post", "submissions", "winnings"][i % 5]) as ChallengeStatus,
      })),
    []
  );

  const tabs = [
    { id: 0, label: "New", count: "20+", status: "new" },
    { id: 1, label: "Joined", count: "20", status: "joined" },
    { id: 2, label: "Post", count: "20", status: "post" },
    { id: 3, label: "Submissions", count: "20", status: "submissions" },
    { id: 4, label: "Winnings", count: "20", status: "winnings" },
  ];

  // --- Helpers ---
  const parsePrize = (p: string) => Number(p.replace(/[^0-9.]/g, "")) || 0;
  const parseDays = (t: string) => Number(t.split(" ")[0]) || 999;

  // ✅ Filter & Sort Logic
  const filteredData = useMemo(() => {
    const currentTabStatus = tabs[activeTab].status;
    let list = challenges.filter((c) => c.status === currentTabStatus);

    switch (filter) {
      case "PRIZE_HIGH":
        list.sort((a, b) => parsePrize(b.prize) - parsePrize(a.prize));
        break;
      case "PRIZE_LOW":
        list.sort((a, b) => parsePrize(a.prize) - parsePrize(b.prize));
        break;
      case "ENDING_SOON":
        list.sort((a, b) => parseDays(a.timeLeft) - parseDays(b.timeLeft));
        break;
      case "NEWEST":
        list.reverse();
        break;
      default:
        break;
    }
    return list;
  }, [activeTab, filter, challenges]);

  return (
    <motion.div className="py-10 mt-5">
      
      {/* --- TABS + FILTER HEADER --- */}
      <motion.div className="flex items-center justify-between mb-10 gap-4">
        
        {/* PILL TABS */}
        <div className="flex items-center gap-2 border-b-[0.5px] border-gray-100 p-2 overflow-x-auto grow max-w-4xl scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-all rounded-full ${
                  isActive ? "bg-white text-[#101828] shadow-sm ring-1 ring-gray-100" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-[#F9FAFB] text-[#101828] font-bold" : "bg-white text-gray-400 border border-gray-100"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FILTER TRIGGER */}
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 text-[#667085] hover:bg-gray-50 rounded-full border border-gray-200 bg-white transition-all shadow-sm shrink-0"
        >
          <IoFilterOutline className="text-lg" />
          <span className="text-sm font-semibold">Filter</span>
        </button>
      </motion.div>

      {/* --- CONTENT GRID --- */}
      <motion.div
        variants={variants?.containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* NEW & JOINED: SHOW CHALLENGE CARDS */}
        {activeTab <= 1 &&
          filteredData.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              index={index}
              post={activeTab === 1}
              onView={() => router.push(`/challenges/${challenge.id}`)}
              onJoin={() => router.push(`/challenges/${challenge.id}?action=join`)}
              onLeaderboard={() => router.push(`/challenges/${challenge.id}/leaderboard`)}
            />
          ))}

        {/* POST, SUBMISSIONS, WINNINGS: SHOW POST CARDS */}
        {activeTab >= 2 &&
          filteredData.map((c) => (
            <PostCard
              key={c.id}
              viewSubmitLink={activeTab === 2}
              isWin={activeTab === 4}
              price={c.prize}
              link={`/challenges/${c.id}`}
            />
          ))}
      </motion.div>

      {/* --- EMPTY STATE --- */}
      {filteredData.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-gray-400 text-lg">No challenges found in this category.</p>
        </div>
      )}

      {/* --- FILTER MODAL --- */}
      <FilterModal 
        isOpen={filterOpen} 
        onClose={() => setFilterOpen(false)} 
        onSave={(data: any) => {
          // You can map your specific Figma categories to your FilterTypes here
          setFilter("NEWEST"); 
          setFilterOpen(false);
        }}
      />
      
    </motion.div>
  );
};

export default ChallengeGrid;