/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TooltipProps } from 'recharts';

// Types
interface ChartDataItem {
    date: string;
    value: number;
    challenge: string;
    roi: number;
    reward: number;
    creators: number;
}

type TimeRange = '7 days' | '14 days' | '4 weeks' | '6 months' | '1 year';

const chartData: ChartDataItem[] = [
    { date: '20 May', value: 55, challenge: 'Soap Campaign', roi: 90, reward: 400, creators: 500 },
    { date: '20 May', value: 78, challenge: 'Beauty Launch', roi: 85, reward: 350, creators: 450 },
    { date: '20 May', value: 42, challenge: 'Fashion Week', roi: 75, reward: 300, creators: 400 },
    { date: '20 May', value: 25, challenge: 'Spring Sale', roi: 60, reward: 250, creators: 350 },
    { date: '20 May', value: 72, challenge: 'Summer Collection', roi: 88, reward: 380, creators: 480 },
    { date: '20 May', value: 90, challenge: 'Soap Campaign', roi: 90, reward: 400, creators: 500 },
    { date: '20 May', value: 65, challenge: 'Winter Promo', roi: 72, reward: 320, creators: 420 },
    { date: '20 May', value: 40, challenge: 'Holiday Special', roi: 80, reward: 360, creators: 460 },
    { date: '20 May', value: 45, challenge: 'New Year Sale', roi: 68, reward: 290, creators: 380 },
    { date: '20 May', value: 50, challenge: 'Valentine Campaign', roi: 86, reward: 370, creators: 470 },
];

const timeRanges: TimeRange[] = ['7 days', '14 days', '4 weeks', '6 months', '1 year'];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }: any) => {
    if (!active || !payload || !payload[0]) return null;

    // ✅ Inherit dynamic info directly from the hovered bar
    const data = payload[0].payload as ChartDataItem;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-[1.5px] border-[#FD6C1D] rounded-[24px] p-8 shadow-2xl min-w-[320px]"
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between gap-6">
                    <span className="text-[#98A2B3] text-[16px]">Challenge Name:</span>
                    <span className="font-bold text-[#0A0A30] text-[18px]">{data.challenge}</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                    <span className="text-[#98A2B3] text-[16px]">ROI:</span>
                    <span className="font-bold text-[#0A0A30] text-[18px]">{data.roi}%</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                    <span className="text-[#98A2B3] text-[16px]">Reward:</span>
                    <span className="font-bold text-[#0A0A30] text-[18px]">${data.reward}</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                    <span className="text-[#98A2B3] text-[16px]">Creators Count:</span>
                    <span className="font-bold text-[#0A0A30] text-[18px]">{data.creators}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default function TopChallengeInsights() {
    const [selectedRange, setSelectedRange] = useState<TimeRange>('7 days');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full bg-white rounded-[32px]">
            {/* Header: Title Left, Pills Right */}
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-[28px] font-normal text-[#0A0A30]"> </h2>
                <div className="flex items-center gap-2">
                    {timeRanges.map((range) => (
                        <button
                            key={range}
                            onClick={() => setSelectedRange(range)}
                            className={`px-5 py-2 rounded-full text-[14px] font-medium border transition-all ${
                                selectedRange === range
                                    ? 'bg-white text-[#0A0A30] border-[#E5E7EB] shadow-sm'
                                    : 'bg-transparent text-[#98A2B3] border-transparent hover:text-[#667085]'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Container */}
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 0, left: -25, bottom: 20 }}
                        onMouseMove={(state) => {
                            if (state && state.activeTooltipIndex !== undefined) {
                                const rawIndex = state.activeTooltipIndex;
                                let indexNumber: number | null = null;
                                if (typeof rawIndex === 'number') {
                                    indexNumber = rawIndex;
                                } else if (typeof rawIndex === 'string') {
                                    const parsed = parseInt(rawIndex, 10);
                                    indexNumber = Number.isFinite(parsed) ? parsed : null;
                                }
                                setHoveredIndex(indexNumber);
                            }
                        }}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#98A2B3', fontSize: 14, fontWeight: 500 }}
                            dy={5} // ✅ Moves dates up to be more visible
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#98A2B3', fontSize: 14, fontWeight: 500 }}
                            tickFormatter={(value) => `${value}%`}
                            ticks={[0, 20, 40, 60, 80, 100]}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'transparent' }}
                            // Tooltip follows the specific hovered bar
                        />
                        
                        {/* ✅ DYNAMIC SINGLE BAR WITH GRAY FILLER */}
                        <Bar
                            dataKey="value"
                            radius={[12, 12, 12, 12]}
                            barSize={32}
                            // This background creates the gray track filler effect
                            background={{ fill: '#F2F4F7', radius: 12 }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    // Highlight orange on hover, otherwise default gray-fill
                                    fill={hoveredIndex === index ? '#FD6C1D' : '#E5E7EB'}
                                    style={{ transition: 'fill 0.3s ease' }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}