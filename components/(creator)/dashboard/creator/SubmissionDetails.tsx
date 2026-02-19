import React, { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { X } from 'lucide-react';
import { useModal } from '@/components/GlobalModal';

// Brand Icons for accuracy
const BrandIcons = () => (
  <div className="flex items-center gap-2">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-4 h-4" alt="ig" />
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.13-1.19-.24-.14-.48-.3-.7-.47v5.29c0 2.1-.35 4.34-1.89 5.86-1.63 1.61-4.11 2.14-6.27 1.62-2.5-.59-4.47-2.91-4.59-5.46-.16-2.52 1.34-5.11 3.69-6.04.59-.24 1.23-.39 1.86-.45V13.2c-.89.08-1.77.41-2.45 1.01-.88.75-1.21 2-1.01 3.12.23 1.26 1.29 2.37 2.56 2.54 1.24.16 2.62-.29 3.32-1.34.42-.62.59-1.38.58-2.13V.02z"/></svg>
  </div>
);

const SubmissionDetails = () => {
    const { close } = useModal();
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80'
    ];

    return (
        <div className="relative w-full max-w-[1000px] overflow-hidden mx-auto ">
            {/* Header */}
            <div className="flex items-center justify-center p-8 relative">
                <h2 className="text-[24px] font-medium text-[#0A0A30]">Submission Details</h2>
                
            </div>

            {/* Content Grid */}
            <div className="px-8 pb-10 flex flex-col md:flex-row gap-6">
                
                {/* Image Section */}
                <div className="relative md:w-[65%] group">
                    <div className="aspect-[16/10] overflow-hidden rounded-[24px]">
                        <img
                            src={images[currentImage]}
                            alt="Film reels"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Custom Nav Arrows */}
                    <button
                        onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/40 backdrop-blur-md hover:bg-white/80 rounded-full flex items-center justify-center text-dark-navy transition-all opacity-0 group-hover:opacity-100"
                    >
                        <IoChevronBack size={20} />
                    </button>
                    <button
                        onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/40 backdrop-blur-md hover:bg-white/80 rounded-full flex items-center justify-center text-dark-navy transition-all opacity-0 group-hover:opacity-100"
                    >
                        <IoChevronForward size={20} />
                    </button>
                </div>

                {/* Details Section */}
                <div className="md:w-[35%] flex flex-col">
                    <div className="bg-white border border-[#F2F4F7] rounded-[24px] p-6 h-full flex flex-col shadow-sm">
                        
                        {/* Header: User Info + Platforms */}
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                                    alt="Favour"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-regular text-[#0A0A30] text-[16px]">Favour</h3>
                                    <p className="text-sm text-[#667085]">@favvy</p>
                                </div>
                            </div>
                            <BrandIcons />
                        </div>

                        {/* Caption Area */}
                        <div className="flex-grow">
                            <p className="text-[#0A0A30] text-[18px] leading-relaxed">
                                Your Caption here
                            </p>
                        </div>

                        {/* Footer Stats + Insights */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F2F4F7]">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <SlLike className="text-[#0A0A30]" />
                                    <span className="text-sm font-medium text-[#0A0A30]">500</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FaRegComment className="text-[#0A0A30]" />
                                    <span className="text-sm font-medium text-[#0A0A30]">10</span>
                                </div>
                            </div>
                            
                            <button className="text-[14px] font-medium text-[#667085] underline decoration-[#98A2B3] underline-offset-4 hover:text-[#0A0A30] transition-colors">
                                View Insights
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmissionDetails;