import { useMutation } from "@tanstack/react-query";
import {api} from "@/lib/api"; 

export interface ConnectSocialPayload {
  platform: "instagram" | "tiktok" | "youtube" | "x";
  callbackUrl: string;
}

export interface ConnectSocialResponse {
  authorization_url: string;
  state: string;
}

export const useInitiateSocialConnection = () => {
  return useMutation({
    mutationFn: async ({ platform, callbackUrl }: ConnectSocialPayload) => {
      const { data } = await api.get<ConnectSocialResponse>(
        `/platforms/${platform}/connect`, // <-- Updated to match your exact backend route
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