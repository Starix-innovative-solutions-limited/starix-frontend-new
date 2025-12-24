"use client";

import { Bell, Menu, X } from "lucide-react";

import React, { useState } from "react";
import Image from "next/image";
import SideBar from "./SideBar";
import { CiSearch } from "react-icons/ci";
import Notification from "./Notification";
import { useModal } from "@/hooks/useModal";
import { useAuthStore } from "@/store/useAuthStore";

const TopBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { open } = useModal();
  const { profile } = useAuthStore();

  return (
    <div className="w-full py-4 px-4 md:px-14  flex items-center justify-between rounded-2xl bg-white   relative max-md:gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-[#FAFAFA]  rounded-full px-3 py-3 flex-1 max-w-md">
        <CiSearch className="text-secondary-100" size={29} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none  text-sm text-gray-600 placeholder:text-gray-400 w-full"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 md:gap-5">

        <button className="max-md:hidden" onClick={() => open(<Notification />, { position: 'top-right', modalClassName: ' top-20 md:right-10' })}>
          <Bell className="text-gray-700" size={26} />
        </button>


        {/* Avatar with Name */}
        <div className="flex items-center gap-4 max-md:hidden">
          <Image
            src={"/profile.png"}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col">
            <span className="text-base font-medium text-secondary-100">{profile?.display_name}</span>
            <span className="text-sm text-dark -mt-1">Creator</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? (
            <X className="text-gray-700" size={24} />
          ) : (
            <Menu className="text-gray-700" size={24} />
          )}
        </button>

        {isNavOpen && (
          <SideBar
            className="fixed top-0 left-0 h-screen z-[99999] w-full"
            onClose={() => setIsNavOpen(false)}
          />
        )}
      </div>
    </div >
  );
};

export default TopBar;