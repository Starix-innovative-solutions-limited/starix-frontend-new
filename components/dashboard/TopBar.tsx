"use client";

import { Bell, Menu, X } from "lucide-react";

import React, { useState } from "react";
import Image from "next/image";
import SideBar from "./SideBar";
import { CiSearch } from "react-icons/ci";
// import { useModal } from "@/components/GlobalModal";

const TopBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // const { open, close } = useModal();

  return (
    <div className="w-full py-6 px-4 md:px-7 flex items-center justify-between border-b border-gray-200 bg-white">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-[#FAFAFA] border border-gray-200 shadow-2xs rounded-full px-3 py-3 flex-1 max-w-md">
        <CiSearch  className="text-secondary-100" size={28} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none  text-sm text-gray-600 placeholder:text-gray-400 w-full"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 md:gap-5">
        <button className="max-md:hidden">
          <Bell className="text-gray-700" size={20} />
        </button>

        {/* Avatar with Name */}
        <div className="flex items-center gap-2 max-md:hidden">
          <Image
            src={"/images/avatar.png"}
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-secondary-100">Favour</span>
            <span className="text-xs text-dark">Admin</span>
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
    </div>
  );
};

export default TopBar;