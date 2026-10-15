import Image from "next/image";
import Link from "next/link";
import React from "react";

const SOCIALS = [
  { name: "linkd", href: "https://linkedin.com", label: "LinkedIn" },
  { name: "facebook", href: "https://facebook.com", label: "Facebook" },
  { name: "twix", href: "https://x.com", label: "X" },
  { name: "igs", href: "https://instagram.com", label: "Instagram" },
];

const COMPANY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/for-brands", label: "For Brands" },
  { href: "/for-creators", label: "For Creators" },
  { href: "/contact", label: "Contact Us" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/#", label: "Refund Policy" },
];

const SocialIcons = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    {SOCIALS.map((social) => (
      <a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className="opacity-90 transition-opacity hover:opacity-100"
      >
        <Image
          src={`/${social.name} logo.webp`}
          alt=""
          width={24}
          height={24}
          className="h-5 w-5 object-contain brightness-0 invert md:h-6 md:w-6"
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
    className="text-[15px] font-normal leading-[1.45] text-white/80 transition-colors hover:text-white md:text-[16px]"
  >
    {children}
  </Link>
);

const LinkColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="mb-3.5 text-[16px] font-semibold text-white md:mb-5 md:text-[18px]">
      {title}
    </h3>
    <ul className="space-y-2.5 md:space-y-3.5">{children}</ul>
  </div>
);

const Copyright = ({ className = "" }: { className?: string }) => (
  <p className={`text-[13px] leading-[1.5] text-white/70 md:text-[14px] ${className}`}>
    © 2026 Starix.
    <br />
    All rights reserved.
  </p>
);

const BrandBlock = () => (
  <div className="max-w-[360px] lg:max-w-[300px] xl:max-w-[340px]">
    <Link href="/" className="mb-4 inline-block md:mb-5 lg:mb-6">
      <Image
        src="/logo light.webp"
        alt="Starix Logo"
        width={220}
        height={63}
        className="h-auto w-[168px] md:w-[196px] xl:w-[200px]"
      />
    </Link>
    <p className="text-[14px] leading-[1.6] text-white/85 md:text-[16px] md:leading-[1.55]">
      Starix is where brands post challenges and creators compete to make the
      best content. Winners get paid. Brands get work they can use.
    </p>
    {/* Phone + iPad: copyright sits under the blurb */}
    <Copyright className="mt-5 md:mt-6 lg:hidden" />
    {/* Desktop: socials + copyright stay in the left column */}
    <SocialIcons className="mt-7 hidden lg:flex" />
    <Copyright className="mt-6 hidden lg:block" />
  </div>
);

const LinkColumns = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14 xl:gap-20">
    <LinkColumn title="Company">
      {COMPANY_LINKS.map((link) => (
        <li key={link.label}>
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </li>
      ))}
    </LinkColumn>
    <LinkColumn title="Legal">
      {LEGAL_LINKS.map((link) => (
        <li key={link.label}>
          <FooterLink href={link.href}>{link.label}</FooterLink>
        </li>
      ))}
    </LinkColumn>
    <LinkColumn title="Contact">
      <li>
        <a
          href="tel:+2349015000078"
          className="text-[15px] text-white/80 transition-colors hover:text-white md:text-[16px]"
        >
          +234 901 500 0078
        </a>
      </li>
      <li>
        <a
          href="mailto:contact@starixapp.com"
          className="text-[15px] text-white/80 transition-colors hover:text-white md:text-[16px]"
        >
          contact@starixapp.com
        </a>
      </li>
    </LinkColumn>
  </div>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0C2792] font-['Geist'] text-white">
      <div className="relative h-[200px] w-full overflow-hidden md:h-[280px] lg:h-[340px] xl:h-[380px]">
        <Image
          src="/comp.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[28%_top] md:object-[36%_top] lg:object-contain lg:object-top"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-[-4%] -bottom-[4%] z-0 h-[220px] overflow-hidden md:h-[300px] lg:-bottom-[0%] lg:h-[380px] xl:h-[400px]">
        <Image
          src="/foot 2.webp"
          alt=""
          fill
          sizes="140vw"
          className="object-contain object-left-bottom opacity-[0.14] md:opacity-[0.12]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-6 md:px-12 md:pb-24 md:pt-8 lg:px-16 lg:pb-36 xl:px-20 xl:pt-4">
        <div className="flex flex-col gap-10 md:gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <BrandBlock />
          <LinkColumns />
        </div>

        {/* Phone + iPad: socials at the bottom, over the watermark */}
        <SocialIcons className="mt-10 md:mt-12 lg:hidden" />
      </div>
    </footer>
  );
};

export default Footer;
