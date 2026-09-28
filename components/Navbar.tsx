"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { getLoginHref, getSignupHref } from "@/lib/waitlist";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const loginHref = getLoginHref();
  const joinHref = getSignupHref();

  const navLinks = [
    { href: "/for-brands", label: "For Brands" },
    { href: "/for-creators", label: "For Creators" },
    { href: "/contact", label: "Contact Us" },
    { href: loginHref, label: "Log in" },
  ];

  const close = () => setIsOpen(false);

  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-5 left-0 z-50 w-full px-4 md:top-6">
      <nav className="relative z-50 mx-auto flex w-[min(280px,calc(100%-48px))] items-center justify-between rounded-full border border-white/80 bg-white px-5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all md:w-auto md:max-w-fit md:justify-start md:gap-5 md:border-white/20 md:bg-white/40 md:px-5 md:py-1.5 xl:gap-10 xl:px-6">
        <Link href="/" className="shrink-0" onClick={close}>
          <Image
            src="/n-logo.svg"
            alt="Starix"
            width={98}
            height={28}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <div className="hidden items-center gap-5 md:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap font-medium transition-all md:text-[14px] xl:text-[16px] ${
                pathname === link.href
                  ? "text-[#040136]"
                  : "text-[#62636C] hover:text-[#040136]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={joinHref}
          className="hidden whitespace-nowrap rounded-full border border-white/40 bg-[#0033FF] px-4 py-1.5 text-[14px] font-semibold text-[#fff] backdrop-blur-lg md:block xl:px-5 xl:py-2 xl:text-[16px]"
        >
          Join Now
        </Link>

        <button
          type="button"
          className="grid h-8 w-8 place-items-center text-[#040136] md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.8 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#0C2792] md:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full bg-[#0033FF] blur-[90px] opacity-40" />
            <div className="pointer-events-none absolute -left-10 bottom-28 h-52 w-52 rounded-full bg-[#00A3FF] blur-[80px] opacity-25" />

            <div className="relative flex min-h-0 flex-1 flex-col px-6 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
              <nav className="flex flex-1 flex-col overflow-y-auto">
                {navLinks.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className={`group flex items-center justify-between border-b border-white/10 py-5 font-['Geist'] text-[22px] font-medium tracking-[-0.03em] transition-colors ${
                        active ? "text-white" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight
                        size={18}
                        className={`transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          active ? "text-[#6EA8FF]" : "text-white/35"
                        }`}
                      />
                    </Link>
                  );
                })}

                <Link
                  href={joinHref}
                  onClick={close}
                  className="mt-8 mx-auto inline-flex p-4 w-1/2 items-center justify-center rounded-full border-2 border-[#0033FF] bg-[#fafafa] text-[16px] font-semibold text-[#0033FF] shadow-[0_0_32px_rgba(0,51,255,0.45)] transition-transform active:scale-[0.98]"
                >
                  Join Now
                </Link>
              </nav>

              <p className="mt-auto pt-10 text-[13px] leading-[1.55] text-white/45">
                @{new Date().getFullYear()} Starix. All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
