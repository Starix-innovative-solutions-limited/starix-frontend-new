import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type ChallengeCategory = {
  id: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  created_at: string;
};

export type CategoriesResponse = {
  categories: ChallengeCategory[];
};

/**
 * GET /categories — public list of active challenge categories (alphabetical by name).
 * Use the category `name` (not UUID) for brand industry, creator niches, and challenges.
 */
export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get<CategoriesResponse>("/categories");
      return data.categories ?? [];
    },
    staleTime: 1000 * 60 * 30, // cache 30m — list is small & public
    select: (categories) =>
      [...categories]
        .filter((c) => c.is_active !== false)
        .sort((a, b) => a.name.localeCompare(b.name)),
  });
}
