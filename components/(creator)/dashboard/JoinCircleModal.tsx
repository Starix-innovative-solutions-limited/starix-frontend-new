"use client";

import React, { useState } from "react";
import { FiX, FiArrowLeft } from "react-icons/fi";
import { useJoinCircle } from "@/hooks/useCircles";

interface JoinCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleLogo?: string;
  circleId: string;  
  circleName: string;
}

const JoinCircleModal = ({ isOpen, onClose }: JoinCircleModalProps) => {
  const [code, setCode] = useState("");
  const joinMutation = useJoinCircle();

  if (!isOpen) return null;

  const handleJoin = () => {
    joinMutation.mutate(code, {
      onSuccess: () => {
        onClose();
        setCode("");
        // Add success handling/navigation here
      },
      onError: (err: any) => {
        alert(err?.response?.data?.detail || "Failed to join circle.");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[540px] rounded-[32px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        {/* Navigation / Close */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiArrowLeft size={24} className="text-[#62636C]" />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiX size={24} className="text-[#62636C]" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-10">
          <h2 className="text-[24px] font-semibold text-[#1E1F24] mb-3">Join a Circle</h2>
          <p className="text-[#62636C] text-[14px] leading-relaxed">
            Enter a circle code to request access and start collaborating.
          </p>
        </div>

        {/* Input Field */}
        <div className="space-y-3 mb-10">
          <label className="block text-[16px] font-semibold text-[#62636C]">
            Circle Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter circle code"
            className="w-full bg-white border border-[#E0E1E6] rounded-[16px] py-4 px-6 text-[16px] outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0047FF] transition-all placeholder:text-[#62636C]"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleJoin}
          disabled={code.length < 6 || joinMutation.isPending}
          className={`w-full py-5 rounded-full font-bold text-[16px] transition-all
            ${code.length === 6 && !joinMutation.isPending
              ? "bg-[#0047FF] text-white hover:bg-blue-700 shadow-lg shadow-blue-100" 
              : "bg-[#93B1FF] text-white cursor-not-allowed opacity-80"}
          `}
        >
          {joinMutation.isPending ? "Joining..." : "Join Circle"}
        </button>
      </div>
    </div>
  );
};

export default JoinCircleModal;