"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { GoSearch } from "react-icons/go";
import { useGetCircleProfile } from "@/hooks/useCircles";
import BannerUploadModal from "@/components/(creator)/dashboard/BannerUploadModal";
import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";
import SettingsModal from "@/components/(creator)/dashboard/SettingsModal";
import InviteMemberModal from "@/components/(creator)/dashboard/InviteMemberModal";
import { FiSearch } from "react-icons/fi";


const CircleProfilePage = () => {
  const { id } = useParams() as { id: string };
  const { data: profile, isLoading } = useGetCircleProfile(id);
  const router = useRouter();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  if (isLoading) return <div className="p-20 text-center">Loading Circle Profile...</div>;
  if (!profile) return <div className="p-20 text-center text-red-500">Circle not found.</div>;

  const hasNoChallenges = profile.active_challenge_count === 0;

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24]">
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        circleId={id} 
        currentData={profile} 
      />
      <BannerUploadModal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)} creator-circleId={id} />
      <ConnectSocialsModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
      <InviteMemberModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} circleId={id} />

      {/* HERO BANNER */}
      <div className="relative w-full h-[250px] bg-[#F3F4F6]">
        {profile.banner_url ? (
          <Image src={profile.banner_url} alt="Banner" fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-[#F3F4F6]" />
        )}

        <div className="absolute right-8 bottom-[-60px] z-20 flex gap-2">
          <button onClick={() => setIsConnectModalOpen(true)} className="px-2 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">Connect Socials</button>
          <button onClick={() => setIsBannerModalOpen(true)} className="px-2 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">Upload Banner Image</button>
          <button onClick={() => setIsInviteModalOpen(true)} className="px-2 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">Invite Member</button>
          <button onClick={() => setIsSettingsOpen(true)} className="w-[40px] h-[40px] rounded-full bg-white border flex items-center justify-center border-[#8B8D98] hover:bg-gray-50">
            <img src="/vectros.svg" alt="" />
          </button>
        </div>

        <div className="absolute -bottom-16 left-8 z-30">
          <div className="w-[150px] h-[150px] rounded-[32px] overflow-hidden bg-white border-[6px] border-white shadow-md">
            {profile.profile_picture_url ? (
              <Image src={profile.profile_picture_url} alt="Logo" width={150} height={150} className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 font-bold text-4xl uppercase">{profile.name.charAt(0)}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto px-8 pt-24 pb-24 max-w-[1200px]">
        <h1 className="text-[24px] font-medium">{profile.name}</h1>
        
        {/* MEMBER AVATAR STACK & METADATA */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex -space-x-3">
            {profile.members.slice(0, 4).map((member: any) => (
              <div key={member.user_id} className="w-5 h-5 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                {member.profile_picture_url ? (
                  <Image src={member.profile_picture_url} width={36} height={36} alt="Member" />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>
            ))}
          </div>
          <span className="text-[#747682] text-[14px] font-normal">{profile.member_count} member</span>
          
          
        </div>
        <div className="flex items-center gap-2 mb-1 text-[12px]">
            <span className="text-[#747682]">
              {hasNoChallenges ? "No Active Challenges" : `${profile.active_challenge_count} Active Challenges`}
            </span>
            <span className="text-gray-300 text-[12px]">•</span>
            <span className="text-[#747682]">
              {profile.global_rank === 0 ? "Unranked" : `Ranked ${profile.global_rank} Globally`}
            </span>
        </div>

        {/* NICHES */}
        <div className="flex gap-2 mb-12">
          {profile.niches.map((tag: string) => ( 
            <span key={tag} className="px-1.5 py-1 bg-[#F5FBFF] text-[#3379A5] rounded-lg text-[10px] font-medium tracking-wide">{tag}</span>
          ))}
        </div>

        {/* CHALLENGES SECTION */}
        <div className="border-t border-[#EFF0F3] pt-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[20px] font-semibold">Circle Challenges</h2>
            <div className="relative w-full max-w-[200px]">
              {/* The Icon */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={14} />
              </div>
              
              {/* The Input */}
              <input 
                type="text" 
                placeholder="Search Challenges" 
                className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-full text-[12px] outline-none focus:border-gray-500 transition-all"
              />
            </div>
            {!hasNoChallenges && (
              <div className="relative">
                <GoSearch className="absolute left-3 top-3.5 text-gray-400" />
                <input placeholder="Search Challenges" className="pl-10 pr-4 py-3 border rounded-full text-sm w-[280px] outline-none" />
              </div>
            )}
          </div>
          
          {hasNoChallenges ? (
             <div className="flex flex-col items-center justify-center py-16 text-center">
               <img src="/circle.svg" alt="Empty" className="w-[120px] h-[120px] mb-6" />
               <h3 className="text-[20px] font-semibold mb-2">You circle has not joined any Challenges</h3>
               <p className="text-[#62636C] text-[14px] max-w-[400px] mb-8">Your team hasn't joined any challenges yet. Pick a campaign and submit as a team for a chance to win.</p>
               <button onClick={() => router.push("/challenges")} className="px-6 py-3 bg-[#0033FF] text-[#FAFAFA] text-[16px] rounded-full font-semibold hover:bg-blue-700 transition">
                 Find Challenges
               </button>
             </div>
          ) : (
             <div className="text-gray-500">Challenges list would go here...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircleProfilePage;


// "use client";

// import React, { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { GoSearch } from "react-icons/go";
// import { useGetCircleProfile } from "@/hooks/useCircles";
// import BannerUploadModal from "@/components/(creator)/dashboard/BannerUploadModal";
// import ConnectSocialsModal from "@/components/(creator)/dashboard/ConnectSocialsModal";
// import SettingsModal from "@/components/(creator)/dashboard/SettingsModal";
// import InviteMemberModal from "@/components/(creator)/dashboard/InviteMemberModal";
// import { FiSearch } from "react-icons/fi";

// const CircleProfilePage = () => {
//   const { id } = useParams() as { id: string };
//   const { data: profile, isLoading } = useGetCircleProfile(id);
//   const router = useRouter();

//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
//   const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
//   const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

//   if (isLoading) return <div className="p-20 text-center">Loading Circle Profile...</div>;
//   if (!profile) return <div className="p-20 text-center text-red-500">Circle not found.</div>;

//   const hasNoChallenges = profile.active_challenge_count === 0;

//   const currentUserId = "current-logged-in-user-id"; 

//   const isAdmin = profile.members.some(
//     (m: any) => m.user_id === currentUserId && m.role === "admin"
//   );

//   return (
//     <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24]">
//       <SettingsModal 
//         isOpen={isSettingsOpen} 
//         onClose={() => setIsSettingsOpen(false)} 
//         circleId={id} 
//         currentData={profile} // Pass the existing profile data as default values
//       />
//       <BannerUploadModal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)} creator-circleId={id} />
//       <ConnectSocialsModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
//       <InviteMemberModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} circleId={id} />

//       {/* HERO BANNER */}
//       <div className="relative w-full h-[250px] bg-[#F3F4F6]">
//         {profile.banner_url ? (
//           <Image src={profile.banner_url} alt="Banner" fill className="object-cover" priority />
//         ) : (
//           <div className="w-full h-full bg-[#F3F4F6]" />
//         )}

//         <div className="absolute right-8 bottom-[-60px] z-20 flex gap-2">
//           {isAdmin ? (
//             <>
//               {/* Admin-only buttons */}
//               <button onClick={() => console.log("Auto-split")} className="px-4 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">
//                 Configure Auto-splitting
//               </button>
//               <button onClick={() => setIsInviteModalOpen(true)} className="px-4 h-[40px] rounded-full text-[#1E1F24] bg-white border border-[#8B8D98] font-medium text-[12px] hover:bg-gray-50">
//                 Invite Member
//               </button>
//               {/* Settings Button for Admin */}
//               <button onClick={() => setIsSettingsOpen(true)} className="w-[40px] h-[40px] rounded-full bg-white border flex items-center justify-center border-[#8B8D98] hover:bg-gray-50">
//                 <img src="/vectros.svg" alt="Settings" />
//               </button>
//             </>
//           ) : (
//             /* Normal Member View: Only Settings */
//             <button onClick={() => setIsSettingsOpen(true)} className="w-[40px] h-[40px] rounded-full bg-white border flex items-center justify-center border-[#8B8D98] hover:bg-gray-50">
//               <img src="/vectros.svg" alt="Settings" />
//             </button>
//           )}
//         </div>

//         <div className="absolute -bottom-16 left-8 z-30">
//           <div className="w-[150px] h-[150px] rounded-[32px] overflow-hidden bg-white border-[6px] border-white shadow-md">
//             {profile.profile_picture_url ? (
//               <Image src={profile.profile_picture_url} alt="Logo" width={150} height={150} className="object-cover" />
//             ) : (
//               <div className="flex items-center justify-center h-full bg-gray-100 font-bold text-4xl uppercase">{profile.name.charAt(0)}</div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto px-8 pt-24 pb-24 max-w-[1200px]">
//         <h1 className="text-[24px] font-medium">{profile.name}</h1>
        
//         {/* MEMBER AVATAR STACK & METADATA */}
//         <div className="flex items-center gap-2 mb-2">
//           <div className="flex -space-x-3">
//             {profile.members.slice(0, 4).map((member: any) => (
//               <div key={member.user_id} className="w-5 h-5 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
//                 {member.profile_picture_url ? (
//                   <Image src={member.profile_picture_url} width={36} height={36} alt="Member" />
//                 ) : (
//                   <div className="w-full h-full bg-gray-300" />
//                 )}
//               </div>
//             ))}
//           </div>
//           <span className="text-[#1E1F24] text-[10px] font-normal">{profile.member_count} member</span>
          
          
//         </div>
//         <div className="flex items-center gap-2 text-[10px]">
//             <span className="text-[#6B7280]">
//               {hasNoChallenges ? "No Active Challenges" : `${profile.active_challenge_count} Active Challenges`}
//             </span>
//             <span className="text-gray-300 text-[10px]">•</span>
//             <span className="text-[#6B7280]">
//               {profile.global_rank === 0 ? "Unranked" : `Ranked ${profile.global_rank} Globally`}
//             </span>
//         </div>

//         {/* NICHES */}
//         <div className="flex gap-2 mb-12">
//           {profile.niches.map((tag: string) => ( 
//             <span key={tag} className="px-3 py-1 bg-[#F5FBFF] text-[#3379A5] rounded-md text-[12px] font-bold uppercase tracking-wide">{tag}</span>
//           ))}
//         </div>

//         {/* CHALLENGES SECTION */}
//         <div className="border-t border-[#EFF0F3] pt-12">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-[20px] font-semibold">Circle Challenges</h2>
//             <div className="relative w-full max-w-[200px]">
//               {/* The Icon */}
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                 <FiSearch size={14} />
//               </div>
              
//               {/* The Input */}
//               <input 
//                 type="text" 
//                 placeholder="Search Challenges" 
//                 className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-full text-[12px] outline-none focus:border-gray-500 transition-all"
//               />
//             </div>
//             {!hasNoChallenges && (
//               <div className="relative">
//                 <GoSearch className="absolute left-3 top-3.5 text-gray-400" />
//                 <input placeholder="Search Challenges" className="pl-10 pr-4 py-3 border rounded-full text-sm w-[280px] outline-none" />
//               </div>
//             )}
//           </div>
          
//           {hasNoChallenges ? (
//              <div className="flex flex-col items-center justify-center py-16 text-center">
//                <img src="/circle.svg" alt="Empty" className="w-[120px] h-[120px] mb-6" />
//                <h3 className="text-[20px] font-semibold mb-2">You circle has not joined any Challenges</h3>
//                <p className="text-[#62636C] text-[14px] max-w-[400px] mb-8">Your team hasn't joined any challenges yet. Pick a campaign and submit as a team for a chance to win.</p>
//                <button onClick={() => router.push("/challenges")} className="px-6 py-3 bg-[#0033FF] text-[#FAFAFA] text-[16px] rounded-full font-semibold hover:bg-blue-700 transition">
//                  Find Challenges
//                </button>
//              </div>
//           ) : (
//              <div className="text-gray-500">Challenges list would go here...</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CircleProfilePage;