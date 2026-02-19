/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModal } from '@/components/GlobalModal';
import FeedBack2 from '../FeedBack2';
import { img } from 'framer-motion/client';

// Using raw SVGs for brand accuracy to match the Figma icons
const SOCIAL_PLATFORMS = [
  { 
    id: 'x', 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  { 
    id: 'youtube', 
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  { 
    id: 'instagram', 
    icon: (
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-7 h-7" alt="ig" />
    )
  },
  { 
    id: 'tiktok', 
    icon: (
      <img src="/tiktok.svg" className='w-24 h-24' alt='tiktok'/>
    )
  }
];

const SubmitUrl = ({ onSubmit = (data: any) => console.log(data) }) => {
  const { open, close } = useModal();
  const [selectedPlatform, setSelectedPlatform] = useState('x');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    onSubmit({ platform: selectedPlatform, url });
    open(<FeedBack2 />);
  };

  return (
    <div className="relative w-full max-w-[720px] overflow-hidden">
      {/* Header with Close Icon */}
      <div className="flex items-center justify-center p-6 relative">
        <h2 className="text-[20px] font-medium text-[#0A0A30]">Submit URL</h2>
      </div>

      <div className="px-6 pb-10 md:px-12 md:pb-12 space-y-8">
        {/* Platform Selection */}
        <div className="space-y-4">
          <label className="text-[16px] text-[#0A0A30] font-normal block">
            What social media platform is it posted on?
          </label>
          <div className="flex gap-4">
            {SOCIAL_PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`w-[72px] h-[72px] flex items-center justify-center rounded-[20px] transition-all border-2 ${
                  selectedPlatform === p.id 
                    ? 'border-[#0A0A30] bg-white' 
                    : 'border-transparent bg-[#F9FAFB] text-gray-400'
                }`}
              >
                {p.icon}
              </button>
            ))}
          </div>
        </div>

        {/* URL Input */}
        <div className="space-y-4">
          <label className="text-[16px] text-[#0A0A30] font-normal block">
            Share Post URL
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="https://www.example.com/"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-[72px] px-6 rounded-[24px] border border-[#E5E7EB] bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#000033] text-white py-5 rounded-full text-[18px] font-medium hover:bg-[#000055] transition-all shadow-lg active:scale-[0.98] mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SubmitUrl;