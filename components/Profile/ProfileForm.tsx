"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import Image from "next/image";
import { TfiCheckBox } from "react-icons/tfi";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    companyAddress: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [selectedIndustries, setSelectedIndustries] = useState([
    "Branding & Design",
    "Gaming & eSports",
  ]);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

  const allIndustries = [
    "Branding & Design",
    "Gaming & eSports",
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Entertainment",
  ];

  const removeIndustry = (industry: string) => {
    setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
  };

  const addIndustry = (industry: string) => {
    if (!selectedIndustries.includes(industry)) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
    setShowIndustryDropdown(false);
  };

  return (
    <div className="lg:px-6">
      <div className="mx-auto bg-white rounded-lg space-y-9">
        {/* Profile Picture Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Image
              src={"/images/avatar.png"}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
              Upload Now
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium">
              Remove profile picture
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <CustomInput
              label="Enter your company's name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              type="text"
              className="w-full"
            />

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <span className="flex items-center text-green-700 text-sm">
                  <TfiCheckBox className="w-4 h-4 mr-1" />
                  Verified
                </span>
              </div>
              <CustomInput
                placeholder="Enter your company's mail"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                type="email"
                disabled
              />
            </div>
          </div>

          {/* Company Name and Address Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <CustomInput
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Enter your company's name"
            />

            <CustomInput
              label="Company Address"
              value={formData.companyAddress}
              onChange={(e) => handleChange("companyAddress", e.target.value)}
              placeholder="Enter your company's address"
            />
          </div>

          {/* Field / Industry */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field / Industry
            </label>
            <div className="relative">
              <div className="w-full px-4 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 flex flex-wrap gap-2 items-center">
                {selectedIndustries.map((industry) => (
                  <span
                    key={industry}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                  >
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-600"
                      onClick={() => removeIndustry(industry)}
                    />
                    {industry}
                  </span>
                ))}
                <button
                  onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                  className="ml-auto grow text-gray-400 hover:text-gray-600 flex justify-end"
                >
                  <span className="">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              {showIndustryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {allIndustries
                    .filter((ind) => !selectedIndustries.includes(ind))
                    .map((industry) => (
                      <div
                        key={industry}
                        onClick={() => addIndustry(industry)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                      >
                        {industry}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Brand Logo */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Brand logo
              </label>
              <span className="flex items-center text-green-700 text-sm">
                <TfiCheckBox className="w-4 h-4 mr-1" />
                Verified
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded flex items-center justify-center">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <path d="M24 8L8 16L24 24L40 16L24 8Z" fill="#FF6B6B" />
                  <path
                    d="M8 24L24 32L40 24"
                    stroke="#4ECDC4"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 32L24 40L40 32"
                    stroke="#FFE66D"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <button className="flex-1 px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Upload logo
              </button>
            </div>
          </div>

          {/* Brand Verification */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Brand verification
              </label>
              <span className="flex items-center text-green-700 text-sm">
                <TfiCheckBox className="w-4 h-4 mr-1" />
                Verified
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="6"
                    fontWeight="bold"
                    fill="#666"
                  >
                    PDF
                  </text>
                </svg>
              </div>
              <button className="flex-1 px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Upload means of verification
              </button>
            </div>
          </div>

          {/* Update Button */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg">
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
}
