/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useCreatorPayment() {
  return useMutation({
    mutationFn: (data: any) =>
      api.post("/auth/profile/creator/bank-account", data),
    onError: (err: any) => {
      console.log("EDIT PAYMENT ERROR:", err.response?.data);
    },

    onSuccess: (res: any) => {
      console.log("EDIT PAYMENTSUCCESS:", res.data);
    },
  });
}
