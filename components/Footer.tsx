"use client"

import { Linkedin, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {

  const path = usePathname()
  console.log(path)

  return (
    <section className="flex flex-col  pt-6 text-[#444444]">


      <div className="general-space">
        {
          path != "/contact" && (
            <div className="border-3 border-dark-navy rounded-2xl max-md:py-10 max-md:px-3 md:pl-10  flex items-center max-md:flex-col justify-between">
              <div className={`text-white max-md:hidden ${path == '/' && "hidden"}   `}>.</div>
              <div className="max-w-md min-w-fit p-2 flex flex-col gap-6 md:py-10 ">
                <h3 className="font-semibold text-dark-navy text-4xl max-md:text-2xl  tracking-wider leading-snug max-md:text-center">
                  Redefine Your&nbsp; <br className={` ${path == '/' ? '' : 'hidden'}`} />
                  {
                    path === "/for-brands"
                      ? `Brand Story`
                      : path === "/for-creators"
                        ? "Creativity"
                        : `\n Creativity & Brand Story`
                  }

                </h3>
                <div className={` max-md:flex-col items-center md:mt-4 gap-4 max-md:mb-9  ${path != "/" ? 'grid place-items-center' : 'flex'} `}>
                  {
                    path != "/for-brands" && <Link
                      href={"/login"}
                      className="bg-white max-md:w-full  text-center hover:bg-secondary-100 text-secondary-100 border border-secondary-100 btn !rounded-full "
                    >
                      Join as a Creator
                    </Link>
                  }
                  {
                    path != "/for-creators" && <Link
                      href={"/login"}
                      className="bg-dark-navy max-md:w-full text-center hover:bg-secondary-100 text-white btn !rounded-full"
                    >
                      Join as a Brand
                    </Link>
                  }
                </div>
              </div>

              <Image
                src={'/footer.png'}
                alt="footer"
                width={300}
                height={300}
                className="h-full max-w-xs"
              />
            </div>
          )
        }
      </div>

      {/* <div className="h-[50vh]"></div> */}
      <div className="bg-dark-navy py-3 -mt-6 general-space">
        <div className="">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12 md:gap-0">
            {/* Logo */}
            <div className="text-3xl font-bold flex items-center gap-0.5">
              <Image
                src={'/lightLogo.png'}
                alt="lightLogo"
                width={260}
                height={100}

              />
            </div>

            {/* Navigation */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-20">
              {/* Resources Column */}
              <div>
                <h3 className="text-xl text-off-white mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-base text-off-white/70 font-light hover:text-[#00ff88] transition-colors">
                      For Brands
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-off-white/70 font-light hover:text-[#00ff88] transition-colors">
                      For Creators
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="text-xl text-off-white mb-3">Contact</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="tel:+32460000000" className="text-base text-off-white/70 font-light hover:text-[#00ff88] transition-colors">
                      +32460000000
                    </a>
                  </li>
                  <li>
                    <a href="mailto:starix@mail.com" className="text-base text-off-white/70 font-light hover:text-[#00ff88] transition-colors">
                      Starix@mail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-16">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} color="#FAFAFAB2" />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook size={20} color="#FAFAFAB2" />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill=" #FAFAFAB2" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-white/10 text-sm text-off-white/70 text-base">
            {/* Legal Links */}
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#00ff88] transition-colors">
                Legal
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#00ff88] transition-colors">
                Privacy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#00ff88] transition-colors">
                Terms of Services
              </a>
            </div>

            {/* Copyright */}
            <div>
              © 2025 Powered by Starix. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
