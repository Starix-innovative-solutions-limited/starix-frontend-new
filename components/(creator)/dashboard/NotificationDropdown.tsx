"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiBell, FiX } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAcceptInvitation,
  useDeclineInvitation,
  useGetMyInvitations,
  type MyInvitation,
} from "@/hooks/useCircles";
import { isRemoteMediaUrl } from "@/lib/mediaUrl";

function inviteToken(invite: MyInvitation) {
  return (
    invite.token ||
    invite.accept_token ||
    invite.signed_token ||
    invite.invitation_id
  );
}

function CircleThumb({
  src,
  name,
  size,
}: {
  src?: string | null;
  name: string;
  size: number;
}) {
  const photo = src?.trim() || "";

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl bg-[#F5F6F8]"
      style={{ width: size, height: size }}
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
          unoptimized={isRemoteMediaUrl(photo)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-[14px] font-semibold uppercase text-[#8B8D98]">
          {name.charAt(0) || "?"}
        </span>
      )}
    </div>
  );
}

const NotificationDropdown = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<MyInvitation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: invites = [], isLoading } = useGetMyInvitations();
  const acceptMutation = useAcceptInvitation();
  const declineMutation = useDeclineInvitation();
  const hasInvites = invites.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeModal = () => {
    setSelected(null);
    setErrorMsg(null);
  };

  const refreshInvites = () => {
    queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
    queryClient.invalidateQueries({ queryKey: ["circles"] });
  };

  const handleAccept = async () => {
    if (!selected) return;
    setErrorMsg(null);

    try {
      const result = await acceptMutation.mutateAsync(inviteToken(selected));
      refreshInvites();
      closeModal();
      setIsOpen(false);
      if (result?.circle_id) {
        router.push(`/creator-circles/${result.circle_id}/circle-profile`);
      }
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setErrorMsg(
        typeof detail === "string"
          ? detail
          : "This invite could not be accepted here. Open the invite from your email to join."
      );
    }
  };

  const handleDecline = async () => {
    if (!selected) return;
    setErrorMsg(null);

    try {
      await declineMutation.mutateAsync(inviteToken(selected));
      refreshInvites();
      closeModal();
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setErrorMsg(
        typeof detail === "string"
          ? detail
          : "Could not decline this invite. Try again, or use the email link."
      );
    }
  };

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="relative rounded-full bg-[#F9F9FB] p-3 transition-colors hover:bg-gray-50"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <FiBell size={22} className="text-[#1E1F24]" />
        {hasInvites && (
          <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#0033FF]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-[360px] overflow-hidden rounded-[24px] border border-[#EFF0F3] bg-white shadow-[0_12px_40px_rgba(4,1,54,0.08)]">
          <div className="border-b border-[#EFF0F3] px-5 py-4">
            <p className="text-[15px] font-semibold text-[#1E1F24]">
              Circle invitations
            </p>
            <p className="mt-0.5 text-[12px] text-[#8B8D98]">
              {hasInvites
                ? `${invites.length} pending`
                : "You’re all caught up"}
            </p>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {isLoading ? (
              <p className="px-5 py-8 text-center text-[13px] text-[#8B8D98]">
                Loading invitations...
              </p>
            ) : hasInvites ? (
              invites.map((invite) => (
                <button
                  key={invite.invitation_id}
                  type="button"
                  onClick={() => {
                    setSelected(invite);
                    setErrorMsg(null);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 border-b border-[#F5F6F8] px-5 py-4 text-left last:border-b-0 hover:bg-[#F9F9FB]"
                >
                  <CircleThumb
                    src={invite.circle_profile_picture_url}
                    name={invite.circle_name}
                    size={44}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-[#1E1F24]">
                      {invite.circle_name}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-[#8B8D98]">
                      {invite.member_count ?? 0} members
                      {invite.global_rank
                        ? ` · Ranked #${invite.global_rank}`
                        : ""}
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <p className="px-5 py-10 text-center text-[13px] text-[#8B8D98]">
                No new invitations
              </p>
            )}
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/40 p-4 backdrop-blur-sm md:flex">
          <div className="relative w-full max-w-[520px] rounded-[32px] bg-white p-8 shadow-[0_16px_48px_rgba(4,1,54,0.12)]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-5 right-5 rounded-full p-2 text-[#62636C] hover:bg-[#F5F6F8]"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <CircleThumb
                src={selected.circle_profile_picture_url}
                name={selected.circle_name}
                size={88}
              />

              <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-[#1E1F24]">
                Join {selected.circle_name}
              </h2>
              <p className="mt-2 max-w-[360px] text-[14px] leading-relaxed text-[#62636C]">
                You’ve been invited to this circle. Join to collaborate on
                challenges and share earnings with the group.
              </p>

              {errorMsg && (
                <p className="mt-4 max-w-[360px] text-[13px] leading-relaxed text-[#DC2626]">
                  {errorMsg}
                </p>
              )}

              <div className="mt-8 flex w-full items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={acceptMutation.isPending || declineMutation.isPending}
                  className="rounded-full border border-[#8B8D98] px-6 py-3 text-[14px] font-semibold text-[#1E1F24] hover:bg-[#F9F9FB] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  disabled={acceptMutation.isPending || declineMutation.isPending}
                  className="rounded-full bg-[#0033FF] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#0026CC] disabled:opacity-50"
                >
                  {acceptMutation.isPending ? "Joining..." : "Join Circle"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleDecline}
                disabled={acceptMutation.isPending || declineMutation.isPending}
                className="mt-4 text-[13px] font-medium text-[#8B8D98] hover:text-[#1E1F24] disabled:opacity-50"
              >
                {declineMutation.isPending ? "Declining..." : "Decline invite"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
