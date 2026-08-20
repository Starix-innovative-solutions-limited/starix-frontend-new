"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineHome, HiOutlineUser } from "react-icons/hi2";
import { IoTrophyOutline, IoTrophy } from "react-icons/io5";
import { LuPanelLeftClose } from "react-icons/lu";
import { useModal } from "@/hooks/useModal";
import CreateChallenge from "@/components/(brand)/challenge/CreateChallenge";
import { useAuthStore } from "@/store/useAuthStore";
import { sessionAuth } from "@/utils/sessionAuth";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/brand",
    icon: HiOutlineHome,
    activeIcon: HiOutlineHome,
  },
  {
    label: "Challenges",
    href: "/brand/challenges",
    icon: IoTrophyOutline,
    activeIcon: IoTrophy,
  },
  {
    label: "Profile",
    href: "/brand/profile",
    icon: HiOutlineUser,
    activeIcon: HiOutlineUser,
  },
] as const;

type BrandSideBarProps = {
  className?: string;
  onClose?: () => void;
  isOpen?: boolean;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const BrandSideBar = ({
  className = "",
  onClose,
  isOpen = false,
  collapsed,
  setCollapsed,
}: BrandSideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useModal();
  const { logout } = useAuthStore();

  const isItemActive = (href: string) => {
    if (href === "/brand") return pathname === "/brand";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const openCreate = () => {
    open(<CreateChallenge />, { bare: true });
    onClose?.();
  };

  const handleLogout = () => {
    sessionAuth?.clear?.();
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    logout?.();
    router.push("/login?role=brand");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-[#F2F4F7] bg-white
          transition-[width,transform] duration-300 ease-out
          lg:static lg:translate-x-0
          ${collapsed ? "w-[88px]" : "w-[260px]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className}
        `}
      >
        {/* Logo */}
        <div className="relative flex h-[88px] shrink-0 items-center overflow-hidden px-5">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="relative flex h-10 min-w-0 flex-1 items-center">
              {/* Collapsed mark — expands sidebar */}
              <button
                type="button"
                aria-label="Expand sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  setCollapsed(false);
                }}
                className={`
                  absolute left-1/2 h-10 w-10 -translate-x-1/2 transition-all duration-300
                  ${
                    collapsed
                      ? "pointer-events-auto scale-100 opacity-100"
                      : "pointer-events-none scale-75 opacity-0"
                  }
                `}
              >
                <Image
                  src="/icon-logs.svg"
                  alt="Starix"
                  fill
                  className="object-contain"
                />
              </button>

              {/* Full logo */}
              <div
                className={`
                  transition-all duration-300
                  ${
                    collapsed
                      ? "pointer-events-none translate-x-2 opacity-0"
                      : "translate-x-0 opacity-100"
                  }
                `}
              >
                <Image
                  src="/dash-logo.svg"
                  alt="starix"
                  width={110}
                  height={36}
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {!collapsed && (
              <button
                type="button"
                aria-label="Collapse sidebar"
                onClick={() => setCollapsed(true)}
                className="shrink-0 rounded-xl p-2 text-[#98A2B3] transition hover:bg-gray-50 hover:text-[#0047FF]"
              >
                <LuPanelLeftClose size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Nav */}
        <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto px-3 pb-4">
          <nav className="mt-1">
            <ul className="space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.href);
                const Icon = isActive ? item.activeIcon : item.icon;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => onClose?.()}
                      title={collapsed ? item.label : undefined}
                      className={`
                        flex items-center rounded-full px-4 py-3.5 transition-colors
                        ${
                          isActive
                            ? "bg-[#EAF1FF] text-[#0047FF]"
                            : "text-[#98A2B3] hover:bg-gray-50 hover:text-[#667085]"
                        }
                        ${collapsed ? "justify-center px-0" : "gap-3"}
                      `}
                    >
                      <Icon size={22} className="shrink-0" />
                      {!collapsed && (
                        <span
                          className={`text-[15px] whitespace-nowrap ${
                            isActive ? "font-semibold" : "font-medium"
                          }`}
                        >
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-h-6 flex-1" />

          {/* Create Challenge promo */}
          <div className="px-1">
            {collapsed ? (
              <button
                type="button"
                onClick={openCreate}
                className="mx-auto flex h-12 w-12 items-center justify-center overflow-hidden]"
                aria-label="Create Challenge"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bluplay 2.svg"
                  alt=""
                  className="h-12 w-12 object-contain"
                />
              </button>
            ) : (
              <div className="overflow-hidden rounded-[28px] bg-[#F9F9FB]">
                <div className="relative h-[120px] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/chains.svg"
                    alt=""
                    className="h-full w-full object-cover object-[center_5%]"
                  />
                </div>

                <div className="px-5 pt-4 pb-5 text-left">
                  <h4 className="text-[16px] leading-tight font-semibold tracking-[-0.01em] text-[#101828]">
                    Create a Challenge
                  </h4>
                  <p className="mt-2 text-[12px] leading-[1.45] text-[#667085]">
                    Campaign-based challenges create widespread engagement.
                  </p>
                  <button
                    type="button"
                    onClick={openCreate}
                    className="mt-5 w-full rounded-full bg-[#0033FF] p-4 text-[12px] font-semibold text-white transition hover:bg-[#0029CC] active:scale-[0.98]"
                  >
                    Create Challenge
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="shrink-0 border-t border-[#F2F4F7] px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full items-center rounded-full py-2.5 text-[#D12B1F] transition hover:bg-red-50/50 ${
              collapsed ? "justify-center" : "gap-3 px-4"
            }`}
          >
            <div className="relative h-5 w-5 shrink-0">
              <Image
                src="/logout.svg"
                alt=""
                fill
                className="object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(21%) sepia(90%) saturate(4649%) hue-rotate(352deg) brightness(89%) contrast(92%)",
                }}
              />
            </div>
            {!collapsed && (
              <span className="text-[15px] font-semibold">Log out</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default BrandSideBar;
