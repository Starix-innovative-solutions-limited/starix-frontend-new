/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiLoader } from "react-icons/fi";
import { useJoinWaitlist } from "@/hooks/useAuth"; // Ensure this matches your hooks file path
import toast from "react-hot-toast";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Using the hook directly as requested
  const { mutateAsync, isPending } = useJoinWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Matching the logic and toast style of your CreatorSignup form
    await toast.promise(
      mutateAsync({ email }),
      {
        loading: "Reserving your spot...",
        success: () => {
          setSubmitted(true);
          return "Reserved! You're early to the party.";
        },
        error: (err: any) => {
          // Extracting the error detail from FastAPI response
          const detail = err?.response?.data?.detail;
          if (Array.isArray(detail)) {
            return `${detail[0].msg}`;
          }
          return typeof detail === "string" 
            ? detail 
            : "Failed to join. Please try again.";
        },
      }
    );
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
          <h1 className="max-w-[750px] text-[32px] md:text-[52px] font-semibold leading-[1.1] tracking-tight">
            The platform for <br/> <span className="text-[#0047FF]">creative collaboration.</span>
          </h1>
          <p className="text-[#62636C] text-[15px] md:text-[17px] leading-relaxed max-w-[480px] md:mx-0 mx-auto font-medium">
            We’re currently <span className="text-[#1E1F24] font-semibold">fine-tuning the engine</span> for the next era of creative synergy. Secure your spot on the waitlist to get early access before we go global.
          </p>
        </div>

        {/* MIDDLE SECTION: LEAD CAPTURE CARD */}
        <div className="relative w-full overflow-hidden rounded-[32px] border border-[#E5F1FF] bg-[#E9F6FF] p-4 md:p-8 transition-all duration-500">
  
          <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center">
            
            <h2 className="text-[20px] md:text-[24px] font-semibold mb-6 text-center">
                Join the Waitlist
            </h2>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                <div className="relative group w-full">
                  <input
                    type="email"
                    required
                    disabled={isPending}
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[58px] rounded-2xl border border-[#D0E7FF] bg-white/90 backdrop-blur-sm px-4 text-center text-[15px] outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-[#9CA3AF] disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-[58px] px-10 bg-[#0047FF] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#003BE6] transition-all active:scale-95 shadow-lg shadow-blue-900/10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <FiLoader className="animate-spin text-[20px]" />
                  ) : (
                    <>Get Early Access <FiArrowRight /></>
                  )}
                </button>
              </form>
            ) : (
              /* Success State: Clean and visual */
              <div className="flex flex-col items-center gap-4 py-6 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-white">
                    <FiCheckCircle size={40} className="text-[#059669]" />
                </div>
                <div className="text-center space-y-1">
                    <h3 className="text-[#059669] font-bold text-[20px]">Reserved!</h3>
                    <p className="text-[#62636C] text-[15px] font-medium leading-tight">
                        You're early to the party. <br/> We'll be in touch soon.
                    </p>
                </div>
              </div>
            )}

            {/* Social Proof Stack */}
            <div className="mt-8 flex flex-col items-center gap-3 mx-auto">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#E9F6FF] overflow-hidden relative bg-gray-200">
                    <Image src={`/grp${i}.svg`} fill alt="" className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[13px] font-bold text-[#62636C] text-center">
                <span className="text-[#0047FF] font-extrabold text-[15px]">1.2k+</span> creators waiting
              </p>
            </div>
          </div>

          {/* Background Asset */}
          <div className="absolute inset-0 pointer-events-none opacity-90 md:opacity-50 transition-all duration-700">
            <Image 
              src="/puzzle.svg" 
              fill 
              className="object-contain scale-125 object-right translate-x-10" 
              alt="Starix Asset" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;