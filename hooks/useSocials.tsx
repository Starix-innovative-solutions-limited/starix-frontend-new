import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {api} from "@/lib/api"; 

export interface ConnectSocialPayload {
  platform: "instagram" | "tiktok" | "youtube" | "x";
  callbackUrl: string;
  circleId?: string;
}

export interface ConnectSocialResponse {
  authorization_url: string;
  state: string;
}

export type ConnectedPlatformAccount = {
  platform: string;
  username?: string | null;
  connection_status?: string | null;
};

export function useGetMyConnectedPlatforms(enabled = true) {
  return useQuery<ConnectedPlatformAccount[]>({
    queryKey: ["platforms", "me"],
    queryFn: async () => {
      const { data } = await api.get("/platforms/me");
      const root =
        data && typeof data === "object" ? (data as Record<string, unknown>) : {};
      const nested =
        root.data && typeof root.data === "object"
          ? (root.data as Record<string, unknown>)
          : {};
      const list = (root.platforms ??
        nested.platforms ??
        root.items ??
        nested.items ??
        []) as unknown[];
      return list
        .map((item) => {
          if (typeof item === "string") return { platform: item };
          if (!item || typeof item !== "object") return null;
          const record = item as Record<string, unknown>;
          const platform = String(record.platform ?? record.name ?? "").trim();
          if (!platform) return null;
          return {
            platform,
            username:
              (record.username as string | null | undefined) ??
              (record.display_name as string | null | undefined) ??
              null,
            connection_status:
              (record.connection_status as string | null | undefined) ?? null,
          };
        })
        .filter((item): item is ConnectedPlatformAccount => Boolean(item));
    },
    enabled,
  });
}

export const useInitiateSocialConnection = () => {
  return useMutation({
    mutationFn: async ({
      platform,
      callbackUrl,
      circleId,
    }: ConnectSocialPayload) => {
      if (circleId) {
        const { data } = await api.post<ConnectSocialResponse>(
          `/circles/${circleId}/social-accounts/${platform}/connect`,
          {},
          { params: { callback_url: callbackUrl } }
        );
        return data;
      }

      const { data } = await api.get<ConnectSocialResponse>(
        `/platforms/${platform}/connect`,
        {
          params: {
            callback_url: callbackUrl,
          },
        }
      );
      return data;
    },
  });
};

export const useDisconnectSocialConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      platform,
      circleId,
    }: {
      platform: ConnectSocialPayload["platform"];
      circleId?: string;
    }) => {
      const endpoint = circleId
        ? `/circles/${circleId}/social-accounts/${platform}`
        : `/platforms/${platform}/disconnect`;
      await api.delete(endpoint);
    },
    onSuccess: (_, { circleId }) => {
      if (circleId) {
        queryClient.invalidateQueries({
          queryKey: ["circle-socials", circleId],
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["creatorProfile"] });
        queryClient.invalidateQueries({ queryKey: ["platforms", "me"] });
        queryClient.invalidateQueries({ queryKey: ["me"] });
        queryClient.invalidateQueries({ queryKey: ["starix-score"] });
      }
    },
  });
};