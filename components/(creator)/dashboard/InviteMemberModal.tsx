"use client";

import React, { useState } from "react";
import { FiX, FiPlus, FiChevronDown } from "react-icons/fi";

interface MemberInvite {
  email: string;
  role: "Admin" | "Member";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  circleId: string; // Pass the ID from the profile page
}

const InviteMemberModal = ({ isOpen, onClose, circleId }: Props) => {
  const [invites, setInvites] = useState<MemberInvite[]>([
    { email: "", role: "Member" },
  ]);

  if (!isOpen) return null;

  const handleSendInvites = () => {
    // Logic to call your API: POST /circles/{circleId}/invites
    console.log("Sending to:", invites, "for circle:", circleId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[560px] rounded-[32px] p-6 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[24px] font-semibold">Invite Members</h2>
            <p className="text-[#62636C] text-[14px]">Invite creators to your circle.</p>
          </div>
          <button onClick={onClose}><FiX size={24} /></button>
        </div>

        <div className="space-y-4">
          {invites.map((invite, idx) => (
            <div key={idx} className="relative">
              <input 
                placeholder="Enter email address" 
                className="w-full border rounded-xl py-3 px-4 outline-none" 
                value={invite.email}
                onChange={(e) => {
                  const newInvites = [...invites];
                  newInvites[idx].email = e.target.value;
                  setInvites(newInvites);
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[12px] font-semibold">
                {invite.role} <FiChevronDown />
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => setInvites([...invites, { email: "", role: "Member" }])} 
            className="w-full py-3 border border-dashed rounded-xl font-semibold text-sm text-gray-500"
          >
            + Add User
          </button>

          <button onClick={handleSendInvites} className="w-full py-4 bg-[#0047FF] text-white rounded-full font-semibold mt-4">
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberModal;