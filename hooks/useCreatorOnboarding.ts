import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Backend onboarding step identifiers from GET /creators/onboarding */
export type CreatorOnboardingStep =
  | "profile"
  | "categories"
  | "socials"
  | "completed"
  | string;

export type CreatorOnboardingState = {
  onboarding_step: CreatorOnboardingStep;
  onboarding_completed_at: string | null;
  profile_picture_url: string | null;
  username: string | null;
  bio: string | null;
  categories: string[];
};

export type SaveOnboardingProfilePayload = {
  profile_picture_url?: string | null;
  /** 3–30 lowercase letters, numbers, underscores */
  username?: string;
  bio?: string | null;
};

export type SaveOnboardingCategoriesPayload = {
  /** Each unique name is 2–100 characters. Empty array skips this step. */
  categories: string[];
};

const ONBOARDING_QUERY_KEY = ["creators", "onboarding"] as const;

/** Maps API step → UI step index (1 = profile, 2 = categories, 3 = socials) */
export function onboardingStepToIndex(
  step: CreatorOnboardingStep | undefined
): 1 | 2 | 3 {
  switch (step) {
    case "categories":
      return 2;
    case "socials":
    case "social":
    case "connect":
    case "connect_socials":
    case "completed":
      return 3;
    case "profile":
    default:
      return 1;
  }
}

/**
 * GET /creators/onboarding — resume creator onboarding after login.
 * Returns current step and values saved by earlier attempts.
 */
export function useCreatorOnboarding(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ONBOARDING_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<CreatorOnboardingState>(
        "/creators/onboarding"
      );
      return {
        ...data,
        categories: data.categories ?? [],
      };
    },
    enabled:
      options?.enabled ??
      (typeof window !== "undefined" && !!localStorage.getItem("token")),
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

/**
 * PUT /creators/onboarding/profile — save profile values and advance to categories.
 * Send `{}` to skip this step. Repeated calls update values without regressing progress.
 */
export function useSaveOnboardingProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveOnboardingProfilePayload = {}) => {
      const { data } = await api.put<CreatorOnboardingState>(
        "/creators/onboarding/profile",
        payload
      );
      return {
        ...data,
        categories: data.categories ?? [],
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(ONBOARDING_QUERY_KEY, data);
    },
  });
}

/**
 * PUT /creators/onboarding/categories — replace category selections and advance to socials.
 * Send `{ categories: [] }` to skip. Unknown valid names are created immediately.
 */
export function useSaveOnboardingCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveOnboardingCategoriesPayload) => {
      const { data } = await api.put<CreatorOnboardingState>(
        "/creators/onboarding/categories",
        payload
      );
      return {
        ...data,
        categories: data.categories ?? [],
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(ONBOARDING_QUERY_KEY, data);
      // New categories may have been created — refresh the public list
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

/**
 * POST /creators/onboarding/complete — mark social-connections step complete.
 * Connecting a platform is optional; Continue and Skip both call this.
 * Repeated calls return the original completion timestamp.
 */
export function useCompleteCreatorOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<CreatorOnboardingState>(
        "/creators/onboarding/complete"
      );
      return {
        ...data,
        categories: data.categories ?? [],
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(ONBOARDING_QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
