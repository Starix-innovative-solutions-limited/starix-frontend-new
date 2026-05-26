"use client";

import React, { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// =========================================================================
// 1. DATA DICTIONARIES (Maps Visual States and Timeline Metrics)
// =========================================================================
const ENGAGEMENT_DATASETS: Record<string, {
  value: string;
  percentage: string;
  isPositive: boolean; // true = green UI, false = red UI
  chartData: { name: string; value: number }[];
}> = {
  "This Month": {
    value: "2.4M",
    percentage: "15% ↑",
    isPositive: true,
    chartData: [
      { name: "Jan", value: 1450000 },
      { name: "Feb", value: 1600000 },
      { name: "Mar", value: 1700000 },
      { name: "Apr", value: 1550000 },
      { name: "May", value: 1750000 },
      { name: "Jun", value: 2100000 },
      { name: "Jul", value: 2050000 },
    ],
  },
  "This Week": {
    value: "2.4M",
    percentage: "12% ↓",
    isPositive: false, // Triggers crimson red curve and negative label
    chartData: [
      { name: "Wed", value: 2050000 },
      { name: "Thur", value: 2100000 },
      { name: "Fri", value: 1650000 },
      { name: "Sat", value: 1500000 },
      { name: "Sun", value: 1750000 },
      { name: "Mon", value: 1650000 },
      { name: "Tue", value: 1480000 },
    ],
  },
  "All-time": {
    value: "28.4M",
    percentage: "24% ↑",
    isPositive: true,
    chartData: [
      { name: "2023", value: 800000 },
      { name: "2024", value: 1500000 },
      { name: "2025", value: 2100000 },
      { name: "2026", value: 2450000 },
    ],
  },
};

const EARNINGS_DATASETS: Record<string, {
  value: string;
  fraction: string;
  percentage: string;
  isPositive: boolean;
  chartData: { name: string; value: number }[];
}> = {
  "This Month": {
    value: "₦432,000",
    fraction: ".00",
    percentage: "15% ↑",
    isPositive: true,
    chartData: [
      { name: "Jan", value: 950000 },
      { name: "Feb", value: 1200000 },
      { name: "Mar", value: 950000 },
      { name: "Apr", value: 1300000 },
      { name: "May", value: 1500000 },
      { name: "Jun", value: 1900000 },
      { name: "Jul", value: 2150000 },
    ],
  },
  "This Week": {
    value: "₦98,400",
    fraction: ".75",
    percentage: "4% ↓",
    isPositive: false,
    chartData: [
      { name: "Wed", value: 1900000 },
      { name: "Thur", value: 1750000 },
      { name: "Fri", value: 1400000 },
      { name: "Sat", value: 1100000 },
      { name: "Sun", value: 1300000 },
      { name: "Mon", value: 1050000 },
      { name: "Tue", value: 950000 },
    ],
  },
  "All-time": {
    value: "₦4,890,000",
    fraction: ".00",
    percentage: "32% ↑",
    isPositive: true,
    chartData: [
      { name: "2023", value: 600000 },
      { name: "2024", value: 1400000 },
      { name: "2025", value: 1850000 },
      { name: "2026", value: 2200000 },
    ],
  },
};

const performanceMetrics = [
  { label: "Challenges Completed", value: "31" },
  { label: "Global Rank", value: "296" },
  { label: "Challenges Won", value: "3" },
  { label: "Average Engagement per post", value: "21k" },
];

const formatYAxisLabels = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${value / 1000}K`;
  return value.toString();
};

// =========================================================================
// 2. MAIN COMPONENT
// =========================================================================
const AnalyticsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Framework Timeframe State Drivers
  const [engagementTimeframe, setEngagementTimeframe] = useState("This Month");
  const [earningsTimeframe, setEarningsTimeframe] = useState("This Month");

  const activeEngagement = ENGAGEMENT_DATASETS[engagementTimeframe];
  const activeEarnings = EARNINGS_DATASETS[earningsTimeframe];

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased overflow-x-hidden">
      <div className="mx-auto pb-24 max-w-[1400px]">
        
        {/* ================= HEADER NAVIGATION BAR AREA ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[20px] md:text-[24px] font-semibold tracking-tight text-[#1E1F24] mb-1">
              Analytics
            </h1>
            <p className="text-[10px] md:text-[12px] text-[#62636C] font-normal">
              Track your performance, monitor growth, and visibility
            </p>
          </div>

          <div className="relative w-full md:w-[320px] flex-shrink-0">
            <span className="absolute inset-y-0 left-4 flex items-center justify-center text-[#80828D]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Starix"
              className="w-full h-[46px] bg-[#F6F6F7] rounded-full pl-12 pr-6 text-[14px] font-medium text-[#1E1F24] placeholder-gray-400 focus:outline-hidden border border-transparent transition"
            />
          </div>
        </div>

        {/* ================= PERFORMANCE SUMMARY CARD GRID ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {performanceMetrics.map((metric, i) => (
            <div 
              key={i} 
              className="border border-[#EDEDEF] bg-white rounded-[24px] p-5 md:p-6 flex flex-col justify-between h-[115px] hover:shadow-xs transition"
            >
              <h4 className="text-[13px] md:text-[16px] font-semibold text-[#1E1F24] leading-tight tracking-tight">
                {metric.label}
              </h4>
              <h2 className="text-[20px] md:text-[24px] font-semibold tracking-tight text-[#1E1F24] leading-none">
                {metric.value}
              </h2>
            </div>
          ))}
        </div>

        {/* ================= VISUALIZATION GRAPHS SECTION ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* CHART BOX 1: TOTAL ENGAGEMENT TIMELINE */}
          <div className="border border-[#EDEDEF] bg-white rounded-[24px] p-5 md:p-6 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-[16px] font-semibold text-[#1E1F24] mb-1">Total Engagement</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-semibold tracking-tight text-[#1E1F24]">
                    {activeEngagement.value}
                  </span>
                  <span className={`text-[10px] font-medium py-0.5 rounded-sm flex items-center  transition-colors duration-200 ${
                    activeEngagement.isPositive ? "text-[#00C566]" : "text-[#FE3426]"
                  }`}>
                    {activeEngagement.percentage}
                  </span>
                </div>
              </div>
              
              <select 
                value={engagementTimeframe} 
                onChange={(e) => setEngagementTimeframe(e.target.value)}
                className="text-[13px] font-semibold text-[#1E1F24] bg-white border border-transparent hover:border-gray-200 py-1 px-2 rounded-lg cursor-pointer focus:outline-hidden"
              >
                <option value="All-time">All-time</option>
                <option value="This Month">This Month</option>
                <option value="This Week">This Week</option>
              </select>
            </div>

            <div className="w-full h-[260px] mt-4 select-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeEngagement.chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeEngagement.isPositive ? "#00C566" : "#FF4B4B"} stopOpacity={0.06} />
                      <stop offset="95%" stopColor={activeEngagement.isPositive ? "#00C566" : "#FF4B4B"} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#F3F3F4" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#80828D", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={formatYAxisLabels}
                    tick={{ fill: "#80828D", fontSize: 12, fontWeight: 500 }}
                    domain={[500000, 2500000]}
                    ticks={[500000, 1000000, 1500000, 2000000, 2500000]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1E1F24", borderRadius: "12px", border: "none" }}
                    labelStyle={{ color: "#fff", fontWeight: "bold" }}
                    itemStyle={{ color: activeEngagement.isPositive ? "#00C566" : "#FF4B4B" }}
                    formatter={(value: any) => [formatYAxisLabels(value), "Engagement"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={activeEngagement.isPositive ? "#00C566" : "#FF4B4B"} 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#engagementGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART BOX 2: TOTAL EARNINGS TIMELINE */}
          <div className="border border-[#EDEDEF] bg-white rounded-[24px] p-5 md:p-6 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-[16px] font-semibold text-[#1E1F24] mb-1">Total Earnings</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-[26px] font-semibold tracking-tight text-[#1E1F24]">
                    {activeEarnings.value}
                    {activeEarnings.fraction && (
                      <span className="text-[26px] font-semibold text-[#747682]">{activeEarnings.fraction}</span>
                    )}
                  </span>
                  <span className={`text-[10px] font-semibold py-0.5 rounded-sm flex items-center gap-0.5 ml-1 transition-colors duration-200 ${
                    activeEarnings.isPositive ? "text-[#00C566] " : "text-[#FF4B4B] "
                  }`}>
                    {activeEarnings.percentage}
                  </span>
                </div>
              </div>
              
              <select 
                value={earningsTimeframe} 
                onChange={(e) => setEarningsTimeframe(e.target.value)}
                className="text-[13px] font-semibold text-[#1E1F24] bg-white border border-transparent hover:border-gray-200 py-1 px-2 rounded-lg cursor-pointer focus:outline-hidden"
              >
                <option value="All-time">All-time</option>
                <option value="This Month">This Month</option>
                <option value="This Week">This Week</option>
              </select>
            </div>

            <div className="w-full h-[260px] mt-4 select-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeEarnings.chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeEarnings.isPositive ? "#00C566" : "#FF4B4B"} stopOpacity={0.06} />
                      <stop offset="95%" stopColor={activeEarnings.isPositive ? "#00C566" : "#FF4B4B"} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#F3F3F4" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#80828D", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={formatYAxisLabels}
                    tick={{ fill: "#80828D", fontSize: 12, fontWeight: 500 }}
                    domain={[500000, 2500000]}
                    ticks={[500000, 1000000, 1500000, 2000000, 2500000]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1E1F24", borderRadius: "12px", border: "none" }}
                    labelStyle={{ color: "#fff", fontWeight: "bold" }}
                    itemStyle={{ color: activeEarnings.isPositive ? "#00C566" : "#FF4B4B" }}
                    formatter={(value: any) => [`₦${value.toLocaleString()}`, "Earnings"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={activeEarnings.isPositive ? "#00C566" : "#FF4B4B"} 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#earningsGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AnalyticsPage;