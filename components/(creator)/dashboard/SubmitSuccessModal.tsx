/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFindMore: () => void;
  message?: string;
}

const SubmitSuccessModal = ({
  isOpen,
  onClose,
  onFindMore,
  message = "Your entry has been successfully submitted.",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[500px] rounded-[32px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <IoClose size={24} />
        </button>

        <div className="p-12 flex flex-col items-center text-center">
          <div className="relative w-[180px] h-[180px] bg-[#F2F4F7] rounded-full flex items-center justify-center mb-10 mt-6">
            <Image
              src="/dash-logo.svg"
              alt="Starix"
              width={72}
              height={72}
              className="opacity-80"
            />
          </div>

          <h2 className="text-[28px] md:text-[32px] font-bold text-[#101828] leading-tight mb-3">
            Submission Successful
          </h2>
          <p className="text-[#667085] text-[15px] md:text-[16px] font-normal leading-relaxed mb-12 max-w-[340px]">
            {message}
          </p>

          {/* Action Button */}
          <button 
            onClick={onFindMore}
            className="w-full max-w-[240px] py-4 bg-[#0047FF] hover:bg-blue-700 active:scale-[0.98] text-white rounded-full font-semibold text-[16px] transition-all shadow-lg"
          >
            Find more like this
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitSuccessModal;