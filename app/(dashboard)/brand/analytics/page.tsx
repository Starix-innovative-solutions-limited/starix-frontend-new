"use client";

import React from "react";
import BactiveChallenges from "@/components/(brand)/analytics/BactiveChallenge";
import CreatorsInsight from "@/components/(brand)/analytics/CreatorsInsight";
import TopChallengeInsights from "@/components/(brand)/analytics/TopChallengeInsights";
import TopUGCQualityScores from "@/components/(brand)/analytics/TopUGCQualityScores";
// ✅ Import shared stats
import { DASHBOARD_STATS_DATA, DashboardStatCard } from "@/components/DashboardStats";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFF] p-8 lg:p-12 space-y-12">
      {/* 1. TOP SUMMARY STATS */}
      <section className="space-y-6">
        <h1 className="text-[28px] font-bold text-[#0A0A30]">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DASHBOARD_STATS_DATA.map((item) => (
            <DashboardStatCard key={item.key} item={item} />
          ))}
        </div>
      </section>

      {/* 2. CREATORS INSIGHTS */}
      <section className="space-y-6">
        <h2 className="text-[28px] font-normal text-[#0A0A30]">Creators Insights</h2>
        <CreatorsInsight />
      </section>

      {/* 3. MIDDLE ROW: 70/30 SPLIT (Matching Figma Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7 space-y-6">
         
            <h2 className="text-[28px] font-normal text-[#0A0A30]">Top Challenge Insights</h2>
            <TopChallengeInsights />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-[28px] font-normal text-[#0A0A30]">Top UGC Quality Scores</h2>
          <TopUGCQualityScores />
        </div>
      </div>

      {/* 4. BOTTOM SECTION */}
      <section className="space-y-6 pb-20">
        <h2 className="text-[28px] font-bold text-[#0A0A30]">Challenge Performance</h2>
        <div className="bg-white rounded-[32px] border border-[#F2F4F7] p-8 shadow-sm">
           <BactiveChallenges />
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;