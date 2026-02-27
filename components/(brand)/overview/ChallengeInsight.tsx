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

// Mock data
const chartData: ChartDataItem[] = [
    { date: '20 May', value: 85, challenge: 'Soap Campaign', roi: 90, reward: 400, creators: 500 },
    { date: '20 May', value: 75, challenge: 'Beauty Launch', roi: 85, reward: 350, creators: 450 },
    { date: '20 May', value: 40, challenge: 'Fashion Week', roi: 75, reward: 300, creators: 400 },
    { date: '20 May', value: 25, challenge: 'Spring Sale', roi: 60, reward: 250, creators: 350 },
    { date: '20 May', value: 70, challenge: 'Summer Collection', roi: 88, reward: 380, creators: 480 },
    { date: '20 May', value: 95, challenge: 'Soap Campaign', roi: 90, reward: 400, creators: 500 },
    { date: '20 May', value: 55, challenge: 'Winter Promo', roi: 72, reward: 320, creators: 420 },
    { date: '20 May', value: 65, challenge: 'Holiday Special', roi: 80, reward: 360, creators: 460 },
    { date: '20 May', value: 45, challenge: 'New Year Sale', roi: 68, reward: 290, creators: 380 },
    { date: '20 May', value: 80, challenge: 'Valentine Campaign', roi: 86, reward: 370, creators: 470 },
    { date: '20 May', value: 35, challenge: 'Easter Event', roi: 65, reward: 280, creators: 360 },
    { date: '20 May', value: 50, challenge: 'Back to School', roi: 70, reward: 310, creators: 410 },
    { date: '20 May', value: 60, challenge: 'Black Friday', roi: 78, reward: 340, creators: 440 },
    { date: '20 May', value: 75, challenge: 'Cyber Monday', roi: 84, reward: 365, creators: 455 },
    { date: '20 May', value: 85, challenge: 'Christmas Sale', roi: 89, reward: 390, creators: 490 },
];

const timeRanges: TimeRange[] = ['7 days', '14 days', '4 weeks', '6 months', '1 year'];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }: any) => {
    if (!active || !payload || !payload[0]) return null;

    const data = payload[0].payload as ChartDataItem;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-[#FD6C1DB2] rounded-2xl p-6 shadow-lg"
        >
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Challenge Name:</span>
                    <span className="font-light text-dark-navy">{data.challenge}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">ROI:</span>
                    <span className="font-light text-dark-navy">{data.roi}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Reward:</span>
                    <span className="font-light text-dark-navy">${data.reward}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Creators Count:</span>
                    <span className="font-light text-dark-navy">{data.creators}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default function TopChallengeInsights() {
    const [selectedRange, setSelectedRange] = useState<TimeRange>('14 days');
    const [hoveredBar, setHoveredBar] = useState<number | any>(5);

    return (
        <div className="relative">
            <div className="">
                {/* Header */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[28px] text-dark-navy mb-12"
                >
                    Top Challenge Insights
                </motion.h1>

                {/* Time Range Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center justify-end gap-3 my-8"
                >
                    {timeRanges.map((range, index) => (
                        <motion.button
                            key={range}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                            onClick={() => setSelectedRange(range)}
                            className={`px-6 py-2 rounded-full text-sm font-medium border border-neut/50 transition-all ${selectedRange === range
                                ? 'bg-white text-neut/60 shadow-md'
                                : 'bg-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {range}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Chart Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white border border-gray-50 rounded-2xl p-8 shadow-sm"
                >
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            onMouseMove={(state) => {
                                if (state && state.activeTooltipIndex !== undefined) {
                                    setHoveredBar(state?.activeTooltipIndex);
                                }
                            }}
                            onMouseLeave={() => setHoveredBar(null)}
                        >
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                tickFormatter={(value: number) => `${value}%`}
                                ticks={[0, 20, 40, 60, 80, 100]}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[8, 8, 8, 8]}
                                maxBarSize={35}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={hoveredBar == index ? '#FD6C1DB2' : '#E5E7EB'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Y-axis Labels */}
                    {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col justify-between h-80 text-xs text-gray-400">
                        {[100, 80, 60, 40, 20, 0].map((val) => (
                            <span key={val}>{val}%</span>
                        ))}
                    </div> */}
                </motion.div>
            </div>
        </div>
    );
}