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

  const stats = [
    { label: "Total Engagement", value: String(profile?.total_challenges_joined ?? 0) },
    { label: "Top Platform", value: "TikTok" },
    { label: "Avg Engagement Rate", value: "10%" },
    { label: "Weekly Growth", value: "8%" },
  ];

  /* ================= PROFILE HEADER ================= */

  const ProfileHeader = () => (
    <Card>
      <div className="flex flex-col gap-8">

        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300"
            className="w-28 h-28 rounded-full object-cover shrink-0"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-medium text-[#0F1035]">
                {profile?.display_name || "Favour"}
              </h1>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-sm">
                Fashion
              </span>
            </div>

            <p className="text-gray-400 text-base font-light mt-1">
              @{profile?.display_name || "favvy"}
            </p>

            <p className="text-gray-700/80 text-sm sm:text-lg mt-2 line-clamp-2 max-w-xl">
              “{profile?.bio || "I love creating contents and building communities around the world."}”
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-fit">
            <button
              onClick={() => open(<UpdateProfile />)}
              className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
            >
              <FiEdit2 /> Edit Profile
            </button>

            <div className="px-4 py-2 bg-indigo-50 rounded-lg text-center">
              Starix Score: <span className="font-semibold">{profile?.reputation_score || 150}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

          <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl w-fit">
            <MdStarRate color="#6366F1" />
            EMERGING CREATOR
          </div>

          {/* LEVEL RING */}
          <div className="flex items-center gap-4">
            Level 2
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `conic-gradient(#99ADFF 0% 75%, #E5E7EB 75% 100%)` }}
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                <span className="text-xs font-light text-gray-700">
                  {profile?.win_rate || 75}%
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-400">
            Creator since: {formatMonthYear(profile?.created_at, false)}
          </p>
        </div>

      </div>
    </Card>
  );

  /* ================= PAGE ================= */

  return (
    <motion.div
      className="w-full max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-8 bg-[#F7F8FA]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* MAIN */}
        <div className="lg:col-span-3 space-y-8">
          <ProfileHeader />

          <Section title="Portfolio" />

          <Card>
            <AnalyticsPreview stats={stats} />
          </Card>

          <Section title="Submissions" />
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit w-full">
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

          <Card><SocialMedia /></Card>
        </div>

      </div>
    </motion.div>
  );
}

/* ================= HELPERS ================= */

const Card = ({ children }: any) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    {children}
  </div>
);

const Section = ({ title }: any) => (
  <Card>
    <div className="flex justify-between mb-4">
      <h2 className="font-semibold">{title}</h2>
      <button className="text-sm text-gray-500 hover:text-gray-800">
        View
      </button>
    </div>

    {/* GRID NOT SLIDER */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <PostCard key={i} />
      ))}
    </div>
  </Card>
);
