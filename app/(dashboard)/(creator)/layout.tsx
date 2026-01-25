'use client'

import React, { useEffect, useRef, useState } from "react";
import { Work_Sans } from "next/font/google";
import { SideBar, TopBar } from "@/components/(creator)/dashboard";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const CreatorDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

        // ignore tiny jitter
        const delta = current - last;

        // Scroll down => hide (after user has scrolled a bit)
        if (delta > 6 && current > 60) {
          setShowTopBar(false);
        }

        // Scroll up => show
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
    <main className={`${workSans.variable} bg-[#f5f5f5] h-screen`}>
      <div className="md:flex p-4 md:p-6 gap-6 h-full overflow-hidden">
        <SideBar className={"max-lg:hidden md:max-h-[95vh]"} />

        <div className="flex-1 flex flex-col h-full">
          {/* ✅ TopBar comes “a bit down” with top-3 */}
          <div
            className={`
              sticky top-3 z-50
              transition-all duration-300 ease-in-out
              ${showTopBar ? "translate-y-0 opacity-100" : "-translate-y-[140%] opacity-0 pointer-events-none"}
            `}
          >
            <TopBar />
          </div>

          {/* ✅ This is the real scroll container */}
          <div
            ref={scrollRef}
            className="flex-1 max-md:pt-4 md:p-8 md:py-12 overflow-y-auto scrollbar-none hide-sc"
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreatorDashboardLayout;
