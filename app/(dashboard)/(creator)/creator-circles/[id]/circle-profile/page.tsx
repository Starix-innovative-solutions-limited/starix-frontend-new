"use client";

import React, { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useGetCircleProfile, useGetCurrentUser, useGetCircleSocials, useDisconnectSocial, useGetCircleMonthlyEarnings} from "@/hooks/useCircles";
import BannerUploadModal from "@/components/(creator)/dashboard/BannerUploadModal";
import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";
import SettingsModal from "@/components/(creator)/dashboard/SettingsModal";
import InviteMemberModal from "@/components/(creator)/dashboard/InviteMemberModal";




const CircleProfilePage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  // Data fetching
  const { data: profile, isLoading } = useGetCircleProfile(id);
  const { data: currentUser } = useGetCurrentUser();

  const currentUserId = currentUser?.id ?? "c73faebb-f0a8-4582-abd9-0f2f049ea2f9";

const { data: monthlyEarnings } = useGetCircleMonthlyEarnings(id);  

  const circle = profile;

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Helpers
  const adminId = circle?.members?.[0]?.user_id; 
  const isAdmin = 
    circle?.role === 'admin' || 
    circle?.members?.some((m: any) => m.user_id === currentUserId);

  
const hasNoChallenges = (circle?.active_challenge_count ?? 0) === 0;



const { data: socials } = useGetCircleSocials(id);
const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: <FaInstagram size={18} />,
  tiktok: <FaTiktok size={18} />,
  youtube: <FaYoutube size={18} />,
};

const [platformToDelete, setPlatformToDelete] = useState<string | null>(null);
const disconnectMutation = useDisconnectSocial();

const confirmDelete = () => {
  if (platformToDelete) {
    disconnectMutation.mutate({ circleId: id, platform: platformToDelete });
    setPlatformToDelete(null); // Reset after action
  }
};

  // Loading/Error States
  if (isLoading) return <div className="p-20 text-center">Loading Circle Profile...</div>;
  if (!circle) return <div className="p-20 text-center text-red-500">Circle not found.</div>;

  

  return (
    <div className="w-full  bg-white font-sans text-[#1E1F24]">
      {/* --- Modals --- */}
      {isAdmin && (
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          circleId={id} 
          currentData={id} 
        />
      )}
      <BannerUploadModal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)} circleId={id} />
      <ConnectSocialsModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} circleId={id} />
      <InviteMemberModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} circleId={id} />
        
      {/* HERO BANNER */}
      <div className="relative w-full h-[250px] bg-[#F3F4F6]">
        {circle.banner_url ? (
          <Image src={circle.banner_url} alt="Banner" fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-[#F3F4F6]" />
        )}

        <div className="absolute right-8 bottom-[-60px] z-20 flex gap-2">
          {isAdmin ? (
            <>
              <button onClick={() => setIsConnectModalOpen(true)} className="px-2 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">Connect Socials</button>
              <button onClick={() => setIsBannerModalOpen(true)} className="px-2 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">Upload Banner</button>
              <button onClick={() => setIsInviteModalOpen(true)} className="px-2 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">Invite Member</button>
            </>
          ) : null}

          {isAdmin && (
            <button 
              onClick={() => setIsSettingsOpen(true)} 
              className="w-[40px] h-[40px] rounded-full bg-white border flex items-center justify-center border-[#8B8D98] hover:bg-gray-50"
            >
              <img src="/vectros.svg" alt="Settings" />
            </button>
          )}
        </div>

        <div className="absolute -bottom-16 left-8 z-30">
          <div className="w-[150px] h-[150px] rounded-[32px] overflow-hidden bg-white border-[2px] border-white shadow-sm">
            {circle.profile_picture_url ? (
              <Image src={circle.profile_picture_url} alt="Logo" width={150} height={150} className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 font-semibold text-4xl uppercase">
                {circle.name?.charAt(0) ?? "?"}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto px-2 pt-24 pb-24 max-w-[1200px]">
        <h1 className="text-[24px] font-medium">{circle.name}</h1>
        
        <div className="relative group">
          <div className="flex -space-x-3 cursor-pointer">
            {circle.members?.slice(0, 4).map((member: any) => (
              <div key={member.user_id} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden transition-all group-hover:translate-x-1">
                {member.profile_picture_url ? (
                  <Image src={member.profile_picture_url} width={32} height={32} alt="Member" />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>
            ))}
          </div>

          {/* Dropdown Card */}
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl p-3 z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
            <p className="text-[12px] font-semibold text-gray-400 mb-2 px-2">Circle Members</p>
            {circle.members?.map((member: any) => (
              <div key={member.user_id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                  {member.profile_picture_url && <Image src={member.profile_picture_url} width={24} height={24} alt="" />}
                </div>
                <div className="text-[12px]">
                  <p className="font-medium">{member.username}</p>
                  <p className="text-[10px] text-gray-500 capitalize">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-1 text-[12px]">
            <span className="text-[#747682]">{hasNoChallenges ? "No Active Challenges" : `${circle.active_challenge_count} Active Challenges`}</span>
            <span className="text-gray-300 text-[12px]">•</span>
            <span className="text-[#747682]">{circle.global_rank === 0 ? "Unranked" : `Ranked ${circle.global_rank} Globally`}</span>
        </div>

        <div className="flex gap-2 mb-5">
          {circle.niches?.map((tag: string) => ( 
            <span key={tag} className="px-1.5 py-1 bg-[#F5FBFF] text-[#3379A5] rounded-lg text-[10px] font-medium tracking-wide">{tag}</span>
          ))}
        </div>

        <div className="flex gap-3">
          {socials?.map((platformData: any) => {
            // Safely get the platform name and icon
            const platformKey = platformData?.platform?.toLowerCase();
            const Icon = PLATFORM_ICONS[platformKey];

            // Only render if we have a valid platform and icon
            if (!Icon || !platformData?.profile_url) return null;

            return (
              <div 
              key={platformData.id} 
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full group"
            >
              <a
                href={platformData.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                {Icon}
                <span className="text-[12px] font-semibold text-gray-700 capitalize">
                  {platformData.platform}
                </span>
                {platformData.followers_count !== undefined && (
                  <span className="text-[10px] text-gray-400 font-normal">
                    ({platformData.followers_count.toLocaleString()})
                  </span>
                )}
              </a>
              
              {/* Only show delete button for Admins */}
              {isAdmin && (
                <button
                  onClick={() => setPlatformToDelete(platformData.platform.toLowerCase())}
                  className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>
              
            );
          })}
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-[0.3fr_0.3fr_0.4fr] gap-2 mb-12">
          
          {/* Total Earnings Card */}
          <div className="bg-[#E5FFE5] p-4 rounded-[24px] w-full">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img src="/coin.svg" alt="" />
              </div>
              <p className="text-[16px] font-medium text-[#1E1F24]">Total Earnings</p>
            </div>
            
            <h3 className="text-[26px] font-semibold text-[#1E1F24]">
              ₦{((monthlyEarnings?.current_month_earnings ?? 0) / 100).toLocaleString()}
              <span className="text-[#80828D] text-[26px]">.00</span>
            </h3>
            
            {monthlyEarnings && (
              <p className={`text-[12px] font-medium mt-2 ${
                monthlyEarnings.direction === 'up' ? 'text-[#0CC963]' : 
                monthlyEarnings.direction === 'down' ? 'text-[#EF4444]' : 'text-gray-500'
              }`}>
                {monthlyEarnings.direction === 'up' ? '+' : monthlyEarnings.direction === 'down' ? '-' : ''}
                {monthlyEarnings.delta_percentage}% higher than last month
              </p>
            )}
            
            <button 
              onClick={() => router.push(`/creator-circles/${id}/circle-profile/earnings`)}
              className="text-[12px] text-[#62636C] font-medium mt-2 flex items-center gap-1"
            >
              View History →
            </button>
          </div>

          {/* Total Engagement Card */}
          <div className="bg-[#FFF0FD] p-4 rounded-[24px] relative">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img src="/diamonddd.svg" alt="Engagement" />
              </div>
              <p className="text-[16px] font-medium text-[#1E1F24]">Total Engagement</p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-[26px] font-semibold text-[#1E1F24]">
                  {((profile.all_time_views ?? 0) / 1000).toFixed(0)}K
                  <span className="text-[12px] text-[#62636C] font-normal ml-1">Views</span>
                </h3>
                <button className="text-[12px] text-[#62636C] font-medium mt-1 flex items-center gap-1 hover:text-black">
                  View Trend →
                </button>
              </div>

              {/* Live Trend Box */}
              <div className="bg-white w-[110px] h-[60px] rounded-2xl p-2 border border-gray-100 flex flex-col justify-between">
                <div className="text-[10px] font-semibold">
                  {(profile.views_delta_percentage ?? 0) > 0 ? (
                    <span className="text-[#0CC963]">{profile.views_delta_percentage}% ↑</span>
                  ) : (profile.views_delta_percentage ?? 0) < 0 ? (
                    <span className="text-[#EF4444]">{Math.abs(profile.views_delta_percentage ?? 0)}% ↓</span>
                  ) : (
                    <span className="text-[#9CA3AF]">N/A ↑</span>
                  )}
                </div>

                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d={(profile.views_delta_percentage ?? 0) > 0 
                      ? "M0 25 C 20 25, 20 5, 40 5 C 60 5, 60 20, 100 15" // Upward
                      : (profile.views_delta_percentage ?? 0) < 0
                      ? "M0 10 C 20 10, 20 20, 40 15 C 60 10, 60 25, 100 25" // Downward
                      : "M0 20 C 20 15, 40 25, 100 18" // N/A Neutral Wave
                    }
                    fill="none"
                    stroke={(profile.views_delta_percentage ?? 0) > 0 ? "#0CC963" : (profile.views_delta_percentage ?? 0) < 0 ? "#EF4444" : "#D1D5DB"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          

          {/* Circle Score Card */}
          <div className="bg-[#E9F6FF] p-4 rounded-[24px]  flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <img src="/candyyy.svg" alt="" />
                </div>
                <p className="text-[16px] font-medium text-[#1E1F24]">Circle Score</p>
              </div>
              <p className="text-[10px] text-[#62636C] max-w-[150px] leading-tight">Circle score is the average of the starix score of all the members. </p>
              <button className="text-[12px] text-[#62636C] font-medium mt-2 flex items-center gap-1">View Breakdown →</button>
            </div>
            <div className="w-[72px] h-[72px] rounded-full border-[4px] border-[#0033FF] flex items-center justify-center text-[32px] font-semibold text-[#0033FF]">
              {profile.circle_score}
            </div>
          </div>
        </div>

        {/* CHALLENGES SECTION */}
        <div className="pt-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[20px] font-semibold">Circle Challenges </h2>
            <div className="relative w-full max-w-[200px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FiSearch size={14} /></div>
              <input type="text" placeholder="Search Challenges" className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-full text-[12px] outline-none" />
            </div>
          </div>
          
          {hasNoChallenges ? (
             <div className="flex flex-col items-center justify-center py-16 text-center">
               <img src="/circle.svg" alt="Empty" className="w-[120px] h-[120px] mb-6" />
               <h3 className="text-[20px] font-semibold mb-2">No active challenges</h3>
               <p className="text-[#62636C] text-[14px] max-w-[400px] mb-8">Your team hasn't joined any challenges yet.</p>
               <button onClick={() => router.push("/challenges/recommended")} className="px-6 py-3 bg-[#0033FF] text-[#FAFAFA] rounded-full font-semibold">Find Challenges</button>
             </div>
          ) : (
             <div className="text-gray-500">Challenges list would go here...</div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {platformToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-[320px] shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Disconnect Account?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove {platformToDelete}? This will stop data syncing for this account.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setPlatformToDelete(null)} 
                className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CircleProfileRoute() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-sm text-gray-400">Loading circle...</div>
      }
    >
      <CircleProfilePage />
    </Suspense>
  );
}