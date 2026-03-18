"use client";

import { useState, useEffect } from "react";
import { FiX, FiCalendar, FiChevronDown, FiMinus, FiPlus, FiUpload, FiStar } from "react-icons/fi";
import { useModal } from "@/hooks/useModal";
import { toast } from "react-hot-toast";

// --- TYPES ---
interface Category {
  id: string;
  name: string;
}

interface ChallengeFormData {
  title: string;
  description: string;
  brief: string;
  category_id: string;
  content_type: string;
  currency: string;
  prize_pool: number;
  num_winners: number;
  content_requirements: string[];
  required_hashtags: string[];    // ← add
  required_mentions: string[];    // ← add
  start_date: string;
  end_date: string;
  platforms: string[];
  max_participants: number;
  banner_url: string;             // ← add
  documents: string[];            // ← add
}

export default function CreateChallengeModal() {
  const { close } = useModal();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rating, setRating] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

 const [formData, setFormData] = useState<ChallengeFormData>({
  title: "",
  description: "",
  brief: "",
  category_id: "",
  content_type: "reel",
  currency: "NGN",
  prize_pool: 0,
  num_winners: 1,
  content_requirements: [""],
  required_hashtags: [],          // ← add
  required_mentions: [],          // ← add
  start_date: "",
  end_date: "",
  platforms: ["Instagram", "TikTok"],
  max_participants: 100,
  banner_url: "",                 // ← add
  documents: [],                  // ← add
});

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://starix-backend.onrender.com/api/categories", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) updateField("category_id", data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  fetchCategories();
}, []);


  const updateField = (field: keyof ChallengeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (formData.description.length < 10) {
  toast.error("Description must be at least 10 characters.");
  return;
}
if (formData.title.length < 3) {
  toast.error("Title is too short.");
  return;
}

  const handleCreateChallenge = async (isDraft: boolean) => {
    
  const token = localStorage.getItem("token"); // ← fix the key
  
  console.log("Token found:", token); // add this
  
  if (!token) {
    console.error("No access token found. User must be logged in.");
    return;
  }

    setLoading(true);
    try {
      const koboAmount = Number(formData.prize_pool) * 100;
      
      const distribution: Record<string, number> = {};
    for (let i = 1; i <= formData.num_winners; i++) {
    distribution[String(i)] = Math.floor(koboAmount / formData.num_winners); // ← "1", "2", "3"...
    }

      const payload = {
    title: formData.title,
    description: formData.description,
    brief: formData.brief,
    category_id: formData.category_id,
    content_type: formData.content_type,
    currency: formData.currency,
    prize_pool: koboAmount,
    num_winners: formData.num_winners,
    prize_distribution: distribution,
    content_requirements: formData.content_requirements.filter(r => r !== ""),
    required_hashtags: formData.required_hashtags,
    required_mentions: formData.required_mentions,
    platforms: formData.platforms,
    start_date: formData.start_date ? new Date(formData.start_date).toISOString() : new Date().toISOString(),
    end_date: formData.end_date ? new Date(formData.end_date).toISOString() : new Date().toISOString(),
    banner_url: formData.banner_url || "",
    max_participants: formData.max_participants,
    documents: formData.documents,
    status: isDraft ? "DRAFT" : "ACTIVE"
    };

      const response = await fetch("https://starix-backend.onrender.com/api/challenges", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // 2. ADD THE AUTHORIZATION HEADER HERE
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Challenge Created:", result);
        
        if (isDraft) {
          close();
        } else {
          setStep(4);
        }
      } else if (response.status === 401) {
        console.error("Unauthorized: Token might be expired or invalid.");
      } else {
        const errorData = await response.json();
        console.error("Server Error Full:", JSON.stringify(errorData.detail, null, 2));
        }
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full md:w-[640px] h-auto max-h-[95vh] rounded-[32px] flex flex-col overflow-hidde">
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 custom-scrollbar">
        
        {/* HEADER */}
        <div className="relative">
          <h2 className="text-center text-2xl font-semibold text-dark-navy">
            {step === 5 ? "Starix Feedback" : step === 4 ? "Fund Challenge" : "Create Challenge"}
          </h2>
          
        </div>

        {/* STEP 1: GENERAL INFO */}
        {step === 1 && (
          <div className="space-y-7 animate-in fade-in duration-300">
            <Input label="Challenge Name" value={formData.title} onChange={(v) => updateField("title", v)} />
            <Input label="Challenge Description" value={formData.description} onChange={(v) => updateField("description", v)} />
            <Input 
              label="Content Requirements" 
              placeholder="eg: use hashtags, 1min video"
              value={formData.content_requirements[0]} 
              onChange={(v) => updateField("content_requirements", [v])} 
            />
            <div className="grid grid-cols-2 gap-4">
              <DateInput label="Start Date" value={formData.start_date} onChange={(v) => updateField("start_date", v)} />
              <DateInput label="End Date" value={formData.end_date} onChange={(v) => updateField("end_date", v)} />
            </div>
            <button 
              onClick={nextStep} 
              className="w-full bg-dark-navy text-white py-4 rounded-full font-semibold shadow-md mt-4 hover:opacity-90 transition-opacity"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2: DETAILS & REWARDS */}
        {step === 2 && (
          <div className="space-y-7 animate-in slide-in-from-right-4 duration-300">
            <SelectInput 
              label="Content Type" 
              value={formData.content_type}
              options={[{id: 'reel', name: 'Reel'}, {id: 'video', name: 'Video'}, {id: 'image', name: 'Image'}]} 
              onChange={(v) => updateField("content_type", v)} 
            />
            <SelectInput 
              label="Category / Niche" 
              value={formData.category_id}
              options={categories} 
              onChange={(v) => updateField("category_id", v)} 
            />
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Reward (NGN)</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium">N</span>
                <input 
                  type="number" 
                  value={formData.prize_pool || ""}
                  className="w-full border border-gray-200 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-dark-navy transition-all" 
                  onChange={(e) => updateField("prize_pool", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">No of Winners</label>
              <div className="flex items-center gap-4">
                <CounterBtn icon={<FiMinus />} onClick={() => updateField("num_winners", Math.max(1, formData.num_winners - 1))} />
                <div className="w-20 py-4 border border-gray-200 rounded-2xl text-center font-medium">{formData.num_winners}</div>
                <CounterBtn icon={<FiPlus />} onClick={() => updateField("num_winners", formData.num_winners + 1)} />
              </div>
            </div>
            <div className="pt-10 space-y-4">
              <button onClick={prevStep} className="w-full border border-dark-navy text-dark-navy py-4 rounded-full font-semibold">Back</button>
              <button onClick={nextStep} className="w-full bg-dark-navy text-white py-4 rounded-full font-semibold shadow-md">Next</button>
            </div>
          </div>
        )}

        {/* STEP 3: TEMPLATES & DRAFT */}
        {step === 3 && (
          <div className="space-y-7 animate-in slide-in-from-right-4 duration-300">
            <Input label="Brief Templates" value={formData.brief} onChange={(v) => updateField("brief", v)} />
            <div>
              <label className="text-sm font-medium text-gray-700 mb-4 block">Upload Document</label>
              <div className="border-2 border-dashed border-gray-200 rounded-[32px] p-10 flex flex-col items-center justify-center space-y-4">
                <FiUpload className="w-8 h-8 text-gray-300" />
                <label className="cursor-pointer bg-gray-50 px-6 py-3 rounded-full text-sm font-semibold border border-gray-100 hover:bg-gray-100">
                  Select From Computer
                  <input type="file" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
                </label>
                <p className="text-gray-400 text-sm underline">{uploadedFile ? uploadedFile.name : "Drop File here"}</p>
              </div>
            </div>
            <div className="pt-10 space-y-4">
              <button 
                disabled={loading}
                onClick={() => handleCreateChallenge(true)} 
                className={`w-full border border-dark-navy text-dark-navy py-4 rounded-full font-semibold transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Sending Data..." : "Save As Draft"}
              </button>
              <button 
                disabled={loading}
                onClick={nextStep} 
                className="w-full bg-dark-navy text-white py-4 rounded-full font-semibold shadow-md"
              >
                Fund Challenge
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PAYSTACK */}
        {step === 4 && (
          <div className="flex flex-col items-center py-12 space-y-12 animate-in zoom-in-95 duration-300 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-dark-navy">Activate Challenge with Paystack</h3>
              <p className="text-gray-400 max-w-[360px] mx-auto">Funds are securely held in escrow until winners are selected</p>
            </div>
            <button 
              disabled={loading}
              onClick={() => handleCreateChallenge(false)} 
              className="w-full bg-[#000033] text-white py-5 rounded-full text-lg font-medium shadow-lg"
            >
              {loading ? "Initializing Paystack..." : "Go To Paystack"}
            </button>
          </div>
        )}

        {/* STEP 5: FEEDBACK */}
        {step === 5 && (
          <div className="space-y-10 py-4 animate-in fade-in duration-300">
            <div className="space-y-4">
              <p className="text-lg font-medium text-dark-navy">How was the challenge process?</p>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} onClick={() => setRating(star)} className={`w-10 h-10 cursor-pointer ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-medium text-dark-navy">What would you like to ask about?</p>
              <textarea placeholder="Improvements..." className="w-full border border-gray-200 rounded-2xl p-6 h-32 outline-none focus:border-dark-navy transition-all" />
            </div>
            <button onClick={close} className="w-full bg-[#000033] text-white py-5 rounded-full text-lg font-medium shadow-lg">Send</button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder} 
        className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-dark-navy transition-all text-gray-800 placeholder:text-gray-400" 
      />
    </div>
  );
}

function SelectInput({ label, options, value, onChange }: { label: string; options: Category[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)} 
          className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none appearance-none bg-transparent relative z-10 text-gray-800"
        >
          {options.map((opt) => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
        </select>
        <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex-1">
      <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>
      <div className="relative">
        <input 
          type="date" 
          value={value}
          onChange={(e) => onChange(e.target.value)} 
          className="w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none text-gray-800 focus:border-dark-navy transition-all" 
        />
        <FiCalendar className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function CounterBtn({ icon, onClick }: { icon: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-gray-600 active:scale-95">
      {icon}
    </button>
  );
}