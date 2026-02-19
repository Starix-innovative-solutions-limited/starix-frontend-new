/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useModal } from '@/components/GlobalModal';

const FeedBack2 = () => {
  const { close } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="relative w-full min-w-[540px] overflow-hidden mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center p-6 relative">
        <h2 className="text-[24px] font-medium text-[#0A0A30]">
          {hasSubmitted ? 'Get Feedback' : 'Starix Feedback'}
        </h2>
        
      </div>

      <div className="px-6 pb-10 md:px-12 md:pb-12">
        {hasSubmitted ? (
          /* SUCCESS STATE */
          <div className="py-12 text-center space-y-4">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-[22px] font-bold text-[#0A0A30]">Feedback Request Sent</h3>
            <p className="text-[#667085] text-base font-light">
              Brands usually respond within 24–48 hours.
            </p>
            <button
              onClick={close}
              className="w-full bg-[#000033] text-white py-4 rounded-full text-base font-medium mt-8"
            >
              Close
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <div className="space-y-8">
            {/* Star Rating Section */}
            <div className="space-y-4">
              <label className="text-[16px] text-[#0A0A30] font-normal block">
                How was the challenge process?
              </label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={50}
                      className={`transition-colors ${
                        star <= (hover || rating) 
                          ? "fill-[#FFC107] text-[#FFC107]" 
                          : "fill-[#dedfe1] text-[#dedfe1]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Text Area Section */}
            <div className="space-y-4">
              <label className="text-[16px] text-[#0A0A30] font-normal block">
                What would you like to ask about?
              </label>
              <textarea
                placeholder="“What improvements would help on”"
                className="w-full h-[140px] px-6 py-5 rounded-[24px] border border-[#E5E7EB] bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-50/50 focus:border-indigo-200 transition-all resize-none"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={() => setHasSubmitted(true)}
              className="w-full bg-[#000033] text-white py-5 rounded-full text-[18px] font-medium hover:bg-[#000055] transition-all shadow-lg active:scale-[0.98] mt-4"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedBack2;