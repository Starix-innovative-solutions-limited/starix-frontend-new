import React, { useState, useRef, useEffect } from "react";
import { GoX, GoArrowLeft, GoCopy, GoSearch, GoInfo } from "react-icons/go";
import { CircleMember } from "@/utils/type";
import { api } from "@/lib/api";
import { useGetCircle, useUpdateCircle, useRotateJoinCode, useApproveJoinRequest, useRejectJoinRequest, 
  useGetCurrentUser, useClearJoinCode, useUpdateMemberRole, useGetCircleMembers, useRemoveMember, 
  useGetPendingInvitations, useRevokeInvitation, useGetCircleJoinRequests, useGetCirclePayouts, useApprovePayout, useUpdateCirclePayouts } from "@/hooks/useCircles";
  

const suggestedNiches = ["Fashion", "Design & Arts", "IT & Communication", "Food & Drink"];

// Maps the circle's `privacy` value to the read-only copy shown in the main view
const PRIVACY_DESCRIPTIONS: Record<string, string> = {
  public: "Anyone can request to join, subject to approval.", 
  private: "Only people with the invite code can join.",
};

type CircleMemberItem = {
  user_id?: string;
  full_name?: string;
  profile_picture_url?: string | null;
  role?: string;
};

type CircleMemberWithPossibleIds = {
  id?: string;
  user_id?: string;
  full_name?: string;
  profile_picture_url?: string | null;
  role?: string;
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId: string;
  currentData: string;
}





const SettingsModal = ({ isOpen, onClose, circleId }: SettingsModalProps) => {
  // ── Live circle data
  const { data: circle, isLoading: isCircleLoading } = useGetCircle(circleId);
  const { data: payoutData, isLoading: isPayoutLoading } = useGetCirclePayouts(circleId);
  const approvePayoutMutation = useApprovePayout(circleId);
  const [payoutInputs, setPayoutInputs] = useState<{user_id: string, percentage: number}[]>([]);

  useEffect(() => {
  if (payoutData?.shares) {
    setPayoutInputs(payoutData.shares.map(s => ({ user_id: s.user_id, percentage: s.percentage })));
  }
}, [payoutData]);

const handlePercentageChange = (userId: string, newPercentage: number) => {
  // Ensure the value is within 0-100
  const val = Math.max(0, Math.min(100, newPercentage));
  
  const currentTotal = payoutInputs.reduce((sum, item) => sum + item.percentage, 0);
  const diff = val - (payoutInputs.find(p => p.user_id === userId)?.percentage || 0);
  
  // Calculate how many other members can accept the change
  const otherMembers = payoutInputs.filter(p => p.user_id !== userId);
  
  if (otherMembers.length === 0) {
    setPayoutInputs([{ user_id: userId, percentage: 100 }]);
    return;
  }

  // Update the target member
  const updatedInputs = payoutInputs.map(p => 
    p.user_id === userId ? { ...p, percentage: val } : p
  );

  // Distribute the difference across other members automatically
  let remainingDiff = -diff;
  
  const finalInputs = updatedInputs.map(p => {
    if (p.user_id === userId) return p;
    
    // Add the shared difference to other members
    const shareOfDiff = Math.round(remainingDiff / otherMembers.length);
    const newShare = Math.max(0, p.percentage + shareOfDiff);
    remainingDiff -= (newShare - p.percentage);
    
    return { ...p, percentage: newShare };
  });

  setPayoutInputs(finalInputs);
};


const COLORS = ['#F87171', '#22D3EE', '#FACC15', '#A3E635', '#FB923C', '#C084FC'];

const sharesWithColors = payoutData?.shares.map((share: any, index: number) => {
  // If percentage is 0, force the color to gray
  const color = share.percentage === 0 
    ? '#CBD5E1' // A neutral gray
    : (share.color || COLORS[index % COLORS.length]);
    
  return { ...share, color };
}) || [];


  const updatePayoutMutation = useUpdateCirclePayouts(circleId);
  const [rotateSuccess, setRotateSuccess] = useState(false);
  const updateCircle = useUpdateCircle(circleId);

  const [activeTab, setActiveTab] = useState("Payout");
  const [view, setView] = useState<"main" | "edit" | "payout_setup" | "payout_edit">("main");
  const [payoutSet, setPayoutSet] = useState(true);


  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  // const [shares, setShares] = useState<{ user_id: string; percentage: number }[]>([]);

  // ── Editable General-tab fields, synced from the live circle record
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [justCopied, setJustCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const { data: currentUser } = useGetCurrentUser();
  const currentUserId = currentUser?.id;
  const isAdmin = !!(circle?.admin_id && currentUser?.id && circle.admin_id === currentUser.id);
 
  const rotateMutation = useRotateJoinCode(circleId);

  

  const { data: members = [], isLoading: isMembersLoading } =
  useGetCircleMembers(circleId);

  const validMembers = (members as CircleMemberWithPossibleIds[]).map((member, index) => ({
  ...member,
  user_id: member.user_id ?? member.id ?? `temp-id-${index}`,
}));



  const { data: pendingInvites = [], isLoading: isInvitesLoading } =
  useGetPendingInvitations(circleId, {
    enabled: !!circleId && !!currentUser?.id && !!circle?.admin_id && isAdmin,
  });

  const { data: joinRequests = [], isLoading: isRequestsLoading } = useGetCircleJoinRequests(circleId); 

  const handleSavePayouts = async () => {
  try {
    // FIX: Send payoutInputs (the state being edited) instead of shares (which is empty)
    await api.put(`/circles/${circleId}/payout-settings`, { shares: payoutInputs });
    
    // Refresh the circle data after saving
    setView("main");
  } catch (err: any) {
    console.error("Payout update failed:", err.response?.data || err.message);
    alert("Failed to save payout settings.");
  }
};

  const handleUpdateRole = async (userId: string, newRole: "admin" | "manager" | "member") => {
  try {
    await updateRoleMutation.mutateAsync({ 
      userId, 
      // Force TypeScript to recognize this will match your backend's expected union type
      role: newRole.toLowerCase() as "admin" | "manager" | "member" 
    });
    setOpenDropdownId(null);
  } catch (err: any) {
    console.error("API Error Details:", err.response?.data);
  }
};

const approveMutation = useApproveJoinRequest(circleId);

const handleApprove = async (requestId: string) => {
  try {
    await approveMutation.mutateAsync(requestId);
    // Optional: show a toast/success message
  } catch (err: any) {
    console.error("Failed to approve:", err.response?.data?.detail);
    alert(err.response?.data?.detail || "Failed to approve request.");
  }
};

const rejectMutation = useRejectJoinRequest(circleId);

const handleReject = async (requestId: string) => {
  if (!confirm("Are you sure you want to reject this request?")) return;
  
  try {
    await rejectMutation.mutateAsync(requestId);
  } catch (err: any) {
    console.error("Failed to reject:", err.response?.data?.detail);
    alert(err.response?.data?.detail || "Failed to reject request.");
  }
};

const removeMemberMutation = useRemoveMember(circleId);

const handleRemoveMember = async (userId: string) => {
  if (!confirm("Are you sure you want to remove this member?")) return;
  
  try {
    await removeMemberMutation.mutateAsync(userId);
  } catch (err: any) {
    console.error("Failed to remove member:", err.response?.data?.detail ?? "Error");
  }
};

  const handleRotate = async () => {
  setRotateSuccess(false);
  
  try {
    await rotateMutation.mutateAsync();
    
    // Success feedback
    setRotateSuccess(true);
    setTimeout(() => setRotateSuccess(false), 3000); 
  } catch (err: any) {
    console.error("Failed to rotate:", err);
  }
};

const revokeMutation = useRevokeInvitation(circleId);

const handleRevoke = async (invitationId: string) => {
  if (!confirm("Are you sure you want to revoke this invitation?")) return;
  
  try {
    await revokeMutation.mutateAsync(invitationId);
  } catch (err: any) {
    console.error("Failed to revoke invitation:", err.response?.data?.detail);
    alert("Could not revoke invitation. It may have already been accepted or expired.");
  }
};

const clearCodeMutation = useClearJoinCode(circleId);

const handleClearCode = async () => {
  // Simple, clean UI logic without alerts
  try {
    await clearCodeMutation.mutateAsync();
  } catch (err: any) {
    console.error("Failed to clear code:", err);
  }
};

const updateRoleMutation = useUpdateMemberRole(circleId);

  // Populate edit fields + display niches whenever fresh circle data arrives
  useEffect(() => {
    if (circle) {
      setNameInput(circle.name ?? "");
      setDescriptionInput(circle.description ?? "");
      setSelectedNiches(circle.niches ?? []);
    }
  }, [circle]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsDropdownOpen(false);
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
  if (members.length === 0) return; // Skip if loading
  const ids = validMembers.map(m => m.user_id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    console.error("DUPLICATE MEMBER IDs DETECTED:", ids);
  }
}, [members]);

  const generateChartGradient = () => {
  let currentTotal = 0;
  const segments = sharesWithColors.map((m: any) => {
    const start = (currentTotal / 100) * 360;
    const end = ((currentTotal + m.percentage) / 100) * 360;
    
    // Skip adding a segment for 0% to avoid visual artifacts
    if (m.percentage === 0) return null; 

    currentTotal += m.percentage;
    return `${m.color} ${start + 2}deg ${end - 2}deg`;
  }).filter(Boolean); // Remove null entries
  
  return `conic-gradient(${segments.join(", ")})`;
};

  const addNiche = (niche: string) => {
    const trimmed = niche.trim();
    if (trimmed && !selectedNiches.includes(trimmed)) setSelectedNiches([...selectedNiches, trimmed]);
    setInputValue("");
    setIsDropdownOpen(false);
  };

  // ── PATCH /circles/:id — General settings save
  const handleSaveGeneral = () => {
    updateCircle.mutate(
      {
        name: nameInput,
        description: descriptionInput,
        niches: selectedNiches,
      },
      {
        onSuccess: () => setView("main"),
      }
    );
  };

  const handleCopyJoinCode = () => {
    if (!circle?.join_code) return;
    navigator.clipboard.writeText(circle.join_code);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1500);
  };

  if (!isOpen) return null;

  

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[520px] rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {view !== "main" && (
              <button onClick={() => setView("main")} className="p-2 hover:bg-gray-100 rounded-full transition">
                <GoArrowLeft size={24} className="text-[#1E1F24]" />
              </button>
            )}
            <h2 className="text-[24px] font-semibold text-[#1E1F24]">
                {view === "payout_setup" ? "Set Payout Percentages" : view === "payout_edit" ? "Change Payout Percentages" : "Circle Settings"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <GoX size={24} className="text-[#9CA3AF]" />
          </button>
        </div>

        {/* Tab Navigation */}
        {view === "main" && (
            <div className="flex gap-8 border-b border-gray-100 mb-6 px-8">
              {["General", "Membership", "Payout"]
                .concat(isAdmin ? ["Requests"] : []) // Dynamically append "Requests" only for admins
                .map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setView("main"); }}
                    className={`pb-3 text-[14px] font-medium transition-all relative ${activeTab === tab ? "text-[#0033FF]" : "text-[#7B8190]"}`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0033FF]" />}
                  </button>
              ))}
            </div>
        )}

        <div className="px-8 pb-8 overflow-y-auto flex-grow custom-scrollbar">
          
          {/* ================= GENERAL TAB ================= */}
          {activeTab === "General" && (
            view === "main" ? (
              <div className="space-y-6">
                <div>
                  <label className="text-[12px] font-semibold text-[#1E1F24] block mb-1">Circle Name</label>
                  <p className="text-[14px] text-[#62636C]">
                    {isCircleLoading ? "Loading..." : circle?.name}
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4">
                  <label className="text-[12px] font-semibold text-[#1E1F24] block mb-1">Description</label>
                  <p className="text-[14px] text-[#62636C] leading-relaxed">
                    {isCircleLoading ? "Loading..." : circle?.description}
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4">
                  <label className="text-[12px] font-semibold text-[#1E1F24] block mb-2">Niches</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedNiches.map((n, index) => (
                      <span key={n} className="text-[12px] text-[#3379A5] bg-[#F5FBFF] px-2 py-1 rounded-md">{n}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-50 pt-4">
                  <label className="text-[12px] font-semibold text-[#1E1F24] block mb-1">Who can join this circle?</label>
                  <p className="text-[14px] text-[#62636C]">
                    {isCircleLoading
                      ? "Loading..."
                      : circle?.privacy
                        ? PRIVACY_DESCRIPTIONS[circle.privacy]
                        : "—"}
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-[12px] font-semibold text-[#1E1F24] block mb-1">Circle Invitation Code</label>
                      <p className="text-[14px] text-[#62636C] font-mono tracking-wider">
                        {isCircleLoading ? "Loading..." : circle?.join_code ?? "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <GoCopy
                        onClick={handleCopyJoinCode}
                        className={`cursor-pointer transition-colors ${justCopied ? "text-green-500" : "text-gray-400 hover:text-blue-600"}`}
                        size={20}
                      />
                    </div>
                  </div>
                  
                  {/* Rotate Code Button */}
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={handleRotate}
                      disabled={rotateMutation.isPending || clearCodeMutation.isPending}
                      className="flex-1 py-3 border border-blue-100 rounded-xl text-[12px] font-semibold text-[#62636C] hover:bg-gray-50 disabled:opacity-50 transition"
                    >
                      {rotateMutation.isPending ? "Updating..." : "Update Code"}
                    </button>
                    
                    <button 
                      onClick={handleClearCode}
                      disabled={rotateMutation.isPending || clearCodeMutation.isPending}
                      className="flex-1 py-3 border border-red-100 rounded-xl text-[12px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 transition"
                    >
                      {clearCodeMutation.isPending ? "Clearing..." : "Disable Code"}
                    </button>
                  </div>
                  <p className="text-[10px] text-red-600 text-center">
                    Clicking this will immediately invalidate your current code.
                  </p>
                </div>
                <button onClick={() => setView("edit")} className="w-full mt-2 bg-[#0033FF] text-white py-4 rounded-full font-semibold text-[14px] hover:bg-blue-700 transition">
                  Edit General Settings
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                    <label className="text-[14px] font-semibold mb-2 block">Circle Name</label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                    />
                </div>
                <div className="relative" ref={dropdownRef}>
                    <label className="text-[14px] font-semibold mb-2 block">Select 3 Niches for your Circles</label>
                    <div className="relative mb-3">
                        <GoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" value={inputValue} onFocus={() => setIsDropdownOpen(true)} onChange={(e) => setInputValue(e.target.value)} className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl outline-none" />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute z-20 w-full bg-[#F9FAFB] border border-gray-100 rounded-2xl shadow-sm overflow-hidden mt-[-8px]">
                        {suggestedNiches.map((n) => (
                            <button key={n} onClick={() => addNiche(n)} className="w-full text-left px-6 py-4 text-[14px] hover:bg-white">{n}</button>
                        ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {selectedNiches.map(n => (
                        <span key={n} className="flex items-center gap-2 text-[13px] text-[#3379A5] bg-[#F5FBFF] px-4 py-2 rounded-full border border-[#D1E9FF]">
                            {n} <button onClick={() => setSelectedNiches(selectedNiches.filter(x => x !== n))}><GoX /></button>
                        </span>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-[14px] font-semibold mb-2 block">Circle Description</label>
                    <textarea
                      rows={3}
                      value={descriptionInput}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl resize-none outline-none focus:border-blue-500"
                    />
                </div>
                {updateCircle.isError && (
                  <p className="text-[12px] text-red-500">
                    {(updateCircle.error as any)?.response?.data?.detail ?? "Failed to update circle. Please try again."}
                  </p>
                )}
                <button
                  onClick={handleSaveGeneral}
                  disabled={updateCircle.isPending}
                  className="w-full py-4 rounded-full font-semibold text-[14px] bg-[#0033FF] text-white disabled:opacity-60"
                >
                  {updateCircle.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )
          )}

          {/* ================= MEMBERSHIP TAB ================= */}
          {activeTab === "Membership" && (
            <div className="space-y-6">
              {isMembersLoading || isInvitesLoading ? (
                <p className="text-sm text-gray-500">Loading circle roster...</p>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[12px] font-bold text-[#7B8190] uppercase tracking-wider mb-3">
                      Active Members ({members.length})
                    </h4>
                    
                    <div className="space-y-4">
                      {validMembers.map((member, index) => (
                        
                        <div key={`member-${member.user_id || 'no-id'}-${index}`} className="flex items-center justify-between bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                          <div className="flex items-center gap-3">
                            <img
                              src={member.profile_picture_url || "https://i.pravatar.cc/150"}
                              className="w-10 h-10 rounded-full border border-gray-100 object-cover"
                              alt=""
                            />

                            <span className="text-[14px] font-semibold text-[#1E1F24]">
                              {member.full_name ?? "Unknown member"}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase ${
                              member.role?.toLowerCase() === "admin" 
                                ? "text-[#D847FF] bg-[#FDF2FF]" 
                                : "text-[#0085FF] bg-[#F0F7FF]"
                            }`}>
                              {member.role}
                            </span>
                            
                            {isAdmin && (
                              <button 
                                onClick={() => handleRemoveMember(member.user_id)} 
                                className="text-[12px] font-semibold text-red-500 hover:text-red-700 px-2 py-1 transition"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Invitations Section */}
                  {pendingInvites.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-[12px] font-bold text-[#7B8190] uppercase tracking-wider mb-3">
                        Sent Invites ({pendingInvites.length})
                      </h4>
                      <div className="space-y-3">
                        {pendingInvites.map((invite: any) => (
                          <div key={invite.id} className="flex items-center justify-between border border-dashed border-gray-200 p-3 rounded-2xl bg-gray-50/30">
                            <div className="flex flex-col">
                              <span className="text-[14px] font-medium text-[#1E1F24]">{invite.invited_email}</span>
                              <span className="text-[10px] text-gray-400">
                                Offered role: <span className="font-semibold text-gray-500">{invite.role_offered}</span>
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 capitalize">
                                {invite.status}
                              </span>
                              
                              <button 
                                onClick={() => handleRevoke(invite.id)}
                                disabled={revokeMutation.isPending}
                                className="text-[12px] font-medium text-red-500 hover:text-red-500 px-2 py-1 transition disabled:opacity-50"
                              >
                                {revokeMutation.isPending ? "Revoking..." : "Revoke"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {members.length === 0 && pendingInvites.length === 0 && (
                    <p className="text-sm text-center text-gray-400 py-6">No users or invitations found.</p>
                  )}

                </div>
              )}
            </div>
          )}

          {/* ================= REQUESTS TAB ================= */}
          {isAdmin && activeTab === "Requests" && (
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold text-[#7B8190] uppercase tracking-wider mb-3">
                Pending Requests ({joinRequests.length})
              </h4>
              
              {isRequestsLoading ? (
                <p className="text-sm text-gray-500">Loading requests...</p>
              ) : joinRequests.length > 0 ? (
                joinRequests.map((req: any) => (
                  <div key={req.id} className="flex items-center justify-between bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                    <div>
                      <p className="text-[14px] font-semibold text-[#1E1F24]">User ID: {req.user_id.slice(0, 8)}...</p>
                      <p className="text-[11px] text-gray-400">Requested: {new Date(req.created_at).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleApprove(req.id)}
                        disabled={approveMutation.isPending}
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-[12px] font-semibold hover:bg-green-100 transition disabled:opacity-50"
                      >
                        {approveMutation.isPending ? "Approving..." : "Approve"}
                      </button>
                      <button 
                        onClick={() => handleReject(req.id)}
                        disabled={rejectMutation.isPending || approveMutation.isPending}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[12px] font-semibold hover:bg-red-100 transition disabled:opacity-50"
                      >
                        {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-10 text-[14px]">No pending join requests.</p>
              )}
            </div>
          )}

          {/* ================= PAYOUT TAB ================= */}
          {activeTab === "Payout" && (
            view === "main" ? (
              isPayoutLoading ? (
                <div className="py-12 text-center text-sm text-gray-500">Loading payout settings...</div>
              ) : !payoutData || payoutData.shares.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-gray-50 flex items-center justify-center text-3xl">💎</div>
                  <h3 className="text-[20px] font-semibold text-[#1E1F24] mb-2">No Payout Settings</h3>
                  <button onClick={() => setView("payout_setup")} className="w-full bg-[#0033FF] text-white py-4 rounded-full font-semibold text-[14px]">Set Payout Percentages</button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center gap-6 p-1">
                    {/* Left Side: Text */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[20px] font-semibold text-[#1E1F24]">Payout Auto-Splitting</h3>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase ${
                          payoutData.fully_approved ? "bg-green-100 text-green-700" : "bg-[#FFFBEB] text-[#D97706]"
                        }`}>
                          {payoutData.fully_approved ? "confirmed" : "pending"}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#62636C] leading-relaxed">
                        Earnings from Circle Challenges are split between the members of your circle according to the set percentages.
                        All members must confirm their percent for auto-splitting become active.
                      </p>
                    </div>

                    {/* Right Side: The Chart */}
                    <div className="shrink-0">
                      <div 
                        className="w-[100px] h-[100px] rounded-full flex items-center justify-center relative shadow-sm"
                        style={{ background: generateChartGradient() }}
                      >
                        <div className="w-[85px] h-[85px] bg-white rounded-full flex items-center justify-center">
                          <img src="/diamonddd.svg" alt="diamond" className="w-[40px] h-[40px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 pt-4">
                    {sharesWithColors.map((share: any) => (
                      <div key={share.user_id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-[4px]" style={{ backgroundColor: share.color }} />
                          <img src={share.profile_picture_url} className="w-8 h-8 rounded-full border border-gray-100" alt="" />
                          <span className="text-[14px] font-medium text-[#1E1F24]">{share.full_name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-semibold text-[#1E1F24]">{share.percentage}%</span>

                          {/* --- ADDED APPROVAL LOGIC --- */}
                          {share.user_id === currentUserId && share.approval_status !== "confirmed" ? (
                            <button
                              onClick={() => approvePayoutMutation.mutate()}
                              disabled={approvePayoutMutation.isPending}
                              className="text-[10px] font-bold px-3 py-1 rounded-md bg-[#0033FF] text-white hover:bg-blue-700 transition"
                            >
                              {approvePayoutMutation.isPending ? "Approving..." : "Approve Share"}
                            </button>
                          ) : (
                            <span className={`text-[10px] font-semibold px-3 py-1 rounded-md capitalize ${
                              share.approval_status === "confirmed" ? "text-[#059669] bg-[#ECFDF5]" : "text-[#D97706] bg-[#FFFBEB]"
                            }`}>
                              {share.approval_status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* --- ADDED BUTTON HERE --- */}
                  <button 
                    onClick={() => setView("payout_edit")} 
                    className="w-1/2 mt-6 p-4 rounded-full font-semibold text-[14px] bg-[#0033FF] text-white border hover:bg-shadow-xs transition"
                  >
                    Change Payout Percentages
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-6">
                  <p className="text-[14px] text-[#62636C]">Set auto-splitting payout percentages of your team's earning from challenges. Total must be 100%.</p>
                  
                  <div className="space-y-4">
                    {payoutInputs.map((input) => {
                      const member = validMembers.find(m => m.user_id === input.user_id);
                      return (
                        <div key={input.user_id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <img
                            src={member?.profile_picture_url ?? undefined}
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <span className="flex-grow text-[14px] font-medium">{member?.full_name}</span>
                          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-1 border">
                            <input 
                              type="number" 
                              value={input.percentage}
                              onChange={(e) => handlePercentageChange(input.user_id, parseInt(e.target.value) || 0)}
                              className="w-12 bg-transparent text-right font-bold outline-none"
                            />
                            <span className="text-gray-400 font-semibold">%</span>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Live validation feedback */}
                    <div className={`text-center font-bold ${
                      payoutInputs.reduce((s, i) => s + i.percentage, 0) === 100 
                        ? "text-green-600" 
                        : "text-red-500"
                    }`}>
                      Current Total: {payoutInputs.reduce((s, i) => s + i.percentage, 0)}%
                    </div>
                  </div>

                  {/* Validation UI */}
                  <div className="text-center font-bold text-[14px]">
                      Total: {payoutInputs.reduce((sum, i) => sum + i.percentage, 0)}%
                  </div>

                  <button 
                    disabled={updatePayoutMutation.isPending || payoutInputs.reduce((sum, i) => sum + i.percentage, 0) !== 100}
                    onClick={handleSavePayouts} // Use the robust handler above
                    className="w-full bg-[#0033FF] text-white py-4 rounded-full font-semibold text-[14px] disabled:bg-gray-300 transition"
                >
                    {updatePayoutMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
          )
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;