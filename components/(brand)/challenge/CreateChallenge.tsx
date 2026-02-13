"use client";

import { useState } from "react";
import { FiCamera, FiChevronDown } from "react-icons/fi";
import { useModal } from "@/hooks/useModal";

const industries = ["Fashion", "Tech", "Finance", "Health", "Education"];

export default function EditProfileModal() {
  const { close } = useModal();

  const [industry, setIndustry] = useState("");
  const [showIndustry, setShowIndustry] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4 py-10 overflow-y-auto">

      <div className="
        w-full 
        max-w-2xl 
        bg-white 
        rounded-3xl 
        p-6 md:p-10 
        relative 
        max-h-[90vh] 
        overflow-y-auto
        ">


        {/* TITLE */}
        <h2 className="text-center text-2xl text-dark-navy mb-8">
        Edit Profile
        </h2>

        <div className="flex items-center justify-between mb-8">
  
            {/* LEFT: Avatar */}
            <div className="relative">
                <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                className="w-20 h-20 rounded-full object-cover"
                />

                <button className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow">
                <FiCamera className="w-4 h-4" />
                </button>
            </div>

            {/* RIGHT: Change Image */}
            <button className="text-sm text-dark-navy underline">
                Change Image
            </button>

            </div>


        {/* FORM */}
        <div className="space-y-4">
          <Input label="Brand Name" placeholder="Brand Name" />
          <Input label="Bio" placeholder="Bio" />
          <Input label="Email" placeholder="Email" />
          <Input label="Phone No" placeholder="Phone No" />
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

        {/* BUTTONS — MATCH CREATE CHALLENGE */}
        <div className="space-y-3 mt-6">
          <button
            onClick={close}
            className="w-full border border-dark-navy text-dark-navy py-4 rounded-full text-base font-medium hover:bg-dark-navy hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            className="w-full bg-dark-navy text-white py-4 rounded-full text-base font-medium hover:bg-dark-navy transition-colors"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

/* INPUT */
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
