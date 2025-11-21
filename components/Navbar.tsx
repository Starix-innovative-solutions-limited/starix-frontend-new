"use client";

import { useState, useEffect } from "react";
import { MoveRight, Menu, Minimize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Your onScroll logic here
      // Example: Add a class to the navbar when scrolling down
      const navbar = document.querySelector("#navbar");
      if (navbar && window.scrollY > 100) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className="bg-transparent py-2 mx-auto flex-between w-full"
    >
      {/* Logo */}
      <Image src="/images/logo.png" alt="Starix-logo" width={100} height={25} />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-neutral-600 hover:text-primary-400 font-medium transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/login"
          className="text-white ml-16 bg-secondary-300 py-2 px-4 rounded-md text-lg font-semibold flex items-center justify-center gap-3"
        >
          <span className="text-sm">Get Started</span> <MoveRight size={20} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-neutral-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <Minimize2 size={22} className="text-[#444444]" />
        ) : (
          <Menu size={28} />
        )}
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-20 left-0 w-full bg-white shadow-md flex flex-col px-8 gap-6 py-6 md:hidden z-40 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex-around pt-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-600 hover:text-primary-400 text-right font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="text-white bg-secondary-10 hover:bg-secondary-100 py-2.5 px-6 rounded-md text-lg font-semibold flex items-center justify-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-sm">Get Started</span> <MoveRight size={20} />
        </Link>
      </div>
    </nav>
  );
}
