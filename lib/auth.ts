import { api } from "./api";

/* LOGIN */
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/* CREATOR SIGNUP */
export const signupCreator = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/signup/creator", data);
  return res.data;
};

/* BRAND SIGNUP */
export const signupBrand = async (data: {
  email: string;
  password: string;
  company_name: string;
}) => {
  const res = await api.post("/auth/signup/brand", data);
  return res.data;
};