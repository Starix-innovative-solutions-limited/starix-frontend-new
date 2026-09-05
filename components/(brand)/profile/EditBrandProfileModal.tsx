"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { FiImage, FiRefreshCw, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import { useModal } from "@/hooks/useModal";
import {
  uploadUserMedia,
  useUpdateBrandProfile,
  type UpdateBrandProfilePayload,
} from "@/hooks/useProfile";

const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];

type EditBrandProfileModalProps = {
  brandName: string;
  website?: string | null;
  bio?: string | null;
  profilePictureUrl?: string | null;
  bannerUrl?: string | null;
};

function errorMessage(error: unknown) {
  const detail = (error as { response?: { data?: { detail?: unknown } } })
    ?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item: { msg?: string }) => item?.msg)
      .filter(Boolean)
      .join(", ");
  }
  return "Could not update brand profile";
}

export default function EditBrandProfileModal({
  brandName,
  website,
  bio,
  profilePictureUrl,
  bannerUrl,
}: EditBrandProfileModalProps) {
  const { close } = useModal();
  const updateProfile = useUpdateBrandProfile();
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [websiteValue, setWebsiteValue] = useState(website ?? "");
  const [bioValue, setBioValue] = useState(bio ?? "");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(
    profilePictureUrl ?? ""
  );
  const [bannerPreview, setBannerPreview] = useState(bannerUrl ?? "");
  const [removeProfile, setRemoveProfile] = useState(false);
  const [removeBanner, setRemoveBanner] = useState(false);

  useEffect(() => {
    return () => {
      if (profileFile && profilePreview.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }
      if (bannerFile && bannerPreview.startsWith("blob:")) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [bannerFile, bannerPreview, profileFile, profilePreview]);

  const validateFile = (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Upload a PNG or JPEG image");
      return false;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Image must be 20MB or smaller");
      return false;
    }
    return true;
  };

  const selectProfile = (file?: File) => {
    if (!file || !validateFile(file)) return;
    if (profilePreview.startsWith("blob:")) URL.revokeObjectURL(profilePreview);
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
    setRemoveProfile(false);
  };

  const selectBanner = (file?: File) => {
    if (!file || !validateFile(file)) return;
    if (bannerPreview.startsWith("blob:")) URL.revokeObjectURL(bannerPreview);
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
    setRemoveBanner(false);
  };

  const onFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    select: (file?: File) => void
  ) => {
    select(event.target.files?.[0]);
    event.target.value = "";
  };

  const onDrop = (
    event: DragEvent<HTMLButtonElement>,
    select: (file?: File) => void
  ) => {
    event.preventDefault();
    select(event.dataTransfer.files?.[0]);
  };

  const isDirty =
    websiteValue.trim() !== (website ?? "").trim() ||
    bioValue.trim() !== (bio ?? "").trim() ||
    Boolean(profileFile) ||
    Boolean(bannerFile) ||
    removeProfile ||
    removeBanner;

  const save = async () => {
    if (!isDirty || updateProfile.isPending) return;

    const payload: UpdateBrandProfilePayload = {};
    const nextWebsite = websiteValue.trim();
    const nextBio = bioValue.trim();

    if (nextWebsite !== (website ?? "").trim()) {
      payload.website_or_social_link = nextWebsite || null;
    }
    if (nextBio !== (bio ?? "").trim()) {
      payload.bio = nextBio || null;
    }

    try {
      if (removeProfile) {
        payload.profile_picture_url = null;
      } else if (profileFile) {
        payload.profile_picture_url = await uploadUserMedia(
          profileFile,
          "profile_picture"
        );
      }

      if (removeBanner) {
        payload.banner_url = null;
      } else if (bannerFile) {
        payload.banner_url = await uploadUserMedia(bannerFile, "user_banner");
      }

      await updateProfile.mutateAsync(payload);
      toast.success("Profile updated");
      close();
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  return (
    <div className="w-[min(80vw,520px)] max-h-[90vh] overflow-y-auto rounded-[26px] bg-white p-6 shadow-[0_25px_60px_rgba(16,24,40,0.28)] sm:p-7">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-semibold text-[#1E1F24]">
          Edit Profile
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="rounded-full p-1.5 text-[#747682] transition hover:bg-[#F5F6F8]"
        >
          <FiX size={19} />
        </button>
      </div>

      <input
        ref={profileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(event) => onFileChange(event, selectProfile)}
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(event) => onFileChange(event, selectBanner)}
      />

      <div className="mt-8">
        <label className="text-[14px] font-semibold text-[#1E1F24]">
          Profile Picture
        </label>
        <div className="mt-3 flex items-center gap-4">
          {profilePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profilePreview}
              alt=""
              className="h-[88px] w-[88px] shrink-0 rounded-full object-cover"
            />
          ) : (
            <BrandAvatar
              name={brandName}
              className="h-[88px] w-[88px]"
              letterClassName="text-3xl"
            />
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => profileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D0D5DD] px-3 py-1.5 text-[12px] font-medium text-[#1E1F24]"
              >
                <FiRefreshCw size={13} />
                Replace
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileFile(null);
                  setProfilePreview("");
                  setRemoveProfile(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D0D5DD] px-3 py-1.5 text-[12px] font-medium text-[#1E1F24]"
              >
                <FiTrash2 size={13} />
                Remove
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#8B8D98]">
              Upload 400×400 clear PNG or JPEG image of 20MB max size
            </p>
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-[#1E1F24]">
            Brand Name
          </label>
          <input
            value={brandName}
            readOnly
            aria-readonly="true"
            title="Brand name cannot currently be changed"
            className="w-full rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-3.5 text-[14px] text-[#62636C] outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-[#1E1F24]">
            Website URL
          </label>
          <input
            type="url"
            value={websiteValue}
            onChange={(event) => setWebsiteValue(event.target.value)}
            placeholder="Enter Website URL"
            className="w-full rounded-xl border border-[#E4E7EC] px-4 py-3.5 text-[14px] text-[#1E1F24] outline-none placeholder:text-[#98A2B3] focus:border-[#0033FF]"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-[14px] font-semibold text-[#1E1F24]">
          Brand Description
        </label>
        <textarea
          value={bioValue}
          onChange={(event) => setBioValue(event.target.value)}
          placeholder="Describe what you need creators to do.."
          rows={5}
          maxLength={500}
          className="w-full resize-none rounded-xl border border-[#E4E7EC] px-4 py-3.5 text-[14px] text-[#1E1F24] outline-none placeholder:text-[#98A2B3] focus:border-[#0033FF]"
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-[14px] font-semibold text-[#1E1F24]">
          Banner Image
        </label>
        {bannerPreview ? (
          <div className="group relative h-[180px] overflow-hidden rounded-2xl bg-[#F5F6F8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bannerPreview}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute right-3 bottom-3 flex gap-2">
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="rounded-full bg-white p-2 text-[#1E1F24] shadow"
                aria-label="Replace banner"
              >
                <FiRefreshCw size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setBannerFile(null);
                  setBannerPreview("");
                  setRemoveBanner(true);
                }}
                className="rounded-full bg-white p-2 text-[#F04438] shadow"
                aria-label="Remove banner"
              >
                <FiTrash2 size={15} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => bannerInputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => onDrop(event, selectBanner)}
            className="flex h-[190px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#B9BBC4] bg-white px-5 text-center transition hover:bg-[#FAFAFB]"
          >
            <FiImage size={52} className="text-[#D9DBE2]" />
            <p className="mt-4 text-[13px] text-[#1E1F24]">
              <span className="font-semibold text-[#0033FF]">
                Click to Upload
              </span>{" "}
              or Drag and Drop
            </p>
            <p className="mt-1 text-[11px] text-[#8B8D98]">
              PNG or JPEG (Max Size: 20MB)
            </p>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={save}
        disabled={!isDirty || updateProfile.isPending}
        className="mt-7 w-full rounded-full bg-[#0033FF] py-3.5 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:bg-[#89A5FF] disabled:opacity-70"
      >
        {updateProfile.isPending ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
