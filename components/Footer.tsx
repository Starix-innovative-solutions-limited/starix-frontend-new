import Image from "next/image";
import Link from "next/link";
import React from "react";

const SOCIALS = [
  { name: "linkd", href: "https://linkedin.com", label: "LinkedIn" },
  { name: "facebook", href: "https://facebook.com", label: "Facebook" },
  { name: "twix", href: "https://x.com", label: "X" },
  { name: "igs", href: "https://instagram.com", label: "Instagram" },
];

const SocialIcons = ({
  className = "",
  spread = false,
}: {
  className?: string;
  spread?: boolean;
}) => (
  <div className={`${spread ? "flex w-full items-center justify-between" : "flex items-center gap-5"} ${className}`}>
    {SOCIALS.map((social) => (
      <a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className="opacity-80 transition-opacity hover:opacity-100"
      >
        <Image
          src={`/${social.name} logo.svg`}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain brightness-0 invert"
        />
      </a>
    ))}
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-[15px] font-normal leading-[1.4] text-white/80 transition-colors hover:text-white md:whitespace-nowrap md:text-[15px] md:font-medium md:text-white/70 xl:text-[clamp(16px,1vw,15px)]"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0C2792] font-['Geist'] text-white md:min-h-[560px] xl:min-h-[683px]">
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[180px] w-[160%] -translate-x-1/2 select-none overflow-hidden md:h-[280px] md:w-[140%] xl:h-[387px] xl:w-[1440px]">
        <Image
          src="/foot 2.webp"
          alt=""
          width={1440}
          height={387}
          className="h-full w-full object-contain object-bottom"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0C2792 7.5%, rgba(12, 39, 146, 0.9) 88.88%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Mobile — Figma stacked layout */}
      <div className="relative z-10 px-6 pb-20 pt-12 md:hidden">
        <Link href="/" className="mb-5 inline-block">
          <Image
            src="/logo light.webp"
            alt="Starix Logo"
            width={198}
            height={57}
            className="h-auto w-[148px]"
          />
        </Link>

        <p className="max-w-[340px] text-[14px] font-normal leading-[1.55] text-white/90">
          Starix is where brands post challenges and creators compete to make the
          best content. Winners get paid. Brands get work they can use.
        </p>

        <p className="mt-5 text-[13px] font-normal leading-[1.5] text-white/70">
          @{new Date().getFullYear()} Starix.
          <br />
          All rights reserved.
        </p>

        <div className="mt-8">
          <h3 className="mb-3 text-[16px] font-semibold text-white">Company</h3>
          <ul className="space-y-2.5">
            <li>
              <FooterLink href="/">Home</FooterLink>
            </li>
            <li>
              <FooterLink href="/for-brands">For Brands</FooterLink>
            </li>
            <li>
              <FooterLink href="/for-creators">For Creators</FooterLink>
            </li>
            <li>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-[16px] font-semibold text-white">Legal</h3>
          <ul className="space-y-2.5">
            <li>
              <FooterLink href="/terms">Terms of use</FooterLink>
            </li>
            <li>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink href="/privacy">Refund Policy</FooterLink>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-[16px] font-semibold text-white">Contact</h3>
          <ul className="space-y-2.5">
            <li>
              <a
                href="tel:+2349015000078"
                className="text-[15px] font-normal text-white/80 transition-colors hover:text-white"
              >
                +234 901 500 0078
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@starixapp.com"
                className="text-[15px] font-normal text-white/80 transition-colors hover:text-white"
              >
                contact@starixapp.com
              </a>
            </li>
          </ul>
        </div>

        <SocialIcons spread className="mt-10 px-1" />
        <div className="h-16" />
      </div>

      {/* iPad + desktop — original two-column layout */}
      <div className="relative z-10 mx-auto hidden max-w-[1400px] px-8 pt-16 md:block md:px-12 xl:px-16 xl:pt-[100px]">
        <div className="flex flex-row items-start justify-between gap-8 xl:gap-16">
          <div className="max-w-[300px] shrink-0 xl:max-w-[460px]">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/logo light.webp"
                alt="Starix Logo"
                width={198}
                height={57}
                className="h-auto w-[160px] xl:w-[clamp(140px,14vw,200px)]"
              />
            </Link>

            <p className="mb-8 text-[16px] leading-[1.65] text-[#E0E1E6]">
              Starix is where brands post challenges and creators compete to make
              the best content. Winners get paid. Brands get work they can use.
            </p>

            <SocialIcons />
          </div>

          <div className="flex shrink-0 flex-row gap-10 pt-2 xl:gap-32">
            <div>
              <h3 className="mb-6 text-[18px] font-semibold text-white">Company</h3>
              <ul className="space-y-4">
                <li>
                  <FooterLink href="/for-brands">For Brands</FooterLink>
                </li>
                <li>
                  <FooterLink href="/for-creators">For Creators</FooterLink>
                </li>
                <li>
                  <FooterLink href="./terms">Terms of Services</FooterLink>
                </li>
                <li>
                  <FooterLink href="./privacy">Privacy Policy</FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-[18px] font-semibold text-white">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+2349015000078"
                    className="whitespace-nowrap text-[15px] font-medium text-white/70 transition-colors hover:text-white"
                  >
                    +234 901 500 0078
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@starixapp.com"
                    className="whitespace-nowrap text-[15px] font-medium text-white/70 transition-colors hover:text-white"
                  >
                    contact@starixapp.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-[clamp(80px,12vw,160px)] md:block" />
    </footer>
  );
};

export default Footer;
