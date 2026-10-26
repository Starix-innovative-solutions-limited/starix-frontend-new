/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useMemo, useState, useEffect } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDisconnectSocialConnection,
  useInitiateSocialConnection,
} from "@/hooks/useSocials";
import { useGetCircleSocials } from "@/hooks/useCircles";
import {
  useGetCreatorProfile,
  type CreatorProfile,
} from "@/hooks/useProfile";
import {
  clearSocialOAuthCallback,
  readSocialOAuthCallback,
} from "@/lib/socialOAuth";
import toast from "react-hot-toast";

interface ConnectSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId?: string;
  username?: string;
}

type PlatformId = "instagram" | "tiktok" | "youtube";

function normalizePlatformId(value: string | null): PlatformId | null {
  if (!value) return null;
  const key = value.toLowerCase();
  if (key === "instagram" || key === "tiktok" || key === "youtube") return key;
  return null;
}

const ConnectSocialsModal = ({
  isOpen,
  onClose,
  circleId,
  username,
}: ConnectSocialsModalProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const connectSocialMutation = useInitiateSocialConnection();
  const disconnectSocialMutation = useDisconnectSocialConnection();
  const { data: creatorProfile } = useGetCreatorProfile(username ?? "", {
    enabled: !circleId && !!username,
  });
  const { data: circleSocials } = useGetCircleSocials(circleId ?? "");
  const handledCallback = React.useRef(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [justConnected, setJustConnected] = useState<Set<PlatformId>>(
    () => new Set()
  );
  const [disconnectPlatform, setDisconnectPlatform] =
    useState<PlatformId | null>(null);

  const connectedFromProfile = useMemo(() => {
    const set = new Set<PlatformId>();
    const source = circleId
      ? circleSocials ?? []
      : creatorProfile?.connected_platforms ?? [];
    for (const item of source) {
      const id = normalizePlatformId(item.platform);
      if (id) set.add(id);
    }
    return set;
  }, [circleId, circleSocials, creatorProfile?.connected_platforms]);

  const isConnected = (id: PlatformId) =>
    connectedFromProfile.has(id) || justConnected.has(id);

  useEffect(() => {
    const result = readSocialOAuthCallback();
    if (!result) return;

    if (!handledCallback.current) {
      handledCallback.current = true;

      if (result.kind === "success") {
        const platformId = normalizePlatformId(result.platform);
        if (platformId) {
          setJustConnected((prev) => new Set(prev).add(platformId));

          if (!circleId && username) {
            queryClient.setQueryData<CreatorProfile>(
              ["creatorProfile", username],
              (current) => {
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
                      username: result.platformUserId || platformId,
                    },
                  ],
                };
              }
            );
          }
        }
        queryClient.invalidateQueries({
          queryKey: circleId
            ? ["circle-socials", circleId]
            : ["creatorProfile", username],
        });
        if (!circleId) {
          queryClient.invalidateQueries({ queryKey: ["starix-score"] });
          queryClient.invalidateQueries({ queryKey: ["me"] });
        }
      } else {
        setErrorMessage(result.message);
        toast.error(result.message);
      }
    }

    if (isOpen) {
      clearSocialOAuthCallback(pathname);
      router.replace(pathname, { scroll: false });
    }
  }, [isOpen, searchParams, pathname, router, queryClient, circleId, username]);

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
        circleId,
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

  const handleDisconnect = async () => {
    if (!disconnectPlatform) return;
    setErrorMessage(null);

    try {
      await disconnectSocialMutation.mutateAsync({
        platform: disconnectPlatform,
        circleId,
      });

      setJustConnected((current) => {
        const next = new Set(current);
        next.delete(disconnectPlatform);
        return next;
      });

      if (!circleId && username) {
        queryClient.setQueryData<CreatorProfile>(
          ["creatorProfile", username],
          (current) =>
            current
              ? {
                  ...current,
                  connected_platforms: current.connected_platforms?.filter(
                    (item) =>
                      item.platform.toLowerCase() !== disconnectPlatform
                  ),
                }
              : current
        );
      }

      const platformName =
        socialPlatforms.find((item) => item.id === disconnectPlatform)?.name ??
        disconnectPlatform;
      toast.success(`${platformName} disconnected`);
      setDisconnectPlatform(null);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.detail ||
          "Could not disconnect this account. Please try again."
      );
    }
  };

  const disconnectPlatformName = socialPlatforms.find(
    (platform) => platform.id === disconnectPlatform
  )?.name;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[540px] rounded-[32px] overflow-hidden relative shadow-2xl p-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-[24px] font-semibold text-[#1E1F24]">
              {disconnectPlatform
                ? `Disconnect ${disconnectPlatformName}?`
                : "Connect Your Socials"}
            </h2>
            <p className="text-[#62636C] text-[14px] mt-2 max-w-[400px]">
              {disconnectPlatform
                ? "Your connected account and its synced insights will be removed from Starix."
                : "Connect your social media accounts to get a Starix score and verify your credibility"}
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

        {disconnectPlatform ? (
          <div className="mt-8">
            <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-4 text-[13px] leading-5 text-[#991B1B]">
              You can reconnect {disconnectPlatformName} later, but Starix may
              need time to sync your account again.
            </div>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setDisconnectPlatform(null)}
                disabled={disconnectSocialMutation.isPending}
                className="w-full rounded-full border border-[#CDCED7] px-5 py-3 text-[14px] font-semibold text-[#1E1F24] transition hover:bg-gray-50 disabled:opacity-60"
              >
                Keep Connected
              </button>
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={disconnectSocialMutation.isPending}
                className="w-full rounded-full bg-[#DC2626] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#B91C1C] disabled:opacity-60"
              >
                {disconnectSocialMutation.isPending
                  ? "Disconnecting..."
                  : "Yes, Disconnect"}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {socialPlatforms.map((platform) => {
              const isConnectingThis =
                connectSocialMutation.isPending &&
                connectSocialMutation.variables?.platform === platform.id;
              const isPlatformConnected = isConnected(platform.id);

              return (
                <button
                  key={platform.name}
                  type="button"
                  onClick={() =>
                    isPlatformConnected
                      ? setDisconnectPlatform(platform.id)
                      : handleConnect(platform.id)
                  }
                  disabled={
                    connectSocialMutation.isPending && !isPlatformConnected
                  }
                  className="flex w-full cursor-pointer items-center justify-between rounded-[32px] border border-[#CDCED7] p-3 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-4 text-left">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl">
                      {platform.icon}
                    </span>
                    <span className="text-[16px] font-semibold text-[#1E1F24]">
                      {isConnectingThis
                        ? `Connecting to ${platform.name}...`
                        : isPlatformConnected
                          ? `Connected ${platform.name}`
                          : `Connect ${platform.name}`}
                    </span>
                  </span>

                  {isPlatformConnected && (
                    <span className="rounded-full p-1 text-[#0CC963]">
                      <FiCheckCircle size={24} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ConnectSocialsModalWithSuspense(
  props: ConnectSocialsModalProps
) {
  return (
    <Suspense fallback={null}>
      <ConnectSocialsModal {...props} />
    </Suspense>
  );
}
