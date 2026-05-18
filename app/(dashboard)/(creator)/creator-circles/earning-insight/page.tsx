"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Imported the router hook
import { 
  GoSearch, 
  GoArrowLeft, 
  GoArrowRight, 
  GoPlus 
} from "react-icons/go";

interface EarningsHistoryProps {
  onBack?: () => void; // Made optional just in case it's loaded as a direct route
}

const EarningsHistory = ({ onBack }: EarningsHistoryProps) => {
  const router = useRouter(); // Initialized the router hook

  const historyItems = [
    { id: 1, title: "Content Writers for Travel Guide Collaboration", members: 8, time: "5 minutes ago", amount: "+ ₦35,000", status: "Pending", statusColor: "bg-[#FFF8DB] text-[#665201]", logo: "/nivea.svg" },
    { id: 2, title: "Graphic Designers for Social Media Campaign", members: 6, time: "5 minutes ago", amount: "+ ₦42,000", status: "Successful", statusColor: "bg-[#03FC6C1A] text-[#27AE60]", logo: "/mcdonald.svg" },
    { id: 3, title: "Graphic Designers for Social Media Campaign", members: 4, time: "5 minutes ago", amount: "+ ₦80,000", status: "Successful", statusColor: "bg-[#03FC6C1A] text-[#27AE60]", logo: "/Ps.svg" },
    { id: 4, title: "Graphic Designers for Social Media Campaign", members: 4, time: "5 minutes ago", amount: "+ ₦29,800", status: "Successful", statusColor: "bg-[#03FC6C1A] text-[#27AE60]", logo: "/starbucks.svg" },
    { id: 5, title: "Graphic Designers for Social Media Campaign", members: 2, time: "5 minutes ago", amount: "+ ₦64,700", status: "Successful", statusColor: "bg-[#03FC6C1A] text-[#27AE60]", logo: "/indomie.svg" },
  ];

  const handleBackNavigation = () => {
    // 1. Direct programmatic navigation to your circle profile route
    router.push("/creator-circles/circle-profile");
    
    // 2. Clear parent layout state if a state handler was passed down
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1E1F24] antialiased">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={handleBackNavigation} // Updated handler call
          className="-ml-2 hover:bg-gray-50 rounded-full transition-colors cursor-pointer p-1"
        >
          <GoArrowLeft size={32} />
        </button>

        <h1 className="text-[20px] md:text-[24px] font-semibold tracking-tight mb-10">
          Circle Total Earnings
        </h1>

        {/* Hero Stats Card */}
        <div className="bg-[#F9FAFB] rounded-[32px] p-3 md:p-6 mb-10 ">
          <div className="flex items-center gap-2 mb-2">
            <img src="/coin.svg" alt="Coin Icon" className="w-6 h-6" />
            <span className="text-[20px] font-medium text-[#1E1F24]">Total Earnings</span>
          </div>
          
          <div className="flex items-baseline gap-1 ">
            <h2 className="text-[30px] md:text-[40px] font-semibold text-[#000000] leading-none tracking-tighter">
              ₦800,000
            </h2>
            <span className="text-[30px] md:text-[40px] font-semibold text-[#80828D]">.00</span>
          </div>

          <div className="flex items-center gap-1 text-[#1E874B] font-medium text-[12px]">
            <GoPlus size={18} /> 12% higher than last month
          </div>
        </div>

        {/* List Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-8">
          <h3 className="text-[20px] font-semibold text-[#1E1F24]">Earnings History</h3>
          <div className="relative w-full md:w-[250px]">
            <GoSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search Challenges"
              className="w-full pl-14 pr-6 py-3.5 border border-[#EFF0F3] rounded-full text-[12px] outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* History Table/List */}
        <div className="divide-y divide-[#EFF0F3] border-t border-[#EFF0F3]">
          {historyItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 group hover:bg-gray-50/50 transition-colors px-2">
              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src={item.logo} fill alt="Logo" className="rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#0CC963] rounded-full border-2 border-white flex items-center justify-center">
                    <GoArrowRight className="text-white -rotate-90" size={10} />
                  </div>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-[#62636C] mb-1">{item.title}</h4>
                  <p className="text-[12px] text-[#747682] font-medium">
                    {item.members} members payout • {item.time}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-[14px] font-semibold text-[#62636C] mb-2">{item.amount}</div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-medium ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-12">
          <button className="flex items-center gap-2 px-8 py-3 border border-gray-200 rounded-full text-[14px] font-normal text-[#5C6473] hover:bg-gray-50">
            <GoArrowLeft /> Previous
          </button>
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] rounded-xl font-bold text-[15px]">1</span>
            <span className="text-gray-400 font-bold">...</span>
            <span className="text-[#5C6473] font-bold">4</span>
          </div>
          <button className="flex items-center gap-2 px-8 py-3 border border-gray-200 rounded-full text-[14px] font-normal text-[#5C6473] hover:bg-gray-50">
            Next <GoArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningsHistory;