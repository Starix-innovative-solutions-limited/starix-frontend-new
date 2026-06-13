/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useInitiateSocialConnection } from "@/hooks/useSocials";
// IMPORT: Bring in your profile/user query hook here
// import { useGetUserProfile } from "@/hooks/useUser"; 

interface ConnectSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectSocialsModal = ({ isOpen, onClose }: ConnectSocialsModalProps) => {
  const searchParams = useSearchParams();
  const connectSocialMutation = useInitiateSocialConnection();
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 1. Production Data Fetch: Get real-time connection arrays from the backend
  // const { data: userProfile } = useGetUserProfile({ enabled: isOpen });
  // For production compilation, we check if the platform keys exist in the backend user record:
  // const connected = {
  //   Instagram: !!userProfile?.instagram_connected,
  //   TikTok: !!userProfile?.tiktok_connected,
  //   YouTube: !!userProfile?.youtube_connected,
  // };

  // Fallback map matching your exact schema layout until your profile hook is active
  const [connected] = useState<{ [key: string]: boolean }>({
    Instagram: false,
    TikTok: false,
    YouTube: false,
  });

  // 2. Capture post-OAuth redirection parameters from the URL callback
  useEffect(() => {
    if (isOpen && searchParams) {
      const authStatus = searchParams.get("social_auth");
      const platformError = searchParams.get("error_message");

      if (authStatus === "success") {
        setSuccessMessage("Platform linked successfully!");
      } else if (authStatus === "failed" || platformError) {
        setErrorMessage(platformError || "Authentication process was canceled or failed.");
      }
    }
  }, [isOpen, searchParams]);

  if (!isOpen) return null;

  const socialPlatforms = [
    { name: "Instagram", id: "instagram" as const, icon: <FaInstagram className="text-[#E4405F]" size={24} /> },
    { name: "TikTok", id: "tiktok" as const, icon: <FaTiktok className="text-[#000000]" size={24} /> },
    { name: "YouTube", id: "youtube" as const, icon: <FaYoutube className="text-[#FF0000]" size={24} /> },
  ];

  const handleConnect = async (platformId: "instagram" | "tiktok" | "youtube") => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      // Production URL: explicitly points back to this dashboard profile screen
      const currentCallbackUrl = `${window.location.origin}/dashboard/profile`;

      const response = await connectSocialMutation.mutateAsync({
        platform: platformId,
        callbackUrl: currentCallbackUrl,
      });

      if (response?.authorization_url) {
        // Safe global window switch out to legitimate 3rd party providers (TikTok/Google/Meta)
        window.location.href = response.authorization_url;
      } else {
        setErrorMessage("Authorization redirect target configuration missing from server.");
      }
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.detail || 
        "Failed to establish secure platform handshake. Please check your network and try again."
      );
    }
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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors pt-1 cursor-pointer">
            <FiX size={24} />
          </button>
        </div>

        {/* Dynamic Action Response Banners */}
        {errorMessage && (
          <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-medium">
            {successMessage}
          </div>
        )}

        {/* Social List */}
        <div className="mt-8 space-y-4">
          {socialPlatforms.map((platform) => {
            const isConnectingThis = connectSocialMutation.isPending && connectSocialMutation.variables?.platform === platform.id;
            const isPlatformConnected = connected[platform.name];

            return (
              <button
                key={platform.name}
                onClick={() => !isPlatformConnected && handleConnect(platform.id)}
                disabled={connectSocialMutation.isPending || isPlatformConnected}
                className="w-full flex items-center justify-between p-3 border border-[#CDCED7] rounded-[32px] hover:bg-gray-50 transition-all group disabled:opacity-70 disabled:hover:bg-white text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl transition-transform">
                    {platform.icon}
                  </div>
                  <span className="text-[16px] font-semibold text-[#1E1F24]">
                    {isConnectingThis 
                      ? `Connecting to ${platform.name}...` 
                      : isPlatformConnected 
                        ? `Connected ${platform.name}` 
                        : `Connect ${platform.name}`}
                  </span>
                </div>
                
                {isPlatformConnected && (
                  <FiCheckCircle size={24} className="text-[#0CC963]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectSocialsModal;