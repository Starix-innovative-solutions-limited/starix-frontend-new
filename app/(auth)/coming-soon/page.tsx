/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiLoader } from "react-icons/fi";
import { useJoinWaitlist } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistTotal, setWaitlistTotal] = useState("1.2k+");

  const { mutateAsync, isPending } = useJoinWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toast.promise(
      mutateAsync({ email }),
      {
        loading: "Reserving your spot...",
        success: (data: any) => {
          setSubmitted(true);
          if (data?.data?.waitlist_total) {
            setWaitlistTotal(data.data.waitlist_total);
          }
          return data?.data?.message || "Welcome to the inner circle!";
        },
        error: (err: any) => {
          const detail = err?.response?.data?.detail;
          return typeof detail === "string" ? detail : "Failed to join. Please try again.";
        },
      }
    );
  };

  return (
    <div className="w-full max-w-[1200px] py-12 flex flex-col items-center justify-center font-sans text-[#040136]">
      
      <div className="w-full max-w-[768px] flex flex-col items-center gap-10">
        
        {/* TOP SECTION - NOW CENTERED */}
        <div className="text-center space-y-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F3F6FF] border border-[#E0E7FF] text-[#0033FF] text-[13px] font-bold uppercase tracking-[0.1em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]"></span>
            </span>
            Starix Launching Soon
          </div>
          
          <h1 className="text-[38px] md:text-[64px] font-medium leading-[1] tracking-tight text-[#040136]">
            The platform for <br/> 
            <span className="text-[#0033FF] ">creative synergy.</span>
          </h1>
          
          <p className="text-[#6B7280] text-[16px] md:text-lg leading-relaxed max-w-[520px]">
            We’re fine-tuning the engine for the next era of collaboration. 
            Secure your spot to get early access before we go global.
          </p>
        </div>

        {/* CARD SECTION */}
        <div className="relative w-full overflow-hidden rounded-[40px] border border-[#F3F4F6] bg-white shadow-2xl shadow-blue-50/50 p-8 md:p-12 transition-all duration-700">
          <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center text-center">
            
            {!submitted ? (
              <>
                <h2 className="text-[24px] font-semibold mb-2">Join the Waitlist</h2>
                <p className="text-[#6B7280] text-sm mb-8">Enter your email to reserve your spot.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <input
                    type="email"
                    required
                    disabled={isPending}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[64px] rounded-[20px] border border-[#E5E7EB] bg-[#F9FAFB] px-6 text-center text-[16px] outline-none focus:border-[#0033FF] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-400 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-[64px] bg-[#0033FF] text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-3 hover:bg-[#0026CC] transition-all active:scale-[0.98] shadow-xl shadow-blue-100 disabled:opacity-70"
                  >
                    {isPending ? (
                      <FiLoader className="animate-spin text-[24px]" />
                    ) : (
                      <>Reserve Early Access <FiArrowRight /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* STARIX STANDARD SUCCESS UI */
              <div className="flex flex-col items-center py-4 animate-in fade-in zoom-in-95 duration-700">
                <div className="relative mb-6">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                        <FiCheckCircle size={48} className="text-[#0033FF]" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                        <div className="w-6 h-6 bg-[#0033FF] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-[white] rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
                
                <h3 className="text-[#0033FF] font-bold text-[24px] mb-2">You&apos;re in!</h3>
                <p className="text-[#040136] text-[16px] font-semibold leading-snug max-w-[400px]">
                    Your spot is secured. We’ve sent a confirmation to <span className="text-[#6B7280] font-semibold">{email}</span>.
                </p>
              </div>
            )}

            {/* SOCIAL PROOF */}
            <div className="mt-10 pt-8 border-t border-gray-100 w-full flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden relative bg-gray-100 shadow-sm">
                    <Image src={`/grp${i > 3 ? 1 : i}.svg`} fill alt="User" className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[14px] font-medium text-[#6B7280]">
                Joined by <span className="text-[#040136] font-bold">{waitlistTotal}</span> other creators
              </p>
            </div>
          </div>

          {/* BACKGROUND DECOR */}
          <div className="absolute top-[-18%] right-[-10%] pointer-events-none opacity-60">
            <Image 
              src="/contact star.svg" 
              width={300} 
              height={300} 
              className="animate-spin-slow scale-200" 
              alt="" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;