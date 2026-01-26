/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "@/constant";
import { useModal } from "@/components/GlobalModal";
import ChallengeDetails from "./ChallengeDetails";
import NewPostComponent from "./NewPost";
import Image from "next/image";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Eye, Trophy, LogIn } from "lucide-react";

interface ChallengeProps {
  challenge: any;
  index: number;
  post?: boolean;
}

const ChallengeCard = ({ challenge, post }: ChallengeProps) => {
  const { open } = useModal();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleView = () => {
    setMenuOpen(false);
    open(<ChallengeDetails />, { position: "center" });
  };

  const handleJoin = () => {
    setMenuOpen(false);
    // BACKEND TODO:
    // call join challenge endpoint here
    router.push(`/challenges/${challenge?.id ?? ""}?join=true`);
  };

  const handleLeaderboard = () => {
    setMenuOpen(false);
    router.push(`/challenges/${challenge?.id ?? ""}/leaderboard`);
  };

  return (
    <motion.div
      variants={variants?.itemVariants}
      className="bg-white rounded-2xl border border-gray-100 px-5 py-5 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <Image
          src="/profile.png"
          alt="profile_pic"
          width={80}
          height={80}
          className="w-12 h-12 rounded-full object-cover border border-gray-100"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg md:text-xl font-medium text-dark-navy truncate">
              {challenge.title}
            </h3>

            {/* Ellipsis */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="h-9 w-9 grid place-items-center rounded-full border border-gray-100 hover:bg-gray-50 transition"
              >
                <FaEllipsisVertical size={16} className="text-dark-navy/80" />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-11 z-50 w-48 rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={handleView}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    <button
                      onClick={handleJoin}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <LogIn className="w-4 h-4 text-primary-orange" />
                      Join
                    </button>

                    <button
                      onClick={handleLeaderboard}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <Trophy className="w-4 h-4" />
                      Leaderboard
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Description */}
          <p className="text-neut/60 text-sm md:text-base font-light mt-2 line-clamp-2">
            {challenge.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-primary-orange font-medium text-sm">
              {challenge.prize}
            </span>

            <div className="flex items-center gap-2 text-neut/60 text-xs bg-[#F7F7F7] px-2.5 py-1.5 rounded-full">
              <AiOutlineClockCircle />
              {challenge.timeLeft}
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-end mt-4">
            {post ? (
              <button
                onClick={() => open(<NewPostComponent />, { position: "center" })}
                className="text-sm font-medium text-dark-navy/70 hover:text-dark-navy underline underline-offset-4"
              >
                Post
              </button>
            ) : (
              <button
                onClick={() => open(<ChallengeDetails />, { position: "center" })}
                className="text-sm font-medium text-dark-navy/70 hover:text-dark-navy underline underline-offset-4"
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
