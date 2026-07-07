import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import axios from "axios";

export interface RecommendedChallenge {
  challenge_id: string;
  title: string;
  brand_name: string;
  brand_logo_url: string;
  prize_pool: number;
  save_status: string;
  // ... add other fields as needed
}

export interface RecommendedChallengesResponse {
  items: RecommendedChallenge[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

export const useGetCircles = (page: number = 1) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["circles", page],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles?page=${page}&page_size=6`);
      return data;
    },
    // DISABLE retries so the error happens once and stops
    retry: false,
    // DISABLE refetching so it doesn't try again when you click around
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateCircle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/circles", payload);
      return data;
    },
    onSuccess: () => {
      // Temporarily disable this to stop the 500 error loop
      // while you work with your backend dev
      // queryClient.invalidateQueries({ queryKey: ["circles"] });
      console.log("Circle created! Refresh manually for now.");
    },
  });
};

export const useGetCircle = (circleId: string) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["circle", circleId],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}`);
      return data;
    },
    enabled: !!circleId, // Only fetch if ID exists
  });
};

export interface MyCircle {
  circle_id: string;
  name: string;
  profile_picture_url: string | null;
  active_challenge_count: number;
  global_rank: number;
  role: "admin" | "manager" | "member";
  members: {
    user_id: string;
    profile_picture_url: string | null;
  }[];
}

export interface MyCirclesResponse {
  platforms: MyCirclesResponse | PromiseLike<MyCirclesResponse>;
  items: MyCircle[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  prev_url: string | null;
  next_url: string | null;
}

export const useGetMyCircle = (
  page = 1,
  pageSize = 4,
  options?: any
) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["myCircles", page, pageSize],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>("/circles", {
        params: {
          page,
          page_size: pageSize,
        },
      });

      return data;
    },
    ...options,
  });
};

export const useGetMyCircles = (page: number = 1, pageSize: number = 6) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["myCircles", page, pageSize],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>("/circles", {
        params: { page, page_size: pageSize }
      });
      return data; 
    },
  });
};

export const useGetOpenCircles = () => {
  return useQuery<MyCircle[]>({
    queryKey: ["open-circles"],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>("/circles");
      return data.items;
    },
  });
};

export const useRequestToJoin = () => {
  return useMutation({
    // Use backticks here:
    mutationFn: async (circleId: string) => {
      const { data } = await api.post(`/circles/${circleId}/join-requests`);
      return data;
    },
  });
};

export const useGetCircleJoinRequests = (circleId: string) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["circle-requests", circleId],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}/join-requests`);
      return data; // Returns an array of join requests
    },
    enabled: !!circleId, // Only fetch if we have a circleId
  });
};
export const useCancelJoinRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      // DELETE /circles/join-requests/{request_id}
      const { data } = await api.delete(`/circles/join-requests/${requestId}`);
      return data;
    },
    onSuccess: () => {
      // Invalidate queries to refresh the UI state
      queryClient.invalidateQueries({ queryKey: ["my-pending-requests"] });
    },
  });
};

export const useGetMyRequests = () => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["my-pending-requests"],
    queryFn: async () => {
      // The API identifies the user via the auth token in your header
      const { data } = await api.get<MyCirclesResponse>("/circles/join-requests"); 
      return data;
    },
  });
};

export const useApproveJoinRequest = (circleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      const { data } = await api.post(`/circles/${circleId}/join-requests/${requestId}/approve`);
      return data;
    },
    onSuccess: () => {
      // Invalidate both the requests list and the members list
      queryClient.invalidateQueries({ queryKey: ["circle-requests", circleId] });
      queryClient.invalidateQueries({ queryKey: ["circle-members", circleId] });
    },
  });
};

export const useRejectJoinRequest = (circleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      // POST /circles/{circle_id}/join-requests/{request_id}/reject
      const { data } = await api.post(`/circles/${circleId}/join-requests/${requestId}/reject`);
      return data;
    },
    onSuccess: () => {
      // Refresh the list to remove the rejected item
      queryClient.invalidateQueries({ queryKey: ["circle-requests", circleId] });
    },
  });
};


export const useUpdateCircle = (circleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      name?: string;
      description?: string;
      privacy?: "public" | "private";
      niches?: string[];
      profile_picture_url?: string | null;
      banner_url?: string | null;
    }) => {
      const { data } = await api.patch(`/circles/${circleId}`, payload);
      return data;
    },
    onSuccess: () => {
      // Invalidate the profile query to trigger a re-fetch of the UI
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
      // Also invalidate the raw circle record — SettingsModal's General
      // tab reads name/description/niches/privacy/join_code from this.
      queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
    },
  });
};

export const useGetCircleProfile = (circleId: string) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["circle-profile", circleId],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}/profile`);
      return data;
    },
    enabled: !!circleId,
  });
};


export const useJoinCircle = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      // The API expects { "code": "8421AC" }
      const { data } = await api.post("/circles/join", { code });
      return data;
    },
  });
};

export const useRotateJoinCode = (circleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/circles/${circleId}/join-code/rotate`);
      return data;
    },
    onSuccess: () => {
      // 1. Invalidate the raw circle record (used by SettingsModal)
      queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
      
      // 2. Invalidate the profile record (used by CircleProfilePage)
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
    },
  });
};

export const useClearJoinCode = (circleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`/circles/${circleId}/join-code`);
      return data;
    },
    onSuccess: () => {
      // Invalidate both keys to keep the UI in sync
      queryClient.invalidateQueries({ queryKey: ["circle", circleId] });
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
    },
  });
};

export const useUpdateMemberRole = (circleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | "manager" | "member" }) => {
      const { data } = await api.patch(`/circles/${circleId}/members/${userId}/role`, { role: role });
      return data;
    },
    onSuccess: () => {
      // Invalidate the profile to trigger a re-fetch of the member list
      queryClient.invalidateQueries({ queryKey: ["circle-profile", circleId] });
    },
  });
};

export const useRemoveMember = (circleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      // The API documentation requires DELETE /circles/{circle_id}/members/{user_id}
      const { data } = await api.delete(`/circles/${circleId}/members/${userId}`);
      return data;
    },
    onSuccess: () => {
      // Refresh the member list immediately after removal
      queryClient.invalidateQueries({ queryKey: ["circle-members", circleId] });
    }
  });
};

interface CircleMember {
  full_name: string;
  profile_picture_url: string | null;
  role: "admin" | "member" | "moderator"; // Add other roles as defined by your app
}

export const useGetCircleMembers = (circle_id: string) => {
  return useQuery<CircleMember[]>({
    queryKey: ["circle-members", circle_id],
    queryFn: async () => {
      const { data } = await api.get<CircleMember[]>(`/circles/${circle_id}/members`);
      return data;
    },
    enabled: !!circle_id, // Only fetch if circle_id is truthy
  });
};



export const useSendInvites = (circleId: string) => {
  return useMutation({
    mutationFn: async (invites: { email: string; role: "member" | "admin" }[]) => {
      const { data } = await api.post(`/circles/${circleId}/invitations`, {
        invites,
      });
      return data;
    },
  });
};

export const useGetPendingInvitations = (circleId: string, options?: any) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["circle-invitations", circleId],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}/invitations`);
      return data;
    },
    ...options, // <--- Add this
  });
};

export const useRevokeInvitation = (circleId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (invitationId: string) => {
      // DELETE /circles/{circle_id}/invitations/{invitation_id}
      const { data } = await api.delete(`/circles/${circleId}/invitations/${invitationId}`);
      return data;
    },
    onSuccess: () => {
      // Refresh the list of pending invites after a successful revocation
      queryClient.invalidateQueries({ queryKey: ["circle-invitations", circleId] });
    }
  });
};


export const useGetMyInvitations = () => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["my-invitations"],
    queryFn: async () => {
      // GET /circles/invitations
      const { data } = await api.get<MyCirclesResponse>(`/circles/invitations`);
      return data;
    },
  });
};

export interface AcceptInvitationResponse {
  id: string;
  circle_id: string;
  user_id: string;
  role: string;
  created_at: string;
}


export const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: async (invitationId: string) => {
      // Backend expects 'token', so we pass the ID as 'token'
      const { data } = await api.post("/circles/invitations/accept", { 
        token: invitationId 
      });
      return data;
    },
  });
};

export const useDeclineInvitation = () => {
  return useMutation({
    mutationFn: async (invitationId: string) => {
      // Backend expects 'token', so we pass the ID as 'token'
      const { data } = await api.post("/circles/invitations/decline", { 
        token: invitationId 
      });
      return data;
    },
  });
};


export const useGetCurrentUser = () => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["current-user"],
    queryFn: () => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    },
    // This tells React Query to use the data instantly
    initialData: () => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    },
  });
};

export const useGetLeaderboard = (circleId?: string | null, page: number = 0, options: any = {}) => {
  const limit = 50;
  const offset = page * limit;

  return useQuery<MyCirclesResponse>({
    queryKey: ["leaderboard", circleId, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });
      if (circleId) params.append("circle_id", circleId);

      const { data } = await api.get<MyCirclesResponse>(`/circles/leaderboard?${params.toString()}`);
      return data;
    },
    ...options, // Spread the options here
  });
};

export const useGetCircleSocials = (circleId: string) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["circle-socials", circleId],
    queryFn: async () => {
      // This now uses the baseURL defined in api.ts
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}/social-accounts`);
      return data.platforms; 
    },
    enabled: !!circleId,
  });
};

export const useDisconnectSocial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ circleId, platform }: { circleId: string; platform: string }) =>
      api.delete(`/circles/${circleId}/social-accounts/${platform}`),
    onSuccess: (_, variables) => {
      // Invalidate the cache to force the UI to refresh
      queryClient.invalidateQueries({ queryKey: ["circle-socials", variables.circleId] });
    },
  });
};

export const useGetCirclePayouts = (circleId: string) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ["circle-payouts", circleId],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}/payout-settings`);
      return data; // Returns { shares, total_percentage, fully_approved }
    },
    enabled: !!circleId,
  });
};

export const useUpdateCirclePayouts = (circleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    
    mutationFn: async (shares: { user_id: string; percentage: number }[]) => {
      const { data } = await axios.put(`/circles/${circleId}/payout-settings`, { shares });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circle-payouts', circleId] });
    },
  });
};

export const useApprovePayout = (circleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post(`/circles/${circleId}/payout-settings/approve`),
    onSuccess: () => {
      // Invalidate the payout query so the UI updates to "confirmed"
      queryClient.invalidateQueries({ queryKey: ["circle-payouts", circleId] });
    },
  });
};

export const useGetCircleEarnings = (circleId: string, page = 1) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ['circleEarnings', circleId, page],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}/earnings?page=${page}&page_size=50`);
      return data;
    },
    enabled: !!circleId,
  });
};

export const useGetCircleMonthlyEarnings = (circleId: string) => {
  return useQuery<MyCirclesResponse>({
    queryKey: ['monthlyEarnings', circleId],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>(`/circles/${circleId}/earnings/monthly`);
      return data;
    },
    enabled: !!circleId,
  });
};

// Define the fetcher function
const fetchEarningDetail = async (circleId: string, challengeId: string) => {
  if (!circleId || !challengeId) {
    throw new Error("circleId and challengeId are required");
  }

  const { data } = await axios.get(
    `/circles/${encodeURIComponent(circleId)}/earnings/${encodeURIComponent(challengeId)}`
  );

  return data;
};

export interface EarningPayoutSplit {
  user_id: string;
  full_name: string;
  profile_picture_url: string | null;
  split_percentage: number;
}

export interface EarningDetailResponse {
  brand_logo_url: string | null;
  title: string;
  paid_out_members: number;
  credited_at: string | null;
  gross_prize: number;
  credit_status: "Successful" | "Pending" | "Failed" | string;
  payout_splits: EarningPayoutSplit[];
}

export const useGetEarningDetail = (
  circleId: string,
  challengeId: string,
  options?: any
) => {
  return useQuery<EarningDetailResponse>({
    queryKey: ["earning-detail", circleId, challengeId],
    queryFn: async () => {
      const { data } = await api.get<EarningDetailResponse>(
        `/circles/${circleId}/earnings/${challengeId}`
      );
      return data;
    },
    ...options,
  });
};

export const useGetRecommendedChallenges = (circleId: string, options?: any) => {
  return useQuery<RecommendedChallengesResponse>({ // <--- Pass the type here
    queryKey: ["recommendedChallenges", circleId],
    queryFn: async () => {
      const { data } = await axios.get(`/circles/${circleId}/recommended-challenges?page=1&page_size=3`);
      return data;
    },
    ...options,
  });
};
