/* eslint-disable @typescript-eslint/no-explicit-any */
// SIGN UP

export type CreatorSignupPayload = {
  email: string;
  password: string;
  display_name: string;
};

export type BrandSignupPayload = {
  email: string;
  password: string;
  brand_name: string;
  website?: string;
  industry: string[];
};

// OTP
export type GenerateOtpPayload = {
  email: string;
  purpose: "email_verification" | "password_reset";
};

export type ResetPasswordOtpPayload = {
  email: string;
  otp_code: string;
  new_password: string;
};

export type ResendOtpPayload = {
  email: string;
  purpose: "email_verification" | "password_reset";
};

export type VerifyEmailOtpPayload = {
  email: string;
  otp_code: string; // 6-digit OTP as string
};

export type ResetPasswordPayload = {
  email: string;
  otp_code: string;
  new_password: string;
};

export interface User {
  id: string; // UUID
  email: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  last_login_ip: string;
  last_login_at: string; // ISO date string
}
export type VerificationStatus = "verified" | "unverified" | "pending";
export type BrandProfile = {
  id: string;
  brand_name: string;
  logo_url: string | null;
  description: string | null;
  website: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  company_size: string | null;
  industry: string;
  verification_status: VerificationStatus;
  created_at: string; // ISO date
  updated_at: string; // ISO date
  total_challenges: number;
  user: User;
};

export interface CreatorProfile {
  display_name: string;
  bio: string;
  portfolio_url: string;
  profile_photo_url: string;
  gender: string;
  payout_method: string;
  content_categories: string[];
  preferred_platforms: string[];
  country_code: string; // e.g. "PX"
  timezone: string;
  id: string; // UUID
  social_verification_status: string;
  bank_account_number: number | any;
  bank_code: number | any;
  bank_name: string;
  bank_account_name: string;
  bank_verified: boolean;
  total_challenges_joined: number;
  total_challenges_won: number;
  total_earnings_cents: number;
  reputation_score: number;
  win_rate: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user: User;
}

export interface StatItem {
  label: string;
  value: string | number | any;
  socials?: true;
}

export interface BankDetails {
  bank_account_number: number;
  bank_code: number;
  bank_name: string;
  bank_account_name: string;
  bank_verified: boolean;
  bank_verified_at: string; // ISO date string
}
