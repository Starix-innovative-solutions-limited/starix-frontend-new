import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      className="relative min-h-[683px] overflow-hidden text-white bg-[#0C2792] "
      style={{ paddingTop: "100px", paddingBottom: "0" }}
    >
      {/* WATERMARK — Replicated Figma Specs */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden"
        style={{ 
          width: '1440px', 
          height: '387px', 
          zIndex: 0 
        }}
      >
        {/* The Image */}
        <Image
          src="/foot 2.svg"
          alt=""
          width={1440}
          height={387}
          className="h-full w-full object-contain"
          style={{ opacity: 1 }} // Adjust opacity to match Figma's subtle watermark effect
        />
        
        {/* The Gradient Overlay — Applied exactly as per Figma specs */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(180deg, #0C2792 7.5%, rgba(12, 39, 146, 0.9) 88.88%)',
            mixBlendMode: 'multiply', // This allows the vector detail to show through the gradient
          }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto px-8 md:px-16 max-w-[1400px]">
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          {/* LEFT — Logo, description, social icons */}
          <div className="max-w-[460px]">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo light.svg"
                alt="Starix Logo"
                width={198}
                height={57}
                className="h-auto w-[clamp(140px,14vw,200px)]"
              />
            </Link>

            <p className="text-[#E0E1E6] mb-8 text-[clamp(16px,1.1vw,16px)] leading-[1.65]">
              Starix is where brands post challenges and creators compete to
              make the best content. Winners get paid. Brands get work they can
              use.
            </p>

            {/* --- UPDATED SOCIAL ICONS MAPPING --- */}
            <div className="flex items-center gap-5">
              {[
                { name: "linkd", href: "https://linkedin.com" },
                { name: "facebook", href: "https://facebook.com" },
                { name: "twix", href: "https://x.com" },
                { name: "igs", href: "https://instagram.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={`/${social.name} logo.svg`}
                    alt={`${social.name} icon`}
                    width={24}
                    height={24}
                    // Removes color from original SVG and makes it pure white
                    className="w-[24px] h-[24px] object-contain brightness-0 invert"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Resources + Contact columns */}
          <div className="flex flex-row gap-20 md:gap-32 pt-2">
            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-[clamp(20px,1.2vw,18px)]">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/for-brands" className="text-white/70 hover:text-white font-medium transition-colors text-[clamp(16px,1vw,15px)]">
                    For Brands
                  </Link>
                </li>
                <li>
                  <Link href="/for-creators" className="text-white/70 hover:text-white font-medium transition-colors text-[clamp(16px,1vw,15px)]">
                    For Creators
                  </Link>
                </li>
                <li>
                  <Link href="./terms" className="text-white/70 hover:text-white font-medium transition-colors text-[clamp(16px,1vw,15px)]">
                    Terms of Services
                  </Link>
                </li>
                <li>
                  <Link href="./privacy" className="text-white/70 hover:text-white font-medium transition-colors text-[clamp(16px,1vw,15px)]">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-[clamp(20px,1.2vw,18px)]">
                Contact
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+2349015000078" className="text-white/70 hover:text-white font-medium transition-colors text-[clamp(16px,1vw,15px)]">
                    +234 901 500 0078
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@starixapp.com" className="text-white/70 font-medium hover:text-white transition-colors text-[clamp(16px,1vw,15px)]">
                    contact@starixapp.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Extra height so watermark has room to breathe */}
      <div className="h-[clamp(80px,12vw,160px)]" />
    </footer>
  );
};

export default Footer;