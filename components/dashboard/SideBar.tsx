/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { sidebarLinks } from "@/constant/index";
import Link from "next/link";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import LogoutModal from "./LogoutModal";
import { useModal } from "../GlobalModal";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";


interface SideBarProps {
  className?: string;
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ className, onClose }) => {
  const [active, setActive] = useState<number>(0);

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
      className={` md:px-2 lg:px-4 xl:px-7 bg-white shadow h-screen w-fit ${collapsed ? "pr-4 md:w-fit" : "pr-14  md:min-w-2xs"
        } py-8 flex flex-col items-between gap-6 ${className && className} `}
    >
      <div className="flex flex-col gap-6 grow">
        <div className="flex-between">
          <span className="bg-white  rounded-md w-fit">
            <Image
              src="/logo.png"
              alt="Starix-logo"
              width={100}
              height={25}
              className={`${collapsed && "hidden"}`}
            />
          </span>

          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <LuPanelRightClose
                size={24}
                color="#040136"
                className="max-md:hidden"
              />
            ) : (
              <LuPanelLeftClose size={24}
                color="#040136"
                className="max-md:hidden" />
            )}
          </button>
          <HiX
            onClick={onClose}
            className="md:hidden"
            // color=""
            size={25}
          />
        </div>
        <div className="space-y-6 mt-7">
          {/* <MdClose /> */}
          <ul className="space-y-8">
            {sidebarLinks.map((items: any, i: number) => (


              <li
                key={i}
                onClick={() => {
                  setActive(i);
                  onClose?.();
                }}
              >
                <Link
                  href={`${items?.href}`}
                  // href={""}
                  className={`flex items-center gap-4 px-3 py-2 max-md:pl-4 rounded-lg hover:bg-black/50  ${active === i ? "text-secondary-100" : "text-dark "
                    }`}
                >
                  {items?.icon && React.createElement(items.icon, {
                    className: ` ${collapsed ? "text-xl" : "text-xl"} text-[1.45rem] ${active === i ? "text-secondary-100 " : "text-dark"}`
                  })}

                  <span
                    className={` text-lg md:text-xl ${active == i && "text-secondary-100 font-medium"
                      } ${collapsed && "md:hidden"} text-nowrap`}
                  >
                    {items?.label}
                  </span>
                </Link>
              </li>

            ))}
          </ul>

        </div>
      </div>

      <button
        className="flex items-center gap-3 text-white px-3"
        onClick={() => open(<LogoutModal onClose={close} />)}
      >
        <img src={'/logout.svg'} className="w-6.5 h-6.5" />
        {" "}
        <p className={`font-mono leading-relaxed text-dark  ${collapsed && "hidden"} `}>
          Logout
        </p>
      </button>
    </aside>
  );
};

export default SideBar;
