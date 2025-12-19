/* eslint-disable @typescript-eslint/no-explicit-any */

import { variants } from "@/constant";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import CreatorLeaderboard from "./creator/CreatorLeaderboard";

const LeaderboardAnalytics = () => {
  return (
    <motion.div variants={variants?.containerVariants} className="w-full">
      {/* Stats Grid */}
      <motion.div
        variants={variants?.containerVariants}
        className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8 flex-wrap"
      >
        {[
          {
            title: "Active Challenges",
            value: "10",
            subtitle: "This month",
            bgColor: "bg-[#F4FFED]",
          },
          {
            title: "Closed Challenges",
            value: "5",
            subtitle: "This month",
            bgColor: "bg-[#FFF7ED]",
          },
          {
            title: "Total Participants",
            value: "2,340",
            subtitle: "This month",
            bgColor: "bg-[#EDF4FF]",
          },
          {
            title: "Engagement Reach",
            value: "15,000",
            subtitle: "This month",
            bgColor: "bg-[#F3EDFF]",
          },
        ].map((stat, i) => (
          <motion.div key={i} variants={variants?.itemVariants}>
            <motion.div
              whileHover={{
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <StatCard {...stat} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <div className="border-b border-gray-200">
        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
        </div>
        <CreatorLeaderboard />
      </div>

      {/* <CreatorLeaderboard /> */}
    </motion.div>
  );
};

export default LeaderboardAnalytics;
