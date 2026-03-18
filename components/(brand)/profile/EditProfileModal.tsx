"use client";

import { useState } from "react";
import { FiX, FiCamera, FiChevronDown } from "react-icons/fi";
import { useModal } from "@/hooks/useModal";

const industries = ["Fashion", "Tech", "Finance", "Health", "Education"];

export default function EditProfileModal() {
  const { close } = useModal();
  const [industry, setIndustry] = useState("");
  const [showIndustry, setShowIndustry] = useState(false);

  return (
    <div className="w-full md:w-[640px] h-auto max-h-[95vh] rounded-[32px] flex flex-col overflow-hidden">
      
      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
        
        {/* HEADER AREA */}
        <div className="relative">
          <h2 className="text-center text-2xl font-semibold text-dark-navy">
            Edit Profile
          </h2>
          
        </div>

        {/* AVATAR SECTION */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                alt="Profile"
              />
            </div>
            <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
              <FiCamera className="w-4 h-4 text-dark-navy" />
            </button>
          </div>
          <button className="text-sm font-medium text-dark-navy underline underline-offset-4 hover:opacity-70 transition-opacity">
            Change Image
          </button>
        </div>

        {/* FORM FIELDS */}
        <div className="space-y-6">
          <Input label="Brand Name" placeholder="Enter brand name" />
          <Input label="Bio" placeholder="Tell us about your brand" isTextArea />
          <Input label="Email" placeholder="email@example.com" type="email" />
          <Input label="Phone No:" placeholder="+234 ..." />
          <Input label="Website or URL" placeholder="https://example.com" />

          {/* INDUSTRY DROPDOWN */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Industry
            </label>
            <button
              onClick={() => setShowIndustry(!showIndustry)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-2xl px-6 py-4 text-gray-800 bg-white hover:border-dark-navy transition-all"
            >
              <span className={!industry ? "text-gray-400" : ""}>
                {industry || "Select Option"}
              </span>
              <FiChevronDown className={`transition-transform duration-200 ${showIndustry ? 'rotate-180' : ''}`} />
            </button>

            {showIndustry && (
              <div className="absolute z-20 w-full border border-gray-100 mt-2 rounded-2xl shadow-xl bg-white overflow-hidden animate-in fade-in slide-in-from-top-2">
                {industries.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setIndustry(item);
                      setShowIndustry(false);
                    }}
                    className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-dark-navy transition-colors border-b border-gray-50 last:border-none"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-6">
          <button className="w-full bg-[#000033] text-white py-5 rounded-full text-lg font-semibold shadow-lg hover:opacity-95 transition-all">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Input({
  label,
  placeholder,
  type = "text",
  isTextArea = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  isTextArea?: boolean;
}) {
  const baseStyles = "w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-dark-navy/10 focus:border-dark-navy transition-all text-gray-800 placeholder:text-gray-400";
  
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          className={`${baseStyles} h-32 resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={baseStyles}
        />
      )}
    </div>
  );
}