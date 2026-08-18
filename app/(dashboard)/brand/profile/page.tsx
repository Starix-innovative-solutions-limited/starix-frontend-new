"use client";

import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const { profile } = useAuthStore();

  return (
    <div className="min-h-full bg-white">
      <div className="h-48 bg-gradient-to-r from-[#EAF1FF] to-[#F5F6F8] md:h-56" />

      <div className="mx-auto max-w-4xl px-6 pb-16">
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                profile?.logo_url ||
                profile?.profile_picture_url ||
                "/nivea.svg"
              }
              alt={profile?.brand_name || "Brand"}
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
            />
            <div className="pb-2">
              <h1 className="text-[28px] font-semibold text-[#101828]">
                {profile?.brand_name || "Brand Profile"}
              </h1>
              <p className="text-[14px] text-[#667085]">
                {profile?.industry || "Add your industry"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#EEF0F4] p-6">
          <h2 className="text-[16px] font-semibold text-[#101828]">About</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#667085]">
            {profile?.description ||
              "Your brand bio will appear here. Update your profile to help creators understand your brand."}
          </p>
        </div>
      </div>
    </div>
  );
}
