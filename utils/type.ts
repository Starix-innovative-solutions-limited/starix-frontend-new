/* eslint-disable @typescript-eslint/no-explicit-any */
// SIGN UP

export type CreatorSignupPayload = {
  first_name: string; // 2–128 chars
  last_name: string; // 2–128 chars
  email: string;
  password: string; // 8+, upper, lower, digit, special
};

export type CreatorSignupUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: "creator" | string;
  is_email_verified: boolean;
  username?: string;
  bio?: string | null;
  phone_number?: string | null;
  profile_picture_url?: string | null;
  banner_url?: string | null;
  niches?: string[];
  country?: string | null;
  gender?: string | null;
  account_status?: string;
  created_at?: string;
  updated_at?: string;
};

export type CreatorSignupResponse = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer" | string;
  expires_in: number;
  user: CreatorSignupUser;
};

export type BrandSignupPayload = {
  brand_name: string; // 2–255 chars
  email: string;
  password: string; // 8+, upper, lower, digit, special
  brand_address: string; // 2–500 chars
  industry: string; // 2–100 chars, single industry
};

export type BrandSignupUser = {
  id: string;
  email: string;
  brand_name: string;
  user_type: "brand" | string;
  is_email_verified: boolean;
  profile_picture_url?: string | null;
  banner_url?: string | null;
  bio?: string | null;
  account_status?: string;
  created_at?: string;
  updated_at?: string;
};

export type BrandSignupResponse = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer" | string;
  expires_in: number;
  user: BrandSignupUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginUser = {
  id: string;
  email: string;
  user_type: "creator" | "brand" | string;
  first_name?: string;
  last_name?: string;
  brand_name?: string;
  username?: string;
  bio?: string | null;
  profile_picture_url?: string | null;
  banner_url?: string | null;
  is_verified?: boolean;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  niches?: string[];
  account_status?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer" | string;
  expires_in: number;
  user: LoginUser;
};

/** GET /auth/me — full authenticated user profile */
export type UserProfile = {
  id: string;
  email: string;
  user_type: "creator" | "brand" | string;
  first_name?: string;
  last_name?: string;
  brand_name?: string;
  username?: string;
  phone_number?: string | null;
  bio?: string | null;
  profile_picture_url?: string | null;
  banner_url?: string | null;
  niches?: string[];
  country?: string | null;
  gender?: string | null;
  age_group?: string | null;
  date_of_birth?: string | null;
  account_status?: string;
  starix_score_visibility?: "public" | "private" | string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  // App-extended fields (may appear depending on role)
  total_completed_challenges?: number;
  connected_platforms?: { platform: string; username: string }[];
  lifetime_engagements?: number;
  starix_score?: number;
  industry?: string | null;
  brand_address?: string | null;
};

export type AuthMeResponse = UserProfile;

// OTP
export type GenerateOtpPayload = {
  email: string;
  purpose: "email_verification" | "password_reset";
};

/** POST /auth/otp/email/request — no body; uses Bearer token */
export type RequestEmailOtpResponse = {
  message: string;
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
  /** 6-character alphanumeric OTP */
  code: string;
};

/** POST /auth/otp/email/verify — Bearer auth */
export type VerifyEmailOtpResponse = {
  message: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp_code: string;
  new_password: string;
};

export interface PendingSignup {
  email?: string;
  brand_email?: string;   // Add this
  creator_email?: string; // Add this
  role?: string;
  access_token?: string;
  token_type?: string;
}

export interface Member {
  id: string; // Change from number to string
  name: string;
  role: "Admin" | "Member";
  isYou: boolean;
  avatar: string;
  percentage: number;
  status: string;
  color: string;
}

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

export interface CircleMember {
  user_id: string;
  full_name: string;
  profile_picture_url: string;
  role: string;
  avatar?: string; // Add this if needed for the payout view
  name?: string;
}