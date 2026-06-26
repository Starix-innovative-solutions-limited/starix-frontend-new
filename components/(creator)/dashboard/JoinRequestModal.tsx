"use client";

import React from "react";
import Image from "next/image";
import { useRequestToJoin } from "@/hooks/useCircles"; // Ensure this is imported

interface JoinRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleLogo?: string;
  circleId: string;  
  circleName: string;

}

const JoinRequestModal = ({ isOpen, onClose, circleId, circleName, circleLogo }: JoinRequestModalProps) => {
  const { mutate: sendRequest, isPending } = useRequestToJoin();

  if (!isOpen) return null;

  const handleSend = () => {
  sendRequest(circleId, {
    onSuccess: (data) => {
      // API returns the request details on success
      alert(`Successfully requested to join ${data.circle_name}!`);
      onClose();
    },
    onError: (error: any) => {
      // The API returns a 'detail' field for error messages
      const status = error.response?.status;
      let message = error.response?.data?.detail || "Failed to send request.";

      if (status === 409) {
        message = "You already have a pending request or are already a member of this circle.";
      } else if (status === 400) {
        message = "This circle is private or inactive and does not accept join requests.";
      }

      alert(message);
    }
  });
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[580px] rounded-[60px] p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8">
        
        <div className="w-[180px] h-[180px] bg-white rounded-[40px] shadow-xs border border-gray-50 flex items-center justify-center shrink-0 overflow-hidden p-6">
          <div className="relative w-full h-full">
            <Image 
              src={circleLogo || "/default-circle.svg"} 
              fill 
              alt={circleName} 
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex-1 max-w-[240px] text-center md:text-left">
          <h2 className="text-[20px] md:text-[24px] font-semibold text-[#1E1F24] mb-2 leading-tight">
            Join {circleName}
          </h2>
          <p className="text-[#62636C] text-[14px] mb-4 leading-relaxed">
            Your request will be sent to the {circleName} admin for approval.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <button
              onClick={onClose}
              disabled={isPending}
              className="px-8 py-3.5 border border-[#E5E7EB] rounded-full text-[15px] font-bold text-[#1E1F24] hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isPending}
              className=" py-3.5 bg-[#0033FF] text-white rounded-full text-[14px] font-semibold hover:bg-blue-700 transition-all shadow-lg min-w-[140px] whitespace-nowrap"
            >
              {isPending ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestModal;