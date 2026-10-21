/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { FiX, FiUploadCloud, FiPlus, FiChevronDown, FiCopy, FiCheck, FiRefreshCcw, FiTrash2, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCreateCircle, useSendInvites } from "@/hooks/useCircles";
import { useUploadMedia } from "@/hooks/useMedia";

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

const DEFAULT_INVITES: MemberInvite[] = [
  { email: "", role: "Admin" },
  { email: "", role: "Admin" },
  { email: "", role: "Member" },
];
const MAX_CIRCLE_MEMBERS = 7;

function memberOrdinal(position: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = position % 100;
  return `${position}${suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]}`;
}



const CreateCircleModal = ({ isOpen, onClose, initialStep = "CREATE" }: Props) => {
  const [step, setStep] = useState<ModalStep>(initialStep);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const createMutation = useCreateCircle();
  const uploadMedia = useUploadMedia();

  

  // Form States
  const [circleName, setCircleName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Only people with a code or invite can join");
  const [invites, setInvites] = useState<MemberInvite[]>(DEFAULT_INVITES);
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const createdCircleId =
    createMutation.data?.id || createMutation.data?.circle_id || "";
  const sendInvitesMutation = useSendInvites(createdCircleId);

  const roleOptions: MemberInvite["role"][] = ["Admin", "Member"];

  const handleCreateCircle = async () => {
  let uploadedImageUrl: string | null = null;
  const file = fileInputRef.current?.files?.[0];

  try {
    // 1. Handle Media Upload if a file exists
    if (file) {
      // Pass the specific target required by your backend
      const { public_url } = await uploadMedia.mutateAsync({
        file,
        target: "circle_profile_picture"
      });
      uploadedImageUrl = public_url;
    }

    // 2. Create the circle with the received URL
    createMutation.mutate({
      name: circleName,
      description: description,
      privacy: privacy.includes("code") ? "private" : "public",
      niches: [],
      ...(uploadedImageUrl ? { profile_picture_url: uploadedImageUrl } : {}),
    }, {
      onSuccess: () => {
        setStep("SUCCESS");
      },
      onError: (err: any) => {
        alert(err?.response?.data?.detail || "Error creating circle");
      }
    });
  } catch (err: any) {
    // This catches both the media upload error and the API creation error
    console.error("Upload/Creation failed:", err);
    alert("Process failed. Please check your file or connection.");
  }
};
  // 2. Sync internal step tracking when modal visibility or initial targets change
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    } else {
      setOpenDropdownIdx(null);
    }
  }, [isOpen, initialStep]);

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

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep("CREATE");
      setInviteSuccess(false);
      setInviteError(null);
      setInvites(DEFAULT_INVITES);
    }, 300);
  };

  const handleSendInvitesSubmission = async () => {
    setInviteError(null);

    if (inviteSuccess) {
      resetAndClose();
      return;
    }

    const activeInvites = invites.filter((invite) => invite.email.trim() !== "");
    if (!createdCircleId) {
      setInviteError("Circle was created, but its ID is missing. Close and try inviting from the circle page.");
      return;
    }
    if (activeInvites.length === 0) {
      setInviteError("Please enter at least one email address.");
      return;
    }

    try {
      await sendInvitesMutation.mutateAsync(
        activeInvites.map((invite) => ({
          email: invite.email.trim(),
          role: invite.role.toLowerCase() as "member" | "admin",
        }))
      );
      setInviteSuccess(true);
      toast.success("Invitations sent");
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to send invitations.";
      setInviteError(typeof detail === "string" ? detail : "Failed to send invitations.");
    }
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
    setInviteSuccess(false);
    setInviteError(null);
  };

  const updateInviteRole = (index: number, role: MemberInvite["role"]) => {
    setInvites((current) =>
      current.map((invite, idx) =>
        idx === index ? { ...invite, role } : invite
      )
    );
    setOpenDropdownIdx(null);
  };

  const addInviteField = () => {
    // Creator is member 1, so invite slots are 2nd–7th.
    if (invites.length < MAX_CIRCLE_MEMBERS - 1) {
      setInvites([...invites, { email: "", role: "Member" }]);
    }
  };

  const copyToClipboard = () => {
  const joinCode = createMutation.data?.join_code;
  
  if (joinCode) {
    navigator.clipboard.writeText(joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};

  // Combined pending state — image upload (if any) runs before circle creation
  const isSubmitting = uploadMedia.isPending || createMutation.isPending;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 bg-black/50 backdrop-blur-sm">
      <div className={`bg-white w-full ${step === "SUCCESS" ? "max-w-[520px]" : step === "INVITE" ? "max-w-[480px]" : "max-w-[560px]"} ${step === "INVITE" ? "p-6 md:p-8" : "p-4 md:p-6"} rounded-[32px] shadow-xl transition-all duration-300 overflow-y-auto max-h-[95vh] no-scrollbar`}>
        
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
                        <Image src="/avatar.webp" width={48} height={48} alt="Placeholder" className="opacity-20" />
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

              <button 
                onClick={handleCreateCircle} 
                disabled={!circleName || isSubmitting} 
                className={`w-full py-4.5 rounded-full font-semibold text-[16px] transition-all 
                  ${circleName ? 'bg-[#0047FF] text-white shadow-lg shadow-blue-100' : 'bg-[#8EAAFF] text-white cursor-not-allowed'}`}
              >
                {uploadMedia.isPending
                  ? "Uploading image..."
                  : createMutation.isPending
                    ? "Creating..."
                    : "Next"}
              </button> 
            </div>
          </div>
        )}

        {step === "SUCCESS" && (
          <div className="animate-in zoom-in duration-300 flex flex-col md:flex-row items-center gap-8 py-2">
            {/* ... Image container remains the same ... */}
            <div className="w-[160px] h-[160px] flex-shrink-0 rounded-[40px] overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
              {imagePreview ? (
                <img src={imagePreview} alt="Success" className="w-full h-full object-cover" />
              ) : (
                <img src="/White BG logo.jpg" alt="Default Success" className="w-full h-full object-cover" />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-[24px] font-semibold text-[#1E1F24] mb-2 tracking-tight">Circle Created!</h2>
              
              {/* Dynamic text based on privacy selection */}
              <p className="text-[#62636C] text-[15px] leading-relaxed mb-6">
                {privacy.includes("code") ? (
                  <>
                    Your circle is ready. Share your invite code <span className="font-semibold text-[#1E1F24]">({createMutation.data?.join_code || "N/A"})</span> to start adding members.
                  </>
                ) : (
                  "Your circle is ready. You can now invite members to join your community."
                )}
              </p>

              {/* 
                This diagram illustrates how your UI component evaluates the 'privacy' state 
                to decide which interface elements to mount/unmount in the DOM.
              */}
              
              <div className="flex flex-row items-center gap-3">
                {/* Only show "Copy Code" if it is private/invite-only */}
                {privacy.includes("code") && (
                  <button 
                      onClick={copyToClipboard} 
                      className="flex-1 whitespace-nowrap px-6 py-3 border border-[#E5E7EB] rounded-full font-semibold text-[14px] text-[#1E1F24] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                  >
                      {copied ? <FiCheck className="text-green-500" /> : null}
                      {copied ? "Copied" : "Copy Code"}
                  </button>
                )}
                
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
            <div className="flex justify-between items-start mb-8">
              <div className="pr-6">
                <h2 className="text-[22px] font-semibold text-[#1E1F24] tracking-tight">Invite Members</h2>
                <p className="text-[#8B8D98] text-[13px] mt-1.5 leading-relaxed">
                  Invite creators to your circle and assign roles. You can add up to 7 members.
                </p>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="p-1 text-[#C1C3CD] hover:text-[#62636C] transition"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            {inviteSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center gap-2">
                <FiCheckCircle size={20} />
                <span className="font-medium">Invitations sent. Recipients will get an email with a join link.</span>
              </div>
            )}

            {inviteError && !inviteSuccess && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
                <FiAlertCircle size={16} /> {inviteError}
              </div>
            )}

            <div className="space-y-5">
              {invites.map((invite, idx) => (
                <div
                  key={idx}
                  className={`space-y-2 ${openDropdownIdx === idx ? "relative z-50" : ""}`}
                >
                  <label className="text-[13px] font-medium text-[#1E1F24]">
                    {memberOrdinal(idx + 2)} Creator&apos;s email
                  </label>
                  <div className="relative">
                    <input
                      value={invite.email}
                      onChange={(e) => handleInviteEmailChange(idx, e.target.value)}
                      placeholder="Enter email address"
                      className="w-full rounded-[14px] border border-[#E8E9EE] py-[14px] pl-4 pr-[108px] text-[14px] text-[#1E1F24] placeholder:text-[#C1C3CD] outline-none focus:border-[#0033FF]"
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
                        className="flex items-center gap-1 rounded-full border border-[#E8E9EE] bg-white px-2.5 py-1 text-[12px] font-medium text-[#62636C] hover:bg-gray-50 transition"
                      >
                        {invite.role}
                        <FiChevronDown
                          size={14}
                          className={`text-[#8B8D98] transition ${openDropdownIdx === idx ? "rotate-180" : ""}`}
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
                </div>
              ))}

              {invites.length < MAX_CIRCLE_MEMBERS - 1 && (
                <button
                  type="button"
                  onClick={addInviteField}
                  className="relative w-full py-[13px] border border-[#E8E9EE] rounded-full text-[14px] font-medium text-[#1E1F24] hover:bg-gray-50 transition"
                >
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[18px] leading-none text-[#8B8D98]">+</span>
                  Add User
                </button>
              )}

              <button
                type="button"
                onClick={handleSendInvitesSubmission}
                disabled={
                  sendInvitesMutation.isPending ||
                  (!inviteSuccess && !invites.some((invite) => invite.email.trim()))
                }
                className={`w-full mt-3 py-4 rounded-full font-semibold text-[15px] transition-colors ${
                  inviteSuccess || invites.some((invite) => invite.email.trim())
                    ? "bg-[#0033FF] text-white hover:bg-blue-700"
                    : "bg-[#8EAAFF] text-white cursor-not-allowed"
                }`}
              >
                {sendInvitesMutation.isPending
                  ? "Sending..."
                  : inviteSuccess
                    ? "Done"
                    : "Send Invites"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCircleModal;