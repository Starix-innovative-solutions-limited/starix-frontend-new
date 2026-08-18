import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Backend onboarding step identifiers from GET /brands/onboarding */
export type BrandOnboardingStep = "profile" | "completed" | string;

export type BrandOnboardingState = {
  onboarding_step: BrandOnboardingStep;
  onboarding_completed_at: string | null;
  profile_picture_url: string | null;
  website_or_social_link: string | null;
  bio: string | null;
  industry: string | null;
};

export type SaveBrandOnboardingProfilePayload = {
  profile_picture_url?: string | null;
  website_or_social_link?: string | null;
  bio?: string | null;
};

export const BRAND_ONBOARDING_QUERY_KEY = ["brands", "onboarding"] as const;

/**
 * GET /brands/onboarding — resume brand onboarding after login.
 * Returns progress, selected industry, and profile values from earlier attempts.
 */
export function useBrandOnboarding(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: BRAND_ONBOARDING_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<BrandOnboardingState>(
        "/brands/onboarding"
      );
      return data;
    },
    enabled:
      options?.enabled ??
      (typeof window !== "undefined" && !!localStorage.getItem("token")),
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

/**
 * PUT /brands/onboarding/profile — save profile values and complete onboarding.
 * Send `{}` to skip. Repeated calls may update values but keep the original completion time.
 */
export function useSaveBrandOnboardingProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveBrandOnboardingProfilePayload = {}) => {
      const { data } = await api.put<BrandOnboardingState>(
        "/brands/onboarding/profile",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(BRAND_ONBOARDING_QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
