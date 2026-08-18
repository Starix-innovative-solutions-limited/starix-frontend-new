"use client";

import React, { useEffect, useRef, useState } from "react";
import { Work_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import { HiOutlineBars3 } from "react-icons/hi2";
import BrandSideBar from "@/components/(brand)/dashboard/BrandSideBar";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const BrandDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Expanded by default to match brand sidebar design
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isFlushProfileView = pathname === "/brand/profile";

  // Close mobile drawer on navigation; keep desktop expand/collapse preference
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <main
      className={`${workSans.variable} h-screen overflow-hidden bg-[#fff] font-sans`}
    >
      <div className="flex h-full overflow-hidden">
        <BrandSideBar
          collapsed={leftCollapsed}
          setCollapsed={setLeftCollapsed}
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          className="flex-shrink-0"
        />

        <div className="flex h-full min-w-0 flex-1 flex-col">
          {/* Mobile top bar — sidebar is a drawer below lg */}
          <div className="flex items-center gap-3 border-b border-[#F2F4F7] px-4 py-3 lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-xl p-2 text-[#344054] transition hover:bg-gray-50"
            >
              <HiOutlineBars3 size={24} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dash-logo.svg" alt="starix" className="h-7 w-auto" />
          </div>

          <div
            ref={scrollRef}
            className={`hide-sc scrollbar-none flex-1 overflow-y-auto ${
              isFlushProfileView ? "p-0" : "max-md:pt-4 md:p-8 md:py-6"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BrandDashboardLayout;
