"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsBell } from "react-icons/bs";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { name: "Overview", href: "/brand" },
  { name: "Challenges", href: "/brand/challenges" },
  { name: "Submissions", href: "/brand/submissions" },
  { name: "Analytics", href: "/brand/analytics" },
  { name: "Payments", href: "/brand/payments" },
  { name: "Profile", href: "/brand/profile" },
];

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 👇 NEW
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 👇 close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: clear auth store / token
    router.push("/login");
  };

  return (
    <nav
      className={`transition-all duration-300 ${
        scrolled
          ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4"
          : "relative py-4 md:py-8"
      } max-md:border-b max-md:border-neut/20 px-6 md:px-20 lg:px-15`}
    >
      <div className="flex items-left justify-between">
        {/* LOGO */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Image src="/logo.svg" alt="Logo" width={129} height={40} />
        </motion.div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`text-lg transition-colors ${
                    isActive ? "text-dark-navy" : "text-neut/60 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* BELL */}
          <motion.button
            className="p-2 rounded-full bg-[#f5f5f5] border border-neut/20 relative"
            whileHover={{ scale: 1.1 }}
          >
            <BsBell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
          </motion.button>

          {/* PROFILE + DROPDOWN */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-200"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="
                    absolute right-0 mt-3 w-44
                    bg-white rounded-xl shadow-lg
                    border border-gray-100
                    overflow-hidden z-50
                  "
                >
                  <Link
                    href="/brand/profile"
                    className="block px-4 py-3 text-sm hover:bg-gray-50 text-dark-navy"
                    onClick={() => setProfileOpen(false)}
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-500"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
            {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-neut/20"
          >
            <div className="flex flex-col px-4 py-4 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`py-2 text-base ${
                      isActive ? "text-dark-navy font-medium" : "text-neut/70"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


export default NavBar;