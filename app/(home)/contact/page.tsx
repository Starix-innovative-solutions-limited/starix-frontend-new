/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCreateContactMessage } from "@/hooks/useAuth";
import CreatorJoinBanner from "@/components/CreatorJoinBanner";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "",
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
    if (!form.fullName.trim() || !form.email.trim() || !form.role || !form.message.trim()) {
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
      setForm({ fullName: "", email: "", role: "", message: "" });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <section className="relative w-full bg-[#F9F9FB] px-3 pb-16 pt-[100px] md:px-8 md:pt-[120px] lg:px-9 lg:pr-10 lg:pb-14 lg:pt-[130px]">
      <div className="mx-auto grid grid-cols-1 items-start gap-0 lg:grid-cols-[0.971fr_1.029fr] lg:gap-[58px]">
        
        {/* LEFT SIDE: TYPOGRAPHY & ASSETS */}
        <div className="contents lg:flex lg:flex-col">
          <h1 className="order-1 mb-2 text-[30px] font-medium leading-[1.05] tracking-[-0.04em] text-[#040136] md:mb-3 md:text-[48px] lg:order-none lg:text-[42px]">
            Get in touch
          </h1>
          <p className="order-2 mb-6 max-w-[560px] text-[12px] leading-[1.45] text-[#62636C] md:mb-8 md:text-[17px] lg:order-none lg:mb-5 lg:text-[15px]">
            Have a question, feedback, or need support? We&rsquo;re here to help—
            whether you&rsquo;re a creator building your profile or a brand running
            campaigns on Starix.
          </p>

          <div className="order-4 relative mb-3 aspect-[2.18/1] w-full overflow-hidden rounded-[14px] md:aspect-[1818/564] md:max-w-[680px] md:justify-self-center lg:order-none lg:mb-6 lg:max-w-none">
            <Image
              src="/ringlight.webp"
              alt="A phone mounted in a ring light"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="order-5 flex w-full flex-col items-start md:max-w-[680px] md:justify-self-center lg:order-none lg:max-w-none lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:-translate-y-[13px]">
              <h2 className="mb-2 text-[15px] font-semibold text-[#040136] lg:mb-1">Prefer to text?</h2>
              <p className="max-w-[330px] text-[12px] leading-[1.5] text-[#62636C] md:text-[13px] lg:text-[12px] lg:leading-[1.45]">
                We typically respond within 24–48 hours.
                <br />
                You can also reach us directly at:
              </p>
              <div className="mt-3 flex items-center gap-3 lg:mt-2">
                {[
                  { src: "/linkd logo.svg", href: "https://linkedin.com", label: "LinkedIn" },
                  { src: "/facebook logo.svg", href: "https://facebook.com", label: "Facebook" },
                  { src: "/twix logo.svg", href: "https://x.com/starix.hq", label: "X" },
                  { src: "/igs logo.svg", href: "https://instagram.com/starix.hq", label: "Instagram" },
                ].map((social) => (
                  <Link key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <span
                      className="block h-4 w-4 bg-[#0033FF]"
                      style={{
                        WebkitMaskImage: `url("${social.src}")`,
                        maskImage: `url("${social.src}")`,
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="relative mt-6 h-[132px] w-[132px] self-center md:h-[156px] md:w-[156px] lg:mt-0 lg:h-[100px] lg:w-[100px] lg:self-auto">
              <Image 
                src="/contact star.webp" 
                alt="Starix Star"
                fill 
                sizes="112px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="order-3 relative mb-20 flex min-h-[276px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#B4DFFE] p-3 md:min-h-[500px] md:max-w-[680px] md:justify-self-center md:rounded-[18px] md:p-8 lg:order-none lg:mb-0 lg:min-h-[396px] lg:max-w-none lg:p-7">
          
          {/* BACKGROUND 3D SHAPES (Abstract assets from Figma) */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/down.webp" 
              alt="background shapes"
              fill
              className="object-cover"
            />

            <Image 
              src="/up.webp" 
              alt="background shapes"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 w-full max-w-[460px] rounded-[14px] bg-[#F4F4F6] p-3 shadow-[0_12px_36px_rgba(4,1,54,0.12)] md:rounded-[18px] md:p-5 lg:max-w-[367px] lg:px-[17px] lg:py-5">
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
              
              {/* Feedback Alert Banners */}
              {status.type && (
                <div className={`rounded-lg p-3 text-xs ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {status.message}
                </div>
              )}

              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Enter your full name"
                aria-label="Full name"
                disabled={contactMutation.isPending}
                className="h-[38px] w-full rounded-[7px] border border-[#E1E2E7] bg-white px-3 text-[11px] outline-none transition focus:border-[#0033FF] disabled:opacity-60 md:h-[44px] md:text-[13px] lg:h-[34px] lg:text-[11px]"
              />

              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                aria-label="Email"
                disabled={contactMutation.isPending}
                className="h-[38px] w-full rounded-[7px] border border-[#E1E2E7] bg-white px-3 text-[11px] outline-none transition focus:border-[#0033FF] disabled:opacity-60 md:h-[44px] md:text-[13px] lg:h-[34px] lg:text-[11px]"
              />

              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                aria-label="Role"
                disabled={contactMutation.isPending}
                className="h-[38px] w-full rounded-[7px] border border-[#E1E2E7] bg-white px-3 text-[11px] text-[#62636C] outline-none transition focus:border-[#0033FF] disabled:opacity-60 md:h-[44px] md:text-[13px] lg:h-[34px] lg:text-[11px]"
              >
                <option value="" disabled>Select role</option>
                <option value="Creator">Creator</option>
                <option value="Brand">Brand</option>
              </select>

              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what you need"
                aria-label="Message"
                disabled={contactMutation.isPending}
                className="h-[54px] w-full resize-none rounded-[7px] border border-[#E1E2E7] bg-white px-3 py-3 text-[11px] outline-none transition focus:border-[#0033FF] disabled:opacity-60 md:h-[84px] md:text-[13px] lg:h-[64px] lg:text-[11px]"
              />

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="flex h-[38px] w-full cursor-pointer items-center justify-center rounded-full bg-[#0033FF] text-[11px] font-medium text-white transition hover:brightness-110 disabled:bg-gray-400 md:h-[44px] md:text-[13px] lg:h-[38px] lg:text-[11px]"
              >
                {contactMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <span className="md:hidden">Join as a Brand</span>
                    <span className="hidden md:inline">Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
      </section>
      <CreatorJoinBanner variant="contact" />
    </>
  );
};

export default ContactPage;