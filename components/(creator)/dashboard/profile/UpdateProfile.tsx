"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import CustomInput from "@/components/CustomInput";
import { useUpdateCreatorProfile } from "@/hooks/useProfile";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useAuthStore } from "@/store/useAuthStore";
import { useModal } from "@/hooks/useModal";

const UpdateProfile: React.FC = () => {
    const { profile } = useAuthStore();
    const { close } = useModal(); // 💡 Grab the close function
    const { mutateAsync: updateProfile, isPending } = useUpdateCreatorProfile();

    // Local state for image preview and the actual File object
    const [profileImage, setProfileImage] = useState<string>(
        profile?.profile_image || "/avatar.svg"
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

    // 💡 Initialize form with profile data, providing safe fallbacks
    const [formData, setFormData] = useState({
        display_name: profile?.display_name || "",
        username: profile?.username || "",
        bio: profile?.bio || "",
        category: profile?.category || "",
        gender: profile?.gender || "",
        country: profile?.country || "",
        age_group: profile?.age_group || "",
    });

    const handleInputChange = (field: string) => (e: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file); // Store the file to send to backend
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Build a clean object of only changed or valid fields
  const payload: any = {
    full_name: formData.display_name.trim(),
    bio: formData.bio.trim(),
    // Only send username if it's not empty
    ...(formData.username && { username: formData.username.trim() }),
  };

  // 2. DEBUG: Log exactly what we are sending
  console.log("SENDING TO BACKEND:", payload);

  await toast.promise(
    updateProfile(payload), // Try sending as a plain object first
    {
      loading: "Saving...",
      success: (res) => {
        close();
        return "Profile updated! ✅";
      },
      error: (err: any) => {
        // 💡 This will print the EXACT validation error in your console
        console.error("VALIDATION ERROR:", err.response?.data?.detail);
        return `Error: ${err.response?.data?.detail?.[0]?.msg || "Check console"}`;
      },
    }
  );
};

    /* ===================== Options (Static) ===================== */
    const nicheOptions = ["Technology", "Fashion", "Food & Cooking", "Travel", "Fitness", "Gaming", "Beauty"];
    const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];
    const countryOptions = ["Nigeria", "United States", "United Kingdom", "Canada", "Germany"];
    const ageOptions = ["13-17", "18-24", "25-34", "35-44", "45-54"];

    return (
        <div className="md:min-w-[500px] mx-auto max-h-[85vh] overflow-y-auto px-2">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-center py-6  mb-6">
                <h2 className="text-xl font-semibold text-dark-navy">Edit Profile</h2>
                
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col items-center gap-4 mb-8">
                <div className="relative">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                    />
                    <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-dark-navy p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition">
                        <FaPen className="text-white w-3 h-3" />
                        <input id="profile-pic" type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>
                <button 
                    type="button" 
                    onClick={() => document.getElementById("profile-pic")?.click()}
                    className="text-sm font-medium text-dark-navy underline"
                >
                    Change Profile Photo
                </button>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
                <CustomInput
                    label="Full Name"
                    value={formData.display_name}
                    onChange={handleInputChange("display_name")}
                />
                <CustomInput
                    label="Username"
                    value={formData.username}
                    onChange={handleInputChange("username")}
                />
                <CustomInput
                    label="Bio"
                    value={formData.bio}
                    onChange={handleInputChange("bio")}
                />
                <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                        label="Niche"
                        type="select"
                        options={nicheOptions}
                        value={formData.category}
                        onChange={handleInputChange("category")}
                    />
                    <CustomInput
                        label="Gender"
                        type="select"
                        options={genderOptions}
                        value={formData.gender}
                        onChange={handleInputChange("gender")}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                        label="Country"
                        type="select"
                        options={countryOptions}
                        value={formData.country}
                        onChange={handleInputChange("country")}
                    />
                    <CustomInput
                        label="Age Group"
                        type="select"
                        options={ageOptions}
                        value={formData.age_group}
                        onChange={handleInputChange("age_group")}
                    />
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={isPending}
                className="w-full bg-dark-navy text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all mt-8 mb-4 shadow-md disabled:bg-gray-300"
            >
                {isPending ? <Loader /> : "Save Changes"}
            </button>
        </div>
    );
};

export default UpdateProfile;