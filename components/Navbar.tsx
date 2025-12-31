"use client";

import { useState, useEffect } from "react";
import { MoveRight, Menu, Minimize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const pathName = usePathname()

  // useEffect(() => {
  //   navLinks.forEach()
  // }, [pathName])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/for-creators", label: "For Creators" },
    { href: "/contact", label: "Contact Us" },
  ];

  // Handle scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };

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

  const [active, setActive] = useState(0)

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
            className={` ${i == active ? "text-dark-navy" : "text-neut/60"} hover:text-dark-navy font-medium transition-colors`}
            onClick={() => setActive(i)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-2">
        <Link
          href={"/login"}
          className="bg-white flex-center  hover:bg-secondary-100 text-secondary-100 border border-secondary-100 !w-fit !rounded-full  p-1.5 px-3 "
        >
          <span>Sign up</span>
          <MdOutlineKeyboardArrowDown />
        </Link>
        <Link
          href="/signup"
          className="text-white bg-dark-navy p-1.5 px-3 rounded-full  font-semibold flex items-center gap-3 text-base"
        >
          Login
          {/* <MoveRight size={20} /> */}
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-neutral-700 z-50"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <Minimize2 size={22} className="text-[#444444]" />
        ) : (
          <Menu size={28} />
        )}
      </button>

      {/* Mobile Dropdown (NO GAP) */}
      <div
        className={`absolute left-0 top-full w-full bg-white shadow-md md:hidden z-40
          transition-all duration-300 ease-in-out
          ${isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-6 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neut/60 hover:text-dark-navy font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/login"
            className="text-white w-fit bg-dark-navy py-2 px-4 rounded-md text-lg font-semibold flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-sm">Get Started</span>
            <MoveRight size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
