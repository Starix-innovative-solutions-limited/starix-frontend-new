"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import CustomInput from "../CustomInput";

export default function Password2FA() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  return (
    <div className="space-y-8 w-full lg:px-6">
      <div className="space-y-9">
        <h3 className="text-[#666666] text-xl">
          To change your password, enter a new one below
        </h3>
        <CustomInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          label="Password"
          placeholder="minimum of 8 characters"
          className="max-w-xl"
        />

        <CustomInput
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          label="Re-enter Password"
          placeholder="minimum of 8 characters"
          className="max-w-xl"
        />

        <button className=" btn bg-secondary-300 text-white w-fit">
          Change Password
        </button>
      </div>

      <div className="pt-6 space-y-5">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          Two-Factor Authentication
        </h3>
        <p className="text-base text-[#666666] mt-1">
          Each time you login to Starix, you’ll need to enter your password and
          a verification code to continue
        </p>
        <button
          //   variant={twoFAEnabled ? "destructive" : "default"}
          className="mt-4 btn text-white bg-secondary-300"
          onClick={() => setTwoFAEnabled(!twoFAEnabled)}
        >
          {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>
      </div>
    </div>
  );
}
