/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SlLike } from "react-icons/sl";
import { PiEyeThin } from "react-icons/pi";
import { IoCopyOutline } from "react-icons/io5";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface PostProps {
  caption?: string;
  likes?: number;
  views?: number;
  platform?: string;
  link?: string;
  image?: string;
}

const PostCard2 = ({
  caption = "Your Caption here",
  likes = 500,
  views = 10,
  platform = "TIKTOK",
  link,
  image = "/card22.png",
}: PostProps) => {
  const router = useRouter();

  const openDetails = () => {
    if (link) router.push(link);
  };

  const [menuOpen, setMenuOpen] = useState(false);





  return (
    <motion.div
  
  className="
    w-[335px] h-[308px]          /* Figma exact size */
    sm:w-full sm:h-auto         /* responsive override */
    bg-white/10
    overflow-hidden
    shadow-xs
    hover:shadow-sm
    
  "
>

      {/* IMAGE SECTION */}
      <div className="relative w-full">
        <Image
          src={image}
          alt="post"
          width={335}
          height={217}
          onClick={openDetails}
          className="
            w-full
            h-48 sm:h-52 md:h-48 lg:h-56
            object-cover
          "
        />

        {/* COPY ICON */}
        <div className="
          absolute top-3 left-3
          bg-white/80 backdrop-blur
          p-2 rounded-full
          shadow-sm
        ">
          <IoCopyOutline className="text-dark-navy text-lg" />
        </div>

        {/* ELLIPSIS */}
        <button
        type="button"
        onClick={() => setMenuOpen((p) => !p)}
        className="
            absolute top-3 right-3
            bg-white/80 backdrop-blur
            p-2 rounded-full
            shadow-sm
            hover:bg-white
            transition
            z-40
        "
        >
        <FaEllipsisVertical className="text-dark-navy text-sm" />
        </button>

        {menuOpen && (
  <>
    {/* CLICK AWAY */}
    <button
      className="fixed inset-0 z-30 cursor-default"
      onClick={() => setMenuOpen(false)}
      aria-label="Close menu"
    />

    {/* MENU */}
    <div
      className="
        absolute top-12 right-3
        w-40
        bg-white
        rounded-xl
        shadow-lg
        border border-gray-100
        overflow-hidden
        z-50
      "
    >
      <button
        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
        onClick={() => {
            setMenuOpen(false);
            router.push("/portfolio/work-details"); // <-- your route
        }}
        >
        Edit
        </button>


      <button
        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
        onClick={() => {
          setMenuOpen(false);
          console.log('share');
        }}
      >
        Share
      </button>

      <button
        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
        onClick={() => {
          setMenuOpen(false);
          console.log('hide');
        }}
      >
        Hide
      </button>

      <button
        className="w-full text-left px-4 py-3 text-sm text-orange-500 hover:bg-orange-50"
        onClick={() => {
          setMenuOpen(false);
          console.log('delete');
        }}
      >
        Delete
      </button>
    </div>
  </>
)}



        {/* VIEWS BADGE */}
        <div className="
          absolute bottom-3 left-3
          bg-white/70 backdrop-blur
          px-3 py-1
          rounded-full
          flex items-center gap-1
          text-dark-navy/70
          text-xs
        ">
          <PiEyeThin />
          <span>{views}k</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3">
        {/* CAPTION */}
        <p
          onClick={openDetails}
          className="
            text-dark-navy
            text-base sm:text-lg
            font-medium
            truncate
          "
        >
          {caption}
        </p>

        {/* BOTTOM ROW */}
        <div className="flex items-center justify-between">
          {/* LEFT: LIKE + VIEWS */}
          <div className="flex items-center gap-4 text-dark-navy">
            <div className="flex items-center gap-1 text-sm">
              <SlLike />
              <span>{likes}</span>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <PiEyeThin />
              <span>{views}</span>
            </div>
          </div>

          {/* PLATFORM TAG */}
          <span className="
            text-xs
            px-3 py-1
            rounded-full
            bg-gray-100
            text-dark-navy/70
            font-medium
          ">
            {platform}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard2;
