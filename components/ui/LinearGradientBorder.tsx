"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { variants } from "@/constant";

interface Props {
  children: ReactNode;
  className?: string;
  gradient?: string;
  hoverScale?: number;
}

export default function LinearGradientBorder({
  children,
  className = "",
  gradient = "linear-gradient(90deg, #FD6C1D 0%, #06FF89 50%, #040136 100%)",
  hoverScale = 1.02,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      className={`p-[1.3px] rounded-2xl relative`}
      style={{ background: gradient }}
      variants={variants.itemVariants}
    >
      <div className={`${className} bg-white rounded-2xl p-3 px-6 h-full` }>
        {children}
      </div>
    </motion.div>
  );
}
