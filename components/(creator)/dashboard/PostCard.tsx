/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import SubmitUrl from "./creator/SubmitUrl";

import { useModal } from "../../GlobalModal";
import { variants } from "@/constant";
import SubmissionDetails from "./creator/SubmissionDetails";
import { SlLike } from "react-icons/sl";
import Dropdown from "../../ui/Dropdown";
import { MoreVertical } from "lucide-react";
import { IoCopyOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiEyeThin } from "react-icons/pi";

interface PostProps {
  viewSubmitLink?: boolean;
  price?: string;
  isWin?: boolean;
  link?: any;
}

const PostCard = ({ viewSubmitLink, isWin, price, link }: PostProps) => {
  const { open } = useModal();
  const router = useRouter();

  const openDetails = () => {
    if (link) router.push(link);
    else open(<SubmissionDetails />);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      variants={variants?.itemVariants}
      className="bg-white overflow-hidden cursor-pointer h-fit w-full rounded-2xl border border-gray-100"
    >
      <div className="relative">
        <Image
          src={"/post.png"}
          alt="post"
          width={1000}
          height={1000}
          className="w-full h-48 sm:h-56 md:h-52 lg:h-56 object-cover"
          onClick={openDetails}
        />

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full flex items-center gap-2">
          <IoCopyOutline className="text-dark-navy" />
        </div>

        <Dropdown
          trigger={<MoreVertical className="h-5 w-5" />}
          className="flex flex-col !absolute top-3 right-3"
          align="right"
        >
          <button className="dropdown-item text-sm">Edit</button>
          <button className="dropdown-item text-sm">Hide</button>
          <button className="dropdown-item text-sm">Share</button>
          <button className="dropdown-item text-sm !text-red-700">Delete</button>
        </Dropdown>

        <div className="absolute bottom-3 left-3 bg-off-white/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-2">
          <PiEyeThin className="text-dark-navy/70" />
          <span className="text-sm font-light text-dark-navy/70">3k</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 p-4">
        <div className="flex flex-col">
          <p className="text-dark-navy text-lg md:text-xl mb-3" onClick={openDetails}>
            Your Caption here
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <SlLike className="text-dark-navy" />
              <span className="text-sm font-light text-dark-navy">500</span>
            </div>

            <div className="flex items-center gap-1">
              <FaRegComment className="text-dark-navy" />
              <span className="text-sm font-light text-dark-navy">10</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          {viewSubmitLink && (
            <button
              className="text-dark-navy/70 text-sm font-light hover:text-dark-navy transition-colors underline"
              onClick={() => open(<SubmitUrl />, { position: "center" })}
              type="button"
            >
              Submit Link
            </button>
          )}

          {isWin && price && (
            <button
              className="text-primary-orange text-sm font-light hover:text-primary-orange/80 transition-colors underline"
              onClick={() => open(<SubmitUrl />, { position: "center" })}
              type="button"
            >
              {price}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
