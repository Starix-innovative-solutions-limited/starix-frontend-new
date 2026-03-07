"use client";

import CustomInput from "@/components/CustomInput";
import React, { useMemo, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

const Page = () => {
  const email = "Starix@mail.com";

  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "",
    message: "",
  });

  const emailValid = useMemo(() => {
    // Simple & solid: text@text.text (supports .com, .ng, etc.)
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
  }, [form.email]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="general-space ">
      <div className="grid grid-cols-1 md:grid-cols-2  md:gap-40 items-center">
        <div className="space-y-5">
          <h3 className="font-semibold text-dark-navy md:text-left text-center leading-snug text-4xl md:text-5xl">
            Get in touch- <br />
            Let’s build the future of creator marketing together.
          </h3>

          <p className="font-extralight md:text-left text-center text-[#6E6E6E] text-[28px] md:text-2xl">
            Have questions, partnership ideas, or feedback? We’d love to hear from you.
          </p>

          <div className="text-[#6E6E6E] space-y-4 text-center md:text-left">
        <span className="block text-lg md:text-xl">
            You can reach us here:
        </span>

        {/* Email row */}
        <button
            type="button"
            onClick={handleCopyEmail}
            aria-label="Copy email address"
            title="Click to copy"
            className="
            group
            inline-flex items-center gap-2
            mx-auto md:mx-0
            text-dark-navy
            transition-colors
            "
        >
            <span className="text-[#6E6E6E">Email:</span>

            <span className="font-medium group-hover:underline">
            {email}
            </span>

            <IoCopyOutline className="text-dark-navy/70 group-hover:text-dark-navy transition-colors" />
        </button>

        {/* Copied feedback – fixed position, no layout shift */}
        <span
            className={`
            block text-sm
            transition-opacity
            ${copied ? "opacity-100 text-green-600" : "opacity-0"}
            `}
        >
            Copied!
        </span>
        </div>

        </div>

    <div className="bg-primary-white md:bg-[#fff] shadow-xs flex flex-col gap-3.5 px-0 md:px-10 py-0 md:py-10 rounded-3xl">
          <CustomInput
            label="Full name"
            placeholder="Full name"
            value={form.fullName}
            onChange={(e: any) => setForm((p) => ({ ...p, fullName: e.target.value }))}
            className="bg-transparent"
          />

          {/* ✅ Email validation */}
          <CustomInput
            label="Email address"
            placeholder="Email"
            value={form.email}
            onChange={(e: any) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="bg-transparent"
          />
          {!emailValid && form.email.length > 0 && (
            <p className="text-sm text-red-500 -mt-2">
              Please enter a valid email format like <span className="font-medium">name@email.com</span>
            </p>
          )}

          {/* ✅ Role dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-dark-navy text-sm md:text-base">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              className="
                bg-transparent w-full
                border border-dark-navy/20
                rounded-2xl
                px-4 py-3
                text-dark-navy
                outline-none
                focus:border-dark-navy
                transition-colors
              "
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="Brand">Brand</option>
              <option value="Creator">Creator</option>
            </select>
          </div>

          <CustomInput
            type="textarea"
            label="How can we help you?"
            placeholder="Enter message here"
            value={form.message}
            onChange={(e: any) => setForm((p) => ({ ...p, message: e.target.value }))}
            className="bg-transparent"
          />

          {/* ✅ Consistent hover invert */}
          <button
            type="button"
            
            className="
              group
              py-4 w-full
              bg-dark-navy text-white
              border border-dark-navy
              rounded-full
              transition-all duration-300
              hover:bg-shaadow-lg
              
            "
          >
            Send Message
          </button>
        </div>
      </div>
    </div>

  );
};

export default Page;
