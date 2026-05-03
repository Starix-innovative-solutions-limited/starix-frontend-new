"use client";

import React from "react";
import Image from "next/image";

interface JoinRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleLogo?: string;
}

const JoinRequestModal = ({ isOpen, onClose, circleLogo }: JoinRequestModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-[580px] rounded-[60px] p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8 animate-in fade-in zoom-in duration-300">
        
        {/* Large Logo Icon Container */}
        <div className="w-[180px] h-[180px] bg-white rounded-[40px] shadow-xs border border-gray-50 flex items-center justify-center shrink-0 overflow-hidden p-6">
          <div className="relative w-full h-full">
            <Image 
              src={circleLogo || "/indomie-circle.svg"} 
              fill 
              alt="Circle Logo" 
              className="object-contain"
            />
          </div>
        </div>

        {/* Text and Actions */}
        <div className="flex-1 max-w-[240px] text-center md:text-left">
          <h2 className="text-[20px] md:text-[24px] font-semibold text-[#1E1F24] mb-2 leading-tight">
            Request to Join Circle
          </h2>
          <p className="text-[#62636C]  text-[14px] mb-4 leading-relaxed">
            Your request will be sent to the circle admin for approval.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <button
              onClick={onClose}
              className="px-8 py-3.5 border border-[#E5E7EB] rounded-full text-[15px] font-bold text-[#1E1F24] hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
                onClick={() => {
                    // Handle logic
                    onClose();
                }}
                className="py-3.5 bg-[#0033FF] text-white rounded-full text-[14px] font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 min-w-[140px] whitespace-nowrap"
                >
                Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestModal;