'use client'

import React, { useEffect, useRef, useState } from "react";
import { Work_Sans } from "next/font/google";
import { usePathname } from "next/navigation"; 
import { SideBar } from "@/components/(creator)/dashboard";
import RightSideBar from "@/components/(creator)/dashboard/RightSideBar";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const CreatorDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); 

  // State management for sidebars — both initialized to true so they start closed on load
  const [leftCollapsed, setLeftCollapsed] = useState(true);
  const [rightCollapsed, setRightCollapsed] = useState(true);

  // Check if we are currently inside any of the circle route variations
  const isCircleRoute = pathname?.startsWith('/creator-circle') || pathname?.startsWith('/creator-circles');
  
  /* Updated to isolate BOTH the circle-profile view and the standard user profile view 
    for zero-padding flush alignment against layout borders.
  */
  const isFlushProfileView = 
    pathname?.includes('/creator-circles/circle-profile') || 
    pathname === '/profile' || 
    pathname?.endsWith('/profile');

  // Handle route-specific behavior when path changes
  useEffect(() => {
    if (isCircleRoute) {
      setLeftCollapsed(true);       // Keeps left sidebar collapsed
      setRightCollapsed(true);      // Force right sidebar to stay closed on creator circle page load
    } else {
      setLeftCollapsed(true);       
      setRightCollapsed(true);
    }
  }, [pathname, isCircleRoute]);

  const toggleRight = () => {
    setRightCollapsed(prev => {
      const nextState = !prev;
      if (!nextState && isCircleRoute) {
        setLeftCollapsed(true);
      }
      return nextState;
    });
  };

  const toggleLeft = () => {
    setLeftCollapsed(prev => {
      const nextState = !prev;
      if (!nextState) {
        setRightCollapsed(true); 
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
    <main className={`${workSans.variable} bg-[#fff] h-screen font-sans overflow-hidden`}>
      <div className="flex h-full overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <SideBar 
          collapsed={leftCollapsed} 
          setCollapsed={toggleLeft} 
          className="max-lg:hidden md:max-h-[95vh] transition-all duration-300 flex-shrink-0" 
        />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          <div
            ref={scrollRef}
            /* When on a profile page view, padding is exactly 'p-0' so your banner 
              stretches and touches both sidebars seamlessly without layout gaps.
            */
            className={`flex-1 overflow-y-auto scrollbar-none hide-sc  ${
              isFlushProfileView 
                ? "p-0" 
                : "max-md:pt-4 md:p-8 md:py-6"
            }`}
          >
            {children}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
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