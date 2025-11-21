"use client";

import { Bell, SquarePen, Menu, X } from "lucide-react";

import React, { useState } from "react";
import Image from "next/image";
import SideBar from "./SideBar";
import { useModal } from "@/components/GlobalModal";
import DraftList from "./DraftList";

const TopBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { open, close } = useModal();
  return (
    <div className="w-full py-4  px-7 flex-between border shadow-2xl border-b border-gray-200">
      <h3 className="font-mono">Hello Peace,</h3>

      <div className="flex items-center gap-5 md:gap-7">
        <button onClick={() => open(<DraftList onClose={close} />)}>
          <SquarePen className="text-sm text-gray-700" size={20} />
        </button>

        <Bell className="text-sm text-gray-700 cursor-pointer" size={21} />
        <Image
          src={"/images/avatar.png"}
          className="max-md:hidden"
          alt="avatar"
          width={30}
          height={30}
        />

        <button
          className=" rounded-md   md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? (
            <X className="text-sm text-primary-500" size={25} />
          ) : (
            <Menu className="text-sm text-gray-700" size={21} />
          )}
        </button>

        {isNavOpen && (
          <SideBar
            className="fixed top-0 left-0 h-screen z-[99999] w-full"
            onClose={() => setIsNavOpen(false)}
          />
          //   </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
