"use client";

import React from "react";
import { useGetMyRequests, useCancelJoinRequest } from "@/hooks/useCircles";

export default function MyRequestsSection() {
  const { data: requests = [], isLoading, refetch } = useGetMyRequests();
  const cancelMutation = useCancelJoinRequest();

  const handleCancel = (requestId: string) => {
    if (!confirm("Are you sure you want to cancel this request?")) return;
    
    cancelMutation.mutate(requestId, {
      onSuccess: () => {
        refetch(); 
      }
    });
  };

  // Provide feedback while loading
  if (isLoading) {
    return <div className="p-6 text-center text-sm text-gray-400">Loading your requests...</div>;
  }

  // Handle empty state explicitly so the user knows what's happening
  if (!requests || requests.length === 0) {
    return (
      <div className="p-8 text-center text-[#62636C]">
        <p className="text-[16px] font-semibold mb-1">No pending requests</p>
        <p className="text-[12px]">You don't have any active join requests at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-xs">
      <h3 className="text-[16px] font-semibold text-[#1E1F24] mb-4">Pending Requests</h3>
      <div className="space-y-4">
        {requests.map((req: any) => (
          <div key={req.request_id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={req.circle_profile_picture_url || "/placeholder-circle.png"} 
                className="w-10 h-10 rounded-full border border-gray-100 object-cover" 
                alt={req.circle_name} 
              />
              <div>
                <p className="text-[14px] font-semibold text-[#1E1F24]">{req.circle_name}</p>
                <p className="text-[10px] text-gray-500">
                  Requested {new Date(req.requested_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button 
              onClick={() => handleCancel(req.request_id)}
              disabled={cancelMutation.isPending}
              className="text-[12px] font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-full transition disabled:opacity-50"
            >
              {cancelMutation.isPending ? "Canceling..." : "Cancel"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}