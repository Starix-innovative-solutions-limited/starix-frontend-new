/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { creators } from "@/constant";
import { MotionTable } from "./MotionTable";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Music,
  Youtube,
  Download,
} from "lucide-react";
import React from "react";
import Image from "next/image";

type Creator = {
  name: string;
  submission: string;
  rank: number;
  metrics: {
    facebook: { value: number; label: string };
    twitter: { value: number; label: string };
    instagram: { value: number; label: string };
    linkedin: { value: number; label: string };
    tiktok: { value: number; label: string };
    youtube: { value: number; label: string };
  };
};

const getRankBadgeColor = (rank: number) => {
  if (rank === 1) return "bg-yellow-400";
  if (rank === 2) return "bg-gray-400";
  if (rank === 3) return "bg-orange-400";
  return "bg-blue-400";
};

const MetricColumn = ({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: any;
  value: number | string;
  label: string;
  color: string;
}) => (
  <div className="flex flex-col  gap-1 text-xs">
    <Icon className={`w-4 h-4 ${color} `} />
    <span className="font-medium text-gray-700 text-lg">{value}</span>
    <span className="text-gray-400">{label}</span>
  </div>
);

export default function CreatorLeaderboard() {
  const headers = ["Creator", "Rank", "Engagement Views"];

  return (
    <div className="overflow-x-auto min-w-[900px] bg-white rounded-lg shadow-sm">
      <MotionTable
        headers={headers}
        data={creators}
        renderRow={(creator, index) => (
          <motion.tr
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            {/* Creator Info */}
            <td className="py-3 px-4">
              <div className="flex items-center gap-4 w-fit">
                {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {creator?.name.charAt(0)}
                </div> */}

                <Image
                  src={"/images/avatar.png"}
                  alt="creators avatar"
                  width={100}
                  height={100}
                  className="w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-black">
                    {creator?.name}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {creator?.submission}
                    <Download className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </td>

            {/* Rank */}
            <td className="py-3 px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`relative w-10 h-10 flex items-center justify-center font-semibold text-white text-xs ${getRankBadgeColor(
                  creator.rank
                )}`}
                style={{
                  clipPath:
                    "polygon(50% 0%, 65% 10%, 90% 10%, 100% 35%, 100% 65%, 90% 90%, 65% 90%, 50% 100%, 35% 90%, 10% 90%, 0% 65%, 0% 35%, 10% 10%, 35% 10%)",
                  background:
                    creator.rank <= 3
                      ? "linear-gradient(135deg, #FFD700, #FFB700, #FFD700)"
                      : undefined,
                }}
              >
                {creator.rank}
              </motion.div>
            </td>

            {/* Metrics */}
            <td className="py-3 px-2 text-center flex items-center justify-between gap-14">
              {[
                { key: "facebook", icon: Facebook, color: "text-blue-600" },
                { key: "twitter", icon: Twitter, color: "text-black" },
                { key: "instagram", icon: Instagram, color: "text-pink-500" },
                { key: "linkedin", icon: Linkedin, color: "text-blue-700" },
                { key: "tiktok", icon: Music, color: "text-cyan-400" },
                { key: "youtube", icon: Youtube, color: "text-red-600" },
              ].map(({ key, icon, color }) => (
                <MetricColumn
                  key={key}
                  icon={icon}
                  value={
                    creator?.metrics[key as keyof Creator["metrics"]].value
                  }
                  label={
                    creator?.metrics[key as keyof Creator["metrics"]].label
                  }
                  color={color}
                />
              ))}
            </td>
          </motion.tr>
        )}
      />
    </div>
  );
}
