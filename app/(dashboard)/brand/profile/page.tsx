"use client";

import { useAuthStore } from "@/store/useAuthStore";
import BrandAvatar from "@/components/(brand)/BrandAvatar";

export default function Page() {
  const { profile } = useAuthStore();
  const logoUrl =
    profile?.logo_url?.trim() ||
    profile?.profile_picture_url?.trim() ||
    undefined;

  return (
    <div className="min-h-full bg-white">
      <div className="h-48 bg-gradient-to-r from-[#EAF1FF] to-[#F5F6F8] md:h-56" />

      <div className="mx-auto max-w-4xl px-6 pb-16">
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <BrandAvatar
              name={profile?.brand_name}
              src={logoUrl}
              className="h-24 w-24 border-4 border-white shadow-sm"
              letterClassName="text-3xl"
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
