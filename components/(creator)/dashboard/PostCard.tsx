/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
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
      className="overflow-hidden cursor-pointer h-fit w-full "
    >
      <div className="relative">
        <Image
          src={"/card22.png"}
          alt="post"
          width={1000}
          height={1000}
          className="w-full h-48 sm:h-56 md:h-52 lg:h-56 object-cover"
          onClick={openDetails}
        />

        <div className="absolute top-3 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-full flex items-center gap-2">
          <IoCopyOutline className="text-dark-navy" />
        </div>

        

        <div className="absolute bottom-3 left-3 bg-off-white/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-2">
          <PiEyeThin className="text-dark-navy/70" />
          <span className="text-sm font-light text-dark-navy/70">3k</span>
        </div>
      </div>

      <div className="bg-[#F6F6F8] px-4 py-4">
  {/* MOBILE = FLEX / DESKTOP = GRID */}
  <div
    className="
      flex items-center justify-between gap-3
      md:grid md:grid-cols-[1fr_auto] md:gap-y-3 md:items-center
    "
  >
    {/* CAPTION */}
    <p
      className="
        text-dark-navy
        text-base sm:text-lg md:text-xl
        font-normal
        truncate
        cursor-pointer
        flex-1
      "
      onClick={openDetails}
    >
      Your Caption here
    </p>

    {/* ICONS — MOBILE RIGHT */}
    <div className="flex items-center gap-4 md:hidden shrink-0">
      <div className="flex items-center gap-1">
        <SlLike className="text-dark-navy" />
        <span className="text-sm font-light text-dark-navy">500</span>
      </div>

      <div className="flex items-center gap-1">
        <FaRegComment className="text-dark-navy" />
        <span className="text-sm font-light text-dark-navy">10</span>
      </div>
    </div>

    {/* DESKTOP LINK */}
    {viewSubmitLink && (
      <button
        className="
          hidden md:block
          text-dark-navy/70
          text-sm
          font-light
          hover:text-dark-navy
          underline
          whitespace-nowrap
        "
        onClick={() => open(<SubmitUrl />, { position: "center" })}
        type="button"
      >
        Submit Link
      </button>
    )}

    {/* DESKTOP PRICE */}
    {isWin && price && (
      <button
        className="
          hidden md:block
          text-primary-orange
          text-sm
          font-light
          hover:text-primary-orange/80
          underline
          whitespace-nowrap
        "
        onClick={() => open(<SubmitUrl />, { position: "center" })}
        type="button"
      >
        {price}
      </button>
    )}

    {/* DESKTOP ICONS ROW */}
    <div className="hidden md:flex items-center gap-5 col-span-2">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <SlLike className="text-dark-navy text-lg" />
        </div>
        <span className="text-base font-light text-dark-navy">500</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <FaRegComment className="text-dark-navy text-lg" />
        </div>
        <span className="text-base font-light text-dark-navy">10</span>
      </div>
    </div>
  </div>
</div>


    </motion.div>
  );
};

export default PostCard;
