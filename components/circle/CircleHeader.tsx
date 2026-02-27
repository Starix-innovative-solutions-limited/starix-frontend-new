"use client";

import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";


export default function CircleHeader() {
  return (
    <div className="flex justify-between mb-12">

      <div className="flex gap-6 items-center">

        <div className="w-24 h-24 rounded-full border
        border-[#FFE8DA] flex items-center justify-center">

          <Image
            src="/trophy.svg"
            alt="circle"
            width={70}
            height={70}
          />
        </div>

        <div>
          <h1 className="text-2xl font-normla text-[#0A0A30]">
            Circle Name
          </h1>

          

        </div>

      </div>

      <button
        className="flex items-center gap-2 px-6 h-10
        border rounded-full text-gray-600 font-semibold"
      >
        <FiEdit3 /> Edit Profile
        
      </button>

    </div>
  );
}