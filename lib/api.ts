import axios from "axios";

export const api = axios.create({
  baseURL: "https://starix-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});