'use client'

import React, { useEffect, useRef, useState } from "react";
import { Work_Sans } from "next/font/google";
import { SideBar } from "@/components/(creator)/dashboard";
import RightSideBar from "@/components/(creator)/dashboard/RightSideBar";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const CreatorDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // State management for sidebars
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(true);

  // Logic: Opening Right closes Left
  const toggleRight = () => {
    const isOpening = rightCollapsed;
    setRightCollapsed(!rightCollapsed);
    if (isOpening) {
      setLeftCollapsed(true);
    }
  };

  // Logic: Opening Left closes Right
  const toggleLeft = () => {
    const isOpening = leftCollapsed;
    setLeftCollapsed(!leftCollapsed);
    if (isOpening) {
      setRightCollapsed(true);
    }
  };

  const [showTopBar, setShowTopBar] = useState(true);
  const lastScrollTop = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = el.scrollTop;
        const last = lastScrollTop.current;
        const delta = current - last;

        if (delta > 6 && current > 60) {
          setShowTopBar(false);
        }
        if (delta < -6) {
          setShowTopBar(true);
        }

        lastScrollTop.current = current;
        ticking.current = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className={`${workSans.variable} bg-[#fff] h-screen font-sans`}>
      <div className="flex p-4 md:p-6 gap-6 h-full overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <SideBar 
          collapsed={leftCollapsed} 
          setCollapsed={toggleLeft} 
          className="max-lg:hidden md:max-h-[95vh] transition-all duration-300" 
        />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          <div
            ref={scrollRef}
            className="flex-1 max-md:pt-4 md:p-8 md:py-12 overflow-y-auto scrollbar-none hide-sc"
          >
            {children}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <RightSideBar 
          collapsed={rightCollapsed} 
          setCollapsed={toggleRight}
          className="max-lg:hidden md:max-h-[95vh] transition-all duration-300"
        />
        
      </div>
    </main>
  );
};

export default CreatorDashboardLayout;