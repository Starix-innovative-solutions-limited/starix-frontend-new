/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface GetChallengesParams {
  skip?: number;
  limit?: number;
  q?: string;
  status?: string;
  brand_id?: string;
}

export function useCreateChallenge() {
  return useMutation({
    mutationFn: (data: any) => api.post("/challenges", data),
    onError: (err: any) => {
      console.log("Error Creating challenge:", err.response?.data);
    },
    onSuccess: (res: any) => {
      console.log("Challenge creation successful:", res.data);
    },
  });
}

export function useGetChallenges(params?: GetChallengesParams) {
  return useQuery({
    queryKey: ["challenges", params],
    queryFn: async () => {
      const { data } = await api.get("/challenges", {
        params: {
          skip: params?.skip ?? 0,
          limit: params?.limit ?? 25,
          q: params?.q,
          status: params?.status,
          brand_id: params?.brand_id,
        },
      });

      return data?.data;
    },
  });
}
