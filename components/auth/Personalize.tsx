/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomInput from "@/components/CustomInput";
import React, { useState } from "react";

import { categories } from "@/constant/index";
import { MoveLeft } from "lucide-react";

interface PersonalizeProps {
  onBack: () => void;
}
const Personalize: React.FC<PersonalizeProps> = ({ onBack }) => {
  const [accountType, setAccountType] = useState("");

  // creator fields
  const [portfolio, setPortfolio] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // brand fields
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");

  // file fields
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [brandVerification, setBrandVerification] = useState<File | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(e.target.value);
    console.log("Selected:", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      accountType,
      portfolio,
      tags,
      companyName,
      companyAddress,
      brandLogo,
      brandVerification,
    });
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-2xl leading-9 flex items-center gap-7">
          <button
            onClick={onBack}
            className=" p-2 rounded-2xl bg-[#F5F5F5] border-[0.5px] border-[#99999966] text-[#444] "
          >
            <MoveLeft className="text-secondary-200 size-6" />
          </button>
          Personalise your account
        </h3>
        <p className="text-[#666666]">&nbsp;</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="block mb-1 font-medium text-[#666666] text-sm">
            Account type
          </span>
          <select
            value={accountType}
            onChange={handleSelectChange}
            className="input w-full"
          >
            <option value="">Select your account type</option>
            <option value="brand">Brand</option>
            <option value="creator">Creator</option>
          </select>
        </div>

        {accountType === "creator" ? (
          <>
            <CustomInput
              label="Categories"
              type="tags"
              placeholder="Type and press Enter..."
              tags={tags}
              setTags={setTags}
              suggestions={categories}
              onChange={() => {}} // tags handled via setTags
            />

            <CustomInput
              label="Portfolio / Website"
              placeholder="Let brands see your works"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </>
        ) : accountType === "brand" ? (
          <>
            <CustomInput
              label="Company Name"
              placeholder="Enter your company's name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <CustomInput
              label="Company Address"
              placeholder="Enter your company's address"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />

            <CustomInput
              label="Categories"
              type="tags"
              placeholder="Type and press Enter..."
              tags={tags}
              setTags={setTags}
              suggestions={categories}
              onChange={() => {}} // tags handled via setTags
            />

            <CustomInput
              label="Brand Logo"
              type="file"
              placeholder="Upload an image, png, jpg formats only"
              onChange={(e) => {
                if (e.target.files) {
                  setBrandLogo(e.target.files[0]);
                }
              }}
            />

            <CustomInput
              label="Brand Verification"
              type="file"
              placeholder="Upload any means of verification (documents, websites...)"
              onChange={(e) => {
                if (e.target.files) {
                  setBrandVerification(e.target.files[0]);
                }
              }}
            />

            <div className="flex items-center gap-3 my-3">
              <input type="checkbox" className="size-4" />
              <p className="text-[#333333] text-sm">
                I agree to the{" "}
                <span className="underline">Business Verification Policy.</span>{" "}
              </p>
            </div>
          </>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="btn bg-secondary-300 w-full text-white"
          disabled={!accountType}
        >
          Set up
        </button>

        <p className="font-mono text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-secondary-300 font-semibold">
            Login.
          </a>
        </p>
      </form>
    </div>
  );
};

export default Personalize;
