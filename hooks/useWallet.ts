/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface WalletBalancesResponse {
  available_balance: string; // e.g., "₦1,234.56"
  currency: string;          // e.g., "NGN"
  pending_balance: string;   // e.g., "₦100.00"
}

export interface EarningItem {
  id: string;
  challenge_id: string;
  challenge_title: string;
  brand_logo_url: string;
  amount: string; 
  currency: string;
  status: "successful" | "pending" | "failed" | string;
  earned_at: string;
}

export interface EarningsResponse {
  items: EarningItem[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  prev_url: string | null;
  next_url: string | null;
}

export interface WithdrawalAccountResponse {
  bank_logo_url: string;
  id: string;
  bank_name: string;
  bank_code: string;
  account_name: string;
  account_number: string;
  currency: string;
  is_active: boolean;
  name_match_status: "auto_approved" | "pending_review" | "rejected" | string;
  cooldown_until: string;
}

// 📈 Added matching types for the earnings summary endpoint context
export interface EarningsSummaryQueryParams {
  period?: "all_time" | "this_month";
  currency?: string;
  tz?: string;
}

export interface EarningsSummaryResponse {
  period: "all_time" | "this_month";
  currency: string;
  total: string;
  comparison: {
    label: string;
    percentage: number;
    positive: boolean;
  } | null;
}

export interface UpdateWithdrawalAccountPayload {
  bank_name: string;
  bank_code: string;
  account_number: string;
  pin: string;
  revert_redirect_url: string;
}

export interface ExecuteWithdrawalPayload {
  amount: number;
  pin: string;
}

export interface SetWalletPinPayload {
  pin: string;
  pin_confirmation: string;
}

export interface ChangeWalletPinPayload {
  current_pin: string;
  new_pin: string;
  new_pin_confirmation: string;
}


export interface ExistingSecurityQuestionResponse {
  question_key: string;
  question_label: string;
  answer_hint_masked: string | null;
}

export interface SecurityQuestionResponse {
  question_key: string;
  question_label: string;
  answer_hint_masked?: string;
}

export interface WithdrawalQuotePayload {
  amount: number;
  bank_detail_id: string;
  currency?: string;
}

export interface WithdrawalQuoteResponse {
  currency: string;
  amount: string;             // e.g., "₦1,500.00"
  fee: string;                // e.g., "₦26.88"
  net_amount: string;         // e.g., "₦1,473.12"
  available_balance: string;  // e.g., "₦12,500.00"
  sufficient: boolean;
}

export interface ExecuteWithdrawalPayload {
  amount: number;
  bank_detail_id: string;
  pin: string;
  currency?: string;
}

export interface ExecuteWithdrawalResponse {
  id: string;
  status: "processing" | "failed";
  currency: string;
  gross_amount: string;
  fee: string;
  net_amount: string;
  provider_reference: string;
  requested_at: string;
}

export interface SetSecurityQuestionPayload {
  question_key: string;
  answer: string;
  answer_hint_masked?: string;
}

export const useSetSecurityQuestion = () => {
  return useMutation({
    mutationFn: async (payload: SetSecurityQuestionPayload) => {
      const { data } = await api.post("/wallet/security-question", payload);
      return data;
    },
  });
};

export interface SecurityQuestionCatalog {
  key: string;
  label: string;
}

export const useGetSecurityQuestionCatalog = () => {
  return useQuery({
    queryKey: ["securityQuestionCatalog"],
    queryFn: async () => {
      const { data } = await api.get<{ questions: SecurityQuestionCatalog[] }>(
        "/wallet/security-questions"
      );
      return data.questions;
    },
    initialData: [],
  });
};

export const useGetSecurityQuestion = () => {
  return useQuery({
    queryKey: ["wallet", "security-question"],
    queryFn: async () => {
      try {
        const { data } =
          await api.get<SecurityQuestionResponse>(
            "/wallet/security-question"
          );

        return data;
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 404) {
          return null;
        }

        throw error;
      }
    },
  });
};

// ==========================================
// QUERIES (GET Hooks)
// ==========================================

/**
 * Fetches the user's live available and pending balances
 */
export const useGetWalletBalances = () => {
  return useQuery({
    queryKey: ["wallet", "balances"],
    queryFn: async () => {
      const { data } = await api.get<WalletBalancesResponse>("/wallet/balance");
      return data;
    },
  });
};

/**
 * Fetches transactional records for settled earning challenges
 */
export const useGetWalletEarnings = (page: number = 1) => {
  return useQuery({
    queryKey: ["wallet", "earnings", page],
    queryFn: async () => {
      const { data } = await api.get<EarningsResponse>(`/wallet/earnings?page=${page}&page_size=10`);
      return data;
    },
  });
};

/**
 * Fetches transactional summary of CHALLENGE_CREDIT earnings over a period
 */
export const useGetEarningsSummary = (params?: EarningsSummaryQueryParams) => {
  return useQuery({
    // Keep caching structurally synchronized directly with active UI dropdown configurations
    queryKey: ["wallet", "earnings", "summary", params],
    queryFn: async () => {
      const { data } = await api.get<EarningsSummaryResponse>("/wallet/earnings/summary", {
        params,
      });
      return data;
    },
  });
};

/**
 * Fetches the active verified payout withdrawal account configurations
 */
export const useGetWithdrawalAccount = () => {
  return useQuery<WithdrawalAccountResponse | null>({
    queryKey: ["wallet", "withdrawal-account"],
    queryFn: async () => {
      try {
        const { data } = await api.get<WithdrawalAccountResponse>(
          "/wallet/withdrawal-account"
        );
        return data;
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 404) {
          return null;
        }

        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetBanksList = () => {
  return useQuery({
    queryKey: ["banksList"],
    queryFn: async () => {
      const { data } = await api.get("/wallet/banks"); 
      return data; 
    }
  });
};

// ==========================================
// MUTATIONS (POST/PUT Hooks)
// ==========================================

/**
 * MUTATION Hook: Sets the creator's initial 4-digit Wallet PIN
 */
export const useSetWalletPin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SetWalletPinPayload) => {
      const { data } = await api.post("/wallet/pin", payload); 
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
};

export const useChangeWalletPin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ChangeWalletPinPayload) => {
      const { data } = await api.put<ChangeWalletPinPayload>("/wallet/pin", payload); 
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
};


export const useGetWithdrawalQuote = () => {
  return useMutation({
    mutationFn: async (payload: WithdrawalQuotePayload) => {
      const { data } = await api.post<WithdrawalQuoteResponse>("/wallet/withdrawals/quote", payload);
      return data;
    },
  });
};

/**
 * Submits or alters user destination payout mapping coordinates.
 */
export const useUpdateWithdrawalAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateWithdrawalAccountPayload) => {
      const { data } = await api.put<WithdrawalAccountResponse>("/wallet/withdrawal-account", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", "withdrawal-account"] });
    },
  });
};

/**
 * Executes a live fund reduction transaction out of the wallet balances layer
 */

export const useExecuteWithdrawal = () => {
  return useMutation({
    mutationFn: async (payload: ExecuteWithdrawalPayload) => {
      // 🛡️ Generate a fresh client-side UUID v4 for the Idempotency header
      const idempotencyKey = crypto.randomUUID();

      const { data } = await api.post<ExecuteWithdrawalResponse>(
        "/wallet/withdrawals", 
        payload,
        {
          headers: {
            "Idempotency-Key": idempotencyKey
          }
        }
      );
      return data;
    },
  });
};

export interface ResetPinStartPayload {
  answer: string;
}

export interface ResetPinConfirmPayload {
  reset_token: string;
  new_pin: string;
  new_pin_confirmation: string;
}

export const useResetPinStart = () => {
  return useMutation({
    mutationFn: async (payload: ResetPinStartPayload) => {
      const { data } = await api.post<{ reset_token: string }>(
        "/wallet/pin/reset",
        payload
      );
      return data;
    },
  });
};

export const useResetPinConfirm = () => {
  return useMutation({
    mutationFn: async (payload: ResetPinConfirmPayload) => {
      const { data } = await api.post("/wallet/pin/reset/confirm", payload);
      return data;
    },
  });
};