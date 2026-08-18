"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useModal } from "@/hooks/useModal";
import CreateChallenge from "@/components/(brand)/challenge/CreateChallenge";

/* eslint-disable @typescript-eslint/no-explicit-any */
const QUICK_STATS = [
  { label: "Active Challenges", value: "12" },
  { label: "Pending Reviews", value: "48" },
  { label: "Total UGC", value: "1.2k" },
];

const RECENT_ACTIVITY = [
  { title: "New submission on Skincare Launch", time: "12m ago" },
  { title: "Challenge funded successfully", time: "1h ago" },
  { title: "Creator shortlisted for review", time: "3h ago" },
];

const RightSideBar = ({ className, collapsed, setCollapsed }: any) => {
  const pathname = usePathname();
  const { profile } = useAuthStore();
  const { open } = useModal();

  const isChallenges = pathname?.startsWith("/brand/challenges");
  const isSubmissions = pathname?.startsWith("/brand/submissions");
  const isAnalytics = pathname?.startsWith("/brand/analytics");
  const isPayments = pathname?.startsWith("/brand/payments");
  const isProfile = pathname?.startsWith("/brand/profile");

  const brandName = profile?.brand_name || "Brand";

  return (
    <aside
      className={`
        fixed md:static top-0 right-0 z-50
        h-screen bg-white border-l border-gray-100 flex flex-col
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[88px]" : "w-[416px]"}
        ${className}
      `}
    >
      <div
        className={`flex items-center gap-4 px-6 pt-6 pb-6 ${
          collapsed ? "flex-col justify-start" : "justify-between"
        }`}
      >
        <button
          type="button"
          onClick={setCollapsed}
          className={`shrink-0 transition-all duration-300 active:scale-95 ${
            collapsed
              ? "pointer-events-none translate-x-[-10px] opacity-0"
              : "opacity-100"
          }`}
        >
          <Image
            src="/close.svg"
            alt="Toggle Sidebar"
            width={40}
            height={40}
            className="object-contain"
          />
        </button>

        {!collapsed ? (
          <div className="relative flex-1">
            <FiSearch
              className="absolute top-1/2 left-4 -translate-y-1/2 text-[#9CA3AF]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Starix"
              className="w-full rounded-full border-none bg-[#F8FAFC] py-3 pr-4 pl-12 text-sm outline-none placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={setCollapsed}
            className="-translate-y-[150%] rounded-full bg-[#F8FAFC] p-3 text-[#9CA3AF] transition-all duration-300 hover:text-[#0047FF]"
          >
            <FiSearch size={20} />
          </button>
        )}
      </div>

      <div
        className={`no-scrollbar flex-1 space-y-6 overflow-y-auto p-6 ${
          collapsed ? "hidden" : "block"
        }`}
      >
        {isChallenges ? (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-[20px] font-semibold text-[#1E1F24]">
                Challenge Hub
              </h3>
              <p className="text-[13px] leading-relaxed text-[#747682]">
                Create, fund, and manage campaign challenges from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => open(<CreateChallenge />, { bare: true })}
              className="w-full rounded-full bg-[#0033FF] py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Create Challenge
            </button>

            <div className="rounded-[24px] border border-[#EFF0F3] bg-[#F9F9FB] p-5">
              <h4 className="mb-4 text-[15px] font-semibold text-[#1E1F24]">
                Quick tips
              </h4>
              <ul className="space-y-3 text-[13px] text-[#62636C]">
                <li>• Set a clear brief and prize pool</li>
                <li>• Keep challenges public for more reach</li>
                <li>• Review submissions within 48 hours</li>
              </ul>
            </div>
          </div>
        ) : isSubmissions ? (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-[20px] font-semibold text-[#1E1F24]">
                Review Queue
              </h3>
              <p className="text-[13px] text-[#747682]">
                Submissions waiting for your review.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F5F6F8] p-4">
                <p className="text-[12px] text-[#747682]">Pending</p>
                <p className="mt-1 text-[24px] font-semibold text-[#1E1F24]">48</p>
              </div>
              <div className="rounded-2xl bg-[#F5F6F8] p-4">
                <p className="text-[12px] text-[#747682]">Approved</p>
                <p className="mt-1 text-[24px] font-semibold text-[#1E1F24]">312</p>
              </div>
            </div>
          </div>
        ) : isAnalytics ? (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-[20px] font-semibold text-[#1E1F24]">
                Performance
              </h3>
              <p className="text-[13px] text-[#747682]">
                Snapshot of how your campaigns are performing.
              </p>
            </div>
            <div className="space-y-3">
              {QUICK_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-2xl border border-[#EFF0F3] px-4 py-3"
                >
                  <span className="text-[13px] text-[#62636C]">{stat.label}</span>
                  <span className="text-[16px] font-semibold text-[#1E1F24]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : isPayments ? (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-[20px] font-semibold text-[#1E1F24]">
                Wallet
              </h3>
              <p className="text-[13px] text-[#747682]">
                Challenge funding and payout overview.
              </p>
            </div>
            <div className="rounded-[24px] bg-[#0033FF] p-5 text-white">
              <p className="text-[13px] text-white/80">Available balance</p>
              <p className="mt-2 text-[28px] font-semibold">₦0.00</p>
            </div>
          </div>
        ) : isProfile ? (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-[20px] font-semibold text-[#1E1F24]">
                Brand Profile
              </h3>
              <p className="text-[13px] text-[#747682]">
                Keep your brand details up to date for creators.
              </p>
            </div>
            <div className="rounded-[24px] border border-[#EFF0F3] p-5">
              <p className="text-[15px] font-semibold text-[#1E1F24]">{brandName}</p>
              <p className="mt-1 text-[13px] text-[#747682]">
                {profile?.industry || "Add your industry"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="mb-1 text-[20px] font-semibold text-[#1E1F24]">
                Welcome, {brandName}
              </h3>
              <p className="text-[13px] text-[#747682]">
                Here&apos;s what&apos;s happening across your campaigns.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {QUICK_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#EFF0F3] bg-[#F9F9FB] px-4 py-3"
                >
                  <p className="text-[12px] text-[#747682]">{stat.label}</p>
                  <p className="mt-1 text-[22px] font-semibold text-[#1E1F24]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-[15px] font-semibold text-[#1E1F24]">
                  Recent activity
                </h4>
                <Link
                  href="/brand/submissions"
                  className="flex items-center gap-1 text-[12px] font-medium text-[#0033FF]"
                >
                  See all <HiArrowRight />
                </Link>
              </div>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#EFF0F3] px-4 py-3"
                  >
                    <p className="text-[13px] font-medium text-[#1E1F24]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[12px] text-[#98A2B3]">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSideBar;
