"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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
      className={`p-[1.3px] rounded-xl`}
      style={{ background: gradient }}
    >
      <div className={`${className} bg-white/95 rounded-xl p-3`}>
        {children}
      </div>
    </motion.div>
  );
}
