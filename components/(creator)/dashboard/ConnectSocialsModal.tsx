/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useInitiateSocialConnection } from "@/hooks/useSocials";
import { useGetMe } from "@/hooks/useAuth";
import type { UserProfile } from "@/utils/type";
import toast from "react-hot-toast";

interface ConnectSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId?: string;
}

type PlatformId = "instagram" | "tiktok" | "youtube";

function normalizePlatformId(value: string | null): PlatformId | null {
  if (!value) return null;
  const key = value.toLowerCase();
  if (key === "instagram" || key === "tiktok" || key === "youtube") return key;
  return null;
}

function readOAuthResult() {
  if (typeof window === "undefined") return null;

  const hashParams = new URLSearchParams(
    window.location.hash.replace(/^#/, "")
  );
  const query = new URLSearchParams(window.location.search);

  const platform =
    hashParams.get("platform") || query.get("platform") || null;
  const status =
    hashParams.get("status") ||
    query.get("status") ||
    query.get("social_auth") ||
    null;
  const platformUserId =
    hashParams.get("platform_user_id") ||
    query.get("platform_user_id") ||
    null;
  const errorMessage =
    hashParams.get("error_message") ||
    query.get("error_message") ||
    query.get("error") ||
    null;

  if (!platform && !status && !errorMessage) return null;

  return { platform, status, platformUserId, errorMessage };
}

const ConnectSocialsModal = ({
  isOpen,
  onClose,
}: ConnectSocialsModalProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const connectSocialMutation = useInitiateSocialConnection();
  const { data: me } = useGetMe();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  /** Platforms confirmed via OAuth before /auth/me refreshes */
  const [justConnected, setJustConnected] = useState<Set<PlatformId>>(
    () => new Set()
  );

  const connectedFromProfile = useMemo(() => {
    const set = new Set<PlatformId>();
    for (const item of me?.connected_platforms ?? []) {
      const id = normalizePlatformId(item.platform);
      if (id) set.add(id);
    }
    return set;
  }, [me?.connected_platforms]);

  const isConnected = (id: PlatformId) =>
    connectedFromProfile.has(id) || justConnected.has(id);

  // Capture post-OAuth redirection parameters (query or hash)
  useEffect(() => {
    const result = readOAuthResult();
    if (!result) return;

    const { platform, status, platformUserId, errorMessage: oauthError } =
      result;
    const platformId = normalizePlatformId(platform);

    if (status === "connected" || status === "success") {
      if (platformId) {
        setJustConnected((prev) => new Set(prev).add(platformId));

        queryClient.setQueryData<UserProfile>(["me"], (current) => {
          if (!current) return current;
          const existing = current.connected_platforms ?? [];
          const already = existing.some(
            (p) => p.platform.toLowerCase() === platformId
          );
          if (already) return current;
          return {
            ...current,
            connected_platforms: [
              ...existing,
              {
                platform: platformId,
                username: platformUserId || platformId,
              },
            ],
          };
        });
      }
      queryClient.invalidateQueries({ queryKey: ["me"] });
    } else if (status === "failed" || oauthError) {
      const message =
        oauthError || "Authentication process was canceled or failed.";
      setErrorMessage(message);
      toast.error(message);
    }

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", pathname);
    }
    router.replace(pathname, { scroll: false });
  }, [isOpen, searchParams, pathname, router, queryClient]);

  if (!isOpen) return null;

  const socialPlatforms = [
    {
      name: "Instagram",
      id: "instagram" as const,
      icon: <FaInstagram className="text-[#E4405F]" size={24} />,
    },
    {
      name: "TikTok",
      id: "tiktok" as const,
      icon: <FaTiktok className="text-[#000000]" size={24} />,
    },
    {
      name: "YouTube",
      id: "youtube" as const,
      icon: <FaYoutube className="text-[#FF0000]" size={24} />,
    },
  ];

  const handleConnect = async (platformId: PlatformId) => {
    setErrorMessage(null);

    try {
      const currentCallbackUrl = `${window.location.origin}${pathname}`;

      const response = await connectSocialMutation.mutateAsync({
        platform: platformId,
        callbackUrl: currentCallbackUrl,
      });

      if (response?.authorization_url) {
        window.location.href = response.authorization_url;
      } else {
        setErrorMessage(
          "Authorization redirect target configuration missing from server."
        );
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
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-[24px] font-semibold text-[#1E1F24]">
              Connect Your Socials
            </h2>
            <p className="text-[#62636C] text-[14px] mt-2 max-w-[400px]">
              Connect your social media accounts to get a Starix score and
              verify your credibility
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors pt-1 cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            {errorMessage}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {socialPlatforms.map((platform) => {
            const isConnectingThis =
              connectSocialMutation.isPending &&
              connectSocialMutation.variables?.platform === platform.id;
            const isPlatformConnected = isConnected(platform.id);

            return (
              <button
                key={platform.name}
                onClick={() =>
                  !isPlatformConnected && handleConnect(platform.id)
                }
                disabled={
                  connectSocialMutation.isPending || isPlatformConnected
                }
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
