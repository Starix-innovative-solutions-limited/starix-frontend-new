"use client";

import React from "react";
import Image from "next/image";
import { useGetCircleMembers } from "@/hooks/useCircles"; // Assuming this is where you added the hook

export const CircleMembersAvatar = ({ circleId }: { circleId: string }) => {
  const { data: members, isLoading } = useGetCircleMembers(circleId);

  if (isLoading || !members) return <div className="w-20 h-8" />; // Skeleton

  const displayMembers = members.slice(0, 3);
  const remainingCount = Math.max(0, members.length - 3);

  return (
    <div className="flex -space-x-2">
      {displayMembers.map((member, i) => (
        <div key={i} className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden">
          <Image 
            src={member.profile_picture_url || "/avatar.svg"} 
            alt={member.full_name} 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-medium text-gray-600">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};