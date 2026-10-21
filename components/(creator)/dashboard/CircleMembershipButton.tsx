"use client";

import React from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import type { DiscoverableCircle } from "@/hooks/useCircles";

type CircleMembershipButtonProps = {
  circle: DiscoverableCircle;
  onJoin: (circle: DiscoverableCircle) => void;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full border px-3 py-2 text-[12px] font-medium transition-all";

const CircleMembershipButton = ({ circle, onJoin, className = "" }: CircleMembershipButtonProps) => {
  if (circle.membership === "member") {
    return (
      <Link
        href={`/creator-circles/${circle.circle_id}/circle-profile`}
        onClick={(event) => event.stopPropagation()}
        className={`${base} border-[#C9D6FF] bg-[#EEF3FF] text-[#0033FF] hover:bg-[#E2EAFF] ${className}`}
      >
        <FiCheck size={13} />
        Joined
      </Link>
    );
  }

  if (circle.membership === "requested") {
    return (
      <button
        type="button"
        disabled
        onClick={(event) => event.stopPropagation()}
        className={`${base} cursor-default border-[#E4E4E7] bg-[#F7F7F8] text-[#8B8D98] ${className}`}
      >
        Requested
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onJoin(circle);
      }}
      className={`${base} border-[#8B8D98] text-[#1E1F24] hover:border-[#0033FF] hover:bg-white hover:text-[#0033FF] ${className}`}
    >
      Join
    </button>
  );
};

export default CircleMembershipButton;
