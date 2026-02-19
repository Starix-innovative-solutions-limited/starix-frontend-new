/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { variants } from "@/constant";
import { useModal } from "@/components/GlobalModal";
import ChallengeDetails from "./ChallengeDetails";
import NewPostComponent from "./NewPost";
import Image from "next/image";
import { FaEllipsisVertical } from "react-icons/fa6";
import ChallengeLeaderboard from "./ChallengeLeaderboard";
import NextStep from "../NextStep";
import { useRouter } from "next/navigation";



type ChallengeCardProps = {
  challenge: any;
  index: number;
  post?: boolean;

  // ✅ add these
  onView?: () => void;
  onJoin?: () => void;
  onLeaderboard?: () => void;
};

const ChallengeCard = ({ challenge, post, onView, onJoin, onLeaderboard }: ChallengeCardProps) => {
  const { open } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  const actions = [
  {
    label: "View",
    onClick: () => {
      setMenuOpen(false);
      open(<ChallengeDetails />, { position: "center" });
    },
  },
  {
    label: "Join",
    onClick: () => {
      setMenuOpen(false);
      open(<NextStep />, { position: "center" });
    },
  },
  {
    label: "Leaderboard",
    onClick: () => {
      setMenuOpen(false);
      router.push(`/challenges/${challenge.id}/leaderboard`);
    },
  },
];






  return (
    <motion.div
  variants={variants?.itemVariants}
  className="
    bg-white
    rounded-2xl
    border border-gray-100
    shadow-sm hover:shadow-md
    transition-shadow
    p-4 sm:p-5 md:p-6
    w-full
  "
>
  {/* Header */}
  <div className="flex items-start gap-3 sm:gap-4">
    {/* Avatar */}
    <Image
      src={"/profile.png"}
      alt="brand"
      width={48}
      height={48}
      className="
        w-10 h-10
        sm:w-12 sm:h-12
        rounded-full
        object-cover
        border border-gray-100
        shrink-0
      "
    />

    <div className="flex-1 min-w-0">
      {/* Title + Ellipsis */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className="
            text-base sm:text-lg md:text-xl
            font-medium
            text-dark-navy
            line-clamp-1
          "
        >
          {challenge.title}
        </h3>

        {/* Ellipsis */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((p) => !p)}
            className="
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-full
              hover:bg-gray-100
              flex items-center justify-center
              transition-colors
            "
          >
            <FaEllipsisVertical size={16} className="text-dark-navy" />
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />

              <div
                className="
                  absolute right-0 top-9
                  z-50 w-44
                  bg-white border border-gray-200
                  rounded-xl shadow-lg
                  overflow-hidden
                "
              >
                {actions.map((a) => (
                  <button
                    key={a.label}
                    onClick={a.onClick}
                    className="
                      w-full text-left
                      px-4 py-3
                      text-sm text-gray-700
                      hover:bg-gray-50
                    "
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className="
          font-['Geist']
          font-light
          text-[14px] sm:text-[15px] md:text-[16px]
          leading-[1.2]
          text-neut/60
          mt-1 sm:mt-2
          line-clamp-2
        "
      >
        {challenge.description}
      </p>

      {/* Footer */}
      <div
        className="
          flex flex-wrap
          items-center justify-between
          gap-2
          mt-3 sm:mt-4
        "
      >
        <span className="text-primary-orange font-medium text-sm sm:text-base">
          {challenge.prize}
        </span>

        <div
          className="
            flex items-center gap-1
            text-neut/60
            text-xs
            bg-[#f5f5f5]
            px-2 py-1
            rounded-full
          "
        >
          <AiOutlineClockCircle />
          <span>{challenge.timeLeft}</span>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex justify-end mt-3 sm:mt-4">
        {post ? (
          <button
            type="button"
            className="
              text-dark-navy/70
              text-xs sm:text-sm
              font-light
              hover:text-dark-navy
              underline
            "
            onClick={() => open(<NewPostComponent />, { position: "center" })}
          >
            Post
          </button>
        ) : (
          <button
            type="button"
            className="
              text-dark-navy/70
              text-xs sm:text-sm
              font-light
              hover:text-dark-navy
              underline
            "
            onClick={() => open(<ChallengeDetails />, { position: "center" })}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  </div>
</motion.div>

  );
};

export default ChallengeCard;
