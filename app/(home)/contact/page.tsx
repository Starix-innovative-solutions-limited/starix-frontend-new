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
    <div className="general-space">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-12 md:gap-40 items-center">
        <div className="space-y-10">
          <h3 className="font-semibold text-dark-navy leading-snug text-4xl md:text-5xl">
            Get in touch- <br />
            Let’s build the future of creator marketing together.
          </h3>

          <p className="font-extralight text-neut/60 text-xl md:text-2xl">
            Have questions, partnership ideas, or feedback? We’d love to hear from you.
          </p>

          <div className="text-lg md:text-xl text-neut/60 space-y-4">
            <span>You can reach us here:</span>

            {/* ✅ Click to copy email */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center gap-2 text-left w-fit group"
              aria-label="Copy email address"
              title="Click to copy"
            >
              <span>Email:</span>
              <span className="text-dark-navy group-hover:underline">{email}</span>
              <IoCopyOutline className="text-dark-navy/70 group-hover:text-dark-navy transition-colors" />
              <span
                className={`text-sm ml-2 transition-opacity ${
                  copied ? "opacity-100 text-green-600" : "opacity-0"
                }`}
              >
                Copied!
              </span>
            </button>
          </div>
        </div>

        <div className="bg-primary-orange/5 flex flex-col gap-3.5 px-6 md:px-10 py-10 rounded-3xl">
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
            placeholder="name@email.com"
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
            disabled={!emailValid || !form.fullName || !form.role || !form.message}
            className="
              group
              py-4 w-full
              bg-dark-navy text-white
              border border-dark-navy
              rounded-full
              transition-all duration-300
              hover:bg-white hover:text-dark-navy
              disabled:opacity-40 disabled:cursor-not-allowed
              disabled:hover:bg-dark-navy disabled:hover:text-white
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
