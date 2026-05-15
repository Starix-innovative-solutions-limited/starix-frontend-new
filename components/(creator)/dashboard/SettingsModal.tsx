import React, { useState, useRef, useEffect } from "react";
import { GoX, GoArrowLeft, GoCopy, GoSearch, GoInfo } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// Mock data with placeholder avatars per your request
const initialMembers = [
  { id: 1, name: "Sangotofunmi Oluwadarasimi", role: "Admin", isYou: true, avatar: "https://i.pravatar.cc/150?u=1", percentage: 20, status: "Confirmed", color: "#F87171" },
  { id: 2, name: "Kwame Nkrumah", role: "Admin", isYou: false, avatar: "https://i.pravatar.cc/150?u=2", percentage: 20, status: "Pending", color: "#60A5FA" },
  { id: 3, name: "Adebayo Chidera", role: "Admin", isYou: false, avatar: "https://i.pravatar.cc/150?u=3", percentage: 10, status: "Confirmed", color: "#FBBF24" },
  { id: 4, name: "Isabella Martinez", role: "Member", isYou: false, avatar: "https://i.pravatar.cc/150?u=4", percentage: 10, status: "Confirmed", color: "#34D399" },
  { id: 5, name: "Agbarapo Omolile", role: "Member", isYou: false, avatar: "https://i.pravatar.cc/150?u=5", percentage: 10, status: "Confirmed", color: "#FCA5A5" },
  { id: 6, name: "Alayemi Konibaje", role: "Member", isYou: false, avatar: "https://i.pravatar.cc/150?u=6", percentage: 10, status: "Confirmed", color: "#A5B4FC" },
  { id: 7, name: "Ekotibaje Already", role: "Member", isYou: false, avatar: "https://i.pravatar.cc/150?u=7", percentage: 10, status: "Confirmed", color: "#F9A8D4" },
  { id: 8, name: "Ogunonipami Tijesunimi", role: "Member", isYou: false, avatar: "https://i.pravatar.cc/150?u=8", percentage: 10, status: "Confirmed", color: "#99F6E4" },
];

const initialNiches = ["Beauty", "family and lifestyle", "skincare"];
const suggestedNiches = ["Fashion", "Design & Arts", "IT & Communication", "Food & Drink"];

const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState("Payout"); 
  const [view, setView] = useState<"main" | "edit" | "payout_setup" | "payout_edit">("main");
  const [payoutSet, setPayoutSet] = useState(true); 
  
  const [members, setMembers] = useState(initialMembers);
  const [selectedNiches, setSelectedNiches] = useState<string[]>(initialNiches);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const isAdminView = members.find(m => m.isYou)?.role === "Admin";

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
                  <p className="text-[14px] text-[#62636C]">The New Yorker</p>
                </div>
                <div className="border-t border-gray-50 pt-4">
                  <label className="text-[12px] font-semibold text-[#1E1F24] block mb-1">Description</label>
                  <p className="text-[14px] text-[#62636C] leading-relaxed">
                    Pentagram is the world's most acclaimed creative collective, where 23 partners work independently and collaboratively.
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
                  <p className="text-[14px] text-[#62636C]">Anyone can request to join, subject to approval.</p>
                </div>
                <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                  <div>
                    <label className="text-[12px] font-semibold text-[#1E1F24] block mb-1">Circle Invitation Code</label>
                    <p className="text-[14px] text-[#62636C]">1234AB</p>
                  </div>
                  <GoCopy className="text-gray-400 cursor-pointer hover:text-blue-600" size={20} />
                </div>
                <button onClick={() => setView("edit")} className="w-full mt-2 bg-[#0033FF] text-white py-4 rounded-full font-semibold text-[14px] hover:bg-blue-700 transition">
                  Edit General Settings
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                    <label className="text-[14px] font-semibold mb-2 block">Circle Name</label>
                    <input type="text" defaultValue="Pentagram" className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500" />
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
                    <textarea rows={3} className="w-full p-4 border border-gray-200 rounded-xl resize-none outline-none focus:border-blue-500" defaultValue="Pentagram is the world's most acclaimed creative collective" />
                </div>
                <button className="w-full py-4 rounded-full font-semibold text-[14px] bg-[#0033FF] text-white">Save Changes</button>
              </div>
            )
          )}

          {/* ================= MEMBERSHIP TAB ================= */}
          {activeTab === "Membership" && (
            <div className="space-y-6">
                <div className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-2xl border border-gray-100">
                    <GoInfo className="text-[#9CA3AF] mt-0.5 shrink-0" size={18} />
                    <p className="text-[12px] text-[#62636C] leading-tight">A Circle can only have 2-8 members. Only 2 out of the creators can be admins.</p>
                </div>
                <div className="space-y-6">
                    {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between relative">
                            <div className="flex items-center gap-3">
                                <img src={member.avatar} className="w-10 h-10 rounded-full border border-gray-100" alt="" />
                                <span className="text-[14px] font-semibold">{member.name} {member.isYou && <span className="text-[#9CA3AF] font-normal">(you)</span>}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${member.role === "Admin" ? "text-[#D847FF] bg-[#FDF2FF]" : "text-[#0085FF] bg-[#F0F7FF]"}`}>{member.role}</span>
                                
                                {isAdminView && !member.isYou && (
                                  <div className="relative">
                                    <button 
                                      onClick={() => setOpenDropdownId(openDropdownId === member.id ? null : member.id)}
                                      className="p-1 text-gray-400 hover:bg-gray-100 rounded-lg transition"
                                    >
                                      <HiOutlineDotsHorizontal size={20} />
                                    </button>
                                    
                                    {/* ACTIONS DROPDOWN */}
                                    {openDropdownId === member.id && (
                                      <div 
                                        ref={actionMenuRef}
                                        className="absolute right-0 mt-2 w-[180px] bg-white border border-gray-100 rounded-2xl shadow-xl z-[110] py-2 animate-in fade-in zoom-in duration-150"
                                      >
                                        <button className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#1E1F24] hover:bg-gray-50">
                                          {member.role === "Admin" ? "Remove as Admin" : "Make Admin"}
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#FF3B30] hover:bg-red-50">
                                          Remove from circle
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {isAdminView && <button className="w-fit bg-[#0033FF] text-white px-8 py-4 rounded-full font-semibold text-[14px] mt-4">Invite Members</button>}
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
                                <div key={m.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
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