/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

const NAV_ITEMS = [
  { label: "Home", icon: "/dashboard.svg", href: "/dashboard" },
  { label: "Challenges", icon: "/clipboard.svg", href: "/challenges" },
  { label: "Creator Circles", icon: "/box.svg", href: "/circles", badge: 3 },
  { label: "Portfolio", icon: "/megaphone.svg", href: "/portfolio" },
  { label: "Analytics", icon: "/headphone.svg", href: "/analytics" },
  { label: "Profile", icon: "/user.svg", href: "/profile" },
];

// ✅ Logic inherited from Layout via props
const SideBar = ({ className, onClose, isOpen, collapsed, setCollapsed }: any) => {
  const [active, setActive] = useState("Home");

  return (
    <>
      {/* BACKDROP (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen bg-white border-r border-gray-100 flex flex-col
          transition-all duration-300 ease-in-out

          ${collapsed ? "w-[88px]" : "w-[280px]"}

          transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0

          ${className}
        `}
      >
        {/* TOP SECTION */}
        <div className={`flex items-center pt-8 pb-6 px-6 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <Image
              src="/dash-logo.svg"
              alt="Starix"
              width={100}
              height={32}
              priority
              className="object-contain"
            />
          )}

          {/* TOGGLE BUTTON - Now triggers the Layout's mutual exclusion logic */}
          <button
            onClick={setCollapsed}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-[#0047FF] transition-colors border border-transparent hover:border-gray-100"
          >
            {collapsed ? (
              <LuPanelLeftOpen size={32} />
            ) : (
              <LuPanelLeftClose size={32} />
            )}
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar">
          <nav>
            <ul className="space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.label;

                return (
                  <li
                    key={item.label}
                    onClick={() => {
                      setActive(item.label);
                      if(isOpen) onClose?.();
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-4 px-4 py-3.5 rounded-full transition-all
                        ${
                          isActive
                            ? "bg-[#EAF1FF] text-[#0047FF]"
                            : "text-[#6B7280] hover:bg-gray-50"
                        }
                        ${collapsed ? "justify-center px-0" : ""}
                      `}
                    >
                      {/* ICON */}
                      <div className="relative w-8 h-8 shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          className={`object-contain transition-opacity ${
                            !isActive && "opacity-40"
                          }`}
                          style={{
                            filter: isActive
                              ? "invert(17%) sepia(91%) saturate(6382%) hue-rotate(231deg)"
                              : "none",
                          }}
                        />
                      </div>

                      {/* LABEL */}
                      {!collapsed && (
                        <span className={`text-[16px] ${isActive ? "font-bold" : "font-medium"}`}>
                          {item.label}
                        </span>
                      )}

                      {/* BADGE */}
                      {!collapsed && item.badge && (
                        <span className="ml-auto w-6 h-6 flex items-center justify-center bg-[#FF6B35] text-white text-[12px] font-bold rounded-full border-2 border-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* PROMO CARD (Hides on collapse) */}
          {!collapsed && (
          <div className="mt-8 bg-[#F9F9FB] border-1.2 border-[#EFF0F3] rounded-[32px] p-5 text-center shadow-sm">
              <div className="w-full h-[140px] mt-2 flex items-center justify-center ">
                <img
                  src="/dash-group.svg"
                  alt="Challenges"
                  className="object-contain w-full h-full mt-11 scale-170"
                />
              </div>
              <h4 className="text-[#1A1A1A] text-[16px] font-semibold mt-4 leading-tight">
                Earn from Challenges
              </h4>
              <p className="text-[#6B7280] text-[11px] mt-2 mb-5 leading-relaxed px-1">
                Submit your content to Campaign based Challenges to earn rewards
              </p>
              <button className="w-full bg-[#0033FF] text-white py-3 rounded-full font-semibold text-[12px] hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95">
                Submit Entries
              </button>
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <div className="px-4 py-6 border-t border-gray-50">
          <button
            className={`
              flex items-center gap-4 text-[#D12B1F] font-medium text-[14px] hover:opacity-80 transition-all w-full
              ${collapsed ? "justify-center px-0" : "px-5"}
            `}
          >
            <div className="relative w-6 h-6 shrink-0">
              <Image
                src="/logout.svg"
                alt="logout"
                fill
                className="object-contain"
                style={{ 
                filter: "brightness(0) saturate(100%) invert(21%) sepia(90%) saturate(4649%) hue-rotate(352deg) brightness(89%) contrast(92%)" 
              }} />
            </div>
            {!collapsed && <span className="text-[16px]">Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;