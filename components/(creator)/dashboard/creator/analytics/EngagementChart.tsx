/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type EngagementProps = {
  showLabel?: boolean;
  label?: string;
}

const EngagementChart = ({ label = "Engagement Rate", showLabel }: EngagementProps) => {
  const [timeRange, setTimeRange] = useState('7 days');
  // const [hoveredPoint, setHoveredPoint] = useState(null);

  // Sample data for the chart
  const data = [
    { date: '24 Mar', twitter: 180, instagram: 150, youtube: 120, tiktok: 90 },
    { date: '25 Mar', twitter: 170, instagram: 200, youtube: 140, tiktok: 100 },
    { date: '26 Mar', twitter: 190, instagram: 160, youtube: 130, tiktok: 95 },
    { date: '27 Mar', twitter: 300, instagram: 280, youtube: 170, tiktok: 110 },
    { date: '28 Mar', twitter: 210, instagram: 190, youtube: 150, tiktok: 105 },
    { date: '29 Mar', twitter: 230, instagram: 270, youtube: 160, tiktok: 115 },
    { date: '30 Mar', twitter: 260, instagram: 250, youtube: 180, tiktok: 120 },
  ];

  const timeRanges = ['7 days', '14 days', '4 weeks', '6 months', '1 year'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">{data.date}</p>
          {payload.map((entry: any, index: any) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='flex flex-col gap-3'>
      {
        showLabel && <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gap-2 py-2 text-2xl font-normal hover:bg-gray-100 transition-colors text-secondary-100 "
        >
          {label}
        </motion.span>
      }

      <div className=" bg-white rounded-lg shadow border border-gray-100 p-6 px-12">
        {/* Time range selector */}
        <div className="flex justify-center md:justify-end gap-3 mb-8">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={` px-2 md:px-4 py-1 md:py-2 rounded-full text-sm font-medium transition-all ${timeRange === range
                ? 'border border-dark-navy text-dark-navy shadow-md'
                : 'bg-white text-dark border border-dark hover:border-gray-400'
                }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="relative mt-8">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ value: '0', position: 'insideBottomLeft', fill: '#9ca3af', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="square"
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => (
                  <span className="text-sm text-gray-600 capitalize">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="twitter"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
                name="Likes"
              />
              <Line
                type="monotone"
                dataKey="instagram"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4, fill: '#10b981' }}
                activeDot={{ r: 6 }}
                name="Views"
              />
              <Line
                type="monotone"
                dataKey="youtube"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4, fill: '#f97316' }}
                activeDot={{ r: 6 }}
                name="Comments"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Platform labels on the left */}
          <div className="absolute left-0 top-16 flex flex-col gap-8 text-xs text-gray-400">
            <div>All</div>
            <div>Twitter</div>
            <div>Instagram</div>
            <div>Youtube</div>
            <div>Tiktok</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementChart;