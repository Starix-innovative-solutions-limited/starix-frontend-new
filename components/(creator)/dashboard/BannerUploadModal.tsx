"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiX, FiRefreshCw, FiTrash2, FiUploadCloud } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (url: string) => void; // Added prop to send data back
}

const BannerUploadModal = ({ isOpen, onClose, onUploadSuccess }: ModalProps) => {
  const [step, setStep] = useState<"initial" | "uploading" | "error" | "preview">("initial");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep("initial");
      setProgress(0);
      setPreviewUrl(null);
    }
  }, [isOpen]);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(1) + "MB");

    if (file.size > 3 * 1024 * 1024) {
      setStep("error");
      return;
    }

    startSimulation(file);
  };

  const startSimulation = (file: File) => {
    setStep("uploading");
    setProgress(0);
    
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 12) + 5; 
      if (p >= 100) {
        setProgress(100);
        clearInterval(interval);
        setPreviewUrl(URL.createObjectURL(file));
        setStep("preview");
      } else {
        setProgress(p);
      }
    }, 120);
  };

  // NEW: Function to handle the final "Save Image" action
  const handleSave = () => {
    if (previewUrl && onUploadSuccess) {
      onUploadSuccess(previewUrl); // Send the URL to the profile page
      onClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[540px] rounded-[32px] overflow-hidden relative shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-0">
          <h2 className="text-[22px] font-bold text-[#1E1F24]">Upload Banner Image</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelection} 
            className="hidden" 
            accept="image/*"
          />

          <div className="border-2 border-dashed border-gray-100 rounded-[24px] min-h-[240px] flex flex-col items-center justify-center relative overflow-hidden bg-[#FAFBFC]"> 
            {step === "initial" && (
              <div className="text-center cursor-pointer w-full h-full py-10" onClick={() => fileInputRef.current?.click()}>
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiUploadCloud size={32} className="text-[#9CA3AF]" />
                </div>
                <p className="text-[15px] font-medium text-gray-700">
                  <span className="text-[#0033FF]">Click to Upload</span> or Drag and Drop
                </p>
                <p className="text-[12px] text-gray-400 mt-1">PNG or IMG (Max Size: 3MB)</p>
              </div>
            )}

            {step === "uploading" && (
              <div className="text-center w-full px-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" 
                      strokeDasharray={226} strokeDashoffset={226 - (226 * progress) / 100} 
                      className="text-[#0033FF] transition-all duration-300 stroke-round" 
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[16px] font-bold text-[#1E1F24]">
                    {progress}%
                  </span>
                </div>
                <p className="text-[14px] font-bold text-[#1E1F24] truncate px-4">{fileName}</p>
                <p className="text-[12px] text-gray-400 mt-1">Uploading • {fileSize}</p>
              </div>
            )}

            {step === "error" && (
              <div className="text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiUploadCloud size={32} className="text-[#9CA3AF]" />
                </div>
                <p className="text-[15px] font-medium text-gray-700">
                  <span className="text-[#0033FF]">Click to Upload</span> or Drag and Drop
                </p>
                <p className="text-[12px] text-red-500 font-medium mt-1">Couldn't upload image. Try again</p>
              </div>
            )}

            {/* FIXED PREVIEW STATE - Matching Modal (11) */}
            {step === "preview" && previewUrl && (
              <div className="relative w-full h-[240px]">
                <Image 
                  src={previewUrl} 
                  fill 
                  className="object-cover rounded-[20px]" 
                  alt="Preview" 
                />
                {/* Control Buttons (Floating right) */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    title="Replace image"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#1E1F24] hover:bg-gray-50 transition-all active:scale-95"
                  >
                    <FiRefreshCw size={18} />
                  </button>
                  <button 
                    onClick={() => setStep("initial")} 
                    title="Delete image"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-red-500 hover:bg-gray-50 transition-all active:scale-95"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Button - Final Save logic */}
          <button 
            disabled={step !== "preview"}
            onClick={handleSave}
            className={`w-full mt-8 py-5 rounded-[32px] font-semibold text-[16px] transition-all
                ${
                step === "preview" 
                    ? "bg-[#0033FF] text-white  cursor-pointer" // Active (Modal 11)
                    : "bg-[#91A7FF] text-white cursor-not-allowed opacity-100"    // Inactive (Modal 9, 10)
                }
            `}
            >
            Save Image
            </button>
        </div>
      </div>
    </div>
  );
};

export default BannerUploadModal;