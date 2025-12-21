/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import PaymentDetails from "@/components/dashboard/profile/PaymentDetails";
import SocialMedia from "@/components/dashboard/profile/SocialMedia";
import AnalyticsPreview from "@/components/dashboard/profile/AnalyticsPreview";
import PostCard from "@/components/dashboard/PostCard";
// import { BsStar } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdStarRate } from "react-icons/md";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMonthYear } from "@/lib/formatDate";
import { StatItem } from "@/utils/type";
import UpdateProfile from "@/components/dashboard/profile/UpdateProfile";
import { useModal } from "@/hooks/useModal";

export default function Page() {
  // const { data: profile, isLoading, isError } = useCreatorProfile();

  const { open } = useModal()

  const { profile } = useAuthStore()

  console.log("profile", profile)

  const stats: StatItem[] = [
    {
      label: 'Total Engagement',
      value: String(profile?.total_challenges_joined ?? 0),
    },
    { label: 'Top-Performing Platform', value: 'TikTok', socials: true },
    { label: 'Avg Engagement Rate', value: '10h' },
    { label: 'Weekly Growth', value: '10%' },
  ];

  const ProfileHeader = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-start justify-between gap-7">
          <div className="flex gap-4 grow">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover object-top"
            />
            <div className="grow">
              <div className="flex items-center  gap-3 mb-1">
                <h1 className="text-2xl font-normal">{profile?.display_name}</h1>
                <span className="px-2 py-1 bg-[#f5f5f5] text-neut/50 rounded-md border border-neut/5 text-xs ml-auto">
                  Fashion
                </span>
              </div>
              <p className="text-neut/60 font-light text-base mb-3">@{profile?.display_name}</p>
              <p className="text-dark-navy/70 font-light text-base max-w-lg">
                &quot;{profile?.bio ? profile?.bio : '-----'}&quot;
              </p>
            </div>

          </div>
          <div className="flex flex-col gap-4 md:gap-7">
            <button
              onClick={() => open(<UpdateProfile />)}
              className="flex items-center gap-2 px-2 py-1 max-md:w-fit max-md:ml-auto md-px-4 md:py-2 text-dark-navy/70 border border-dark-navy/50 rounded-full hover:bg-gray-50 transition">
              <FiEdit2 className="max-md:text-xs text-base" />
              <span className="max-md:text-xs">Edit Profile</span>
            </button>
            <div className="px-4 py-2 bg-[#EBEFFF] rounded-lg">
              <span className="text-sm text-dark-navy/70">Starix Score: </span>
              <span className="font-bold text-lg text-dark-navy/70">{profile?.reputation_score}</span>
            </div>
          </div>
        </div>


        <div className="flex items-center justify-between space-x-7  px-3 py-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-4 px-4 py-1.5 border border-gray-200  text-secondary-100 hover:bg-gray-100 rounded-lg bg-[#F5F7FF]"
          >
            <MdStarRate size={24} color="#99ADFF" />
            <motion.span className="text-sm text-dark-navy">
              EMERGING CREATOR
            </motion.span>

          </motion.div>

          <div className="flex items-center gap-2.5">
            <span className="text-secondary-100/70">
              LEVEL 2
            </span>


            <div className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "conic-gradient(#99ADFF 0% 75%, #e0e0e0 75% 100%)" }}>
              <div className="w-9 h-9 p-2 rounded-full bg-white flex items-center justify-center">
                <span className="text-xs font-light text-gray-800">{profile?.win_rate}%</span>
              </div>
            </div>
          </div>

          <p className="text-neut/60 font-light text-sm">Creator since: {formatMonthYear(profile?.created_at, false)}</p>

        </div>



      </motion.div>
    );
  };



  const {
    bank_account_number = "",
    bank_code = "",
    bank_name = "",
    bank_account_name = "",
    bank_verified = false,
    // bank_verified_at = "",
  } = profile ?? {};


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-10"
    >

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-10 bg-white rounded-2xl p-3 md:p-10">
          <ProfileHeader />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Portfolio</h2>
              <button className="text-sm font-light text-dark-navy hover:text-blue-600">View</button>
            </div>

            <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
              {[1, 2, 3, 4, 5].map((post) => (
                <PostCard key={post} />
              ))}
            </div>
          </motion.div>


          <AnalyticsPreview stats={stats} />



          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className=""
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Submission</h2>
              <button className="text-sm font-light text-dark-navy hover:text-blue-600">View</button>
            </div>

            <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
              {[1, 2, 3, 4, 5].map((post) => (
                <PostCard key={post} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <PaymentDetails
            bankDetails={{
              bank_account_number,
              bank_code,
              bank_name,
              bank_account_name,
              bank_verified,
              bank_verified_at: "2025-12-18T22:03:42.420Z",
            }}
          />

          <SocialMedia />
        </div>
      </div>
    </motion.div>
  );
}
