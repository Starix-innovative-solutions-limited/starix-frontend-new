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
    { href: "/coming-soon", label: "Log in" },
  ];

  return (
    <header className="fixed top-6 left-0 w-full z-50 px-4">
      <nav className="mx-auto max-w-fit bg-white/40 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20 px-6 py-1.5 flex items-center gap-10 transition-all">
        
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
              className={`text-[16px] font-medium transition-all ${
                pathname === link.href ? "text-[#040136]" : "text-[#62636C] hover:text-[#040136]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* GLASSY CTA BUTTON (Desktop) */}
        <Link
          href="/coming-soon"
          className="hidden md:block bg-[#0033FF] backdrop-blur-lg border border-white/40 text-[#fff] px-5 py-2 rounded-full text-[16px] font-semibold"
        >
          Join Now
        </Link>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#040136]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
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
          
          {/* GLASSY CTA BUTTON (Mobile) */}
          <Link 
            href="/coming-soon" 
            className="bg-[#040136] backdrop-blur-md border border-white/20 text-[#fff] text-center py-4 rounded-full font-bold shadow-lg active:scale-[0.98] transition-all"
            onClick={() => setIsOpen(false)}
          >
            Join Now
          </Link>
        </div>
      )}
    </header>
  );
}