/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { useCreatorPayment, usePaymentBanks } from "@/hooks/usePayment";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useModal } from "@/hooks/useModal";

const EditPaymentDetails = () => {
  const initialForm = {
    bank_code: null,
    account_number: "",
    account_name: null,
  };

  const [form, setForm] = useState<any>(initialForm);

  const { fetchProfile } = useAuthStore();
  const { close } = useModal();

  const { mutateAsync: addCreatorPayment, isPending } = useCreatorPayment();
  const { data: banks } = usePaymentBanks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form?.account_name || !form?.account_number || !form?.bank_code) {
      console.log("Account details missing");
      return;
    }

    await toast.promise(addCreatorPayment(form), {
      loading: "Adding Payment Details...",
      success: () => {
        setForm(initialForm);
        fetchProfile();
        close();
        return "Payment added successfully ✅";
      },
      error: (err: any) => {
        console.log("Payment Edit Error:", err);
        return `Payment update failed: ${err.response?.data?.detail}`;
      },
    });
  };

  return (
    <div
      className="
        
        w-[520px]
        mx-auto
       
        rounded-3xl
        
        px-6
        sm:px-8
        py-8
        flex flex-col
      "
    >
      {/* Header */}
      <h2 className="text-2xl font-medium text-center text-secondary-100 mb-8">
        Payment Details
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <CustomInput
          label="Bank Name"
          placeholder="Select Bank"
          value={form?.bank_code}
          options={banks}
          type="select"
          onChange={(e: any) =>
            setForm({ ...form, bank_code: e.target.value })
          }
          className="rounded-2xl"
        />

        <CustomInput
          label="Account No"
          placeholder="Account No"
          value={form?.account_number}
          onChange={(e) =>
            setForm({ ...form, account_number: e.target.value })
          }
          className="rounded-2xl"
          min={10}
        />

        <CustomInput
          label="Account Name"
          placeholder="Account Name"
          value={form?.account_name}
          onChange={(e) =>
            setForm({ ...form, account_name: e.target.value })
          }
          className="rounded-2xl"
          min={1}
          max={255}
        />

        {/* Save Button */}
        <button
          type="submit"
          disabled={isPending}
          className="
            w-full
            mt-4
            py-4
            rounded-full
            text-lg
            font-medium
            bg-[#6B6F8E]
            text-white
            hover:opacity-95
            transition
            disabled:opacity-60
          "
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditPaymentDetails;
