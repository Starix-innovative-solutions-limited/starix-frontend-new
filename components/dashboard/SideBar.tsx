"use client";

import React, { useEffect, useState } from "react";
import { sidebarLinks } from "@/constant/index";
import Link from "next/link";
import Image from "next/image";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiX } from "react-icons/hi";
import { LogOut } from "lucide-react";
import LogoutModal from "./LogoutModal";
import { useModal } from "../GlobalModal";

interface SideBarProps {
  className?: string;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ className, onClose }) => {
  const [active, setActive] = useState<string>("Dashboard");

  const [collapsed, setCollapsed] = useState<boolean>(false);

  // useEffect(() => onClose, [active]);

  useEffect(() => {
    const handleResize = () => {
      // Tailwind 'lg' breakpoint = 1024px
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Run once on mount
    handleResize();

    // Add listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { open, close } = useModal();

  return (
    <aside
      className={` md:px-2 lg:px-4 xl:px-7 bg-[#0A2682] border-r h-screen w-fit ${
        collapsed ? "pr-4" : "pr-14"
      } py-8 flex flex-col items-between gap-6 ${className && className} `}
    >
      <div className="flex flex-col gap-6 grow">
        <div className="flex-between">
          <span className="bg-white  rounded-md w-fit">
            <Image
              src="/images/logo.png"
              alt="Starix-logo"
              width={100}
              height={25}
              className={`${collapsed && "hidden"}`}
            />
          </span>

          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <HiChevronDoubleRight
                size={24}
                color="#fafafa"
                className="max-md:hidden"
              />
            ) : (
              <HiChevronDoubleLeft
                size={24}
                color="#fafafa"
                className="max-md:hidden"
              />
            )}
          </button>
          <HiX
            onClick={onClose}
            className="md:hidden"
            color="#fafafa"
            size={25}
          />
        </div>
        <div className="space-y-6 mt-7">
          {Object.entries(sidebarLinks).map(([section, links]) => (
            <div key={section}>
              <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {section}
              </h2>
              <ul className="space-y-6">
                {links.map(({ label, icon: Icon, href }) => (
                  <li
                    key={label}
                    onClick={() => {
                      setActive(label);
                      onClose?.();
                    }}
                  >
                    <Link
                      href={`${href}`}
                      // href={""}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/50 text-white ${
                        active === label && "bg-white text-secondary-500"
                      }`}
                    >
                      <Icon
                        className={`text-lg ${
                          collapsed ? "text-xl" : "text-lg"
                        } ${active == label && "text-secondary-500"}`}
                      />
                      <span
                        className={` ${
                          active == label && "text-secondary-500"
                        } ${collapsed && "md:hidden"} text-nowrap`}
                      >
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button
        className="flex items-center gap-3 text-white px-3"
        onClick={() => open(<LogoutModal onClose={close} />)}
      >
        <LogOut size={20} />{" "}
        <p className={`font-mono leading-relaxed  ${collapsed && "hidden"} `}>
          Logout
        </p>
      </button>
    </aside>
  );
};

export default SideBar;
