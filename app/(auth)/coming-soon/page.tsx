/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-[85vh] flex flex-col items-center justify-center p-6 md:p-10 font-sans text-[#1E1F24]">
      
      <div className="w-full max-w-[768px] flex flex-col gap-10">
        
        {/* TOP SECTION: BRANDING & HEADLINE */}
        <div className="text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFEBE4] border border-[#FBE8E5] text-[#FF4D00] text-[12px] font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]"></span>
            </span>
            Starix is coming soon
          </div>
          <h1 className=" max-w-[750px] text-[28px] md:text-[52px] font-semibold leading-[1.1] tracking-tight">
            The platform for <br/> <span className="text-[#0047FF]">creative collaboration.</span>
          </h1>
          <p className="text-[#62636C] text-[15px] md:text-[17px] leading-relaxed max-w-[480px] md:mx-0 mx-auto font-medium">
            We’re currently <span className="text-[#1E1F24] font-semibold">fine-tuning the engine</span> for the next era of creative synergy. Secure your spot on the waitlist to get early access before we go global.
          </p>
        </div>

        {/* MIDDLE SECTION: LEAD CAPTURE CARD (Inheriting your exact UI style) */}
        <div className="relative w-full overflow-hidden rounded-[32px] border border-[#E5F1FF] bg-[#E9F6FF] p-4 md:p-6 transition-all duration-500">
  
        {/* Change: Replaced w-[60%] with mx-auto + items-center */}
        <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center">
            
            {/* Change: Added text-center */}
            <h2 className="text-[20px] md:text-[24px] font-semibold mb-6 text-center">
                Join the Waitlist
            </h2>
            
            {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                <div className="relative group w-full">
                <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    /* Change: Added text-center to input */
                    className="w-full h-[56px] rounded-2xl border border-[#D0E7FF] bg-white/80 backdrop-blur-sm px-4 text-center text-[15px] outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-[#9CA3AF]"
                />
                </div>
                <button
                type="submit"
                className="w-full h-[56px] px-10 bg-[#0047FF] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#0047FF] transition-all active:scale-95 shadow-lg shadow-blue-900/10"
                >
                Get Early Access <FiArrowRight />
                </button>
            </form>
            ) : (
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/60 border border-white text-[#059669] font-bold animate-in zoom-in-95 duration-300 w-full">
                <FiCheckCircle size={22} />
                <span>Reserved! You're early to the party.</span>
            </div>
            )}

            {/* Social Proof Stack: Added mx-auto and items-center */}
            <div className="mt-8 flex flex-col items-center gap-3 mx-auto">
            <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-[#E9F6FF] overflow-hidden relative bg-gray-100">
                    <Image src={`/grp${i}.svg`} fill alt="" className="object-cover" />
                </div>
                ))}
            </div>
            <p className="text-[13px] font-bold text-[#62636C] text-center">
                <span className="text-[#0047FF] font-bold">1.2k+</span> creators waiting
            </p>
            </div>
        </div>

        {/* Image styling remains untouched as requested */}
        <div className="absolute inset-0 pointer-events-none opacity-90 md:opacity-50 transition-all duration-700">
            <Image 
                src="/puzzle.svg" 
                fill 
                className="object-contain scale-120 object-right" 
                alt="Starix Asset" 
            />
        </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default ComingSoonPage;