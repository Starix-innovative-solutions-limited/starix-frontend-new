"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiRefreshCw, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import { useGetCategories } from "@/hooks/useCategories";
import {
  uploadUserMedia,
  type UpdateCreatorProfilePayload,
} from "@/hooks/useProfile";
import { normalizeBio } from "@/lib/bio";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    profileImage: string;
    bannerImage: string;
    bio: string;
    scoreVisibility: string;
    niches: string[];
  };
  onSave: (payload: UpdateCreatorProfilePayload) => void;
};

export default function EditProfileModalV2({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}: EditProfileModalProps) {
  const [profileImage, setProfileImage] = useState<string | null>(
    currentProfile.profileImage
  );
  const [bannerImage, setBannerImage] = useState<string | null>(
    currentProfile.bannerImage
  );
  const [visibility, setVisibility] = useState(currentProfile.scoreVisibility);
  const [niches, setNiches] = useState(currentProfile.niches.slice(0, 3));
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [createPortfolio, setCreatePortfolio] = useState(true);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [removeBannerImage, setRemoveBannerImage] = useState(false);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileFileRef = useRef<File | null>(null);
  const bannerFileRef = useRef<File | null>(null);
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories();

  useEffect(() => {
    if (!isOpen) return;
    setProfileImage(currentProfile.profileImage);
    setBannerImage(currentProfile.bannerImage);
    setVisibility(currentProfile.scoreVisibility);
    setNiches(currentProfile.niches.slice(0, 3));
    setSearch("");
    setSearchOpen(false);
    setRemoveProfileImage(false);
    setRemoveBannerImage(false);
    setCreatePortfolio(
      window.localStorage.getItem("creator-auto-portfolio") !== "false"
    );
    profileFileRef.current = null;
    bannerFileRef.current = null;
  }, [
    currentProfile.bannerImage,
    currentProfile.niches,
    currentProfile.profileImage,
    currentProfile.scoreVisibility,
    isOpen,
  ]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return categories
      .filter((category) => !niches.includes(category.name))
      .filter(
        (category) =>
          !query || category.name.toLowerCase().includes(query)
      );
  }, [categories, niches, search]);

  if (!isOpen) return null;

  function selectProfileImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    profileFileRef.current = file;
    setProfileImage(URL.createObjectURL(file));
    setRemoveProfileImage(false);
    event.target.value = "";
  }

  function selectBannerImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    bannerFileRef.current = file;
    setBannerImage(URL.createObjectURL(file));
    setRemoveBannerImage(false);
    event.target.value = "";
  }

  async function handleSubmit() {
    const payload: UpdateCreatorProfilePayload = {
      starix_score_visibility:
        visibility === "anyone" ? "public" : "private",
      niches,
      bio: normalizeBio(currentProfile.bio),
    };

    if (removeProfileImage) {
      payload.profile_picture_url = null;
    } else if (profileFileRef.current) {
      payload.profile_picture_url = await uploadUserMedia(
        profileFileRef.current,
        "profile_picture"
      );
    }

    if (removeBannerImage) {
      payload.banner_url = null;
    } else if (bannerFileRef.current) {
      payload.banner_url = await uploadUserMedia(
        bannerFileRef.current,
        "user_banner"
      );
    }

    window.localStorage.setItem(
      "creator-auto-portfolio",
      String(createPortfolio)
    );
    onSave(payload);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <input
        ref={profileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={selectProfileImage}
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={selectBannerImage}
      />

      <div className="flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <header className="flex items-center justify-between px-7 pb-5 pt-7">
          <h2 className="text-[22px] font-semibold text-[#1E1F24]">
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit profile"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#777A83] hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </header>

        <div className="space-y-6 overflow-y-auto px-7 pb-7">
          <section>
            <h3 className="mb-3 text-[14px] font-semibold text-[#1E1F24]">
              Profile Picture
            </h3>
            {profileImage ? (
              <div className="flex items-center gap-4">
                <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={profileImage}
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <PillButton
                      label="Replace"
                      icon={<FiRefreshCw size={12} />}
                      onClick={() => profileInputRef.current?.click()}
                    />
                    <PillButton
                      label="Remove"
                      icon={<FiTrash2 size={12} />}
                      onClick={() => {
                        setProfileImage(null);
                        setRemoveProfileImage(true);
                        profileFileRef.current = null;
                      }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] leading-4 text-[#92949C]">
                    Upload 400x400 clear PNG or JPEG image of 20MB max size
                  </p>
                </div>
              </div>
            ) : (
              <UploadPlaceholder
                label="Upload profile picture"
                className="h-[82px]"
                onClick={() => profileInputRef.current?.click()}
              />
            )}
          </section>

          <section className="relative">
            <h3 className="mb-2 text-[14px] font-semibold text-[#1E1F24]">
              Select your top 3 Niches
            </h3>
            <div className="relative">
              <FiSearch
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#777A83]"
              />
              <input
                value={search}
                disabled={niches.length >= 3}
                onFocus={() => setSearchOpen(true)}
                onBlur={() =>
                  window.setTimeout(() => setSearchOpen(false), 150)
                }
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  niches.length >= 3
                    ? "Maximum of 3 niches selected"
                    : "Search and add Niches"
                }
                className="h-[48px] w-full rounded-full border border-[#E5E6EA] bg-[#F8F8FA] pl-11 pr-4 text-[14px] text-[#1E1F24] outline-none placeholder:text-[#858790] focus:border-[#AAB8F8] disabled:cursor-not-allowed"
              />
              {searchOpen && niches.length < 3 && (
                <div className="absolute left-0 right-0 top-[54px] z-20 max-h-[240px] overflow-y-auto rounded-2xl border border-[#EEEFF2] bg-white py-1 shadow-[0_12px_30px_rgba(16,24,40,0.12)]">
                  {categoriesLoading ? (
                    <DropdownMessage>Loading niches...</DropdownMessage>
                  ) : filteredCategories.length ? (
                    filteredCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setNiches((current) => [
                            ...current,
                            category.name,
                          ]);
                          setSearch("");
                        }}
                        className="block w-full px-4 py-3 text-left text-[13px] capitalize text-[#4F5159] hover:bg-[#F7F8FC]"
                      >
                        {category.name}
                      </button>
                    ))
                  ) : (
                    <DropdownMessage>No niches found</DropdownMessage>
                  )}
                </div>
              )}
            </div>

            {niches.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {niches.map((niche) => (
                  <span
                    key={niche}
                    className="flex items-center gap-2 rounded-full border border-[#C9E5F2] bg-[#FAFDFF] px-3 py-1.5 text-[12px] capitalize text-[#4384A1]"
                  >
                    {niche}
                    <button
                      type="button"
                      aria-label={`Remove ${niche}`}
                      onClick={() =>
                        setNiches((current) =>
                          current.filter((item) => item !== niche)
                        )
                      }
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          <section>
            <h3 className="mb-2 text-[14px] font-semibold text-[#1E1F24]">
              Starix Score Visibility
            </h3>
            <div className="space-y-2">
              <VisibilityOption
                checked={visibility === "anyone"}
                label="Anyone can see my starix score"
                onChange={() => setVisibility("anyone")}
              />
              <VisibilityOption
                checked={visibility === "only-me"}
                label="Only I can see my starix score"
                onChange={() => setVisibility("only-me")}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-[14px] font-semibold text-[#1E1F24]">
              Banner Image
            </h3>
            {bannerImage ? (
              <div className="relative h-[185px] w-full overflow-hidden rounded-[20px] bg-gray-100">
                <Image
                  src={bannerImage}
                  alt="Profile banner"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <CircleButton
                    label="Replace banner"
                    icon={<FiRefreshCw size={14} />}
                    onClick={() => bannerInputRef.current?.click()}
                  />
                  <CircleButton
                    label="Remove banner"
                    icon={<FiTrash2 size={14} />}
                    onClick={() => {
                      setBannerImage(null);
                      setRemoveBannerImage(true);
                      bannerFileRef.current = null;
                    }}
                  />
                </div>
              </div>
            ) : (
              <UploadPlaceholder
                label="Upload banner image"
                className="h-[150px]"
                onClick={() => bannerInputRef.current?.click()}
              />
            )}
          </section>

          <section className="flex items-center justify-between gap-6">
            <div>
              <h3 className="text-[14px] font-semibold text-[#1E1F24]">
                Create Challenge Portfolio
              </h3>
              <p className="mt-1 max-w-[360px] text-[12px] leading-[17px] text-[#777A83]">
                Automatically add challenge submissions to my Starix portfolio
                and choose which ones to remove.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={createPortfolio}
              onClick={() => setCreatePortfolio((current) => !current)}
              className={`relative h-5 w-10 shrink-0 rounded-full transition ${
                createPortfolio ? "bg-[#D7E2FF]" : "bg-[#D8DAE0]"
              }`}
            >
              <span
                className={`absolute top-[-2px] h-6 w-6 rounded-full shadow-sm transition ${
                  createPortfolio
                    ? "left-[18px] bg-[#0033FF]"
                    : "left-0 bg-[#94969E]"
                }`}
              />
            </button>
          </section>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-[50px] w-full items-center justify-center rounded-full bg-[#829BFA] text-[14px] font-semibold text-white transition hover:bg-[#0033FF]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function PillButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full border border-[#C8CAD0] px-3 py-1.5 text-[12px] font-medium text-[#3E4047] hover:bg-gray-50"
    >
      {icon}
      {label}
    </button>
  );
}

function CircleButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#676A73] shadow-md hover:bg-gray-50"
    >
      {icon}
    </button>
  );
}

function UploadPlaceholder({
  label,
  className,
  onClick,
}: {
  label: string;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center rounded-[20px] border border-dashed border-[#C8CAD0] text-[13px] font-medium text-[#0033FF] hover:bg-[#F8FAFF] ${className}`}
    >
      {label}
    </button>
  );
}

function VisibilityOption({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#60626B]">
      <input
        type="radio"
        name="visibility"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#0033FF]"
      />
      {label}
    </label>
  );
}

function DropdownMessage({ children }: { children: React.ReactNode }) {
  return <p className="px-4 py-3 text-[13px] text-[#777A83]">{children}</p>;
}
