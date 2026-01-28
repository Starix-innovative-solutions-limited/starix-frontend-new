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
              {/* Left text */}
              <div className="w-full md:max-w-md flex flex-col gap-6">
                <h3 className="font-semibold text-dark-navy text-2xl sm:text-3xl md:text-4xl leading-snug text-center md:text-left">
                  Redefine Your
                  <br className={path === "/" ? "" : "hidden"} />
                  {path === "/for-brands"
                    ? "Brand Story"
                    : path === "/for-creators"
                    ? "Creativity"
                    : "Creativity & Brand Story"}
                </h3>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {path !== "/for-brands" && (
                    <Link
                      href="/signup"
                      className="
                        w-full sm:w-auto text-center
                        bg-white text-secondary-100
                        border border-secondary-100
                        btn !rounded-full
                        transition-all duration-300
                        hover:bg-secondary-100 hover:text-white
                      "
                    >
                      Join as a Creator
                    </Link>
                  )}

                  {path !== "/for-creators" && (
                    <Link
                      href="/signup?role=brand"
                      className="
                        w-full sm:w-auto text-center
                        bg-dark-navy text-white
                        border border-dark-navy
                        btn !rounded-full
                        transition-all duration-300
                        hover:bg-white hover:text-dark-navy
                      "
                    >
                      Join as a Brand
                    </Link>
                  )}
                </div>
              </div>

              {/* Right image */}
              <div className="w-full md:w-auto flex justify-center">
                <Image
                  src="/footer.png"
                  alt="footer"
                  width={420}
                  height={420}
                  className="w-[220px] sm:w-[260px] md:w-[320px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DARK FOOTER */}
      <div className="bg-dark-navy py-8 mt-6 general-space">
        <div>
          {/* TOP SECTION — mobile 3-column like screenshot */}
          <div
            className="
              grid grid-cols-3 gap-6 mb-12
              md:flex md:justify-between md:gap-16
            "
          >
            {/* Logo */}
            <div>
              <Image
                src="/logo light.svg"
                alt="lightLogo"
                width={260}
                height={100}
                className="w-[130px] sm:w-[160px] md:w-[240px] h-auto"
              />
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl text-off-white mb-4">
                Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+23400000000"
                    className="text-sm sm:text-base text-off-white/70 hover:text-[#00ff88] transition-colors"
                  >
                    +23400000000
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:starix@mail.com"
                    className="text-sm sm:text-base text-off-white/70 hover:text-[#00ff88] transition-colors"
                  >
                    Starix@mail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-right md:text-left">
              <h3 className="text-lg sm:text-xl text-off-white mb-4">
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/for-brands"
                    className="text-sm sm:text-base text-off-white/70 hover:text-[#00ff88] transition-colors"
                  >
                    For Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/for-creators"
                    className="text-sm sm:text-base text-off-white/70 hover:text-[#00ff88] transition-colors"
                  >
                    For Creators
                  </Link>
                </li>
              </ul>
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
              <img src="X logo.svg" alt="" />
            </a>
          </div>

          {/* DIVIDER */}
          <div className="h-px w-full bg-white/20 mb-10" />

          {/* BOTTOM SECTION */}
          <div className="flex flex-col gap-6 text-off-white/70">
            <div className="text-base sm:text-lg">
              <a href="#" className="hover:text-[#00ff88] transition-colors">
                Legal
              </a>
              <span className="mx-2 opacity-50">|</span>
              <a href="#" className="hover:text-[#00ff88] transition-colors">
                Privacy
              </a>
              <span className="mx-2 opacity-50">|</span>
              <a href="#" className="hover:text-[#00ff88] transition-colors">
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
