"use client";

import React from "react";
import Image from "next/image";
import { TfiCheckBox } from "react-icons/tfi";
import { AiOutlineFilePdf } from "react-icons/ai";

const MyDetails = () => {
  const fields = [
    "Branding & Design",
    "Gaming & eSports",
    "Tech & I.T",
    "Fashion",
  ];

  return (
    <div className="space-y-8 lg:px-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-9">
          <Image
            src="/images/avatar.png"
            alt="Avatar"
            className="h-24 w-24"
            width={100}
            height={100}
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Peace Daniel
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-gray-600 mr-4">
                peacedaniel612@gmail.com
              </span>
              <TfiCheckBox className="w-4 h-4 text-green-700" />
              <span className="text-green-600 text-sm">Verified</span>
            </div>
          </div>
        </div>
        <button className="px-6 py-2 bg-secondary-300 text-white rounded hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex items-center space-x-9 mb-2">
            <label className="text-sm text-[#999999]">Company name</label>
            <div className="flex items-center gap-1.5">
              <TfiCheckBox className="w-4 h-4 text-green-700" />
              <span className="text-green-600 text-sm">Verified</span>
            </div>
          </div>
          <p className="text-lg font-medium">Starix Co Limited</p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <label className="text-sm text-[#999999]">Company address</label>
            <TfiCheckBox className="w-4 h-4 text-green-700" />
            <span className="text-green-600 text-sm">Verified</span>
          </div>
          <p className="text-lg">
            No 3, owho polu Str, Ikeja-GRA. Lagos Nigeria
          </p>
        </div>

        <div>
          <label className="text-sm text-[#999999] block mb-2">
            Field/ Industry
          </label>
          <div className="flex flex-wrap gap-3">
            {fields.map((field) => (
              <span key={field} className="px-4 py-2 bg-gray-100 rounded-lg">
                {field}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <label className="text-sm text-gray-500">Brand logo</label>
            <TfiCheckBox className="w-4 h-4 text-green-700" />
            <span className="text-green-600 text-sm">Verified</span>
          </div>
          <Image
            src="/images/logo.png"
            alt="Brand logo"
            className="h-8 w-20"
            width={100}
            height={100}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <label className="text-sm text-gray-500">Brand verification</label>
            <TfiCheckBox className="w-4 h-4 text-green-700" />
            <span className="text-green-600 text-sm">Verified</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <AiOutlineFilePdf className="size-11" />
            <span className="text-sm">PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
