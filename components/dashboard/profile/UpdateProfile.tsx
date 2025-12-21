/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react";
import { FaCamera } from "react-icons/fa";
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
            {/* Profile Image */}
            <div className="flex flex-col items-center my-8">
                <div className="relative flex items-end justify-between">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div>
                        <label
                            htmlFor="profile-image"
                            className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <FaCamera className="w-4 h-4 text-gray-600" />
                        </label>
                        <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        document.getElementById("profile-image")?.click()
                    }
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
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
