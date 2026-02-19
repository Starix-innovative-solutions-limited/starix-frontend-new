"use client";

import React, { useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: { selectedCategory: string; deadline: string }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onSave }) => {
  const [categoryOpen, setCategoryOpen] = useState(true); // Open by default as per image
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deadline, setDeadline] = useState("10 days");

  const categories = ["Fashion", "Technology", "Lifestyle & Entertainment"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile/closing */}
          <div 
            className="fixed inset-0 bg-black/8 z-40 md:bg-transparent" 
            onClick={onClose} 
          />

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[400px] min-h-[200px] bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center justify-center p-8 border-b border-gray-50">
              <h2 className="text-[22px] font-medium text-[#0A0A30]">Filters</h2>
              <button
                onClick={onClose}
                className="absolute right-8 p-2 bg-[#F9FAFB] rounded-full text-gray-500 hover:bg-gray-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Category Section */}
              <div className="space-y-4">
                <label className="text-[17px] text-[#0A0A30] font-medium block">Category</label>
                
                {/* Select Box */}
                <div 
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className={`flex items-center justify-between h-[72px] px-6 rounded-[24px] border-2 cursor-pointer transition-all ${
                    categoryOpen ? 'border-[#0A0A30]' : 'border-gray-200'
                  }`}
                >
                  <span className="text-gray-500">Select Category</span>
                  {categoryOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </div>

                {/* Dropdown List */}
                {categoryOpen && (
                  <div className="rounded-[24px] border-2 border-[#0A0A30] p-6 space-y-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left text-[16px] transition-colors ${
                          selectedCategory === cat ? 'text-[#0A0A30] font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Deadline Section */}
              <div className="space-y-4">
                <label className="text-[17px] text-[#0A0A30] font-medium block">Deadline</label>
                <div className="flex items-center justify-between h-[72px] px-6 rounded-[24px] border border-gray-200 bg-white">
                  <span className="text-gray-300">{deadline}</span>
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 h-[64px] rounded-full border border-[#0A0A30] text-[#0A0A30] font-medium text-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onSave({ selectedCategory, deadline })}
                  className="flex-1 h-[64px] rounded-full bg-[#000033] text-white font-medium text-lg hover:bg-[#000055] transition-all shadow-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;