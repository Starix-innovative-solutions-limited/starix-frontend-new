"use client";

import GlowCard from "./GlowCard";
import {
  FiBarChart2,
  FiAward,
  FiCreditCard,
} from "react-icons/fi";

export default function PerformanceSection() {

  const stats = [
    {
      label: "Total Challenges:",
      value: "100",
      icon: <FiBarChart2 size={20} />,
    },
    {
      label: "Total Wins:",
      value: "20",
      icon: <FiAward size={20} />,
    },
    {
      label: "Total Earnings:",
      value: "$400",
      icon: <FiCreditCard size={20} />,
    },
    {
      label: "Total Engagement:",
      value: "200 likes",
      icon: <FiBarChart2 size={20} />,
    },
    {
      label: "Win Rate:",
      value: "20%",
      icon: <FiAward size={20} />,
    },
    {
      label: "Avg Engagement per Post:",
      value: "40",
      icon: <FiBarChart2 size={20} />,
    },
  ];

  return (
    <div className="mb-16">

      <h2 className="text-xl font-medium text-[#0A0A30] mb-8">
        Performance
      </h2>

      {/* Single Grid (matches Figma) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {stats.map((stat, i) => (
          <GlowCard key={i}>

            <div className="flex justify-between items-start">

              <div>

                <p className="text-sm text-[#98A2B3] mb-3">
                  {stat.label}
                </p>

                <p className="text-xl font-normal text-[#0A0A30]">
                  {stat.value}
                </p>

              </div>

              <div className="text-[#98A2B3]">
                {stat.icon}
              </div>

            </div>

          </GlowCard>
        ))}

      </div>

    </div>
  );
}