/* eslint-disable @typescript-eslint/no-explicit-any */

import { variants } from "@/constant";
import { motion } from "framer-motion";
import React, { useState } from "react";
import CustomInput from "../CustomInput";
import Loader from "../Loader";
import { useCreatorSignup, useGenerateOtp } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type FormProps = {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
};

type CreatorSignupProps = {
  setIsGoogleAuth: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
};

const CreatorSignup = ({ }: CreatorSignupProps) => {

  const router = useRouter();

  const initialForm: FormProps = {
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
  };

  const [form, setForm] = useState<FormProps>(initialForm);
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutateAsync, isPending } = useCreatorSignup();
  const { mutate: generateOtp } = useGenerateOtp();

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return regex.test(password);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!form.full_name || !form.email || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number and special character"
      );
      return;
    }

    if (form.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await toast.promise(
        mutateAsync(form),
        {
          loading: "Creating account...",

          success: () => {

            generateOtp({
              email: form.email,
              purpose: "email_verification",
            });

            setForm(initialForm);

            router.push("/verify-email");

            return "Welcome aboard! Please verify your email to continue.";
          },

          error: (err: any) => {

            const detail = err?.response?.data?.detail;

            if (Array.isArray(detail)) {
              return detail.map((d) => d.msg).join(", ");
            }

            return detail || "Signup failed";
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={variants?.itemVariants}
    >

      {/* FULL NAME */}
      <div>
        <CustomInput
          label="Full Name"
          placeholder="John Doe"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
        />
       
      </div>

      {/* EMAIL */}
      <div>
        <CustomInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        
      </div>

      {/* PHONE NUMBER */}
      <div>
        <label className="text-sm font-medium">
          Mobile Number (optional)
        </label>

        <PhoneInput
          international
          defaultCountry="NG"
          value={form.phone_number}
          onChange={(value) =>
            setForm({ ...form, phone_number: value })
          }
          className="mt-2 border rounded-md p-3"
        /> 
        
      </div>

      {/* PASSWORD */}
      <div>
        <CustomInput
          label="Password"
          type="password"
          placeholder="Create password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <p className="text-xs text-gray-500 mt-1">
          Must be 8+ characters with uppercase, lowercase, number and
          special character.
        </p>
      </div>

      {/* CONFIRM PASSWORD */}
      <CustomInput
        label="Confirm Password"
        type="password"
        placeholder="Retype password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* SUBMIT BUTTON */}
      <motion.div className="mt-4">
        <motion.button
          variants={variants?.itemVariants}
          whileTap={{ scale: 0.97 }}
          disabled={isPending}
          className="
            w-full
            rounded-full
            py-4
            font-medium
            text-white
            bg-dark-navy
            border border-dark-navy
            hover:shadow-xl
            disabled:opacity-60
          "
          onClick={handleSubmit}
        >
          {isPending ? <Loader /> : "Create Account"}
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default CreatorSignup;