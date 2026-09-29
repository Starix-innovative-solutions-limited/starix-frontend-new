"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineUpload } from "react-icons/hi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import CustomInput from "@/components/CustomInput";
import { uploadUserMedia } from "@/hooks/useProfile";
import Loader from "@/components/Loader";
import { useInitiateSocialConnection } from "@/hooks/useSocials";
import { useGetCategories } from "@/hooks/useCategories";
import {
  onboardingStepToIndex,
  useCompleteCreatorOnboarding,
  useCreatorOnboarding,
  useSaveOnboardingCategories,
  useSaveOnboardingProfile,
} from "@/hooks/useCreatorOnboarding";
import toast from "react-hot-toast";

const FALLBACK_CATEGORIES = [
  "beauty",
  "fashion",
  "lifestyle",
  "fitness",
  "photography",
  "technology",
  "gaming",
  "health",
  "travel",
  "music",
  "education",
  "business",
  "food",
  "comedy",
  "entertainment",
  "sports",
  "art",
  "diy",
  "parenting",
];

const OnboardingPage = () => {
  const router = useRouter();
  const saveProfile = useSaveOnboardingProfile();
  const saveCategories = useSaveOnboardingCategories();
  const completeOnboarding = useCompleteCreatorOnboarding();
  const connectSocialMutation = useInitiateSocialConnection();
  const { data: apiCategories = [], isLoading: isCategoriesLoading } =
    useGetCategories();
  const {
    data: onboarding,
    isLoading: isOnboardingLoading,
  } = useCreatorOnboarding();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasHydrated, setHasHydrated] = useState(false);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [form, setForm] = useState({
    username: "",
    display_name: "",
    bio: "",
  });

  const isSavingProfile = saveProfile.isPending;
  const isSavingCategories = saveCategories.isPending;
  const isCompleting = completeOnboarding.isPending;

  useEffect(() => {
    if (!onboarding || hasHydrated) return;

    if (onboarding.onboarding_completed_at) {
      router.replace("/dashboard");
      return;
    }

    setStep(onboardingStepToIndex(onboarding.onboarding_step));

    setForm((prev) => ({
      ...prev,
      username: onboarding.username ?? "",
      bio: onboarding.bio ?? "",
    }));

    if (onboarding.profile_picture_url) {
      setProfilePreview(onboarding.profile_picture_url);
    }

    if (onboarding.categories?.length) {
      setSelectedCategories(onboarding.categories);
    }

    setHasHydrated(true);
  }, [onboarding, hasHydrated, router]);

  const categories =
    apiCategories.length > 0
      ? apiCategories.map((c) => c.name)
      : FALLBACK_CATEGORIES;

  const socialPlatforms = [
    {
      label: "Instagram",
      platform: "instagram" as const,
      icon: <FaInstagram className="text-[#E4405F]" size={26} />,
    },
    {
      label: "TikTok",
      platform: "tiktok" as const,
      icon: <FaTiktok className="text-[#000000]" size={26} />,
    },
    {
      label: "YouTube",
      platform: "youtube" as const,
      icon: <FaYoutube className="text-[#FF0000]" size={28} />,
    },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) {
        return current.filter((item) => item !== category);
      }

      return [...current, category];
    });
  };

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
    event.target.value = "";
  };

  const getApiErrorMessage = (err: unknown, fallback: string) => {
    const detail = (err as { response?: { data?: { detail?: unknown } } })
      ?.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) return detail[0]?.msg || fallback;
    return fallback;
  };

  const handleSaveProfile = async (skip = false) => {
    try {
      if (skip) {
        await saveProfile.mutateAsync({});
        setStep(2);
        return;
      }

      const username = form.username.trim().toLowerCase();
      const bio = form.bio.trim();
      const payload: {
        profile_picture_url?: string | null;
        username?: string;
        bio?: string | null;
      } = {};

      if (username) payload.username = username;
      if (bio) payload.bio = bio;

      if (profileFile) {
        payload.profile_picture_url = await uploadUserMedia(
          profileFile,
          "profile_picture"
        );
      }

      await saveProfile.mutateAsync(payload);
      setProfileFile(null);
      setStep(2);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not save profile"));
    }
  };

  const handleSaveCategories = async (skip = false) => {
    try {
      await saveCategories.mutateAsync({
        categories: skip ? [] : selectedCategories,
      });
      setStep(3);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not save categories"));
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      await completeOnboarding.mutateAsync();
      router.push("/dashboard");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Could not complete onboarding"));
    }
  };

  const handleSkip = () => {
    if (step === 1) {
      void handleSaveProfile(true);
      return;
    }
    if (step === 2) {
      void handleSaveCategories(true);
      return;
    }
    void handleCompleteOnboarding();
  };

  const handleConnectSocial = async (
    platform: "instagram" | "tiktok" | "youtube"
  ) => {
    const callbackUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/onboarding`
        : "/onboarding";

    const response = await connectSocialMutation.mutateAsync({
      platform,
      callbackUrl,
    });

    if (response?.authorization_url) {
      window.location.href = response.authorization_url;
    }
  };

  const heading =
    step === 1
      ? "Complete your profile"
      : step === 2
        ? "What do you create?"
        : "Connect your socials";

  const subheading =
    step === 1
      ? "Help brands recognize you before they review your submissions."
      : step === 2
        ? "Choose categories to receive more relevant challenges"
        : "Connect the platforms you create content on to get a starix score";

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
            src="/contact star.webp"
            alt="Starix"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center">
          <h1 className="text-[38px] font-semibold tracking-[-0.04em] text-[#040136]">
            {heading}
          </h1>
          <p className="mt-2 text-[16px] font-medium text-[#747682]">
            {subheading}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="h-1 rounded-full bg-[#0033FF]" />
          <div className={`h-1 rounded-full ${step >= 2 ? "bg-[#0033FF]" : "bg-[#EFF0F3]"}`} />
          <div className={`h-1 rounded-full ${step === 3 ? "bg-[#0033FF]" : "bg-[#EFF0F3]"}`} />
        </div>

        {step === 1 ? (
          <form className="mt-9 space-y-6">
            <div>
              <p className="mb-3 text-[16px] font-semibold text-[#040136]">
                Profile Picture
              </p>

              <div className="flex items-center gap-4">
                <div className="relative flex h-[104px] w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[28px] bg-[#E9EAEE]">
                  {profilePreview ? (
                    <Image
                      src={profilePreview}
                      alt="Profile preview"
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
                    className="inline-flex items-center gap-2 rounded-full border border-[#8B8D98] px-4 py-2 text-[13px] font-semibold text-[#1E1F24] transition hover:bg-gray-50"
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
                label="User Name"
                placeholder="jane_creator"
                value={form.username}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                  }))
                }
              />

              <CustomInput
                label="Display Name"
                placeholder="Enter your last name"
                value={form.display_name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, display_name: e.target.value }))
                }
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
                placeholder="Tell brands a little about yourself and the content you create."
                className="h-[116px] w-full resize-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 text-sm text-[#444] outline-none transition focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                type="button"
                onClick={handleSkip}
                disabled={isSavingProfile}
                className="h-[56px] rounded-full border border-[#8B8D98] text-[16px] font-semibold text-[#1E1F24] transition hover:bg-gray-50 disabled:opacity-60"
              >
                Skip For Now
              </button>

              <button
                type="button"
                onClick={() => void handleSaveProfile(false)}
                disabled={isSavingProfile}
                className="flex h-[56px] items-center justify-center rounded-full bg-[#0033FF] text-[16px] font-semibold text-white shadow-xl shadow-blue-100 transition active:scale-[0.98] disabled:opacity-60"
              >
                {isSavingProfile ? <Loader /> : "Continue"}
              </button>
            </div>
          </form>
        ) : step === 2 ? (
          <div className="mt-10">
            <div className="flex flex-wrap justify-center gap-3">
              {isCategoriesLoading && categories.length === 0
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-9 w-24 animate-pulse rounded-full bg-gray-100"
                    />
                  ))
                : categories.map((category) => {
                    const isSelected = selectedCategories.includes(category);

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleCategory(category)}
                        className={`rounded-full border px-4 py-2 text-[14px] font-semibold capitalize transition ${
                          isSelected
                            ? "border-[#0033FF] bg-[#F5FBFF] text-[#0033FF]"
                            : "border-[#CFE7EF] bg-white text-[#3379A5]"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
            </div>

            <div className="mt-[120px] grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSkip}
                disabled={isSavingCategories}
                className="h-[56px] rounded-full border border-[#8B8D98] text-[16px] font-semibold text-[#1E1F24] transition hover:bg-gray-50 disabled:opacity-60"
              >
                Skip
              </button>

              <button
                type="button"
                onClick={() => void handleSaveCategories(false)}
                disabled={isSavingCategories}
                className="flex h-[56px] items-center justify-center rounded-full bg-[#0033FF] text-[16px] font-semibold text-white shadow-xl shadow-blue-100 transition active:scale-[0.98] disabled:opacity-60"
              >
                {isSavingCategories ? <Loader /> : "Continue"}
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleCompleteOnboarding();
            }}
            className="mt-10"
          >
            <div className="space-y-5">
              {socialPlatforms.map((social) => (
                <button
                  key={social.platform}
                  type="button"
                  onClick={() => handleConnectSocial(social.platform)}
                  disabled={connectSocialMutation.isPending || isCompleting}
                  className="relative flex h-[58px] w-full items-center justify-center rounded-full border border-[#D1D5DB] bg-white px-5 text-[16px] font-semibold text-[#1E1F24] transition hover:bg-gray-50 disabled:opacity-60"
                >
                  <span className="absolute left-5 flex items-center">
                    {social.icon}
                  </span>
                  Connect {social.label}
                </button>
              ))}
            </div>

            <div className="mt-[120px] grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSkip}
                disabled={isCompleting}
                className="h-[56px] rounded-full border border-[#8B8D98] text-[16px] font-semibold text-[#1E1F24] transition hover:bg-gray-50 disabled:opacity-60"
              >
                Skip For Now
              </button>

              <button
                type="submit"
                disabled={isCompleting}
                className="flex h-[56px] items-center justify-center rounded-full bg-[#0033FF] text-[16px] font-semibold text-white shadow-xl shadow-blue-100 transition active:scale-[0.98] disabled:opacity-60"
              >
                {isCompleting ? <Loader /> : "Continue"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;