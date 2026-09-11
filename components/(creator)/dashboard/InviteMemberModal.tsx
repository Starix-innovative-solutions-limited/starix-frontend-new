"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiX, FiChevronDown, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useSendInvites } from "@/hooks/useCircles";

interface MemberInvite {
  email: string;
  role: "Admin" | "Member";
  error?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  circleId: string;
}

const InviteMemberModal = ({ isOpen, onClose, circleId }: Props) => {
  const [invites, setInvites] = useState<MemberInvite[]>([{ email: "", role: "Member" }]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sendInvitesMutation = useSendInvites(circleId);

  useEffect(() => {
    if (!isOpen) {
      setOpenDropdownIdx(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (openDropdownIdx === null) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownIdx(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openDropdownIdx]);

  if (!isOpen) return null;

  const roleOptions: MemberInvite["role"][] = ["Admin", "Member"];

  const updateInviteRole = (idx: number, role: MemberInvite["role"]) => {
    setInvites((current) =>
      current.map((invite, index) =>
        index === idx ? { ...invite, role } : invite
      )
    );
    setOpenDropdownIdx(null);
    setIsSuccess(false);
  };

  const handleSendInvites = async () => {
    setErrorMsg(null);
    setIsSuccess(false);
    
    const activeInvites = invites.filter(i => i.email.trim() !== "");
    if (activeInvites.length === 0) {
      setErrorMsg("Please enter at least one email address.");
      return;
    }

    const payload = activeInvites.map(i => ({
      email: i.email.trim(),
      role: i.role.toLowerCase() as "member" | "admin"
    }));

    try {
      await sendInvitesMutation.mutateAsync(payload);
      setIsSuccess(true); // Keep modal open and show success UI
    } catch (err: any) {
      const errorData = err.response?.data;
      const batchErrors = errorData?.details?.errors;

      if (batchErrors && Array.isArray(batchErrors)) {
        setErrorMsg("Some invitations could not be sent. Review highlighted fields.");
        const updatedInvites = invites.map(invite => {
          const match = batchErrors.find((e: any) => e.email.toLowerCase() === invite.email.trim().toLowerCase());
          return { ...invite, error: match ? match.reason : undefined };
        });
        setInvites(updatedInvites);
      } else {
        setErrorMsg(errorData?.detail || "Failed to send invitations.");
      }
    }
  };

  const resetForm = () => {
    setInvites([{ email: "", role: "Member" }]);
    setIsSuccess(false);
    setErrorMsg(null);
    setOpenDropdownIdx(null);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[560px] rounded-[32px] p-6 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[24px] font-semibold text-[#1E1F24]">Invite Members</h2>
            <p className="text-[#62636C] text-[14px]">Invite creators to your circle.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <FiX size={24} className="text-[#9CA3AF]" />
          </button>
        </div>

        {isSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
            <FiCheckCircle size={20} /> 
            <span className="font-medium">Invitations sent successfully!</span>
          </div>
        )}

        {errorMsg && !isSuccess && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
            <FiAlertCircle size={16} /> {errorMsg}
          </div>
        )}

        <div className="space-y-4">
          {invites.map((invite, idx) => (
            <div
              key={idx}
              className={`space-y-1 ${openDropdownIdx === idx ? "relative z-50" : ""}`}
            >
              <div className="relative">
                <input 
                  placeholder="Enter email address" 
                  className={`w-full border rounded-xl py-3 pl-4 pr-28 outline-none ${
                    invite.error ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"
                  }`}
                  value={invite.email}
                  onChange={(e) => {
                    const newInvites = [...invites];
                    newInvites[idx].email = e.target.value;
                    newInvites[idx].error = undefined;
                    setInvites(newInvites);
                    setIsSuccess(false);
                  }}
                />
                
                <div
                  ref={openDropdownIdx === idx ? dropdownRef : undefined}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdownIdx(openDropdownIdx === idx ? null : idx)
                    }
                    aria-expanded={openDropdownIdx === idx}
                    aria-haspopup="listbox"
                    className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1.5 text-[12px] font-semibold text-gray-500 transition hover:bg-gray-100"
                  >
                    {invite.role}{" "}
                    <FiChevronDown
                      className={`transition ${openDropdownIdx === idx ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdownIdx === idx && (
                    <div
                      role="listbox"
                      className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[120px] overflow-hidden rounded-xl border border-[#EEF0F4] bg-white py-1 shadow-lg"
                    >
                      {roleOptions.map((role) => (
                        <button
                          key={role}
                          type="button"
                          role="option"
                          aria-selected={invite.role === role}
                          onClick={() => updateInviteRole(idx, role)}
                          className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#F8F8FA] ${
                            invite.role === role
                              ? "font-semibold text-[#1E1F24]"
                              : "font-normal text-[#62636C]"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {invite.error && <p className="text-[11px] text-red-500 pl-1">{invite.error}</p>}
            </div>
          ))}
          
          <button 
            type="button"
            onClick={() => setInvites([...invites, { email: "", role: "Member" }])} 
            disabled={invites.length >= 8 || isSuccess}
            className="w-full py-3 border border-dashed border-gray-300 rounded-xl font-semibold text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40"
          >
            + Add User
          </button>

          <div className="flex gap-3 mt-4">
            <button 
                onClick={onClose} 
                className="flex-1 py-4 border border-gray-200 rounded-full font-semibold text-[14px] hover:bg-gray-50"
            >
                {isSuccess ? "Close" : "Cancel"}
            </button>
            <button 
              onClick={isSuccess ? resetForm : handleSendInvites} 
              disabled={sendInvitesMutation.isPending}
              className="flex-1 py-4 bg-[#0047FF] text-white rounded-full font-semibold text-[14px] disabled:opacity-60"
            >
              {sendInvitesMutation.isPending ? "Sending..." : isSuccess ? "Send More" : "Send Invites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberModal;