"use client"
import { FaBullhorn, FaUsers, FaWallet, FaImages } from 'react-icons/fa'
import { IconType } from 'react-icons'
import LinearGradientBorder from '@/components/ui/LinearGradientBorder'

export interface StatItem {
    key: string;
    title: string;
    value: string | number;
    icon: IconType;
}

export const DASHBOARD_STATS_DATA: StatItem[] = [
    { key: "totalChallenges", title: "Total Challenges", value: 150, icon: FaBullhorn },
    { key: "totalCreators", title: "Total Creators", value: 150, icon: FaUsers },
    { key: "avgCostEngagement", title: "Avg Cost Engagement", value: "$150", icon: FaWallet },
    { key: "totalUGC", title: "Total UGC", value: 150, icon: FaImages },
];

export const DashboardStatCard = ({ item }: { item: StatItem }) => {
    const Icon = item.icon;
    return (
        <LinearGradientBorder>
            <div className="flex items-start justify-between py- px-6 bg-white rounded-[24px]">
                <div className="flex flex-col gap-2">
                    <span className="text-[#667085] text-sm font-medium">
                        {item.title}
                    </span>
                    <p className="text-3xl font-normal text-[#0A0A30]">
                        {item.value}
                    </p>
                </div>
                <div className="p-2 bg-[#F9FAFB] rounded-lg">
                    <Icon size={18} className="text-[#0A0A30]" />
                </div>
            </div>
        </LinearGradientBorder>
    )
}