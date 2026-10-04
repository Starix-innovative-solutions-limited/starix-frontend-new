"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { getLoginHref, getSignupHref } from "@/lib/waitlist";

function AccordionIcon({ open }: { open: boolean }) {
  return (
    <span className="relative grid h-5 w-5 shrink-0 place-items-center" aria-hidden>
      <span className="absolute h-px w-[18px] bg-white/35" />
      <span
        className={`absolute h-[18px] w-px bg-white/35 transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const loginHref = getLoginHref();

  const pageLinks = [
    { href: "/for-brands", label: "For Brands" },
    { href: "/for-creators", label: "For Creators" },
    { href: "/contact", label: "Contact Us" },
  ];

  const navLinks = [...pageLinks, { href: loginHref, label: "Log in" }];

  const close = () => setIsOpen(false);

  useEffect(() => {
    close();
    setJoinOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      setLoginOpen(false);
      return;
    }

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

  useEffect(() => {
    if (!joinOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setJoinOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [joinOpen]);

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

        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setJoinOpen((open) => !open)}
            aria-expanded={joinOpen}
            aria-haspopup="dialog"
            className="whitespace-nowrap rounded-full border border-white/40 bg-[#0033FF] px-4 py-1.5 text-[14px] font-semibold text-[#fff] backdrop-blur-lg xl:px-5 xl:py-2 xl:text-[16px]"
          >
            Join Now
          </button>

          <AnimatePresence>
            {joinOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close join options"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setJoinOpen(false)}
                />
                <motion.div
                  role="dialog"
                  aria-label="Join as a creator or brand"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-[220px] rounded-2xl border border-[#EBEBEB] bg-[#E1F2FE] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex flex-col gap-2">
                    <Link
                      href={getSignupHref("creator")}
                      onClick={() => setJoinOpen(false)}
                      className="inline-flex items-center justify-center rounded-full border border-[#0033FF] p-3 text-center text-[13px] font-medium text-[#0033FF] xl:text-[14px]"
                    >
                      Join as a Creator
                    </Link>
                    <Link
                      href={getSignupHref("brand")}
                      onClick={() => setJoinOpen(false)}
                      className="inline-flex items-center justify-center rounded-full bg-[#0033FF] p-3 text-center text-[13px] font-semibold text-white xl:text-[14px]"
                    >
                      Join as a Brand
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

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
              <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                {pageLinks.map((link) => {
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

                <div className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setLoginOpen((open) => !open)}
                    aria-expanded={loginOpen}
                    className="flex w-full items-center justify-between py-5 font-['Geist'] text-[22px] font-medium tracking-[-0.03em] text-white/80"
                  >
                    Log in
                    <AccordionIcon open={loginOpen} />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      loginOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <Link
                        href={getLoginHref("creator")}
                        onClick={close}
                        className="flex items-center justify-between py-3 font-['Geist'] text-[16px] font-normal tracking-[-0.02em] text-white/70"
                      >
                        Log in as a creator
                        <ArrowUpRight size={16} className="text-white/35" />
                      </Link>
                      <Link
                        href={getLoginHref("brand")}
                        onClick={close}
                        className="flex items-center justify-between pb-5 pt-3 font-['Geist'] text-[16px] font-normal tracking-[-0.02em] text-white/70"
                      >
                        Log in as a brand
                        <ArrowUpRight size={16} className="text-white/35" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex w-full flex-col items-center gap-2.5">
                  <Link
                    href={getSignupHref("creator")}
                    onClick={close}
                    className="inline-flex items-center justify-center rounded-full border border-white p-4 text-center text-[14px] font-medium text-white transition-all active:scale-[0.98]"
                  >
                    Join as a Creator
                  </Link>
                  <Link
                    href={getSignupHref("brand")}
                    onClick={close}
                    className="inline-flex items-center justify-center rounded-full bg-[#0033FF] p-4 text-center text-[14px] font-semibold text-white shadow-[0_0_24px_rgba(0,51,255,0.45)] transition-all active:scale-[0.98]"
                  >
                    Join as a Brand
                  </Link>
                </div>
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
