"use client";

import React, { useState } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

interface ConnectSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectSocialsModal = ({ isOpen, onClose }: ConnectSocialsModalProps) => {
  // Mock state to track which socials are connected
  const [connected, setConnected] = useState<{ [key: string]: boolean }>({
    Instagram: false,
    TikTok: false,
    YouTube: false,
  });

  if (!isOpen) return null;

  const socialPlatforms = [
    { name: "Instagram", icon: <FaInstagram className="text-[#E4405F]" size={24} /> },
    { name: "TikTok", icon: <FaTiktok className="text-[#000000]" size={24} /> },
    { name: "YouTube", icon: <FaYoutube className="text-[#FF0000]" size={24} /> },
  ];

  const handleConnect = (name: string) => {
    setConnected((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[540px] rounded-[32px] overflow-hidden relative shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-[24px] font-semibold text-[#1E1F24]">Connect Your Socials</h2>
            <p className="text-[#62636C] text-[14px] mt-2 max-w-[400px]">
              Connect your circle's social media accounts to get a circle score and verify your credibility
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors pt-1">
            <FiX size={24} />
          </button>
        </div>

        {/* Social List */}
        <div className="mt-8 space-y-4">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleConnect(platform.name)}
              className="w-full flex items-center justify-between p-3 border border-[#CDCED7] rounded-[32px] hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl  transition-transform">
                  {platform.icon}
                </div>
                <span className="text-[16px] font-semibold text-[#1E1F24]">
                  {connected[platform.name] ? `Connected ${platform.name}` : `Connect ${platform.name}`}
                </span>
              </div>
              
              {connected[platform.name] && (
                <FiCheckCircle size={24} className="text-[#0CC963]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectSocialsModal;