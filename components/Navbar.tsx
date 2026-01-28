"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const signupRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/for-brands", label: "For Brands" },
    { href: "/for-creators", label: "For Creators" },
    { href: "/contact", label: "Contact Us" },
  ];

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close dropdown on outside click + esc
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!signupRef.current) return;
      if (!signupRef.current.contains(target)) setSignupOpen(false);
    };

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSignupOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const closeAll = () => {
    setSignupOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#00000010]">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16">
        <div className="h-[84px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={closeAll}>
            <Image src="/logo.svg" alt="Starix" width={110} height={28} priority />
          </Link>

          {/* Desktop Links (centered like Figma) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSignupOpen(false)}
                    className={`text-base transition-colors ${
                      isActive ? "text-dark-navy" : "text-neut/60 hover:text-dark-navy"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Sign Up dropdown */}
            <div className="relative" ref={signupRef}>
              <button
                type="button"
                onClick={() => setSignupOpen((p) => !p)}
                className="
                  h-[44px] px-5 rounded-full
                  border border-[#04013633]
                  text-dark-navy bg-white
                  inline-flex items-center gap-2
                  transition-all
                  hover:border-[#04013666]
                  focus:outline-none focus:ring-2 focus:ring-[#0401361a]
                "
                aria-haspopup="menu"
                aria-expanded={signupOpen}
              >
                <span className="text-base">Sign Up</span>
                <MdOutlineKeyboardArrowDown
                  className={`text-xl transition-transform ${signupOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`
                  absolute right-0 top-[110%] w-60
                  bg-white border border-[#00000010]
                  rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  overflow-hidden
                  transition-all duration-150 origin-top
                  ${signupOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
                `}
                role="menu"
              >
                <Link
                  href="/signup?role=brand"
                  role="menuitem"
                  onClick={() => setSignupOpen(false)}
                  className="block px-4 py-3 text-dark-navy hover:bg-[#040136] hover:text-white transition-colors"
                >
                  Sign up as a Brand
                </Link>
                <Link
                  href="/signup"
                  role="menuitem"
                  onClick={() => setSignupOpen(false)}
                  className="block px-4 py-3 text-dark-navy hover:bg-[#040136] hover:text-white transition-colors"
                >
                  Sign up as a Creator
                </Link>
              </div>
            </div>

            {/* Login pill */}
            <Link
              href="/login"
              onClick={() => setSignupOpen(false)}
              className="
                h-[44px] px-6 rounded-full
                bg-dark-navy text-white
                inline-flex items-center justify-center
                text-base
                transition-all
                hover:opacity-95
                focus:outline-none focus:ring-2 focus:ring-[#0401361a]
              "
            >
              Login
            </Link>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/login"
              onClick={closeAll}
              className="h-[30px] px-4 rounded-full bg-dark-navy text-white inline-flex items-center text-sm"
            >
              Login
            </Link>

            <button
              type="button"
              className="h-[40px] w-[40px] rounded-full border border-[#00000012] bg-white inline-flex items-center justify-center"
              onClick={() => setIsOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {isOpen ? <IoCloseOutline size={22} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-[#00000010] transition-all duration-200 ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAll}
              className="text-dark-navy text-lg"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/signup?role=brand"
              onClick={closeAll}
              className="text-dark-navy underline text-base"
            >
              Sign up as Brand
            </Link>
            <Link
              href="/signup"
              onClick={closeAll}
              className="text-dark-navy underline text-base"
            >
              Sign up as Creator
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
