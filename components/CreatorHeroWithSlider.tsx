"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { style } from "framer-motion/client";

const testimonials = [
  {
    name: "John Doe",
    quote: "I stopped pitching. Brands started finding me.",
    avatar: "/1.svg",
  },
  {
    name: "Jane Smith",
    quote: "My approach shifted from selling to storytelling.",
    avatar: "/2.svg",
  },
  {
    name: "Emily Johnson",
    quote: "Engagement soared once I prioritized authenticity.",
    avatar: "/3.svg",
  },
  {
    name: "Michael Brown",
    quote: "I learned that connection beats promotion every time.",
    avatar: "/4.svg",
  },
  {
    name: "Sarah Williams",
    quote: "Collaborations feel natural now, never forced.",
    avatar: "/5.svg",
  
  },
];

export default function CreatorHero() {
  return (
    <div className="min-h-screen font-sans text-[#0A0A1B]">
      

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 flex bg-[#FAFAFA] flex-col items-center text-center">
        <h1 
          className="text-[#040136] text-[80px] font-medium leading-[100%] tracking-[-0.04em] text-center max-w-[1200px]"
          style={{ 
            fontFamily: 'Geist, sans-serif', 
            fontWeight: 500 
          }}
        >
          Your work should open doors. <br />
          Not just <span className="text-[#FD6C1D]">follower count.</span>
        </h1>
        <p className="mt-4 text-medium md:text-[24px] text-[#6E6E6E] max-w-2xl leading-relaxed">
          Find challenges that fit what you do. <br />
          Make content. Get paid.
        </p>
        <Link 
          href="#" 
          className="mt-6 bg-[#FD6C1D] hover:bg-[#e66a28] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all"
        >
          Join as a Brand
        </Link>

        {/* --- MAIN VISUAL --- */}
<div className="relative mt-28 w-full max-w-7xl mx-auto aspect-[16/8]">

  {/* 1. The Sky Blue Background Box (Defines the main shape) */}
  <img src="/masked.svg" alt="" />

  {/* 2. Background Branding Text / Vector (ALLOWED TO OVERFLOW) */}
  {/* Positioned slightly larger and offset to break out of the blue box */}
  <div className="absolute top-[10%] left-1/2  -translate-x-1/2 w-[100%] z-0 pointer-events-none flex justify-center">
    <img 
      src="/Vectorsss.svg" 
      alt="Starix Vector" 
      className="w-full h-auto  object-contain"
    />
  </div>

  {/* 3. Main Hero Image (Creators) (ALLOWED TO OVERFLOW TOP) */}
  {/* Height is over 100% so the heads/hair can pop out the top of the container */}
  <div className="absolute bottom-0 left-0 w-full h-[130%] z-20 pointer-events-none">
    <Image
      src="/Mask.svg"
      alt="Creators"
      fill
      className="object-cover object-bottom"
      priority
    />
  </div>

  {/* 4. Floating Testimonial Slider (Glassmorphism) */}
  {/* We apply overflow-hidden and rounded-b-[40px] ONLY here so it clips to the bottom corners perfectly */}
  <div className="absolute  bottom-0 left-0 w-full z-30 overflow-hidden">
    <div className="relative w-full py-5 md:py-7 bg-white/40 backdrop-blur-sm">
      <div className="flex overflow-hidden">
        <motion.div 
          className="flex gap-12 md:gap-16 items-center whitespace-nowrap pl-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {/* Tripled the array to ensure a seamless infinite loop */}
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-3 min-w-max">
              {/* Avatar */}
              <div 
                className={`relative w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 shadow-sm ${
                  i % 2 === 0 ? 'bg-[#0052FF]' : 'bg-[#FF5C00]'
                }`}
              >
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center text-left">
                <p className="text-[14px]  font-medium text-[#1E1F24] leading-snug tracking-tight">
                  {t.quote}
                </p>
                <span className="text-[12px] md:text-[12px] text-[#62636C] font-medium mt-0.5">
                  @{t.name.toLowerCase().replace(/\s+/g, "")}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>

</div>
      </section>
    </div>
  );
}

