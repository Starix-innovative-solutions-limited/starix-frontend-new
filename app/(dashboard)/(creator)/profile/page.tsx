"use client";

import { motion } from "framer-motion";
import PaymentDetails from "@/components/(creator)/dashboard/profile/PaymentDetails";
import SocialMedia from "@/components/(creator)/dashboard/profile/SocialMedia";
import AnalyticsPreview from "@/components/(creator)/dashboard/profile/AnalyticsPreview";
import PostCard from "@/components/(creator)/dashboard/PostCard";
import { FiEdit2 } from "react-icons/fi";
import { MdStarRate } from "react-icons/md";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMonthYear } from "@/lib/formatDate";
import UpdateProfile from "@/components/(creator)/dashboard/profile/UpdateProfile";
import { useModal } from "@/hooks/useModal";

export default function Page() {
  const { open } = useModal();
  const { profile } = useAuthStore();

  // Dynamic stats from profile data
  const stats = [
    { label: "Total Challenges", value: String(profile?.total_challenges_joined ?? 0) },
    { label: "Top Platform", value: profile?.top_platform || "Not Linked" },
    { label: "Avg Engagement", value: `${profile?.avg_engagement_rate || 0}%` },
    { label: "Starix Score", value: String(profile?.reputation_score || 0) },
  ];

  /* ================= PROFILE HEADER ================= */

  const ProfileHeader = () => (
    <Card>
      <div className="flex flex-col gap-6">

        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Use profile image or fallback to a placeholder with user initials */}
          {profile?.profile_image ? (
             <img
              src={profile?.profile_image || "/avatar.svg"} // 💡 Use the key returned by the backend
              alt={profile?.full_name}
              className="w-28 h-28 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold shrink-0">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
          )}

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-medium text-[#0F1035]">
                {profile?.full_name || "User Name"} {/* 💡 Changed from display_name */}
              </h1>
              {/* Show actual category/niche */}
              <span className="px-3 py-1 bg-[#f3f3f3] text-gray-500 rounded-md text-sm capitalize">
                {profile?.category || "Content Creator"}
              </span>
            </div>

            <p className="text-gray-400 text-base font-light mt-1">
              @{profile?.username || "user"}
            </p>

            <p className="text-gray-700/80 text-sm sm:text-lg mt-2 line-clamp-2 max-w-xl">
              {profile?.bio ? `“${profile.bio}”` : "“No bio added yet.”"}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-fit">
            <button
              onClick={() => open(<UpdateProfile />)}
              className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FiEdit2 /> Edit Profile
            </button>

            <div className="px-4 py-2 bg-indigo-50 rounded-lg text-center text-indigo-700">
              Starix Score: <span className="font-semibold">{profile?.reputation_score || 0}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-t border-gray-50 pt-6">

          <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl w-fit text-indigo-600 font-medium">
            <MdStarRate />
            {profile?.creator_tier || "EMERGING CREATOR"}
          </div>

          {/* LEVEL RING */}
          <div className="flex items-center gap-4 text-gray-600">
            Level {profile?.level || 1}
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                background: `conic-gradient(#6366F1 0% ${profile?.win_rate || 0}%, #E5E7EB ${profile?.win_rate || 0}% 100%)` 
              }}
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-700">
                  {profile?.win_rate || 0}%
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            Member since: {profile?.created_at ? formatMonthYear(profile.created_at, false) : "N/A"}
          </p>
        </div>

      </div>
    </Card>
  );

  return (
    <motion.div
      className="w-full max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-8 bg-[#F7F8FA]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <ProfileHeader />
          <Section title="Portfolio" />
          <Card>
            <AnalyticsPreview stats={stats} />
          </Card>
          <Section title="Submissions" />
        </div>

        <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 h-fit w-full">
          <Card>
            <PaymentDetails
              bankDetails={{
                bank_account_number: profile?.bank_account_number ?? "",
                bank_code: profile?.bank_code ?? "",
                bank_name: profile?.bank_name ?? "",
                bank_account_name: profile?.bank_account_name ?? "",
                bank_verified: profile?.bank_verified ?? false,
                bank_verified_at: profile?.bank_verified_at ?? "",
              }}
            />
          </Card>
          <Card>
            <SocialMedia />
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= HELPERS (Kept same as yours) ================= */
const Card = ({ children }: any) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
    {children}
  </div>
);

const Section = ({ title }: any) => (
  <Card>
    <div className="flex justify-between mb-6">
      <h2 className="font-semibold text-lg text-[#0F1035]">{title}</h2>
      <button className="text-sm text-indigo-600 font-medium hover:underline">
        View All
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <PostCard key={i} />
      ))}
    </div>
  </Card>
);