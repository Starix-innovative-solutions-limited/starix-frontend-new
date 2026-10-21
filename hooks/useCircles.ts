import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import axios from "axios";
import { useGetMe } from "@/hooks/useAuth";

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

export interface CreatedCircle {
  id: string;
  circle_id?: string;
  name: string;
  join_code?: string | null;
  privacy?: string;
  created_by_user_id?: string;
}

export const useCreateCircle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description?: string;
      privacy: "public" | "private";
      niches?: string[];
      profile_picture_url?: string;
      banner_url?: string;
    }) => {
      const { data } = await api.post<CreatedCircle>("/circles", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["circles"] });
      queryClient.invalidateQueries({ queryKey: ["myCircles"] });
      queryClient.invalidateQueries({ queryKey: ["open-circles"] });
    },
  });
};

export interface CircleRecord {
  id?: string;
  circle_id: string;
  name: string;
  description?: string | null;
  privacy?: "public" | "private" | string;
  niches?: string[];
  join_code?: string | null;
  admin_id?: string | null;
  created_by_user_id?: string | null;
}

export const useGetCircle = (circleId: string) => {
  return useQuery<CircleRecord>({
    queryKey: ["circle", circleId],
    queryFn: async () => {
      const { data } = await api.get<CircleRecord & { id?: string }>(
        `/circles/${circleId}`
      );
      return {
        ...data,
        circle_id: data.circle_id ?? data.id ?? circleId,
        admin_id: data.admin_id ?? data.created_by_user_id ?? null,
      };
    },
    enabled: !!circleId,
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

interface OpenCircleEntry {
  circle_id: string;
  name: string;
  profile_picture_url: string | null;
  global_rank: number | null;
  member_count: number;
}

interface MyJoinRequestEntry {
  request_id: string;
  circle_name: string;
  circle_profile_picture_url: string | null;
  member_count: number;
  global_rank: number | null;
  requested_at: string;
}

export type CircleMembership = "member" | "requested" | "none";

export interface DiscoverableCircle {
  circle_id: string;
  name: string;
  profile_picture_url: string | null;
  global_rank: number | null;
  member_count: number;
  membership: CircleMembership;
}

const MY_JOIN_REQUESTS_KEY = ["circles", "join-requests", "mine"] as const;
const CIRCLE_NOTIFICATIONS_KEY = ["circle-notifications"] as const;

/**
 * Every circle a creator can see: circles they created or belong to
 * (GET /circles) plus other creators' public circles with space
 * (GET /circles/open, which excludes the caller's own circles).
 */
export const useGetOpenCircles = (pageSize = 50) => {
  const myCircles = useQuery<MyCircle[]>({
    queryKey: ["open-circles", "mine", pageSize],
    queryFn: async () => {
      const { data } = await api.get<MyCirclesResponse>("/circles", {
        params: { page: 1, page_size: pageSize },
      });
      return data?.items ?? [];
    },
  });

  const openCircles = useQuery<OpenCircleEntry[]>({
    queryKey: ["open-circles", "public", pageSize],
    queryFn: async () => {
      const { data } = await api.get<{ items: OpenCircleEntry[] }>("/circles/open", {
        params: { page: 1, page_size: pageSize },
      });
      return data?.items ?? [];
    },
  });

  const myRequests = useQuery<MyJoinRequestEntry[]>({
    queryKey: MY_JOIN_REQUESTS_KEY,
    queryFn: async () => {
      const { data } = await api.get<MyJoinRequestEntry[]>("/circles/join-requests");
      return Array.isArray(data) ? data : [];
    },
  });

  const data = useMemo<DiscoverableCircle[]>(() => {
    // Pending-request entries carry no circle_id, so match on name + picture.
    const pending = new Set(
      (myRequests.data ?? []).map(
        (request) => `${request.circle_name}|${request.circle_profile_picture_url ?? ""}`
      )
    );

    const merged = new Map<string, DiscoverableCircle>();

    for (const circle of openCircles.data ?? []) {
      merged.set(circle.circle_id, {
        circle_id: circle.circle_id,
        name: circle.name,
        profile_picture_url: circle.profile_picture_url,
        global_rank: circle.global_rank,
        member_count: circle.member_count ?? 0,
        membership: pending.has(`${circle.name}|${circle.profile_picture_url ?? ""}`)
          ? "requested"
          : "none",
      });
    }

    for (const circle of myCircles.data ?? []) {
      merged.set(circle.circle_id, {
        circle_id: circle.circle_id,
        name: circle.name,
        profile_picture_url: circle.profile_picture_url,
        global_rank: circle.global_rank ?? null,
        member_count: circle.members?.length ?? 0,
        membership: "member",
      });
    }

    return Array.from(merged.values()).sort(
      (a, b) => (a.global_rank ?? Infinity) - (b.global_rank ?? Infinity)
    );
  }, [myCircles.data, openCircles.data, myRequests.data]);

  return {
    data,
    isLoading: myCircles.isLoading || openCircles.isLoading,
  };
};

export const useRequestToJoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (circleId: string) => {
      const { data } = await api.post(`/circles/${circleId}/join-requests`);
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MY_JOIN_REQUESTS_KEY });
      queryClient.invalidateQueries({ queryKey: ["open-circles"] });
    },
  });
};

export interface CircleJoinRequest {
  id: string;
  circle_id?: string;
  user_id: string;
  status?: string;
  created_at: string;
}

export const useGetCircleJoinRequests = (circleId: string) => {
  return useQuery<CircleJoinRequest[]>({
    queryKey: ["circle-requests", circleId],
    queryFn: async () => {
      const { data } = await api.get<
        CircleJoinRequest[] | { items?: CircleJoinRequest[] }
      >(`/circles/${circleId}/join-requests`);

      if (Array.isArray(data)) return data;
      return data?.items ?? [];
    },
    enabled: !!circleId,
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
      queryClient.invalidateQueries({ queryKey: ["my-pending-requests"] });
      queryClient.invalidateQueries({ queryKey: MY_JOIN_REQUESTS_KEY });
      queryClient.invalidateQueries({ queryKey: CIRCLE_NOTIFICATIONS_KEY });
    },
  });
};

export interface MyJoinRequest {
  request_id: string;
  circle_id: string;
  circle_name: string;
  circle_profile_picture_url: string | null;
  requested_at: string;
}

export const useGetMyRequests = () => {
  return useQuery<MyJoinRequest[]>({
    queryKey: ["my-pending-requests"],
    queryFn: async () => {
      const { data } = await api.get<
        { items?: MyJoinRequest[] } | MyJoinRequest[]
      >("/circles/join-requests");

      if (Array.isArray(data)) return data;
      return data?.items ?? [];
    },
  });
};

type JoinRequestAction = string | { requestId: string; circleId: string };

function resolveJoinRequestAction(action: JoinRequestAction, fallbackCircleId?: string) {
  if (typeof action === "string") {
    return { requestId: action, circleId: fallbackCircleId };
  }
  return action;
}

export const useApproveJoinRequest = (circleId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: JoinRequestAction) => {
      const { requestId, circleId: id } = resolveJoinRequestAction(action, circleId);
      if (!id) throw new Error("circleId is required");
      const { data } = await api.post(`/circles/${id}/join-requests/${requestId}/approve`);
      return data;
    },
    onSuccess: (_data, action) => {
      const { circleId: id } = resolveJoinRequestAction(action, circleId);
      queryClient.invalidateQueries({ queryKey: ["circle-requests", id] });
      queryClient.invalidateQueries({ queryKey: ["circle-members", id] });
      queryClient.invalidateQueries({ queryKey: ["circle-profile", id] });
      queryClient.invalidateQueries({ queryKey: CIRCLE_NOTIFICATIONS_KEY });
    },
  });
};

export const useRejectJoinRequest = (circleId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: JoinRequestAction) => {
      const { requestId, circleId: id } = resolveJoinRequestAction(action, circleId);
      if (!id) throw new Error("circleId is required");
      const { data } = await api.post(`/circles/${id}/join-requests/${requestId}/reject`);
      return data;
    },
    onSuccess: (_data, action) => {
      const { circleId: id } = resolveJoinRequestAction(action, circleId);
      queryClient.invalidateQueries({ queryKey: ["circle-requests", id] });
      queryClient.invalidateQueries({ queryKey: CIRCLE_NOTIFICATIONS_KEY });
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

export interface CircleProfile {
  circle_id?: string;
  name: string;
  description?: string | null;
  privacy?: "public" | "private" | string;
  niches?: string[];
  profile_picture_url: string | null;
  banner_url?: string | null;
  member_count?: number;
  active_challenge_count: number;
  global_rank: number | null;
  role?: "admin" | "manager" | "member" | string;
  members: {
    user_id: string;
    username?: string;
    full_name?: string;
    profile_picture_url: string | null;
    role?: string;
    joined_at?: string;
  }[];
  connected_platforms?: (string | { platform: string })[];
  join_code?: string | null;
  all_time_earnings_minor?: number;
  all_time_views?: number;
  current_month_views?: number;
  views_delta_percentage?: number;
  views_direction?: "up" | "down" | "flat" | string;
  circle_score?: number | null;
}

export type CircleChallengeFilter = "active" | "completed" | "saved" | "all";

export interface CircleChallengeEntry {
  challenge_id: string;
  title: string;
  brand_name: string;
  brand_logo_url: string | null;
  prize_pool: number;
  status: string;
}

export interface CircleChallengesPage {
  items: CircleChallengeEntry[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  prev_url: string | null;
  next_url: string | null;
}

export const useGetCircleChallenges = (
  circleId: string,
  filter: CircleChallengeFilter,
  page: number = 1,
  pageSize: number = 5,
  options?: { enabled?: boolean }
) => {
  return useQuery<CircleChallengesPage>({
    queryKey: ["circle-challenges", circleId, filter, page, pageSize],
    queryFn: async () => {
      const { data } = await api.get<CircleChallengesPage>(
        `/circles/${circleId}/challenges`,
        { params: { filter, page, page_size: pageSize } }
      );
      return data;
    },
    enabled: (options?.enabled ?? true) && !!circleId,
  });
};

export const useGetCircleProfile = (circleId: string) => {
  return useQuery<CircleProfile>({
    queryKey: ["circle-profile", circleId],
    queryFn: async () => {
      const { data } = await api.get<CircleProfile>(`/circles/${circleId}/profile`);
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



export const useSendInvites = (circleId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invites: { email: string; role: "member" | "admin" }[]) => {
      if (!circleId) throw new Error("circleId is required");
      const acceptUrl =
        typeof window !== "undefined" ? `${window.location.origin}/accept` : undefined;
      const { data } = await api.post(`/circles/${circleId}/invitations`, {
        invites,
        ...(acceptUrl ? { accept_url: acceptUrl } : {}),
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["circle-invitations", circleId] });
      queryClient.invalidateQueries({ queryKey: ["circles"] });
      queryClient.invalidateQueries({ queryKey: CIRCLE_NOTIFICATIONS_KEY });
    },
  });
};

export interface PendingInvitation {
  id: string;
  invited_email: string;
  role_offered: string;
  status: string;
}

export const useGetPendingInvitations = (circleId: string, options?: any) => {
  return useQuery<PendingInvitation[]>({
    queryKey: ["circle-invitations", circleId],
    queryFn: async () => {
      const { data } = await api.get<PendingInvitation[]>(
        `/circles/${circleId}/invitations`
      );
      return data;
    },
    initialData: [],
    ...options,
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

export interface MyInvitation {
  invitation_id: string;
  circle_id?: string;
  circle_name: string;
  circle_profile_picture_url: string | null;
  member_count: number;
  global_rank: number;
  invited_at?: string;
}

export const useGetMyInvitations = () => {
  return useQuery<MyInvitation[]>({
    queryKey: ["my-invitations"],
    queryFn: async () => {
      const { data } = await api.get<MyInvitation[]>(`/circles/invitations`);
      return data;
    },
    initialData: [],
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invitationId: string) => {
      const { data } = await api.post("/circles/invitations/accept", {
        token: invitationId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
      queryClient.invalidateQueries({ queryKey: ["circles"] });
      queryClient.invalidateQueries({ queryKey: ["myCircles"] });
      queryClient.invalidateQueries({ queryKey: CIRCLE_NOTIFICATIONS_KEY });
    },
  });
};

export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invitationId: string) => {
      const { data } = await api.post("/circles/invitations/decline", {
        token: invitationId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
      queryClient.invalidateQueries({ queryKey: CIRCLE_NOTIFICATIONS_KEY });
    },
  });
};

const JOIN_ACTIVITY_WINDOW_MS = 1000 * 60 * 60 * 24 * 30;
const MAX_CIRCLES_FOR_ACTIVITY = 12;

export type CircleNotificationKind =
  | "invitation"
  | "join_request"
  | "member_joined"
  | "my_join_request"
  | "payout_approval"
  | "payout_pending"
  | "active_challenge";

export interface CircleNotification {
  id: string;
  kind: CircleNotificationKind;
  title: string;
  body: string;
  at: string;
  imageUrl: string | null;
  href?: string;
  circleId?: string;
  invitationId?: string;
  requestId?: string;
  sticky: boolean;
}

async function safeGet<T>(url: string, params?: Record<string, string | number>): Promise<T | null> {
  try {
    const { data } = await api.get<T>(url, { params });
    return data;
  } catch {
    return null;
  }
}

function asList<T>(data: T[] | { items?: T[] } | null | undefined): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.items ?? [];
}

export const useGetCircleNotifications = (currentUserId?: string | null) => {
  return useQuery<CircleNotification[]>({
    queryKey: [...CIRCLE_NOTIFICATIONS_KEY, currentUserId ?? "anon"],
    queryFn: async () => {
      const [circlesPage, invitations, myRequests] = await Promise.all([
        safeGet<MyCirclesResponse>("/circles", { page: 1, page_size: 50 }),
        safeGet<MyInvitation[]>("/circles/invitations"),
        safeGet<MyJoinRequestEntry[] | { items?: MyJoinRequestEntry[] }>("/circles/join-requests"),
      ]);

      const circles = circlesPage?.items ?? [];
      const notifications: CircleNotification[] = [];
      const now = Date.now();

      for (const invite of asList(invitations)) {
        notifications.push({
          id: `invitation:${invite.invitation_id}`,
          kind: "invitation",
          title: "Circle invitation",
          body: `You were invited to join ${invite.circle_name}.`,
          at: invite.invited_at || new Date().toISOString(),
          imageUrl: invite.circle_profile_picture_url,
          invitationId: invite.invitation_id,
          circleId: invite.circle_id,
          href: invite.circle_id
            ? `/creator-circles/${invite.circle_id}/circle-profile`
            : undefined,
          sticky: true,
        });
      }

      for (const request of asList(myRequests)) {
        notifications.push({
          id: `my-request:${request.request_id}`,
          kind: "my_join_request",
          title: "Join request pending",
          body: `Your request to join ${request.circle_name} is still waiting for an admin.`,
          at: request.requested_at,
          imageUrl: request.circle_profile_picture_url,
          requestId: request.request_id,
          sticky: true,
        });
      }

      const scopedCircles = circles.slice(0, MAX_CIRCLES_FOR_ACTIVITY);

      const perCircle = await Promise.all(
        scopedCircles.map(async (circle) => {
          const isAdmin = circle.role === "admin";
          const [joinRequests, profile, payouts, challenges] = await Promise.all([
            isAdmin
              ? safeGet<CircleJoinRequest[] | { items?: CircleJoinRequest[] }>(
                  `/circles/${circle.circle_id}/join-requests`
                )
              : Promise.resolve(null),
            isAdmin
              ? safeGet<CircleProfile>(`/circles/${circle.circle_id}/profile`)
              : Promise.resolve(null),
            safeGet<CirclePayoutSettingsResponse>(
              `/circles/${circle.circle_id}/payout-settings`
            ),
            safeGet<CircleChallengesPage>(`/circles/${circle.circle_id}/challenges`, {
              filter: "active",
              page: 1,
              page_size: 5,
            }),
          ]);

          return { circle, isAdmin, joinRequests, profile, payouts, challenges };
        })
      );

      for (const { circle, isAdmin, joinRequests, profile, payouts, challenges } of perCircle) {
        const circleHref = `/creator-circles/${circle.circle_id}/circle-profile`;

        if (isAdmin) {
          for (const request of asList(joinRequests)) {
            if (request.status && request.status !== "pending") continue;
            notifications.push({
              id: `join-request:${request.id}`,
              kind: "join_request",
              title: "New join request",
              body: `Someone requested to join ${circle.name}.`,
              at: request.created_at || new Date().toISOString(),
              imageUrl: circle.profile_picture_url,
              href: circleHref,
              circleId: circle.circle_id,
              requestId: request.id,
              sticky: true,
            });
          }

          for (const member of profile?.members ?? []) {
            if (!member.joined_at) continue;
            if (currentUserId && member.user_id === currentUserId) continue;
            const joinedAt = new Date(member.joined_at).getTime();
            if (Number.isNaN(joinedAt) || now - joinedAt > JOIN_ACTIVITY_WINDOW_MS) continue;
            const who = member.full_name || member.username || "A creator";
            notifications.push({
              id: `member-joined:${circle.circle_id}:${member.user_id}:${member.joined_at}`,
              kind: "member_joined",
              title: "New circle member",
              body: `${who} joined ${circle.name}.`,
              at: member.joined_at,
              imageUrl: member.profile_picture_url || circle.profile_picture_url,
              href: circleHref,
              circleId: circle.circle_id,
              sticky: false,
            });
          }
        }

        if (payouts) {
          const myShare = currentUserId
            ? payouts.shares.find((share) => share.user_id === currentUserId)
            : undefined;
          const myPending =
            myShare &&
            (myShare.approval_status === "pending" || myShare.approved === false);

          if (myPending) {
            notifications.push({
              id: `payout-approval:${circle.circle_id}:${currentUserId}`,
              kind: "payout_approval",
              title: "Payout split needs you",
              body: `Approve your payout share for ${circle.name}.`,
              at: "",
              imageUrl: circle.profile_picture_url,
              href: circleHref,
              circleId: circle.circle_id,
              sticky: true,
            });
          } else if (
            isAdmin &&
            payouts.shares.length > 0 &&
            payouts.fully_approved !== true &&
            payouts.fully_approved !== "confirmed"
          ) {
            notifications.push({
              id: `payout-pending:${circle.circle_id}`,
              kind: "payout_pending",
              title: "Payout split pending",
              body: `Members still need to confirm payout shares in ${circle.name}.`,
              at: "",
              imageUrl: circle.profile_picture_url,
              href: circleHref,
              circleId: circle.circle_id,
              sticky: false,
            });
          }
        }

        const challenge = challenges?.items?.[0];
        if (challenge) {
          notifications.push({
            id: `challenge:${circle.circle_id}:${challenge.challenge_id}`,
            kind: "active_challenge",
            title: "Active circle challenge",
            body: `${circle.name} is in “${challenge.title}” with ${challenge.brand_name}.`,
            at: "",
            imageUrl: challenge.brand_logo_url || circle.profile_picture_url,
            href: circleHref,
            circleId: circle.circle_id,
            sticky: false,
          });
        }
      }

      const rank = (item: CircleNotification) => {
        if (item.kind === "join_request" || item.kind === "invitation") return 0;
        if (item.sticky) return 1;
        if (item.at) return 2;
        return 3;
      };

      return notifications.sort((a, b) => {
        const rankDiff = rank(a) - rank(b);
        if (rankDiff !== 0) return rankDiff;
        return new Date(b.at || 0).getTime() - new Date(a.at || 0).getTime();
      });
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });
};


export interface CurrentUser {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  user_type?: string;
}

export const useGetCurrentUser = () => {
  return useGetMe();
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

export interface CircleSocialAccount {
  id: string;
  platform: string;
  profile_url: string;
  followers_count?: number;
}

export const useGetCircleSocials = (circleId: string) => {
  return useQuery<CircleSocialAccount[]>({
    queryKey: ["circle-socials", circleId],
    queryFn: async () => {
      const { data } = await api.get<{ platforms: CircleSocialAccount[] }>(
        `/circles/${circleId}/social-accounts`
      );
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

export interface CirclePayoutShare {
  user_id: string;
  full_name?: string;
  profile_picture_url?: string | null;
  percentage: number;
  approved?: boolean;
  approval_status?: "confirmed" | "pending" | string;
}

export interface CirclePayoutSettingsResponse {
  shares: CirclePayoutShare[];
  total_percentage: number;
  fully_approved: boolean | "pending" | "confirmed";
}

export const useGetCirclePayouts = (circleId: string) => {
  return useQuery<CirclePayoutSettingsResponse>({
    queryKey: ["circle-payouts", circleId],
    queryFn: async () => {
      const { data } = await api.get<CirclePayoutSettingsResponse>(
        `/circles/${circleId}/payout-settings`
      );
      return data;
    },
    enabled: !!circleId,
  });
};

export const useUpdateCirclePayouts = (circleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    
    mutationFn: async (shares: { user_id: string; percentage: number }[]) => {
      const { data } = await api.put(`/circles/${circleId}/payout-settings`, { shares });
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

export interface CircleMonthlyEarnings {
  current_month_earnings: number;
  direction: "up" | "down" | "flat" | string;
  delta_percentage: number;
}

export const useGetCircleMonthlyEarnings = (circleId: string) => {
  return useQuery<CircleMonthlyEarnings>({
    queryKey: ["circle-monthly-earnings", circleId],
    queryFn: async () => {
      const { data } = await api.get<CircleMonthlyEarnings>(
        `/circles/${circleId}/earnings/monthly`
      );
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
