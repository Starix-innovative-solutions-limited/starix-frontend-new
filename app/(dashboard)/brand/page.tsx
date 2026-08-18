"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

const STATS = [
  { label: "Total Challenges", value: "—" },
  { label: "Total Creators", value: "—" },
  { label: "Pending Reviews", value: "—" },
  { label: "Total UGC", value: "—" },
];

export default function Page() {
  const { profile } = useAuthStore();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-[28px] font-semibold text-[#101828]">
          Hello, {profile?.brand_name || "Brand"}
        </h1>
        <p className="mt-1 text-[14px] text-[#667085]">
          Track campaigns, review submissions, and grow your UGC pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#EEF0F4] bg-white p-5"
          >
            <p className="text-[13px] text-[#667085]">{stat.label}</p>
            <p className="mt-2 text-[24px] font-semibold text-[#101828]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#EEF0F4] bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Active Challenges
            </h2>
            <p className="mt-1 text-[14px] text-[#667085]">
              Manage and track your live campaigns
            </p>
          </div>
          <Link
            href="/brand/challenges"
            className="text-[14px] font-medium text-[#0033FF] hover:underline"
          >
            See all
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-[#E4E7EC] py-16 text-center">
          <p className="text-[15px] font-medium text-[#101828]">
            No active challenges yet
          </p>
          <p className="mt-1 text-[13px] text-[#667085]">
            Create your first challenge to get started
          </p>
          <Link
            href="/brand/challenges"
            className="mt-5 inline-block rounded-xl bg-[#0033FF] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Go to Challenges
          </Link>
        </div>
      </div>
    </div>
  );
}
