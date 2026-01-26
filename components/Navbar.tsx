"use client";

import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/for-creators", label: "For Creators" },
    { href: "/contact", label: "Contact Us" },
  ];

  // Active link (manual)
  const [active, setActive] = useState(0);

  // Desktop signup dropdown (click-to-open)
  const [signupOpen, setSignupOpen] = useState(false);

  // ✅ FIX: type the ref so `.contains` exists
  const signupRef = useRef<HTMLDivElement | null>(null);

  // Handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close desktop dropdown on outside click + ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!signupRef.current) return;
      if (!signupRef.current.contains(target)) setSignupOpen(false);
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSignupOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled ? "scrolled py-4" : "py-10"}
        ${isOpen ? "bg-white" : "bg-transparent"}
        px-6 md:px-16 flex-between`}
    >
      {/* Logo */}
      <Image src="/logo.png" alt="Starix-logo" width={100} height={25} />

      {/* Desktop Links */}
      <div className="max-md:hidden flex items-center gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              i === active ? "text-dark-navy" : "text-neut/60"
            } hover:text-dark-navy font-medium transition-colors`}
            onClick={() => {
              setActive(i);
              setSignupOpen(false);
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-2">
        {/* SIGN UP (click dropdown) */}
        <div className="relative" ref={signupRef}>
          <button
            type="button"
            onClick={() => setSignupOpen((prev) => !prev)}
            className="
              bg-white flex-center
              text-secondary-100
              border border-secondary-100
              !w-fit !rounded-full p-1.5 px-3
              transition-colors duration-300
              hover:bg-secondary-100 hover:text-white
              focus:outline-none
            "
            aria-haspopup="menu"
            aria-expanded={signupOpen}
          >
            <span>Sign up</span>
            <MdOutlineKeyboardArrowDown
              className={`transition-transform duration-200 ${
                signupOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown panel */}
          <div
            className={`
              absolute right-0 top-[110%] w-56
              bg-white border border-secondary-100/30
              rounded-2xl shadow-lg overflow-hidden
              transition-all duration-200 origin-top
              ${
                signupOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }
            `}
            role="menu"
          >
            <Link
              href="/signup?role=brand"
              className="
                block px-4 py-3 text-dark-navy
                transition-colors
                hover:bg-secondary-100 hover:text-white
              "
              role="menuitem"
              onClick={() => setSignupOpen(false)}
            >
              Sign up as a Brand
            </Link>

            <Link
              href="/signup"
              className="
                block px-4 py-3 text-dark-navy
                transition-colors
                hover:bg-secondary-100 hover:text-white
              "
              role="menuitem"
              onClick={() => setSignupOpen(false)}
            >
              Sign up as a Creator
            </Link>
          </div>
        </div>

        {/* LOGIN */}
        <Link
          href="/login"
          className="text-white bg-dark-navy p-1.5 px-3 rounded-full font-semibold flex items-center gap-3 text-base"
          onClick={() => setSignupOpen(false)}
        >
          Login
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <Link
          href="/login"
          className="text-white bg-dark-navy p-1.5 px-2 rounded-full font-semibold flex items-center gap-3 text-sm"
        >
          Login
        </Link>

        <button
          className="md:hidden text-neutral-700 z-50"
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          {isOpen ? (
            <IoCloseOutline size={22} className="text-[#444444]" />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`absolute left-0 top-full w-full bg-white shadow-md md:hidden z-40
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-6 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-dark-navy text-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/signup?role=brand"
            className="w-fit text-dark-navy text-lg flex items-center gap-3 underline"
            onClick={() => setIsOpen(false)}
          >
            Sign up as Brand.
          </Link>

          <Link
            href="/signup"
            className="w-fit text-dark-navy text-lg flex items-center gap-3 underline"
            onClick={() => setIsOpen(false)}
          >
            Sign up as Creator.
          </Link>

          <Link
            href="/login"
            className="text-white w-full bg-dark-navy py-2 px-4 rounded-full text-center text-lg font-semibold flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-center mx-auto">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
