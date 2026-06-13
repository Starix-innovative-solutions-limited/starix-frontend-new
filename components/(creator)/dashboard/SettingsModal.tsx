import React, { useState, useRef, useEffect } from "react";
import { GoX, GoArrowLeft, GoCopy, GoSearch, GoInfo } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useGetCircle, useUpdateCircle, useRotateJoinCode, useClearJoinCode, useUpdateMemberRole, useGetCircleMembers } from "@/hooks/useCircles";

const suggestedNiches = ["Fashion", "Design & Arts", "IT & Communication", "Food & Drink"];

// Maps the circle's `privacy` value to the read-only copy shown in the main view
const PRIVACY_DESCRIPTIONS: Record<string, string> = {
  public: "Anyone can request to join, subject to approval.",
  private: "Only people with the invite code can join.",
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId: string;
}



const SettingsModal = ({ isOpen, onClose, circleId }: SettingsModalProps) => {
  // ── Live circle data
  const { data: circle, isLoading: isCircleLoading } = useGetCircle(circleId);

  const { data: members = [], isLoading: isMembersLoading } = useGetCircleMembers(circleId);

  const [rotateSuccess, setRotateSuccess] = useState(false);
  const updateCircle = useUpdateCircle(circleId);

  const [activeTab, setActiveTab] = useState("Payout");
  const [view, setView] = useState<"main" | "edit" | "payout_setup" | "payout_edit">("main");
  const [payoutSet, setPayoutSet] = useState(true);


  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // ── Editable General-tab fields, synced from the live circle record
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [justCopied, setJustCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const currentUserId = "your-current-user-id"; 
  const isAdminView = members.find(m => m.user_id === currentUserId)?.role === "Admin";
  const rotateMutation = useRotateJoinCode(circleId);

  const handleUpdateRole = async (userId: string, newRole: "admin" | "manager" | "member") => {
    try {
      await updateRoleMutation.mutateAsync({ userId, role: newRole });
      setOpenDropdownId(null);
    } catch (err: any) {
      console.error("Failed to update role:", err);
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

  const generateChartGradient = () => {
    let currentTotal = 0;
    const segments = members.map((m) => {
      const start = (currentTotal / 100) * 360;
      const end = ((currentTotal + m.percentage) / 100) * 360;
      currentTotal += m.percentage;
      return `${m.color} ${start + 1}deg ${end - 1}deg, transparent ${end - 1}deg ${end + 1}deg`;
    });
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
            <div className="px-8 shrink-0">
                <div className="flex gap-8 border-b border-gray-100 mb-6">
                {["General", "Membership", "Payout"].map((tab) => (
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
                    {selectedNiches.map(n => (
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
            {isMembersLoading ? (
              <p className="text-sm text-gray-500">Loading members...</p>
            ) : (
              <div className="space-y-6">
                {members.map((member: any) => (
                  <div key={member.user_id} className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold">{member.name}</span>
                    <button 
                      onClick={() => handleUpdateRole(
                        member.user_id, 
                        member.role.toLowerCase() === "admin" ? "member" : "admin"
                      )}
                      className="text-[12px] font-medium text-blue-600 hover:underline disabled:opacity-50"
                      disabled={updateRoleMutation.isPending}
                    >
                      {member.role.toLowerCase() === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

          {/* ================= PAYOUT TAB ================= */}
          {activeTab === "Payout" && (
            view === "main" ? (
                !payoutSet ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-24 h-24 mb-6 rounded-full bg-gray-50 flex items-center justify-center text-3xl">💎</div>
                        <h3 className="text-[20px] font-semibold text-[#1E1F24] mb-2">Set Payout Percentages</h3>
                        <p className="text-[12px] text-[#62636C] max-w-[320px] mb-8">Set auto-splitting payout percentages of your team's earning from challenges.</p>
                        <button onClick={() => setView("payout_setup")} className="w-full bg-[#0033FF] text-white py-4 rounded-full font-semibold text-[14px]">Set Payout Percentages</button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-[24px] font-semibold text-[#1E1F24]">Payout Auto-Splitting</h3>
                                    <span className="px-2 py-0.5 bg-[#FFFBEB] text-[#D97706] text-[10px] font-semibold rounded-md">Pending</span>
                                </div>
                                <p className="text-[12px] max-w-[320px] text-[#62636C] leading-relaxed">
                                    Earnings from Circle Challenges are split between the members of your circle according to the set percentages. 
                                    All members must confirm their percent for auto-splitting become active.
                                </p>
                            </div>

                            <div className="shrink-0 flex items-center justify-center relative p-1">
                                <div 
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full relative flex items-center justify-center shadow-sm"
                                    style={{ background: generateChartGradient() }}
                                >
                                    <div className="absolute inset-0 m-[12px] bg-white rounded-full flex items-center justify-center">
                                        <img src="/diamonddd.svg" alt="diamond" className="w-14 h-14 md:w-16 md:h-16" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 pt-4">
                            {members.map((m) => (
                              <div key={m.user_id} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      {/* Ensure these properties exist in your API response */}
                                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: m.color }} />
                                      <img src={m.avatar} className="w-8 h-8 rounded-full border border-gray-100" alt="" />
                                      <span className="text-[14px] font-medium text-[#1E1F24]">
                                          {m.name} {m.isYou && <span className="text-[#9CA3AF]">(you)</span>}
                                      </span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                      <span className="text-[14px] font-semibold text-[#1E1F24]">{m.percentage}%</span>
                                      <span className={`text-[10px] font-semibold px-3 py-1 rounded-md ${m.status === "Confirmed" ? "text-[#059669] bg-[#ECFDF5]" : "text-[#D97706] bg-[#FFFBEB]"}`}>{m.status}</span>
                                  </div>
                              </div>
                            ))}
                        </div>
                        <button onClick={() => setView("payout_edit")} className="w-full bg-[#0033FF] text-white py-4 rounded-full font-semibold text-[14px]">Change Payout Percentages</button>
                    </div>
                )
            ) : (
                <div className="space-y-6">
                    <p className="text-[14px] text-[#62636C]">Set auto-splitting payout percentages of your team's earning from challenges.</p>
                    <div className="space-y-3">
                        {members.map((m) => (
                            <div key={m.id} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <img src={m.avatar} className="w-6 h-6 rounded-full" alt="" />
                                    <span className="text-[14px] font-semibold">{m.name}</span>
                                </div>
                                <div className="relative">
                                    <input type="number" className="w-full p-4 border border-gray-200 rounded-xl text-right pr-10 font-semibold" placeholder="0" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-[#0033FF] text-white py-4 rounded-full font-semibold text-[14px]">Save Changes</button>
                </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;