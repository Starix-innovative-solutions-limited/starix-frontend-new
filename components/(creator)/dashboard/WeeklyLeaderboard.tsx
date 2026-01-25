"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type LeaderboardUser = {
  rank: number;              // 1,2,3...
  username: string;          // "@Favvy"
  points: number;            // 1000
  avatarUrl?: string | null; // optional
  isYou?: boolean;           // highlight current user
};

const WeeklyLeaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // ✅ Backend dev should replace this with the real endpoint + response mapping
  const fetchLeaderboard = async (): Promise<LeaderboardUser[]> => {
    // Example:
    // const res = await fetch("/api/leaderboard/weekly");
    // if (!res.ok) throw new Error("Failed to load leaderboard");
    // const data = await res.json();
    // return data.users; // map to LeaderboardUser shape if needed

    // Placeholder mock (remove when wiring endpoint)
    return [
      { rank: 12, username: "@Favvy", points: 1000, isYou: true },
      { rank: 1, username: "@QueenBee", points: 8450 },
      { rank: 2, username: "@LolaUGC", points: 7920 },
      { rank: 3, username: "@KariCreates", points: 7010 },
      { rank: 4, username: "@JadeTalks", points: 6500 },
    ];
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchLeaderboard();
        if (!mounted) return;
        setUsers(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Something went wrong");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow border border-gray-100 w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b py-4 sm:py-5 border-[#6E6E6E33]">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src="/badge.svg"
            width={1000}
            height={1000}
            alt="badge"
            className="w-7 sm:w-8 shrink-0"
          />
          <span className="text-sm sm:text-base text-dark font-medium truncate">
            Weekly Leaderboard
          </span>
        </div>

        {/* Optional: right-side label */}
        <span className="text-xs sm:text-sm text-gray-400 shrink-0">
          Points
        </span>
      </div>

      {/* Body */}
      <div className="pt-4">
        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-4 w-10 bg-gray-100 rounded" />
                  <div className="w-10 h-10 bg-gray-100 rounded-full" />
                  <div className="h-4 w-28 bg-gray-100 rounded" />
                </div>
                <div className="h-6 w-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="p-4 rounded-xl border border-red-100 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && users.length === 0 && (
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-600 text-sm">
            No leaderboard data yet.
          </div>
        )}

        {/* List */}
        {!loading && !error && users.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            {users.map((creator, idx) => {
              const badgeText = creator.isYou ? "You" : null;

              return (
                <motion.div
                  key={`${creator.username}-${creator.rank}-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className={[
                    "flex items-center justify-between gap-3",
                    "p-3 sm:p-3.5 rounded-xl",
                    "transition-colors border border-gray-100",
                    "hover:bg-gray-50",
                    creator.isYou ? "bg-[#FFF8F5]" : "bg-white",
                  ].join(" ")}
                >
                  {/* Left */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="text-dark font-semibold w-10 shrink-0 text-sm sm:text-base">
                      #{creator.rank}
                    </span>

                    {/* Avatar */}
                    {creator.avatarUrl ? (
                      <Image
                        src={creator.avatarUrl}
                        alt={creator.username}
                        width={40}
                        height={40}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full shrink-0" />
                    )}

                    <span className="font-medium text-gray-800 text-sm sm:text-base truncate">
                      {creator.username}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {badgeText && (
                      <span className="bg-[#FFDECC] text-orange-600 text-[10px] sm:text-xs px-2 py-1 rounded-lg">
                        {badgeText}
                      </span>
                    )}

                    <span className="text-lg sm:text-2xl font-bold text-gray-800 tabular-nums">
                      {creator.points}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyLeaderboard;
