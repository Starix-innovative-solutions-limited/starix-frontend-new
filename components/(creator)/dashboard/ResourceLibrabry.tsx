"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiDownload, FiEye, FiLink } from "react-icons/fi";

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState("documents");

  const tabs = [
    { id: "documents", label: "Documents" },
    { id: "media", label: "Photos & Videos" },
    { id: "links", label: "Links" },
    { id: "template", label: "Template" },
  ];

  const files = [1, 2];
  const media = [1, 2, 3, 4, 5, 6];
  const links = [
    { id: 1, title: "Dribbble Inspiration", url: "https://dribbble.com" },
    { id: 2, title: "Figma Assets", url: "https://figma.com" },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl px-6 sm:px-10 pt-8 pb-10">

        {/* TITLE */}
        <h2 className="text-center text-2xl sm:text-3xl font-medium text-secondary-100 mb-8">
          Resource Library
        </h2>

        {/* TABS */}
        <div className="flex items-center justify-between gap-3 mb-4 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap px-5 py-2.5 rounded-full text-sm transition
                  ${
                    isActive
                      ? "bg-[#EFEFEF] text-secondary-100"
                      : "text-secondary-100/60 hover:text-secondary-100"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="h-px w-full bg-secondary-100/20 mb-8" />

        {/* ================== DOCUMENTS ================== */}
{activeTab === "documents" && (
  <div className="space-y-6">
    {files.map((_, i) => (
      <div
        key={i}
        className="bg-[#ECEAEA] rounded-3xl p-6 flex items-center justify-between gap-4"
      >
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <div className="bg-white w-24 h-24 rounded-2xl grid place-items-center">
            <Image src="/doc.svg" alt="file" width={60} height={60} />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg text-secondary-100 font-medium">
              Name of File
            </h3>

            <p className="text-sm text-secondary-100/60">Added by:</p>

            <div className="flex items-center gap-2">
              <Image
                src="/avatar.svg"
                alt="profile"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-sm text-secondary-100">@favvy</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-6">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs text-secondary-100/70">
            <FiEye /> 3k
          </div>

          <button className="bg-white w-9 h-9 rounded-full grid place-items-center">
            <FiDownload />
          </button>
        </div>
      </div>
    ))}
  </div>
)}


        {/* ================== PHOTOS & VIDEOS ================== */}
{activeTab === "media" && (
  <div className="space-y-6">
    <div className="bg-[#ECEAEA] rounded-3xl p-5 flex items-center justify-between gap-5">
      
      {/* IMAGE */}
      <div className="w-28 h-28 rounded-2xl overflow-hidden relative">
        <Image
          src="/rule.png"
          alt="media"
          fill
          className="object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="flex-1 space-y-2">
        <h3 className="text-sm text-secondary-100 font-medium">
          Name of File
        </h3>

        <p className="text-sm text-secondary-100/60">Added by:</p>

        <div className="flex items-center gap-2">
          <Image
            src="/avatar.svg"
            alt="profile"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-xs text-secondary-100">@favvy</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-6">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs text-secondary-100/70">
          <FiEye /> 3k
        </div>

        <button className="bg-white w-9 h-9 rounded-full grid place-items-center">
          <FiDownload />
        </button>
      </div>
    </div>
  </div>
)}


        {/* ================== LINKS ================== */}
{activeTab === "links" && (
  <div className="space-y-8 mt-6">
    <div>
      <label className="text-secondary-100 text-lg font-medium block mb-4">
        Upload Link
      </label>

      <input
        type="text"
        placeholder="Upload Link"
        className="
          w-full
          border
          border-secondary-100/30
          rounded-2xl
          px-6
          py-5
          text-secondary-100
          placeholder:text-secondary-100/40
          focus:outline-none
        "
      />
    </div>

    <button
      className="
        w-full
        bg-secondary-100
        text-white
        py-5
        rounded-full
        text-lg
        font-medium
      "
    >
      Send
    </button>
  </div>
)}


        {activeTab === "template" && (
          <div className="text-center text-secondary-100/50 py-20">
            No templates yet.
          </div>
        )}


      </div>
    </div>
  );
};

export default ResourceLibrary;
