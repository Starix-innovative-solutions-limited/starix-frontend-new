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
  email: string;
  password: string;
  username: string;
}) => {
  const res = await api.post("/auth/signup_creator", data);
  return res.data;
};

/* BRAND SIGNUP */
export const signupBrand = async (data: {
  email: string;
  password: string;
  company_name: string;
}) => {
  const res = await api.post("/auth/signup_brand", data);
  return res.data;
};