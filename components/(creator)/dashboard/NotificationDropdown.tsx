"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { useGetMyInvitations, useDeclineInvitation, useAcceptInvitation } from "@/hooks/useCircles";
import { useQueryClient } from "@tanstack/react-query";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  

  const acceptMutation = useAcceptInvitation();
  const declineMutation = useDeclineInvitation();

  

    const { data: invites = [], isLoading } = useGetMyInvitations();
  const hasInvites = invites.length > 0;

  const handleAccept = async (invitationId: string) => {
  console.log("Sending Accept Request for ID:", invitationId);
  try {
    await acceptMutation.mutateAsync(invitationId);
    // ...
  } catch (err: any) {
    console.error("FULL ERROR RESPONSE:", err.response?.data);
  }
};

  const handleDecline = async (invitationId: string) => {
    if (!confirm("Are you sure you want to decline this invitation?")) return;
    try {
      await declineMutation.mutateAsync(invitationId);
      queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
    } catch (err) {
      console.error("Failed to decline:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-[#F9F9FB] rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <FiBell size={24} className="text-[#111827]" />
        {hasInvites && (
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-50 font-semibold text-sm">Pending Invitations</div>
          <div className="max-h-[300px] overflow-y-auto">
            {hasInvites ? (
              invites.map((invite: any) => (
                <div key={invite.invitation_id} className="p-4 hover:bg-gray-50 border-b border-gray-50">
                  <div className="flex gap-3">
                    <img src={invite.circle_profile_picture_url} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#111827]">{invite.circle_name}</p>
                      <p className="text-[10px] text-gray-500">Rank #{invite.global_rank} • {invite.member_count} members</p>
                      
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => handleAccept(invite.invitation_id)} 
                          disabled={acceptMutation.isPending}
                          className="px-3 py-1 bg-[#0033FF] text-white text-[10px] font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                          {acceptMutation.isPending ? "Joining..." : "Accept"}
                        </button>
                        <button 
                          onClick={() => handleDecline(invite.invitation_id)} 
                          disabled={declineMutation.isPending}
                          className="px-3 py-1 bg-gray-100 text-[#62636C] text-[10px] font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                        >
                          {declineMutation.isPending ? "Declining..." : "Decline"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-gray-400">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;