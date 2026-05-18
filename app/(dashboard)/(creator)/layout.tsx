'use client'

import React, { useEffect, useRef, useState } from "react";
import { Work_Sans } from "next/font/google";
import { usePathname } from "next/navigation"; // Added to monitor the route
import { SideBar } from "@/components/(creator)/dashboard";
import RightSideBar from "@/components/(creator)/dashboard/RightSideBar";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const CreatorDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); // Initialize the pathname hook

  // State management for sidebars
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(true);

  // Check if we are currently inside the circle routes
  const isCircleRoute = pathname?.startsWith('/creator-circle');

  // Handle route-specific behavior when path changes
  useEffect(() => {
    if (isCircleRoute) {
      setLeftCollapsed(true);       // Collapse left sidebar
      setRightCollapsed(false);     // Expand right sidebar
    } else {
      // Optional defaults for non-circle routes
      setLeftCollapsed(false);
      setRightCollapsed(true);
    }
  }, [pathname, isCircleRoute]);

  // Modified toggle controls based on your logic rules
  const toggleRight = () => {
    setRightCollapsed(prev => {
      const nextState = !prev;
      // If we are opening the right sidebar on a circle route, keep left sidebar collapsed
      if (!nextState && isCircleRoute) {
        setLeftCollapsed(true);
      }
      return nextState;
    });
  };

  const toggleLeft = () => {
    setLeftCollapsed(prev => {
      const nextState = !prev;
      // If the left sidebar button is clicked to OPEN (collapsed becomes false)
      if (!nextState) {
        setRightCollapsed(true); // Automatically close the right sidebar
      }
      return nextState;
    });
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
      <div className="flex h-full overflow-hidden">
        
        {/* LEFT SIDEBAR - Controlled via updated toggleLeft */}
        <SideBar 
          collapsed={leftCollapsed} 
          setCollapsed={toggleLeft} 
          className="max-lg:hidden md:max-h-[95vh] transition-all duration-300 flex-shrink-0" 
        />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          <div
            ref={scrollRef}
            className="flex-1 max-md:pt-4 md:p-8 md:py-6 overflow-y-auto scrollbar-none hide-sc"
          >
            {children}
          </div>
        </div>

        {/* RIGHT SIDEBAR - Controlled via updated toggleRight */}
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