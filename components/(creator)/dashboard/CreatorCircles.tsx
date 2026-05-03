"use client";

import React, { useState } from "react";
import CreateCircleModal from "./CreateCircleModal"; // Make sure path is correct

const CreatorCircles = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [forceEmpty, setForceEmpty] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto p-6 font-sans">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Creator Circles</h1>
          <p className="text-gray-500 text-sm">Collaborate and grow with creators</p>
        </div>
      </header>

      {/* Hero Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#FFEBE4] p-8 rounded-[32px] h-[200px] flex flex-col justify-between">
          <h2 className="text-xl font-bold text-[#1E1F24]">Start a Circle</h2>
          <button 
            onClick={() => {
                setForceEmpty(true);
                setIsCreateModalOpen(true);
            }} 
            className="w-fit px-6 py-2 border border-gray-400 rounded-full font-bold text-sm hover:bg-white transition-colors"
          >
            Create Circle
          </button>
        </div>
        <div className="bg-[#E9F6FF] p-8 rounded-[32px] h-[200px] flex flex-col justify-between">
          <h2 className="text-xl font-bold text-[#1E1F24]">Join a Circle</h2>
          <button className="w-fit px-6 py-2 border border-gray-400 rounded-full font-bold text-sm hover:bg-white transition-colors">
            Enter Code
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-[#1E1F24]">No circles yet</h3>
          <p className="text-gray-500 mb-8">Create a circle or join one to start collaborating.</p>
          <button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="px-10 py-4 bg-[#0047FF] text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all"
          >
            Create Circle
          </button>
      </div>

      {/* Modal - The typing bug is fixed here because it's its own component */}
      <CreateCircleModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default CreatorCircles;