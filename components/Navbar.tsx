"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/for-brands", label: "For Brands" },
    { href: "/for-creators", label: "For Creators" },
    { href: "/contact", label: "Contact Us" },
    { href: "/login", label: "Log in" },
  ];

  return (
    <header className="fixed top-6 left-0 w-full z-50 px-4">
      {/* 1. bg-white/40 -> Semi-transparent background
          2. backdrop-blur-md -> The "Frosted Glass" effect
          3. border-white/20 -> A softer, transparent border
      */}
      <nav className="mx-auto max-w-fit bg-white/40 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 px-6 py-1.5 flex items-center gap-8 transition-all">
        
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/n-logo.svg" alt="Starix" width={98} height={28} priority />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[16px] font-medium font-weight text-[#62636C] hover:text-[#040136] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/signup"
          className="hidden md:block bg-[#040136] text-white px-3 py-1 rounded-full text-[16px] font-semibold  active:scale-95 transition-all shadow-lg shadow-[#04013620]"
        >
          Join Now
        </Link>

        {/* Mobile Toggle */}
        <button className="md:hidden text-dark-navy" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu - Also with Glassmorphism */}
      {isOpen && (
        <div className="md:hidden mt-4 mx-auto max-w-[90%] bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/40 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
          {navLinks.map((link) => (
            <Link 
                key={link.href} 
                href={link.href} 
                className="text-lg font-bold text-[#040136] px-2"
                onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/signup" 
            className="bg-dark-navy text-white text-center py-4 rounded-full font-bold shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            Join Now
          </Link>
        </div>
      )}
    </header>
  );
}