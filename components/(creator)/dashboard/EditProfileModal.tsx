"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  uploadUserMedia
} from "@/hooks/useProfile";
import Image from "next/image";

type UpdateCreatorProfilePayload = {
  profile_picture_url?: string;
  banner_url?: string;
  starix_score_visibility?: "public" | "private";
};
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    profileImage: string;
    bannerImage: string;
    scoreVisibility: string;
  };
  onSave: (payload: UpdateCreatorProfilePayload) => void;
}



const EditProfileModal = ({ isOpen, onClose, currentProfile, onSave }: EditProfileModalProps) => {
  // Temporary Form States holding local object preview URLs or file strings
  const [tempProfileImg, setTempProfileImg] = useState<string | null>(currentProfile.profileImage);
  const [tempBannerImg, setTempBannerImg] = useState<string | null>(currentProfile.bannerImage);
  const [tempVisibility, setTempVisibility] = useState(currentProfile.scoreVisibility);

  // Native HTML Input Dom references to programmatically trigger OS file picker sheets
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  const profileFileRef = useRef<File | null>(null);
  const bannerFileRef = useRef<File | null>(null);

  // Sync internal temporary state whenever the modal opens with fresh data
  useEffect(() => {
    if (isOpen) {
      setTempProfileImg(currentProfile.profileImage);
      setTempBannerImg(currentProfile.bannerImage);
      setTempVisibility(currentProfile.scoreVisibility);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  // Real-time delta check: button changes color if ANY field deviates from original profile values
  const isDirty = 
    tempProfileImg !== currentProfile.profileImage ||
    tempBannerImg !== currentProfile.bannerImage ||
    tempVisibility !== currentProfile.scoreVisibility;

  // Process selected file streams safely for local client browser instances
  const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImgState: React.Dispatch<React.SetStateAction<string | null>>,
  fileRef: React.MutableRefObject<File | null>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  fileRef.current = file;
  setImgState(URL.createObjectURL(file));
  e.target.value = "";
};

  const handleSubmit = async () => {
  const payload: UpdateCreatorProfilePayload = {
    starix_score_visibility: tempVisibility === "only-me" ? "private" : "public",
  };

  if (profileFileRef.current) {
    payload.profile_picture_url = await uploadUserMedia(
      profileFileRef.current,
      "profile_picture"
    );
  }

  if (bannerFileRef.current) {
    payload.banner_url = await uploadUserMedia(
      bannerFileRef.current,
      "user_banner"
    );
  }

  onSave(payload);
};

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity duration-300">
      
      {/* HIDDEN RAW FILE ELEMENT ATTACHMENTS */}
      <input
        type="file"
        ref={profileInputRef}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={(e) => handleFileChange(e, setTempProfileImg, profileFileRef)}
      />

      <input
        type="file"
        ref={bannerInputRef}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={(e) => handleFileChange(e, setTempBannerImg, bannerFileRef)}
      />

      {/* MODAL CARD BODY */}
      <div className="bg-white w-full max-w-[500px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Navigation Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 bg-white">
          <h2 className="text-[20px] font-bold text-[#1E1F24]">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Setup Options Form Fields Container */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[75vh] space-y-6">
          
          {/* FIELD 1: PROFILE PORTRAIT IMAGE CONTROL */}
          <div>
            <label className="block text-[14px] font-bold text-[#1E1F24] mb-3">
              Profile Picture
            </label>
            
            {tempProfileImg ? (
              /* Active Profile Image View Layout */
              <div className="flex items-center gap-4 animate-in fade-in duration-200">
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden relative bg-gray-100 flex-shrink-0 border border-gray-100">
                  <Image 
                    src={tempProfileImg} 
                    alt="Modal Portrait Thumbnail" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setTempBannerImg(null);
                        bannerFileRef.current = null;
                      }}
                      className="px-3 py-1.5 text-[13px] font-semibold text-[#1E1F24] border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition flex items-center gap-1 cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                      Replace
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setTempProfileImg(null);
                        profileFileRef.current = null;
                      }}
                      className="px-3 py-1.5 text-[13px] font-semibold text-[#1E1F24] border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition flex items-center gap-1 cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      Remove
                    </button>
                  </div>
                  <span className="text-[11px] text-[#80828D]">
                    Upload 400x400 clear PNG or JPEG image of 20MB max size
                  </span>
                </div>
              </div>
            ) : (
              /* Empty Dashed State for Profile Picture Layout */
              <div 
                onClick={() => profileInputRef.current?.click()}
                className="w-full h-[100px] border-2 border-dashed border-gray-300 rounded-[16px] flex flex-col items-center justify-center bg-white hover:bg-gray-50/50 transition cursor-pointer group animate-in fade-in duration-200"
              >
                <div className="w-6 h-6 mb-1 relative flex items-center justify-center text-gray-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <p className="text-[12px] font-medium text-gray-600">
                  <span className="text-blue-600 font-semibold group-hover:underline">Click to Upload</span> profile portrait
                </p>
                <span className="text-[10px] text-gray-400">Max size: 20MB</span>
              </div>
            )}
          </div>

          {/* FIELD 2: HERO BANNER DESIGN UPLOADER LAYOUT VARIATIONS */}
          <div>
            <label className="block text-[14px] font-bold text-[#1E1F24] mb-3">
              Banner Image
            </label>
            
            {tempBannerImg ? (
              /* Active Image View Layout */
              <div className="relative w-full h-[140px] rounded-[16px] overflow-hidden bg-gray-100 group animate-in fade-in duration-200">
                <Image 
                  src={tempBannerImg} 
                  alt="Current Banner Template Preview" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => bannerInputRef.current?.click()}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E1F24] shadow-sm hover:bg-gray-50 transition cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setTempBannerImg(null)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm hover:bg-gray-50 transition cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Dashed Drag-and-Drop Container Box */
              <div 
                onClick={() => bannerInputRef.current?.click()}
                className="w-full h-[140px] border-2 border-dashed border-gray-300 rounded-[16px] flex flex-col items-center justify-center bg-white hover:bg-gray-50/50 transition cursor-pointer group animate-in fade-in duration-200"
              >
                <div className="w-10 h-10 mb-2 relative flex items-center justify-center text-gray-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <p className="text-[13px] font-medium text-gray-600">
                  <span className="text-blue-600 font-semibold group-hover:underline">Click to Upload</span> or Drag and Drop
                </p>
                <span className="text-[11px] text-gray-400 mt-0.5">PNG or IMG (Max Size: 20MB)</span>
              </div>
            )}
          </div>

          {/* FIELD 3: RADIO INTERACTIVE VISIBILITY CHANNELS CHOICE */}
          <div className="space-y-3">
            <label className="block text-[14px] font-bold text-[#1E1F24]">
              Starix Score Visibility
            </label>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <input 
                  type="radio" 
                  name="visibility" 
                  value="anyone"
                  checked={tempVisibility === "anyone"}
                  onChange={() => setTempVisibility("anyone")}
                  className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <span className="text-[13px] font-medium text-gray-600 group-hover:text-[#1E1F24] transition">
                  Anyone can see my starix score
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <input 
                  type="radio" 
                  name="visibility" 
                  value="only-me"
                  checked={tempVisibility === "only-me"}
                  onChange={() => setTempVisibility("only-me")}
                  className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <span className="text-[13px] font-medium text-gray-600 group-hover:text-[#1E1F24] transition">
                  Only I can see my starix score
                </span>
              </label>
            </div>
          </div>

          {/* TRIGGER EXECUTION BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!isDirty}
              onClick={handleSubmit}
              className={`w-full h-[46px] rounded-full font-semibold text-[14px] transition shadow-xs flex items-center justify-center ${
                isDirty
                  ? "bg-[#245BFF] hover:bg-[#1A4BFF] text-white cursor-pointer"
                  : "bg-[#D2D4DA] text-white cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;