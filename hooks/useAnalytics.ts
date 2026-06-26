import { useQuery } from "@tanstack/react-query";

interface EarningsData {
  currency: string;
  total_minor: number;
}

interface EarningsResponse {
  lifetime_earnings: EarningsData[];
  circle_earnings: EarningsData[];
  creator_earnings: EarningsData[];
}

export const useEarnings = () => {
  return useQuery<EarningsResponse, Error>({
    queryKey: ["analytics-earnings"],
    queryFn: async () => {
      // Replace with your actual auth token retrieval method
      const token = localStorage.getItem("token");
      console.log("Token being sent to API:", token);
      if (!token) throw new Error("No token found");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/earnings`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Authentication failed.");
        if (response.status === 403) throw new Error("Account not verified.");
        throw new Error("Failed to fetch earnings.");
      }

      return response.json();
    },
  });
};

// Ranking //

interface ChartPoint {
  x: string;
  y: number | null;
}

interface RankResponse {
  current_rank: number | null;
  direction: "up" | "down" | "flat" | "new";
  delta_count: number;
  weekly_chart: {
    points: ChartPoint[];
    y_min: number;
    y_max: number;
  };
}

export const useRank = () => {
  return useQuery<RankResponse, Error>({
    queryKey: ["analytics-rank"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/rank`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch rank");
      return res.json();
    },
  });
};

interface ChallengeBucket {
  total_count: number;
  ranked_count: number;
  under_review_count: number;
  not_qualified_count: number;
}

interface ChallengesResponse {
  lifetime_challenge_count: number;
  active: ChallengeBucket;
  completed: ChallengeBucket;
}

export const useChallenges = () => {
  return useQuery<ChallengesResponse, Error>({
    queryKey: ["analytics-challenges"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/challenges`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch challenges");
      return res.json();
    },
  });
};

interface Metric {
  value: number;
  comparison: { label: string; percentage: number | null; positive: boolean } | null;
}

export interface EngagementData {
  followers: Metric;
  likes: Metric;
  views: Metric;
  comments: Metric;
  monthly_chart: { points: { x: string; y: number }[]; y_min: number; y_max: number };
}


export interface EngagementResponse {
  overall: EngagementData;
  instagram: EngagementData | null;
  tiktok: EngagementData | null;
  youtube: EngagementData | null;
  [key: string]: EngagementData | null; 
}

export const useEngagement = () => {
  return useQuery<EngagementResponse, Error>({
    queryKey: ["analytics-engagement"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/engagement`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch engagement");
      return res.json();
    },
  });
};

interface SpiderSeries {
  platform: string;
  values: number[];
  skipped_components: string[];
}

export interface StarixScoreResponse {
  overall_score: number | null;
  best_performing_platform: string | null;
  per_platform: Record<string, number | null>;
  spider: {
    dimensions: string[];
    series: SpiderSeries[];
  };
}

export const useStarixScore = () => {
  return useQuery<StarixScoreResponse, Error>({
    queryKey: ["analytics-starix-score"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/starix-score`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch Starix score");
      return res.json();
    },
  });
};

interface TrendPoint {
  x: string;
  y: number | null;
}

export interface EngagementTrendResponse {
  lifetime_engagement_count: number;
  monthly_chart: {
    points: TrendPoint[];
    y_min: number;
    y_max: number;
  };
}

export const useEngagementTrend = () => {
  return useQuery<EngagementTrendResponse, Error>({
    queryKey: ["analytics-engagement-trend"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/engagement-trend`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch engagement trend");
      return res.json();
    },
  });
};

interface PlatformEngagement {
  value: number;
  comparison: { label: string; percentage: number | null; positive: boolean } | null;
}

export interface TotalEngagementsResponse {
  lifetime_engagement_count: number;
  per_platform: Record<string, PlatformEngagement>;
}

export const useTotalEngagements = () => {
  return useQuery<TotalEngagementsResponse, Error>({
    queryKey: ["analytics-total-engagements"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/total-engagements`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch total engagements");
      return res.json();
    },
  });
};

interface ProfileClicksResponse {
  unique_clicks_count: number;
  comparison: { label: string; percentage: number | null; positive: boolean } | null;
}

export const useProfileClicks = () => {
  return useQuery<ProfileClicksResponse, Error>({
    queryKey: ["analytics-profile-clicks"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/me/profile-clicks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch profile clicks");
      return res.json();
    },
  });
};