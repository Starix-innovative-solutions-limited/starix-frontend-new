"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "Creator",
    message: "",
  });

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
                src="/contact star.svg" // Replace with your blue star asset
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
              src="/down.svg" // Replace with your colorful 3D assets image
              alt="background shapes"
              fill
              className="object-cover"
            />

            <Image 
              src="/up.svg" // Replace with your colorful 3D assets image
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

            <form className="space-y-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none transition-all text-sm"
                />
              </div>

              {/* Role Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Select role</label>
                <select 
                  value={form.role}
                  onChange={(e) => setForm({...form, role: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none appearance-none bg-white text-sm"
                >
                  <option>Creator</option>
                  <option>Brand</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[#040136] font-medium text-sm">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us what you need"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#050E81] outline-none transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="button"
                className="w-full py-4 bg-[#050E81] text-white font-bold rounded-full hover:shadow-sm transition-all mt-4"
              >
                Contact Us
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;