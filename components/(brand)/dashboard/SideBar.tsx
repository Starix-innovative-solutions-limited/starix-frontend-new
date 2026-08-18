"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LuPanelLeftClose } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { sessionAuth } from "@/utils/sessionAuth";

const NAV_ITEMS = [
  { label: "Overview", icon: "/home.svg", href: "/brand" },
  { label: "Challenges", icon: "/challenges.svg", href: "/brand/challenges" },
  { label: "Submissions", icon: "/media.svg", href: "/brand/submissions" },
  { label: "Analytics", icon: "/pie.svg", href: "/brand/analytics" },
  { label: "Payments", icon: "/walletss.svg", href: "/brand/payments" },
  { label: "Profile", icon: "/user.svg", href: "/brand/profile" },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const SideBar = ({
  className,
  onClose,
  isOpen,
  collapsed,
  setCollapsed,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    if (sessionAuth && typeof sessionAuth.clear === "function") {
      sessionAuth.clear();
    } else {
      localStorage.removeItem("auth-storage");
      localStorage.removeItem("token");
    }
    logout?.();
    router.push("/login?role=brand");
  };

  const isItemActive = (href: string) => {
    if (href === "/brand") return pathname === "/brand";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen bg-white border-r border-gray-100 flex flex-col
          transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${collapsed ? "w-[88px]" : "w-[240px]"}
          transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${className}
        `}
      >
        <div className="relative flex h-24 shrink-0 items-center overflow-hidden px-6">
          <div className="flex w-full items-center justify-between">
            <div className="relative flex h-10 w-full items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (collapsed) setCollapsed?.(false);
                }}
                className={`
                  absolute right-2 w-10 h-10 shrink-0
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${
                    collapsed
                      ? "opacity-100 scale-100 translate-x-[6px] pointer-events-auto"
                      : "opacity-0 scale-75 -translate-x-4 pointer-events-none"
                  }
                `}
              >
                <Image
                  src="/icon-logs.svg"
                  alt="Starix Icon"
                  fill
                  className="object-contain"
                />
              </button>

              <div
                className={`
                  absolute left-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${
                    !collapsed
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4 pointer-events-none"
                  }
                `}
              >
                <Image
                  src="/dash-logo.svg"
                  alt="Starix"
                  width={100}
                  height={32}
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {!collapsed && (
              <button
                type="button"
                onClick={() => setCollapsed?.(true)}
                className="shrink-0 rounded-xl p-2 text-gray-400 transition-all duration-300 hover:bg-gray-50 hover:text-[#0047FF]"
              >
                <LuPanelLeftClose size={32} />
              </button>
            )}
          </div>
        </div>

        <div className="no-scrollbar flex-1 overflow-x-hidden overflow-y-auto px-4 py-2">
          <nav>
            <ul className="space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.href);

                return (
                  <li
                    key={item.label}
                    onClick={() => {
                      if (isOpen) onClose?.();
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        flex items-center rounded-full px-4 py-3.5 transition-all duration-300
                        ${
                          isActive
                            ? "bg-[#EAF1FF] text-[#0047FF]"
                            : "text-[#6B7280] hover:bg-gray-50"
                        }
                        ${collapsed ? "justify-center" : "gap-3"}
                      `}
                    >
                      <div className="relative h-5 w-5 shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          fill
                          className={`object-contain transition-opacity duration-300 ${
                            !isActive && "opacity-80"
                          }`}
                          style={{
                            filter: isActive
                              ? "invert(17%) sepia(91%) saturate(6382%) hue-rotate(231deg)"
                              : "none",
                          }}
                        />
                      </div>

                      <span
                        className={`
                          overflow-hidden text-[16px] whitespace-nowrap transition-all duration-300
                          ${
                            collapsed
                              ? "invisible ml-0 w-0 opacity-0"
                              : "visible ml-0 w-auto opacity-100"
                          }
                          ${isActive ? "font-semibold" : "font-medium"}
                        `}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {collapsed ? (
              <div className="flex cursor-pointer flex-col items-center justify-center py-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bluplay.svg" className="h-16 w-16" alt="" />
              </div>
            ) : (
              <div className="rounded-[32px] border border-[#EFF0F3] bg-[#F9F9FB] p-2 text-center shadow-sm">
                <div className="mt-2 flex h-[140px] w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/dash-group.svg"
                    alt="Challenges"
                    className="mt-11 h-full w-full scale-145 object-contain"
                  />
                </div>
                <h4 className="text-[14px] leading-tight font-semibold text-[#1A1A1A]">
                  Launch a Challenge
                </h4>
                <p className="mt-2 mb-4 text-center text-[10px] leading-snug text-[#62636C]">
                  Create campaign-based challenges and get UGC from top creators
                </p>
                <Link
                  href="/brand/challenges"
                  className="mb-3 mr-10 inline-block rounded-full bg-[#0033FF] px-3 py-3 text-[12px] font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 active:scale-95"
                >
                  Create Challenge
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-50 px-4 py-6">
          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full cursor-pointer items-center rounded-full py-2.5 transition-all duration-300 hover:bg-red-50/40 ${
              collapsed ? "justify-center" : "gap-4 px-5"
            }`}
          >
            <div className="relative h-6 w-6 shrink-0">
              <Image
                src="/logout.svg"
                alt="logout"
                fill
                className="object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(21%) sepia(90%) saturate(4649%) hue-rotate(352deg) brightness(89%) contrast(92%)",
                }}
              />
            </div>
            <span
              className={`
                overflow-hidden text-[16px] font-semibold whitespace-nowrap text-[#D12B1F] transition-all duration-300
                ${
                  collapsed
                    ? "invisible ml-0 w-0 opacity-0"
                    : "visible ml-0 w-auto opacity-100"
                }
              `}
            >
              Log out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
