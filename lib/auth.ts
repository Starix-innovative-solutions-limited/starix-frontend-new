// import { api } from "./api";

// /* LOGIN */
// export const loginUser = async (data: {
//   email: string;
//   password: string;
// }) => {
//   const res = await api.post("/auth/login", data);
//   return res.data;
// };

// /* CREATOR SIGNUP */
// export const signupCreator = async (data: {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
// }) => {
//   const res = await api.post("/auth/signup/creator", data);
//   return res.data;
// };

// /* BRAND SIGNUP */
// export const signupBrand = async (data: {
//   email: string;
//   password: string;
//   company_name: string;
// }) => {
//   const res = await api.post("/auth/signup/brand", data);
//   return res.data;
// };

import { api } from "@/lib/api";

type GoogleAuthRole = "creator" | "brand";
type GoogleAuthMode = "login" | "signup";

export async function startGoogleAuth(role: GoogleAuthRole, mode: GoogleAuthMode) {
  localStorage.setItem("oauthRole", role);
  localStorage.setItem("oauthMode", mode);

  const callbackUrl = `${window.location.origin}/callback`;

  const { data } = await api.get("/auth/oauth/google", {
    params: {
      role,
      callback_url: callbackUrl,
    },
  });

  const url = data?.authorization_url || data?.url;

  if (!url) {
    throw new Error("Google authorization URL missing from server response.");
  }

  window.location.href = url;
}