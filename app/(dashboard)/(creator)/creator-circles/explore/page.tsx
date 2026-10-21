"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useGetOpenCircles, type DiscoverableCircle } from "@/hooks/useCircles";
import JoinRequestModal from "@/components/(creator)/dashboard/JoinRequestModal";
import CircleMembershipButton from "@/components/(creator)/dashboard/CircleMembershipButton";

export default function ExploreCircles() {
  const router = useRouter();
  const { data: circles, isLoading } = useGetOpenCircles();

  const [searchQuery, setSearchQuery] = useState("");
  const [isJoinRequestModalOpen, setIsJoinRequestModalOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<DiscoverableCircle | null>(null);

  const filteredCircles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return circles.filter((c) => c.name?.toLowerCase().includes(query));
  }, [circles, searchQuery]);

  const openJoinRequest = (circle: DiscoverableCircle) => {
    setSelectedCircle(circle);
    setIsJoinRequestModalOpen(true);
  };

  const handleCircleClick = (circle: DiscoverableCircle) => {
    if (circle.membership === "member") {
      router.push(`/creator-circles/${circle.circle_id}/circle-profile`);
    } else if (circle.membership === "none") {
      openJoinRequest(circle);
    }
  };

  return (
    <main className="min-h-screen bg-white p-2">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <Link href="/creator-circles" className="inline-flex items-center text-gray-900 hover:opacity-70 transition-opacity mb-4">
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-[24px] font-semibold text-[#1E1F24]">Open Circles</h1>
          <p className="text-[#62636C] text-[12px] mt-1">
            Find and join creator groups that match your style and goals.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-[400px]">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={20} />
          <input
            type="text"
            placeholder="Search Circles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border-none rounded-full py-4 pl-12 pr-6 text-sm focus:ring focus:ring-[#62636C] outline-none placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading circles...</p>
        ) : filteredCircles.length > 0 ? (
          filteredCircles.map((circle) => (
            <div
              key={circle.circle_id}
              onClick={() => handleCircleClick(circle)}
              className={`group transition-transform ${
                circle.membership === "requested" ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <div className="relative aspect-square w-full rounded-[32px] overflow-hidden">
                <Image
                  src={circle.profile_picture_url || "/default-circle.webp"}
                  alt={circle.name || "Circle"}
                  fill
                  className="object-cover z-10"
                />
                <div className="absolute bottom-4 right-4 z-20 w-7 h-7 bg-[#C9E9FF] border-[1px] border-white rounded-full flex items-center justify-center">
                  <span className="text-[#050E81] text-[12px] font-semibold">
                    {circle.member_count}
                  </span>
                </div>
              </div>

              <div className="space-y-1 mt-3">
                <h3 className="text-[14px] font-semibold text-[#1E1F24] leading-tight line-clamp-1">
                  {circle.name}
                </h3>
                <p className="text-[12px] text-[#747682] font-medium">
                  Ranked #{circle.global_rank ?? "—"} Globally
                </p>
                <p className="text-[12px] text-[#747682] font-medium">
                  {circle.member_count} Members
                </p>
              </div>

              <CircleMembershipButton circle={circle} onJoin={openJoinRequest} className="mt-3 w-full" />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No circles found matching your search.</p>
        )}
      </div>

      <JoinRequestModal
        isOpen={isJoinRequestModalOpen}
        onClose={() => setIsJoinRequestModalOpen(false)}
        circleId={selectedCircle?.circle_id ?? ""}
        circleName={selectedCircle?.name ?? ""}
        circleLogo={selectedCircle?.profile_picture_url ?? undefined}
      />
    </main>
  );
}
