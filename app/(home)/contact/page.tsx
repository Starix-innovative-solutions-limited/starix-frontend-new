/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCreateContactMessage } from "@/hooks/useAuth";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "Creator", // Kept UI state capitalized for layout display
    message: "",
  });

  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  // Core Mutation Layer hook
  const contactMutation = useCreateContactMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    // Client-side guard rails
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", message: "Please fill out all required fields." });
      return;
    }

    try {
      await contactMutation.mutateAsync({
        full_name: form.fullName,
        email: form.email,
        role: form.role.toLowerCase() as "creator" | "brand", // Matches snake_case lower api spec
        message: form.message,
      });

      setStatus({ type: "success", message: "Your message has been sent successfully!" });
      setForm({ fullName: "", email: "", role: "Creator", message: "" }); // Reset on success
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section className="relative w-full py-35 bg-[#F9F9FB] px-6">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT SIDE: TYPOGRAPHY & ASSETS */}
        <div className="flex flex-col pt-15">
          <h1 className="text-[#040136] text-[48px] md:text-[56px] font-medium leading-[1.1] tracking-tight mb-4">
            Get in touch
          </h1>
          <p className="text-[#62636C] text-[18px] md:text-[20px] max-w-[650px] leading-relaxed mb-12">
            Have a question, feedback, or need support? We’re here to help—
            whether you're a creator building your profile or a brand running 
            campaigns on Starix.
          </p>

          {/* STACKED CARD PLACEHOLDER */}
          <div className="relative w-full max-w-[600px] h-[300px] mb-16">
             {/* Back card */}
             <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[90%] h-full bg-[#F3F4F6] rounded-[32px] border border-gray-200" />
             {/* Middle card */}
             <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[95%] h-full bg-[#F9FAFB] rounded-[32px] border border-gray-200" />
             {/* Front card */}
             <div className="absolute inset-0 bg-white rounded-[32px] border border-gray-100" />
          </div>

          {/* FOOTER INFO */}
          <div className="flex items-end justify-between max-w-[600px]">
            <div className="space-y-2">
              <h4 className="text-[#040136] font-medium text-lg">Prefer email?</h4>
              <p className="text-[#62636C] text-sm leading-relaxed max-w-[320px]">
                We typically respond within 24–48 hours. You can also reach us directly at:
              </p>
              <Link href="mailto:support@starix.app" className="text-[#0033FF] font-medium underline block pt-1">
                support@starix.app
              </Link>
            </div>
            
            {/* 3D STAR ICON */}
            <div className="relative w-24 h-24">
              <Image 
                src="/contact star.svg" 
                alt="Starix Star"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM OVER 3D BACKGROUND */}
        <div className="relative w-full min-h-[750px] rounded-[48px] bg-[#B4DFFE] overflow-hidden p-8 flex items-center justify-center">
          
          {/* BACKGROUND 3D SHAPES (Abstract assets from Figma) */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/down.svg" 
              alt="background shapes"
              fill
              className="object-cover"
            />

            <Image 
              src="/up.svg" 
              alt="background shapes"
              fill
              className="object-cover"
            />
          </div>

          {/* WHITE FORM CARD */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 w-full max-w-[500px] bg-white rounded-[32px] p-8 md:p-10 shadow-xl"
          >
            <div className="mb-8">
              <h3 className="text-[#040136] text-[24px] font-bold mb-2">Send us a message</h3>
              <p className="text-[#62636C] text-sm">Fill in the details below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Feedback Alert Banners */}
              {status.type && (
                <div className={`p-4 rounded-xl text-sm ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                  {status.message}
                </div>
              )}

              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Full Name</label>
                <input 
                  type="text" 
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  disabled={contactMutation.isPending}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none transition-all text-sm disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Email Address</label>
                <input 
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  disabled={contactMutation.isPending}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none transition-all text-sm disabled:opacity-60"
                />
              </div>

              {/* Role Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Select role</label>
                <div className="relative">
                  <select 
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    disabled={contactMutation.isPending}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none appearance-none bg-white text-sm disabled:opacity-60"
                  >
                    <option>Creator</option>
                    <option>Brand</option>
                  </select>
                  {/* Native Indicator Arrow overlay */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Message</label>
                <textarea 
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you need"
                  disabled={contactMutation.isPending}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none transition-all text-sm resize-none disabled:opacity-60"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full py-4 bg-[#050E81] text-white font-bold rounded-full hover:shadow-sm transition-all mt-4 disabled:bg-gray-400 flex items-center justify-center cursor-pointer"
              >
                {contactMutation.isPending ? "Sending..." : "Contact Us"}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;