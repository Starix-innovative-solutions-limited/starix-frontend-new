"use client";

import React from "react";
import MyRequestsSection from "./MyRequestsSection";

interface RequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestsModal({ isOpen, onClose }: RequestsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[400px] rounded-[32px] p-2 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-end p-2">
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Your content is injected here */}
        <div className="px-2 pb-6">
          <MyRequestsSection />
        </div>
      </div>
    </div>
  );
}