// utils/sessionAuth.ts

type PendingSignup = {
  email: string;
  role?: string;
  access_token: string;
  token_type: string;
};

const STORAGE_KEY = "pending_signup";

export const sessionAuth = {
  // Save signup/OTP data
  save: (data: PendingSignup) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  },

  // Retrieve signup/OTP data
  get: (): PendingSignup | null => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as PendingSignup;
    } catch (err) {
      console.error("Failed to parse session auth data", err);
      return null;
    }
  },

  // Clear signup/OTP data (after verification)
  clear: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  },
};
