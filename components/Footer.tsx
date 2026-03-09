"use client";

import { Linkedin, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname();

  return (
    <section className="flex flex-col pt-6 text-[#444444]">
      {/* CTA CARD (hidden on contact page) */}
  
<div className="general-space">
  {path !== "/contact" && (
    <div className="border-3 border-dark-navy rounded-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4 sm:p-6 md:p-10">
        
        {/* Left text block - Conditionally centered internally */}
        <div className={`
          w-full  flex flex-col gap-4
          ${(path === "/for-brands" || path === "/for-creators") ? "md:items-center md:text-center md:mx-auto" : ""}
        `}>
          <h3 className="font-semibold text-dark-navy text-2xl sm:text-3xl md:text-[48px] leading-snug text-center md:text-left">
            Redefine Your 
            <br className={path === "/" ? "" : "hidden"} />
            {path === "/for-brands"
              ? " Brand Story "
              : path === "/for-creators"
              ? " Creativity"
              : " Creativity & Brand Story"}
          </h3>

          {/* Buttons container - Centered on specific routes */}
          <div className={`
            flex flex-col sm:flex-row gap-4 w-full
            ${(path === "/for-brands" || path === "/for-creators") ? "md:justify-center" : ""}
          `}>
            {path !== "/for-brands" && (
              <Link
                href="/signup"
                className="
                inline-flex items-center justify-center
                w-[193px]
                h-[68px]
                gap-[6px]

                rounded-[40px]
                bg-white
                border-2 border-dark-navy

                px-[18px] py-[6px]

                text-dark-navy
                text-[16px] xl:text-[20px]
                font-medium

                transition-all duration-200
              
                hover:bg-[#bebcbc]
              "
              >
                Join as a Creator
              </Link>
            )}

            {path !== "/for-creators" && (
              <Link
                href="/signup?role=brand"
                className="
                inline-flex items-center justify-center
                w-[193px]
                h-[68px]
                gap-[6px]

                rounded-[40px]
                bg-dark-navy

                px-[18px] py-[6px]

                text-white
                text-[16px] xl:text-[20px]
                font-medium

                transition-all duration-200
                hover:opacity-95
                hover:shadow-lg
              "
              >
                Join as a Brand
              </Link>
            )}
          </div>
        </div>

        {/* Right image - Position preserved on the right */}
        <div className="w-full md:w-auto flex justify-center">
          <Image
            src="/footer.svg"
            alt="footer"
            width={420}
            height={420}
            className="w-[220px] sm:w-[260px] md:w-[390px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  )}
</div>

      {/* DARK FOOTER */}
      <div className="bg-dark-navy py-8 mt-6 general-space">
        <div>
          
          {/* TOP SECTION — Aligned to right with 30% gap */}
<div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0 mb-16">
  
  {/* Logo side */}
  <div className="flex-1">
    <Image
      src="/logo light.svg"
      alt="Starix Logo"
      width={240}
      height={80}
      className="w-[140px] md:w-[200px] h-auto"
    />
  </div>

  {/* Right Content Group — Uses 30% gap */}
  <div className="flex flex-row justify-end md:gap-[50%] w-full md:w-auto">
    
    {/* Resources */}
    <div className="min-w-fit">
      <h3 className="text-white text-[18px] md:text-[20px] font-normal mb-6">
        Resources
      </h3>
      <ul className="space-y-4">
        <li>
          <Link
            href="/for-brands"
            className="text-white/60 text-sm md:text-base hover:text-white transition-colors"
          >
            For Brands
          </Link>
        </li>
        <li>
          <Link
            href="/for-creators"
            className="text-white/60 text-sm md:text-base hover:text-white transition-colors"
          >
            For Creators
          </Link>
        </li>
      </ul>
    </div>

    {/* Contact */}
    <div className="min-w-fit">
      <h3 className="text-white text-[18px] md:text-[20px] font-normal mb-6">
        Contact
      </h3>
      <ul className="space-y-4">
        <li>
          <a
            href="tel:+23400000000"
            className="text-white/60 text-sm md:text-base hover:text-white transition-colors"
          >
            +23400000000
          </a>
        </li>
        <li>
          <a
            href="mailto:contact@starixapp.com"
            className="text-white/60 text-sm md:text-base hover:text-white transition-colors"
          >
            contact@starixapp.com
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

          {/* SOCIAL ICONS */}
          <div className="flex mb-12">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <img src="/linkedin logo.svg" alt="" />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Facebook"
            >
              <img src="/facebook logo.svg" alt="" />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="X (Twitter)"
            >
              <img src="/X logo.svg" alt="" />
            </a>
          </div>

          {/* DIVIDER */}
          <div className="h-px w-full bg-white/20 mb-10" />

          {/* BOTTOM SECTION */}
          <div className="flex flex-col gap-6 text-off-white/70">
            <div className="text-base sm:text-lg">
              <a href="/footer/cookies" className="hover:text-[#00ff88] transition-colors">
                Cookies
              </a>
              <span className="mx-2 opacity-50">|</span>
              <a href="/footer/privacy" className="hover:text-[#00ff88] transition-colors">
                Privacy
              </a>
              <span className="mx-2 opacity-50">|</span>
              <a href="/footer/terms" className="hover:text-[#00ff88] transition-colors">
                Terms of Services
              </a>
            </div>

            <div className="text-base sm:text-lg">
              © 2026 Powered by Starix. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
