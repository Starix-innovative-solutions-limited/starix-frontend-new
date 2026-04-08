/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter, FaCheck } from "react-icons/fa6"; 
import SubmitSuccessModal from "./SubmitSuccessModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitEntryModal = ({ isOpen, onClose }: ModalProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  
  const [links, setLinks] = useState({ instagram: "", x: "", youtube: "", tiktok: "" });
  const [errors, setErrors] = useState({ instagram: false, x: false, youtube: false, tiktok: false });

  if (!isOpen) return null;

  // --- LOGIC TO SWITCH MODALS ---
  if (showSuccess) {
    return (
      <SubmitSuccessModal 
        isOpen={true} 
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }} 
        onFindMore={() => {
          setShowSuccess(false);
          onClose();
        }} 
      />
    );
  }

  const requirements = [
    "This is an example of a mandatory reuquirement",
    "This is an example of a mandatory reuquirement",
    "This is an example of a mandatory reuquirement",
    "This is an example of a mandatory reuquirement",
  ];

  const patterns: any = {
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(_|.)]+/,
    x: /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/[a-zA-Z0-9_]+/,
    youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
    tiktok: /^(https?:\/\/)?(www\.)?tiktok\.com\/@?[a-zA-Z0-9_.]+/
  };

  const handleInputChange = (platform: string, value: string) => {
    setLinks(prev => ({ ...prev, [platform]: value }));
    if (value === "") {
      setErrors(prev => ({ ...prev, [platform]: false }));
    } else {
      const isValid = patterns[platform].test(value);
      setErrors(prev => ({ ...prev, [platform]: !isValid }));
    }
  };

  const handleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const hasErrors = Object.values(errors).some(error => error === true);
  const hasAtLeastOneLink = Object.values(links).some(link => link.trim().length > 0);
  const allRequirementsChecked = checkedItems.every(Boolean);
  const canSubmit = allRequirementsChecked && !hasErrors && hasAtLeastOneLink && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowSuccess(true); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[540px] rounded-[32px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <IoClose size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-[24px] font-semibold text-[#1E1F24]">Submit Your Entry</h2>
          <p className="text-[#62636C] text-[14px] mt-2 leading-relaxed">
            Confirm your submission meets the challenge requirements then paste the link to submit below.
          </p>

          <div className="mt-8 bg-[#F9FAFB] border border-[#F3F4F6] rounded-[24px] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F3F4F6]">
              <span className="text-[16px] font-semibold text-[#62636C]">Confirm Mandatory Requirements met</span>
            </div>
            <div className="bg-white">
              {requirements.map((req, idx) => (
                <label key={idx} className="flex items-center gap-4 px-6 py-4 border-b border-[#F9FAFB] cursor-pointer hover:bg-gray-50 transition-colors group">
                  <input type="checkbox" className="hidden" checked={checkedItems[idx]} onChange={() => handleCheck(idx)} />
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all 
                      ${checkedItems[idx] ? "border-[#0047FF] bg-[#0047FF]" : "border-gray-300 bg-white"}`}>
                    {checkedItems[idx] && <FaCheck className="text-white w-3 h-3" />}
                  </div>
                  <span className="text-[14px] text-[#62636C] font-normal">{req}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[16px] font-semibold text-[#62636C]">
                <FaInstagram className="text-[#62636C]" /> Instagram post
              </label>
              <input type="text" value={links.instagram} onChange={(e) => handleInputChange("instagram", e.target.value)} placeholder="Enter the Instagram link" className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-[14px] outline-none transition-all ${errors.instagram ? "border-red-500 ring-1 ring-red-100" : "border-[#E5E7EB] focus:ring-2 focus:ring-blue-100"}`} />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[16px] font-semibold text-[#62636C]">
                <FaXTwitter className="text-[#62636C]" /> (Twitter) post
              </label>
              <input type="text" value={links.x} onChange={(e) => handleInputChange("x", e.target.value)} placeholder="Enter the X link" className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-[14px] outline-none transition-all ${errors.x ? "border-red-500 ring-1 ring-red-100" : "border-[#E5E7EB] focus:ring-2 focus:ring-blue-100"}`} />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[16px] font-semibold text-[#62636C]">
                <FaYoutube className="text-[#62636C]" /> YouTube post
              </label>
              <input type="text" value={links.youtube} onChange={(e) => handleInputChange("youtube", e.target.value)} placeholder="Enter the YouTube link" className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-[14px] outline-none transition-all ${errors.youtube ? "border-red-500 ring-1 ring-red-100" : "border-[#E5E7EB] focus:ring-2 focus:ring-blue-100"}`} />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[16px] font-semibold text-[#62636C]">
                <FaTiktok className="text-[#62636C]" /> Tiktok post
              </label>
              <input type="text" value={links.tiktok} onChange={(e) => handleInputChange("tiktok", e.target.value)} placeholder="Enter the Tiktok link" className={`w-full bg-white border rounded-2xl py-3.5 px-4 text-[14px] outline-none transition-all ${errors.tiktok ? "border-red-500 ring-1 ring-red-100" : "border-[#E5E7EB] focus:ring-2 focus:ring-blue-100"}`} />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full mt-8 py-4 rounded-full text-white font-semibold text-[15px] transition-all shadow-lg
              ${canSubmit ? "bg-[#0047FF] hover:bg-blue-700 active:scale-[0.98]" : "bg-[#8CA8FF] cursor-not-allowed"}`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitEntryModal;