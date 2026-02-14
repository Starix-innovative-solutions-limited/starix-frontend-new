/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { sidebarLinks } from "@/constant/index";
import Link from "next/link";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import LogoutModal from "./LogoutModal";
import { useModal } from "../../GlobalModal";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

interface SideBarProps {
  className?: string;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ className, onClose }) => {
  const [active, setActive] = useState<number>(0);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { open, close } = useModal();

  /* AUTO COLLAPSE ON SMALL SCREENS */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`
        bg-[#040136]
        h-screen
        ${collapsed ? "w-[88px]" : "w-[260px]"}
        py-8
        px-4
        flex flex-col justify-between
        rounded-r-[32px]
        transition-all duration-300
        ${className}
      `}
    >
      {/* TOP SECTION */}
      <div>
        {/* LOGO + CONTROLS */}
        <div className="flex items-center justify-between mb-12">
          <Image
            src="/logo white.svg"
            alt="Starix-logo"
            width={110}
            height={30}
            className={`${collapsed && "hidden"}`}
          />

          {/* COLLAPSE BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              hidden md:flex items-center justify-center
              w-10 h-10 rounded-full
              bg-white/20 hover:bg-white/30
              transition
            "
          >
            {collapsed ? (
              <LuPanelRightClose size={18} color="#fff" />
            ) : (
              <LuPanelLeftClose size={18} color="#fff" />
            )}
          </button>

          {/* MOBILE CLOSE */}
          <HiX
            onClick={onClose}
            className="md:hidden text-white"
            size={24}
          />
        </div>

        {/* NAVIGATION */}
        <ul className="space-y-6">
          {sidebarLinks.map((item: any, i: number) => {
            const isActive = active === i;

            return (
              <li
                key={i}
                onClick={() => {
                  setActive(i);
                  onClose?.();
                }}
              >
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-4
                    px-4 py-3
                    rounded-full
                    transition-all
                    ${
                      isActive
                        ? "bg-white text-[#040136]"
                        : "text-white/60 hover:text-white"
                    }
                  `}
                >
                  <Image
                    src={`/${item.icon}`}
                    alt={item.label}
                    width={22}
                    height={22}
                    className={`${!isActive && "opacity-70"}`}
                  />

                  {!collapsed && (
                    <span
                      className={`text-lg ${
                        isActive ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}

                  {/* OPTIONAL NEW BADGE */}
                  {item.new && !collapsed && (
                    <span className="ml-auto text-[10px] px-2 py-1 rounded-md bg-white/20 text-white">
                      NEW
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* LOGOUT BOTTOM */}
      <button
        onClick={() => open(<LogoutModal onClose={close} />)}
        className="
          flex items-center gap-4
          px-4 py-3
          rounded-full
          text-white/70 hover:text-white
          transition
        "
      >
        <img src="/logout.svg" className="w-5 h-5 opacity-80" />

        {!collapsed && <span className="text-lg">Logout</span>}
      </button>
    </aside>
  );
};

export default SideBar;
