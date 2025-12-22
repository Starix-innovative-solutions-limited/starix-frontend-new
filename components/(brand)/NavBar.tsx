"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsBell } from "react-icons/bs";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
    // const [activeTab, setActiveTab] = useState("Overview");
    const [open, setOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 5);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`transition-all duration-300 ${scrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4"
            : "relative py-4 md:py-8"
            } max-md:border-b max-md:border-neut/20 px-6 md:px-20 lg:px-32`}
        >
            <div className=" flex items-center justify-between">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Image src="/logo.svg" alt="Logo" width={90} height={40} />
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
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
                                    className={`text-lg transition-colors ${isActive
                                        ? "text-dark-navy"
                                        : "text-neut/60 hover:text-gray-700"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>


                {/* Right Section */}
                <div className="flex items-center gap-3">

                    {/* Bell */}
                    <motion.button
                        className="p-2 rounded-full bg-[#f5f5f5] border border-neut/20 relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <BsBell className="w-5 h-5 text-gray-700" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
                    </motion.button>

                    {/* Profile */}
                    <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-200">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
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
                                        className={`py-2 text-base ${isActive
                                            ? "text-dark-navy font-medium"
                                            : "text-neut/70"
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
