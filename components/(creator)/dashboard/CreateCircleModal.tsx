/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { FiX, FiUploadCloud, FiPlus, FiChevronDown, FiCopy, FiCheck, FiRefreshCcw, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ModalStep = "CREATE" | "SUCCESS" | "INVITE";

interface MemberInvite {
  email: string;
  role: "Admin" | "Member";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: ModalStep; // 1. Added optional configuration prop
}

const CreateCircleModal = ({ isOpen, onClose, initialStep = "CREATE" }: Props) => {
  const router = useRouter();
  const [step, setStep] = useState<ModalStep>(initialStep);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // Form States
  const [circleName, setCircleName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Only people with a code or invite can join");
  const [invites, setInvites] = useState<MemberInvite[]>([
    { email: "", role: "Admin" },
    { email: "", role: "Member" },
  ]);

  // 2. Sync internal step tracking when modal visibility or initial targets change
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  if (!isOpen) return null;

  const handleSendInvitesSubmission = () => {
    router.push("/creator-circles/circle-profile");
    onClose();
    setTimeout(() => {
      setStep("CREATE"); 
    }, 300);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);
    if (file) {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setImageError("Only PNG and JPG files are supported.");
        if (!imagePreview) {
          setImagePreview(null);
        }
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
    }
  };

  const handleInviteEmailChange = (index: number, value: string) => {
    const newInvites = [...invites];
    newInvites[index].email = value;
    setInvites(newInvites);
  };

  const addInviteField = () => {
    if (invites.length < 7) {
      setInvites([...invites, { email: "", role: "Member" }]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("1234CF");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 bg-black/50 backdrop-blur-sm">
      <div className={`bg-white w-full ${step === 'SUCCESS' ? 'max-w-[520px]' : 'max-w-[560px]'} rounded-[32px] p-4 md:p-6 shadow-xl transition-all duration-300 overflow-y-auto max-h-[95vh] no-scrollbar`}>
        
        {step === "CREATE" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-[24px] font-semibold text-[#1E1F24]">Create a Circle</h2>
                <p className="text-[#62636C] text-[14px] mt-1">Set up your circle and invite creators to collaborate.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-[#9CA3AF]"><FiX size={24} /></button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-[15px] font-semibold text-[#1E1F24]">Logo or Display Picture</label>
                
                <div className="flex items-center gap-5">
                  <div className="w-[100px] h-[100px] md:w-24 md:h-24 bg-[#F9FAFB] rounded-[24px] flex items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden relative">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <Image src="/avatar.svg" width={48} height={48} alt="Placeholder" className="opacity-20" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/png, image/jpeg" />
                    
                    {imagePreview ? (
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => fileInputRef.current?.click()} 
                                className="flex items-center gap-2 px-5 py-2 border border-[#E5E7EB] rounded-full text-[12px] font-semibold text-[#1E1F24] hover:bg-gray-50 transition-all"
                            >
                                <FiRefreshCcw size={16} /> Replace
                            </button>
                            <button 
                                onClick={removeImage} 
                                className="flex items-center gap-2 px-5 py-2 border border-[#E5E7EB] rounded-full text-[12px] font-semibold text-[#1E1F24] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                            >
                                <FiTrash2 size={16} /> Remove
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-2 border border-[#E5E7EB] rounded-full text-[12px] font-semibold text-[#1E1F24] hover:bg-gray-50 transition-all">
                            <FiUploadCloud size={16} /> Upload Image
                        </button>
                    )}
                    
                    <p className="text-[12px] text-[#9CA3AF] leading-snug">Upload 400x400 clear PNG or JPEG image of 20MB max size</p>
                    {imageError && <p className="text-[12px] text-red-500 font-medium pt-1">{imageError}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[15px] font-semibold text-[#1E1F24]">Circle Name</label>
                <input value={circleName} onChange={(e) => setCircleName(e.target.value)} type="text" placeholder="Pentagram" className="w-full border border-[#E5E7EB] rounded-xl py-4 px-4 text-[14px] outline-none focus:ring-2 focus:ring-blue-100" />
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-[15px] font-semibold text-[#1E1F24]">Who can join this circle?</label>
                <div className="space-y-3.5">
                  {["Only people with a code or invite can join", "Anyone can request to join, subject to approval"].map((text) => (
                    <label key={text} className="flex items-center gap-3.5 cursor-pointer group">
                      <input type="radio" checked={privacy === text} onChange={() => setPrivacy(text)} className="w-5 h-5 accent-[#0047FF] border-[#E5E7EB]" />
                      <span className={`text-[14px] font-medium transition-colors ${privacy === text ? 'text-[#1E1F24]' : 'text-[#62636C]'} group-hover:text-[#1E1F24]`}>{text}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 ">
                <label className="block text-[15px] font-semibold text-[#1E1F24]">Circle Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Pentagram is the world's most acclaimed creative collective..." rows={4} className="w-full border border-[#E5E7EB] rounded-xl py-4 px-4 text-[14px] outline-none focus:ring-2 focus:ring-blue-100 resize-none leading-relaxed" />
              </div>

              <button onClick={() => setStep("SUCCESS")} disabled={!circleName} className={`w-full py-4.5 rounded-full font-semibold text-[16px] transition-all ${circleName ? 'bg-[#0047FF] text-white shadow-lg shadow-blue-100' : 'bg-[#8EAAFF] text-white cursor-not-allowed'}`}>Next</button>
            </div>
          </div>
        )}

        {step === "SUCCESS" && (
          <div className="animate-in zoom-in duration-300 flex flex-col md:flex-row items-center gap-8 py-2">
            <div className="w-[160px] h-[160px] flex-shrink-0 rounded-[40px] overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
              {imagePreview ? (
                <img src={imagePreview} alt="Success" className="w-full h-full object-cover" />
              ) : (
                <img src="/White BG logo.jpg" alt="Default Success" className="w-full h-full object-cover" />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[24px] font-semibold text-[#1E1F24] mb-2 tracking-tight">Circle Created!</h2>
              <p className="text-[#62636C] text-[15px] leading-relaxed mb-6">
                Your circle is ready. Share your invite code <span className="font-semibold text-[#1E1F24]">(1234CF)</span> to start adding members.
              </p>
              
              <div className="flex flex-row items-center gap-3">
                <button 
                    onClick={copyToClipboard} 
                    className="flex-1 whitespace-nowrap px-6 py-3 border border-[#E5E7EB] rounded-full font-semibold text-[14px] text-[#1E1F24] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                >
                    {copied ? <FiCheck className="text-green-500" /> : null}
                    {copied ? "Copied" : "Copy Code"}
                </button>
                
                <button 
                    onClick={() => setStep("INVITE")} 
                    className="flex-1 whitespace-nowrap px-6 py-3 bg-[#0047FF] text-white rounded-full font-semibold text-[14px] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                    Invite Members
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "INVITE" && (
          <div className="animate-in slide-in-from-right-4 duration-300">
             <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-[24px] font-semibold text-[#1E1F24]">Invite Members</h2>
                <p className="text-[#62636C] text-[14px] mt-1">Invite creators to your circle and assign roles. You can add up to 7 members.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-[#9CA3AF]"><FiX size={24} /></button>
            </div>

            <div className="space-y-4">
              {invites.map((invite, idx) => (
                <div key={idx} className="space-y-2">
                    <label className="text-[12px] font-semibold text-[#1E1F24]">{idx + 1} Creator's email</label>
                    <div className="relative">
                        <input value={invite.email} onChange={(e) => handleInviteEmailChange(idx, e.target.value)} placeholder="Enter email address" className="w-full border rounded-xl py-3 px-4 text-[#14px] outline-none" />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-gray-50 border px-2 py-1 rounded-lg text-[12px] font-semibold text-gray-600">
                            {invite.role} <FiChevronDown />
                        </div>
                    </div>
                </div>
              ))}
              
              <button onClick={addInviteField} className="w-full py-3 border border-dashed rounded-xl font-semibold text-sm text-gray-500 flex items-center justify-center gap-2">
                <FiPlus /> Add User
              </button>

              <button 
                onClick={handleSendInvitesSubmission} 
                className="w-full mt-8 py-4 bg-[#0047FF] text-white rounded-full font-semibold transition-colors hover:bg-blue-700"
              >
                Send Invites
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCircleModal;