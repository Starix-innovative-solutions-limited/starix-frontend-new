"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
import ViewVotes from "../ViewVotes";

export default function CircleInfo() {
  const { open } = useModal();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const challenges = [
    { id: 1, user: "@favvy", message: "Ask for feedback from another creator.", color: "bg-[#E4E8F6]" },
    { id: 2, user: "@favvy", message: "Ask for feedback from another creator.", color: "bg-[#F6D7C6]" },
    { id: 3, user: "@favvy", message: "Ask for feedback from another creator.", color: "bg-[#EAEAEA]" },
  ];

  const pollOptions = [
    { id: 1, text: "Option 1", votes: 0, percent: 0 },
    { id: 2, text: "Option 2", votes: 0, percent: 0 },
  ];

  return (
    <div className="w-full space-y-4 bg-[#F4F4F6] p-5 lg:p-2">

      {/* WEEKLY CHALLENGE */}
      <div className="bg-[#FFFFFF] rounded-[28px] p-3 space-y-4">
        <Header title="Weekly Challenge" />

        {challenges.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <Image src="/avatar.svg" width={30} height={30} alt="avatar" className="rounded-full" />

            <span className="text-[#1D0136]/70 text-sm lg:text-xs">
              {c.user}
            </span>

            <div className={`px-2 py-2 rounded-full text-xs ${c.color}`}>
              {c.message}
            </div>
          </div>
        ))}
      </div>

      {/* FEATURED CREATOR */}
      <div className="bg-[#FFFFFF] rounded-[28px] p-6 lg:p-6 space-y-4">
        <Header title="Featured Creator of the Week" />

        <div className="bg-[#FFF8F5] px-2 rounded-[24px] p-4 flex w-full items-center gap-2 relative">
          <Image src="/avatar.svg" width={45} height={45} alt="profile" className="rounded-full border-3 border-[#f4dacf]" />

          <div>
            <h3 className="text-base font-normal text-[#1D0136]">@Favvy</h3>
            <p className="text-[#6E6E6E] mt-1 text-sm lg:text-sm">
              “Loves to help others to create”
            </p>

            <span className="inline-block mt-1 px-2 py-1 bg-white rounded-lg text-xs text-[#6E6E6E]">
              Fashion
            </span>
          </div>

          <Image
            src="/star.png"
            width={70}
            height={70}
            alt="star"
            className="absolute right-2 top-0"
          />
        </div>
      </div>

      {/* POLL */}
      <div className="bg-[#FFFFFF] rounded-[28px] p-6 lg:p-8 space-y-6">
        <Header title="Poll Question" />

        <div className="flex justify-between items-center">
          <h4 className="text-base text-center items-center font-medium text-[#1D0136]">
            Question/Poll Name
          </h4>
          <button
            onClick={() => open(<ViewVotes />)}
            className="underline text-xs text-[#6E6E6E]"
          >
            View Votes
          </button>
        </div>

        {pollOptions.map((option) => (
          <div key={option.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-[#BDBDBD]" />
                <span className="text-[#6E6E6E] text-sm">{option.text}</span>
              </div>

              <span className="text-[#6E6E6E] text-sm">{option.votes}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#D9D9D9] rounded-full overflow-hidden">
              <div
                style={{ width: `${option.percent}%` }}
                className="h-full bg-[#1D0136]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- HEADER COMPONENT ---------- */

function Header({ title }: { title: string }) {
  return (
    <>
      <div className="flex items-center gap-3 text-[#6E6E6E] text-lg">
        <Image src="/badge.svg" width={26} height={26} alt="badge" />
        <span>{title}</span>
      </div>

      <div className="w-full h-px bg-[#CFCFCF]" />
    </>
  );
}
