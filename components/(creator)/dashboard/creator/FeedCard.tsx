import React from "react";
import Image from "next/image";
import FeedDetails from "./FeedDetails";
import { useModal } from "@/hooks/useModal";
import { FiThumbsUp } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";

const FeedCard = () => {
  const { open } = useModal();

  const openDetails = () => {
    open(<FeedDetails />);
  };

  return (
    <div className="bg-[#F6F6F8] rounded-2xl overflow-hidden border border-gray-100 w-full shadow-xs">
      {/* TOP IMAGE — FULL BLEED */}
      <Image
        src="/feed.png"
        alt="feed"
        width={1200}
        height={600}
        onClick={openDetails}
        className="w-full h-[260px] object-cover cursor-pointer"
      />

      {/* CONTENT */}
      <div className="p-6 space-y-3">
        {/* USER ROW */}
        <div className="flex items-center gap-3">
          <Image
            src="/profile.png"
            alt="profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />

          <div className="flex items-center gap-2">
            <h3 className="text-secondary-100 text-[20px] font-medium">
              Favour
            </h3>
            <span className="text-secondary-100/50 text-[16px] font-light">
              @favvy
            </span>
          </div>

          <span className="ml-auto text-secondary-100/40 text-[16px] font-light">
            20h
          </span>
        </div>

        {/* POST TEXT */}
        <p
          onClick={openDetails}
          className="
            text-secondary-100
            text-[20px]
            leading-[40px]
            font-light
            cursor-pointer
          "
        >
          I’ve been using this for about a week now, and honestly, I’m
          genuinely surprised at how well it works, so I had to share it
          with you guys.
          <br />
          <span className="text-secondary-100/70">#product #life</span>
        </p>

        {/* ACTIONS */}
        <div className="flex items-center gap-8">
          {/* LIKE */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ECECF2] flex items-center justify-center">
              <FiThumbsUp className="text-secondary-100 text-lg" />
            </div>
            <span className="text-secondary-100 text-[18px] font-light">
              500
            </span>
          </div>

          {/* COMMENT */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ECECF2] flex items-center justify-center">
              <FaRegComment className="text-secondary-100 text-lg" />
            </div>
            <span className="text-secondary-100 text-[18px] font-light">
              10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
