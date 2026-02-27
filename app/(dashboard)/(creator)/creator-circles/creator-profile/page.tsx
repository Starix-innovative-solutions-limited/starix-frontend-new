"use client";

import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

import CircleHeader from "@/components/circle/CircleHeader";
import PerformanceSection from "@/components/circle/PerformanceSection";
import MembersList from "@/components/circle/MembersList";

export default function CircleProfile() {

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Members");

  return (

    <div className=" min-h-screen p-8">

      <button
        onClick={() => router.back()}
        className="flex items-center text-2xl gap-2 mb-8 font-medium"
      >
        <FiArrowLeft />
        UpliftCreateVibes Profile
      </button>


      <div className="bg-[#F9FAFB] max-w-6xl mx-auto p-12 ">

        <CircleHeader />

        <div className="grid md:grid-cols-3 gap-12 mb-16">

          <div className="md:col-span-2">

            <h3 className="uppercase text-gray-400 text-sm mb-2">
              Description
            </h3>

            <p className="text-lg text-[#42436A]">
              From brands running high-impact challenges to creators
              winning rewards and building long-term partnerships.
            </p>

          </div>

          <div>

            <h3 className="uppercase text-gray-400 text-sm mb-2">
              Niche
            </h3>

            <p className="text-xl font-normal">
              Fashion
            </p>

          </div>

        </div>

        <PerformanceSection />

        <h2 className="text-2xl font-normal mb-6">
          Members
        </h2>

        

        {activeTab === "Members" && (
          <MembersList />
        )}

      </div>

    </div>

  );
}