"use client";

import React from "react";
import clsx from "clsx";

export default function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-[24px] p-[1.2px] overflow-hidden",
        className
      )}
    >
      {/* Gradient Border */}
      <div
        className="absolute inset-0 rounded-[24px]"
        style={{
          background:
            "linear-gradient(135deg,#FF8A48 0%,#00FF85 50%,#001AFF 100%)",
        }}
      />

      {/* Card */}
      <div
        className="
        relative
        bg-white
        rounded-[23px]
        p-6
        h-full
        min-h-[110px]
        flex flex-col justify-center
        shadow-[0_1px_2px_rgba(0,0,0,0.04)]
        "
      >
        {children}
      </div>
    </div>
  );
}