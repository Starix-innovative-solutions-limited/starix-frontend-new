import LinearGradientBorder from "@/components/ui/LinearGradientBorder";
import { StatItem } from "@/utils/type";
import { motion } from "framer-motion";
import { TbBrandGoogleAnalytics } from "react-icons/tb";


interface StatsCardProps {
    stats: StatItem[];
}


// Analytics Component
const AnalyticsPreview = ({ stats }: StatsCardProps) => {


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className=""
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Analytics Preview</h2>
                <button className="text-sm font-light text-dark-navy hover:text-blue-600">View</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {stats?.map((stat, idx) => (
                    <LinearGradientBorder
                        key={idx}
                        // whileHover={{ scale: 1.02 }}
                        className="border border-gray-200 rounded-xl p-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-neut/60 font-light">{stat.label}:</span>
                            <TbBrandGoogleAnalytics size={16} className="text-dark-navy" />
                        </div>
                        <p className={`${stat?.socials ? 'w-fit text-sm shadow-2xs bg-[#fafafa] uppercase px-2 py-1 border border-dark/5' : 'text-xl'} text-dark-navy font-normal`}>{stat.value}</p>
                    </LinearGradientBorder>
                ))}
            </div>
        </motion.div>
    );
};

export default AnalyticsPreview