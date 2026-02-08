/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import CustomInput from "@/components/CustomInput";
import { useUpdateCreatorProfile } from "@/hooks/useProfile";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useAuthStore } from "@/store/useAuthStore";

/* =====================
   Types
===================== */

type FormData = {
    name: string;
    username: string;
    bio: string;
    niche: string;
    gender: string;
    country: string;
    ageGroup: string;
};

/* =====================
   Component
===================== */

const UpdateProfile: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string>(
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    );

    const { profile } = useAuthStore()

    const initialForm = {
        name: '',
        username: profile?.display_name,
        bio: profile?.bio,
        niche: profile?.content_categories,
        gender: profile?.gender,
        country: profile?.country_code,
        ageGroup: '',
    }

    const [formData, setFormData] = useState<FormData | any>(initialForm);

    const { mutateAsync: updateProfile, isPending } = useUpdateCreatorProfile()

    /* =====================
       Handlers
    ===================== */

    const handleInputChange =
        (field: keyof FormData) =>
            (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                setFormData((prev: any) => ({
                    ...prev,
                    [field]: e.target.value,
                }));
            };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Profile data:", formData);
        await toast.promise(
            updateProfile(
                formData
            ),
            {
                loading: "Signing in...",
                success: () => {
                    setFormData(initialForm); //
                    return "profile updated successfully ✅";
                },
                error: (err: any) => {
                    console.log("SignIn Error:", err); // ✅ log the full error object

                    return `Update failed: ${err.response.data.detail}`;
                },
            }
        );
        // alert("Profile updated successfully!");
    };

    /* =====================
       Options
    ===================== */

    const nicheOptions: string[] = [
        "Select Option",
        "Technology",
        "Fashion",
        "Food & Cooking",
        "Travel",
        "Fitness",
        "Gaming",
        "Beauty",
        "Business",
        "Photography",
        "Music",
    ];

    const genderOptions: string[] = [
        "Select Option",
        "Male",
        "Female",
        "Non-binary",
        "Prefer not to say",
    ];

    const countryOptions: string[] = [
        "Select Option",
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
        "Germany",
        "France",
        "Nigeria",
        "India",
        "Japan",
        "Brazil",
    ];

    const ageGroupOptions: string[] = [
        "Select Option",
        "13-17",
        "18-24",
        "25-34",
        "35-44",
        "45-54",
        "55-64",
        "65+",
    ];

    /* =====================
       Render
    ===================== */

    return (
        <div className="md:min-w-lg mx-auto min-h-[90vh] max-h-[90vh] overflow-y-scroll ">
            <div className="relative flex items-center justify-center my-10">
            <h2 className="text-2xl font-medium text-dark-navy">
                Edit Profile
            </h2>

            <button
  className="
    absolute right-5
    w-10 h-10
    flex items-center justify-center
    rounded-full
    bg-gray-100
    hover:bg-gray-200
    transition
  "
>
  ✕
</button>

            </div>
            {/* Profile Image */}
            <div className="flex items-center justify-between my-8">
  {/* LEFT – IMAGE */}
  <div className="relative">
    <img
      src={profileImage}
      alt="Profile"
      className="
        w-24 h-24
        rounded-full
        object-cover
        border-4 border-white
        shadow-md
      "
    />

    <label
      htmlFor="profile-image"
      className="
        absolute bottom-1 right-1
        bg-white
        rounded-full
        p-2
        shadow-md
        cursor-pointer
        hover:bg-gray-50
        transition
      "
    >
      <FaPen className="w-3 h-3 text-gray-600" />
    </label>

    <input
      id="profile-image"
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
  </div>

  {/* RIGHT – BUTTON */}
  <button
    type="button"
    onClick={() =>
      document.getElementById("profile-image")?.click()
    }
    className="
      text-sm
      text-dark-navy
      hover:text-dark-navy/80
      font-medium
      underline
    "
  >
    Change Image
  </button>
</div>


            {/* Form */}
            <CustomInput
                label="Name"
                value={formData.name}
                onChange={handleInputChange("name")}
                placeholder="Name"
            />

            <CustomInput
                label="Username"
                value={formData.username}
                onChange={handleInputChange("username")}
                placeholder="Username"
            />

            <CustomInput
                label="Bio"
                value={formData.bio}
                onChange={handleInputChange("bio")}
                placeholder="Bio"
            />

            <CustomInput
                label="Niche"
                type="select"
                value={formData.niche}
                onChange={handleInputChange("niche")}
                options={nicheOptions}
            />

            <CustomInput
                label="Gender"
                type="select"
                value={formData.gender}
                onChange={handleInputChange("gender")}
                options={genderOptions}
            />

            <CustomInput
                label="Country"
                type="select"
                value={formData.country}
                onChange={handleInputChange("country")}
                options={countryOptions}
            />

            <CustomInput
                label="Age Groups"
                type="select"
                value={formData.ageGroup}
                onChange={handleInputChange("ageGroup")}
                options={ageGroupOptions}
            />

            {/* Save */}
            <button
                onClick={handleSave}
                disabled={isPending}
                className="w-full bg-dark-navy text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors mt-2"
            >
                {
                    isPending ? <Loader /> : "Save"
                }
            </button>
        </div>

    );
};

export default UpdateProfile;
