"use client";

import { useState } from "react";
import { FiX, FiCamera, FiChevronDown } from "react-icons/fi";
import { useModal } from "@/hooks/useModal";

const industries = ["Fashion", "Tech", "Finance", "Health", "Education"];

export default function EditProfileModal() {
  const [industry, setIndustry] = useState("");
  const [showIndustry, setShowIndustry] = useState(false);

  return (
    <div className=" bg-gray-50 w-full mx-auto flex items-center justify-center md:min-w-lg">
            
      
      <div className="w-full p-3 md:p-6">
      {/* TITLE */}
      <h2 className="text-center text-xl md:text-2xl text-dark-navy mb-8">
        Edit Profile
      </h2>

      {/* AVATAR */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
            className="w-24 h-24 rounded-full object-cover"
          />

          <button className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
            <FiCamera className="w-4 h-4" />
          </button>
        </div>

        <button className="text-sm text-dark-navy underline">
          Change Image
        </button>
      </div>

      {/* FORM */}
      <div className="space-y-5">
        <Input label="Brand Name" placeholder="Brand Name" />
        <Input label="Bio" placeholder="Bio" />
        <Input label="Email" placeholder="Email" />
        <Input label="Phone No:" placeholder="Phone No:" />
        <Input label="Website or URL" placeholder="example.com" />

        {/* INDUSTRY DROPDOWN */}
        <div>
          <label className="text-sm text-dark-navy mb-2 block">
            Industry
          </label>

          <button
            onClick={() => setShowIndustry(!showIndustry)}
            className="w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 text-gray-500"
          >
            {industry || "Select Option"}
            <FiChevronDown />
          </button>

          {showIndustry && (
            <div className="border mt-2 rounded-xl shadow bg-white">
              {industries.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setIndustry(item);
                    setShowIndustry(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button className="mt-8 w-full bg-dark-navy text-white py-4 rounded-full text-lg">
        Save
      </button>
      </div>
    </div>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-sm text-dark-navy mb-2 block">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-dark-navy/20"
      />
    </div>
  );
}
