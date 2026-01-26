"use client";

import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [signupOpen, setSignupOpen] = useState(false);
  const signupRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/for-creators", label: "For Creators" },
    { href: "/contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (signupRef.current && !signupRef.current.contains(e.target as Node)) {
        setSignupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-white shadow-sm py-4" : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-[100px] h-[25px]">
             <Image src="/logo.png" alt="Starix Logo" fill className="object-contain object-left" priority />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActive(i)}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === i ? "text-dark-navy" : "text-neut/70 hover:text-dark-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
            {/* Dropdown */}
            <div className="relative" ref={signupRef}>
                <button
                    onClick={() => setSignupOpen(!signupOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-secondary-100 border border-secondary-100 rounded-full px-4 py-2 transition-colors hover:bg-secondary-100 hover:text-white"
                >
                    Sign up
                    <MdOutlineKeyboardArrowDown className={`transition-transform ${signupOpen ? 'rotate-180' : ''}`} />
                </button>

                {signupOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <Link href="/signup?role=brand" className="px-4 py-2 text-sm text-gray-700 hover:bg-secondary-100 hover:text-white transition-colors">
                            As a Brand
                        </Link>
                        <Link href="/signup?role=creator" className="px-4 py-2 text-sm text-gray-700 hover:bg-secondary-100 hover:text-white transition-colors">
                            As a Creator
                        </Link>
                    </div>
                )}
            </div>

            <Link href="/login" className="px-5 py-2 text-sm font-medium text-white bg-dark-navy rounded-full hover:opacity-90 transition-opacity">
                Login
            </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-dark-navy z-50 relative" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoCloseOutline size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden pt-24 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
          <div className="flex flex-col px-6 gap-6 h-full overflow-y-auto pb-10">
             {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-medium text-dark-navy"
                    onClick={() => setIsOpen(false)}
                >
                    {link.label}
                </Link>
             ))}
             <div className="w-full h-px bg-gray-100 my-2" />
             <div className="flex flex-col gap-4">
                 <p className="text-gray-500 font-medium uppercase text-xs tracking-wider">Sign up</p>
                 <Link href="/signup?role=brand" onClick={() => setIsOpen(false)} className="text-lg text-secondary-100 font-medium">As a Brand</Link>
                 <Link href="/signup?role=creator" onClick={() => setIsOpen(false)} className="text-lg text-secondary-100 font-medium">As a Creator</Link>
             </div>
             <div className="mt-auto">
                <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full bg-dark-navy text-white text-center py-4 rounded-full font-medium text-lg">
                    Login
                </Link>
             </div>
          </div>
      </div>
    </nav>
  );
}
