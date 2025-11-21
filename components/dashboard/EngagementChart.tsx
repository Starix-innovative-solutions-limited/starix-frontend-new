/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EngagementChart = () => {
  const data = [
    { followers: 2000, engagement: 100 },
    { followers: 5000, engagement: 120 },
    { followers: 10000, engagement: 80 },
    { followers: 15000, engagement: 180 },
    { followers: 20000, engagement: 250 },
    { followers: 25000, engagement: 220 },
    { followers: 50000, engagement: 200 },
    { followers: 100000, engagement: 200 },
    { followers: 200000, engagement: 200 },
  ];

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.followers === 20000) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={4} fill="#3b82f6" />
          <rect
            x={cx - 40}
            y={cy - 22}
            width={80}
            height={24}
            fill="#3b82f6"
            rx={4}
          />
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="500"
          >
            20/15,000
          </text>
        </g>
      );
    }
    return null;
  };

  const formatXAxis = (value: string) => {
    return value.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg  h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 30, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="followers"
            tickFormatter={formatXAxis}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#9ca3af"
          />
          <YAxis
            domain={[0, 300]}
            ticks={[0, 50, 100, 150, 200, 250, 300]}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            stroke="#9ca3af"
          />
          <Tooltip
            formatter={(value) => [value, "Engagement"]}
            labelFormatter={(value) => `Followers: ${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#3b82f6"
            // stroke="#3A96C4"
            strokeWidth={2}
            dot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
