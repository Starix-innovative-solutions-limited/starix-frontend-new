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

  // Simplified toggles: independent of each other
  const toggleRight = () => {
    setRightCollapsed(prev => !prev);
  };

  const toggleLeft = () => {
    setLeftCollapsed(prev => !prev);
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
      <div className="flex   h-full overflow-hidden">
        
        {/* LEFT SIDEBAR - Added flex-shrink-0 */}
        <SideBar 
          collapsed={leftCollapsed} 
          setCollapsed={toggleLeft} 
          className="max-lg:hidden md:max-h-[95vh] transition-all duration-300 flex-shrink-0" 
        />

        {/* MAIN CONTENT - min-w-0 allows it to shrink when both sidebars are open */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          <div
            ref={scrollRef}
            className="flex-1 max-md:pt-4 md:p-8 md:py-6 overflow-y-auto scrollbar-none hide-sc"
          >
            {children}
          </div>
        </div>

        {/* RIGHT SIDEBAR - Added flex-shrink-0 */}
        <RightSideBar 
          collapsed={rightCollapsed} 
          setCollapsed={toggleRight}
          className="max-lg:hidden md:max-h-[95vh] transition-all duration-300 flex-shrink-0"
        />
        
      </div>
    </main>
  );
};

export default CreatorDashboardLayout;