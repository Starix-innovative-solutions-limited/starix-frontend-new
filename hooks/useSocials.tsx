import { useMutation, useQueryClient } from "@tanstack/react-query";
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
        queryClient.invalidateQueries({ queryKey: ["me"] });
        queryClient.invalidateQueries({ queryKey: ["starix-score"] });
      }
    },
  });
};