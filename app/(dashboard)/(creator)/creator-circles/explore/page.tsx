"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiArrowLeft } from "react-icons/fi";

const EXPLORE_CIRCLES = [
  { id: 1, name: "PixelPerfect Toronto", rank: "250k", members: 3, logo: "/explore1.svg", badge: 3 },
  { id: 2, name: "Visionary Lab Sydney", rank: "300k", members: 2, logo: "/explore2.svg", badge: 3 },
  { id: 3, name: "Artistry Hub Berlin", rank: "180k", members: 6, logo: "/explore3.svg", badge: 3 },
  { id: 4, name: "DesignHub New York", rank: "150k", members: 5, logo: "/explore4.svg", badge: 4 },
  { id: 5, name: "Innovation Studio San Francisco", rank: "100k", members: 7, logo: "/explore5.svg", badge: 3 },
  { id: 6, name: "Creative Collective London", rank: "200k", members: 4, logo: "/explore6.svg", badge: 5 },
  { id: 7, name: "DesignHub New York", rank: "150k", members: 5, logo: "/explore1.svg", badge: 4 },
  { id: 8, name: "DesignHub New York", rank: "150k", members: 5, logo: "/explore2.svg", badge: 3 },
  { id: 9, name: "DesignHub New York", rank: "150k", members: 5, logo: "/explore3.svg", badge: 3 },
  { id: 10, name: "Artistry Hub Berlin", rank: "180k", members: 6, logo: "/explore4.svg", badge: 3 },
  { id: 11, name: "DesignHub New York", rank: "150k", members: 5, logo: "/explore5.svg", badge: 3 },
  { id: 12, name: "DesignHub New York", rank: "150k", members: 5, logo: "/explore6.svg", badge: 3 },
  { id: 13, name: "PixelPerfect Toronto", rank: "250k", members: 3, logo: "/explore1.svg", badge: 3 },
  { id: 14, name: "PixelPerfect Toronto", rank: "250k", members: 3, logo: "/explore2.svg", badge: 3 },
  { id: 15, name: "Innovation Studio San Francisco", rank: "100k", members: 7, logo: "/explore3.svg", badge: 3 },
  { id: 16, name: "Artistry Hub Berlin", rank: "180k", members: 6, logo: "/explore4.svg", badge: 3 },
  { id: 17, name: "Creative Collective London", rank: "200k", members: 4, logo: "/explore5.svg", badge: 3 },
  { id: 18, name: "Visionary Lab Sydney", rank: "300k", members: 2, logo: "/explore6.svg", badge: 3 },
];

export default function ExploreCircles() {
  return (
    <main className="min-h-screen bg-white ">
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
            placeholder="Search Trending Challenges"
            className="w-full bg-[#F8FAFC] border-none rounded-full py-4 pl-12 pr-6 text-sm focus:ring focus:ring-[#62636C] outline-none placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
        {EXPLORE_CIRCLES.map((circle) => (
          <div key={circle.id} className="group cursor-pointer">
            {/* LOGO CONTAINER */}
            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden  transition-transform">
              {/* Fallback background if images aren't present */}
              <div className="absolute inset-0" /> 
              <Image 
                src={circle.logo} 
                alt={circle.name} 
                fill 
                className="object-cover z-10"
              />
              
              {/* NOTIFICATION BADGE */}
              <div className="absolute bottom-4 right-4 z-20 w-7 h-7 bg-[#C9E9FF] border-[1px] border-white rounded-full flex items-center justify-center">
                <span className="text-[#050E81] text-[12px] font-semibold">{circle.badge}</span>
              </div>
            </div>

            {/* TEXT CONTENT */}
            <div className="space-y-1">
              <h3 className="text-[14px] font-semibold text-[#1E1F24] leading-tight line-clamp-1">
                {circle.name}
              </h3>
              <p className="text-[12px] text-[#747682] font-medium">
                Ranked {circle.rank} Globally
              </p>
              <p className="text-[12px] text-[#747682] font-medium">
                {circle.members} Members
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}