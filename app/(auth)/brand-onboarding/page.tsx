"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineUpload } from "react-icons/hi";
import CustomInput from "@/components/CustomInput";
import Loader from "@/components/Loader";
import { uploadUserMedia } from "@/hooks/useProfile";
import {
  useBrandOnboarding,
  useSaveBrandOnboardingProfile,
} from "@/hooks/useBrandOnboarding";
import toast from "react-hot-toast";

const BrandOnboardingPage = () => {
  const router = useRouter();
  const saveProfile = useSaveBrandOnboardingProfile();
  const {
    data: onboarding,
    isLoading: isOnboardingLoading,
  } = useBrandOnboarding();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    website_or_social_link: "",
    bio: "",
    industry: "",
  });

  const isSaving = saveProfile.isPending;

  useEffect(() => {
    if (!onboarding || hasHydrated) return;

    if (onboarding.onboarding_completed_at) {
      router.replace("/brand");
      return;
    }

    setForm({
      website_or_social_link: onboarding.website_or_social_link ?? "",
      bio: onboarding.bio ?? "",
      industry: onboarding.industry ?? "",
    });

    if (onboarding.profile_picture_url) {
      setProfilePreview(onboarding.profile_picture_url);
    }

    setHasHydrated(true);
  }, [onboarding, hasHydrated, router]);

  const getApiErrorMessage = (err: unknown, fallback: string) => {
    const detail = (err as { response?: { data?: { detail?: unknown } } })
      ?.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) return detail[0]?.msg || fallback;
    return fallback;
  };

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
    event.target.value = "";
  };

  const handleSaveProfile = async (skip = false) => {
    try {
      if (skip) {
        await saveProfile.mutateAsync({});
        router.push("/brand");
        return;
      }

      const website = form.website_or_social_link.trim();
      const bio = form.bio.trim();
      const payload: {
        profile_picture_url?: string | null;
        website_or_social_link?: string | null;
        bio?: string | null;
      } = {};

      if (website) payload.website_or_social_link = website;
      if (bio) payload.bio = bio;

      if (profileFile) {
        payload.profile_picture_url = await uploadUserMedia(
          profileFile,
          "profile_picture"
        );
      }

      await saveProfile.mutateAsync(payload);
      router.push("/brand");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not save brand profile"));
    }
  };

  if (isOnboardingLoading || onboarding?.onboarding_completed_at) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-6 py-10 font-sans">
      <div className="w-full max-w-[590px]">
        <div className="mb-10 flex justify-center">
          <Image
            src="/contact star.svg"
            alt="Starix"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center">
          <h1 className="text-[38px] font-semibold tracking-[-0.04em] text-[#040136]">
            Complete your brand profile
          </h1>
          <p className="mt-2 text-[16px] font-medium text-[#747682]">
            Help creators recognize your brand before they join your challenges.
          </p>
        </div>

        <div className="mt-8 h-1 rounded-full bg-[#0033FF]" />

        <form className="mt-9 space-y-6">
          <div>
            <p className="mb-3 text-[16px] font-semibold text-[#040136]">
              Brand Logo
            </p>

            <div className="flex items-center gap-4">
              <div className="relative flex h-[104px] w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[28px] bg-[#E9EAEE]">
                {profilePreview ? (
                  <Image
                    src={profilePreview}
                    alt="Brand logo preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-white" />
                    <div className="mt-2 h-8 w-14 rounded-t-full bg-white" />
                  </div>
                )}
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  onChange={handleSelectImage}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-full border border-[#8B8D98] px-4 py-2 text-[13px] font-semibold text-[#1E1F24] transition hover:bg-gray-50 disabled:opacity-60"
                >
                  <HiOutlineUpload size={16} />
                  Upload Image
                </button>

                <p className="mt-3 text-[13px] font-medium text-[#747682]">
                  Upload a square image (PNG or JPEG) for best results
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CustomInput
              label="Website or Social Link"
              placeholder="https://yourbrand.com"
              value={form.website_or_social_link}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  website_or_social_link: e.target.value,
                }))
              }
            />

            <CustomInput
              label="Industry"
              placeholder="Industry"
              value={form.industry}
              disabled
              onChange={() => undefined}
            />
          </div>

          <div>
            <label className="mb-2 block text-[15px] font-semibold text-[#040136]">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell creators a little about your brand and the campaigns you run."
              className="h-[116px] w-full resize-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 text-sm text-[#444] outline-none transition focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              type="button"
              onClick={() => void handleSaveProfile(true)}
              disabled={isSaving}
              className="h-[56px] rounded-full border border-[#8B8D98] text-[16px] font-semibold text-[#1E1F24] transition hover:bg-gray-50 disabled:opacity-60"
            >
              Skip For Now
            </button>

            <button
              type="button"
              onClick={() => void handleSaveProfile(false)}
              disabled={isSaving}
              className="flex h-[56px] items-center justify-center rounded-full bg-[#0033FF] text-[16px] font-semibold text-white shadow-xl shadow-blue-100 transition active:scale-[0.98] disabled:opacity-60"
            >
              {isSaving ? <Loader /> : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandOnboardingPage;
