"use client";

import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCamera, FiRefreshCw, FiTrash2, FiX } from "react-icons/fi";
import { useUpdateCircle } from "@/hooks/useCircles";
import { useUploadMedia } from "@/hooks/useMedia";
import { parseApiError } from "@/lib/apiError";
import { displayMediaUrl } from "@/lib/displayMediaUrl";

interface CirclePhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId: string;
  profilePictureUrl?: string | null;
  coverUrl?: string | null;
}

function MediaPreview({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}

export default function CirclePhotosModal({
  isOpen,
  onClose,
  circleId,
  profilePictureUrl,
  coverUrl,
}: CirclePhotosModalProps) {
  const uploadMedia = useUploadMedia();
  const updateCircle = useUpdateCircle(circleId);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileFileRef = useRef<File | null>(null);
  const coverFileRef = useRef<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [removeProfile, setRemoveProfile] = useState(false);
  const [removeCover, setRemoveCover] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setProfilePreview(profilePictureUrl ?? null);
    setCoverPreview(coverUrl ?? null);
    setRemoveProfile(false);
    setRemoveCover(false);
    profileFileRef.current = null;
    coverFileRef.current = null;
  }, [isOpen, profilePictureUrl, coverUrl]);

  if (!isOpen) return null;

  const isDirty =
    removeProfile ||
    removeCover ||
    Boolean(profileFileRef.current) ||
    Boolean(coverFileRef.current);

  const pickFile = (
    file: File | undefined,
    kind: "profile" | "cover"
  ) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast.error("Use a PNG or JPEG image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be 5MB or smaller.");
      return;
    }
    const preview = URL.createObjectURL(file);
    if (kind === "profile") {
      profileFileRef.current = file;
      setRemoveProfile(false);
      setProfilePreview(preview);
    } else {
      coverFileRef.current = file;
      setRemoveCover(false);
      setCoverPreview(preview);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: {
        profile_picture_url?: string | null;
        banner_url?: string | null;
      } = {};

      if (removeProfile) payload.profile_picture_url = null;
      else if (profileFileRef.current) {
        const { public_url } = await uploadMedia.mutateAsync({
          file: profileFileRef.current,
          target: "circle_profile_picture",
        });
        payload.profile_picture_url = public_url;
      }

      if (removeCover) payload.banner_url = null;
      else if (coverFileRef.current) {
        const { public_url } = await uploadMedia.mutateAsync({
          file: coverFileRef.current,
          target: "circle_profile_picture",
        });
        payload.banner_url = public_url;
      }

      if (Object.keys(payload).length) {
        await updateCircle.mutateAsync(payload);
      }
      toast.success("Circle photos updated.");
      onClose();
    } catch (error) {
      toast.error(
        parseApiError(error, "Couldn't save photos. Try again.").message
      );
    } finally {
      setSaving(false);
    }
  };

  const profileSrc = profilePreview?.startsWith("blob:")
    ? profilePreview
    : displayMediaUrl(profilePreview);
  const coverSrc = coverPreview?.startsWith("blob:")
    ? coverPreview
    : displayMediaUrl(coverPreview);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[500px] overflow-hidden rounded-[24px] bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-[20px] font-semibold text-[#1E1F24]">
            Edit photos
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-6 px-6 pb-6">
          <input
            ref={profileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(event) => {
              pickFile(event.target.files?.[0], "profile");
              event.target.value = "";
            }}
          />
          <input
            ref={coverInputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(event) => {
              pickFile(event.target.files?.[0], "cover");
              event.target.value = "";
            }}
          />

          <div>
            <p className="mb-3 text-[14px] font-semibold text-[#1E1F24]">
              Profile picture
            </p>
            {profileSrc ? (
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-[20px] bg-[#F5F6F8]">
                  <MediaPreview
                    src={profileSrc}
                    alt="Circle profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => profileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-[13px] font-semibold text-[#1E1F24] hover:bg-gray-50"
                    >
                      <FiRefreshCw size={14} /> Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        profileFileRef.current = null;
                        setRemoveProfile(true);
                        setProfilePreview(null);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-[13px] font-semibold text-[#1E1F24] hover:bg-gray-50"
                    >
                      <FiTrash2 size={14} /> Remove
                    </button>
                  </div>
                  <p className="text-[11px] text-[#80828D]">
                    PNG or JPEG, 5MB max
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => profileInputRef.current?.click()}
                className="flex h-[100px] w-full flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-gray-300 hover:bg-gray-50"
              >
                <FiCamera className="mb-1 text-gray-400" size={22} />
                <p className="text-[12px] font-medium text-gray-600">
                  <span className="font-semibold text-[#0033FF]">
                    Click to upload
                  </span>{" "}
                  a profile picture
                </p>
              </button>
            )}
          </div>

          <div>
            <p className="mb-3 text-[14px] font-semibold text-[#1E1F24]">
              Cover image
            </p>
            {coverSrc ? (
              <div className="relative h-[140px] overflow-hidden rounded-[16px] bg-[#F5F6F8]">
                <MediaPreview
                  src={coverSrc}
                  alt="Circle cover"
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-3 bottom-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50"
                    aria-label="Replace cover image"
                  >
                    <FiRefreshCw size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      coverFileRef.current = null;
                      setRemoveCover(true);
                      setCoverPreview(null);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-sm hover:bg-gray-50"
                    aria-label="Remove cover image"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="flex h-[140px] w-full flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-gray-300 hover:bg-gray-50"
              >
                <FiCamera className="mb-2 text-gray-400" size={28} />
                <p className="text-[13px] font-medium text-gray-600">
                  <span className="font-semibold text-[#0033FF]">
                    Click to upload
                  </span>{" "}
                  a cover image
                </p>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  PNG or JPEG, 5MB max
                </p>
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={!isDirty || saving}
            onClick={handleSave}
            className="w-full rounded-full py-4 text-[14px] font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-[#91A7FF] bg-[#0033FF] hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Save photos"}
          </button>
        </div>
      </div>
    </div>
  );
}
