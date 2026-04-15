/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuPanelLeftClose } from "react-icons/lu";

const NAV_ITEMS = [
  { label: "Home", icon: "/dashboard.svg", href: "/dashboard" },
  { label: "Challenges", icon: "/clipboard.svg", href: "/challenges" },
  { label: "Creator Circles", icon: "/box.svg", href: "/circles", badge: 3 },
  { label: "Wallet", icon: "/walletss.svg", href: "/portfolio" },
  { label: "Analytics", icon: "/pie.svg", href: "/analytics" },
  { label: "Profile", icon: "/user.svg", href: "/profile" },
];

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
          /* Butter-smooth width transition */
          transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${collapsed ? "w-[88px]" : "w-[280px]"}
          transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${className}
        `}
      >
        {/* TOP SECTION - LOGO LOGIC */}
        <div className="flex items-center h-24 px-6 shrink-0 relative overflow-hidden">
          <div className="flex items-center justify-between w-full">
            
            {/* LOGO CONTAINER */}
            <div className="relative flex items-center h-10 w-full group">
              {/* CANDY LOGO (Shown when collapsed) */}
              <button
                onClick={() => collapsed && setCollapsed()}
                className={`
                  absolute right-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${collapsed 
                    ? "opacity-100 scale-100 translate-x-[6px] rotate-0 pointer-events-auto" 
                    : "opacity-0 scale-75 -translate-x-4 rotate-[-45deg] pointer-events-none"}
                  w-10 h-10 relative shrink-0
                `}
              >
                <Image src="/icon-logs.svg" alt="Starix Icon" fill className="object-contain" />
              </button>

              {/* FULL STARIX LOGO (Shown when opened) */}
              <div className={`
                absolute left-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${!collapsed 
                  ? "opacity-100 translate-x-0 blur-0" 
                  : "opacity-0 translate-x-4 blur-sm pointer-events-none"}
              `}>
                <Image src="/dash-logo.svg" alt="Starix" width={100} height={32} priority className="object-contain" />
              </div>
            </div>

            {/* CLOSE BUTTON */}
            {!collapsed && (
              <button
                onClick={setCollapsed}
                className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-[#0047FF] transition-all duration-300 shrink-0"
              >
                <LuPanelLeftClose size={32} />
              </button>
            )}
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar overflow-x-hidden">
          <nav>
            <ul className="space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.label;

                return (
                  <li key={item.label} onClick={() => { setActive(item.label); if(isOpen) onClose?.(); }}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-4 py-3.5 rounded-full transition-all duration-300
                        ${isActive ? "bg-[#EAF1FF] text-[#0047FF]" : "text-[#6B7280] hover:bg-gray-50"}
                        ${collapsed ? "justify-center" : "gap-4"}
                      `}
                    >
                      <div className="relative w-5 h-5 shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          className={`object-contain transition-opacity duration-300 ${!isActive && "opacity-80"}`}
                          style={{ filter: isActive ? "invert(17%) sepia(91%) saturate(6382%) hue-rotate(231deg)" : "none" }}
                        />
                      </div>

                      <span className={`
                        text-[16px] whitespace-nowrap overflow-hidden transition-all duration-300
                        ${collapsed ? "w-0 opacity-0 invisible ml-0" : "w-auto opacity-100 visible ml-0"}
                        ${isActive ? "font-bold" : "font-medium"}
                      `}>
                        {item.label}
                      </span>

                      {!collapsed && item.badge && (
                        <span className="ml-auto w-6 h-6 flex items-center justify-center bg-[#0033FF] text-white text-[12px] font-bold rounded-full border-2 border-white animate-in fade-in zoom-in duration-500">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* PROMO CARD / COLLAPSED ICON */}
<div className="mt-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
  {collapsed ? (
    /* COLLAPSED STATE - Paper Airplane Icon */
    <div className="flex flex-col items-center justify-center py-28 group cursor-pointer">
      <img src="/bluplay.svg" className="w-16 h-16" alt="" />

    </div>
  ) : (
    /* EXPANDED STATE - Your Original Promo Card */
    <div className={`
      bg-[#F9F9FB] border border-[#EFF0F3] rounded-[32px] p-5 text-center shadow-sm
      transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top
      opacity-100 scale-100 h-auto
    `}>
      <div className="w-full h-[140px] mt-2 flex items-center justify-center ">
        <img src="/dash-group.svg" alt="Challenges" className="object-contain w-full h-full mt-11 scale-170" />
      </div>
      <h4 className="text-[#1A1A1A] text-[16px] font-semibold mt-4 leading-tight">Earn from Challenges</h4>
      <p className="text-[#6B7280] text-[11px] mt-2 mb-5 leading-relaxed px-1">
        Submit your content to Campaign based Challenges to earn rewards
      </p>
      <button className="w-full bg-[#0033FF] text-white py-3 rounded-full font-semibold text-[12px] hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95">
        Submit Entries
      </button>
    </div>
  )}
</div>
        </div>

        {/* LOGOUT */}
        <div className="px-4 py-6 border-t border-gray-50 shrink-0">
          <button className={`flex items-center transition-all duration-300 w-full ${collapsed ? "justify-center" : "px-5 gap-4"}`}>
            <div className="relative w-6 h-6 shrink-0">
              <Image src="/logout.svg" alt="logout" fill className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(21%) sepia(90%) saturate(4649%) hue-rotate(352deg) brightness(89%) contrast(92%)" }} 
              />
            </div>
            <span className={`
              text-[#D12B1F] font-semibold text-[16px] whitespace-nowrap overflow-hidden transition-all duration-300
              ${collapsed ? "w-0 opacity-0 invisible ml-0" : "w-auto opacity-100 visible ml-0"}
            `}>
              Log out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;