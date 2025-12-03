/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { IoChevronBack, IoChevronForward, IoThumbsUpOutline } from 'react-icons/io5';
import Image from 'next/image';
import CustomInput from '../CustomInput';
import { HiX } from 'react-icons/hi';

const FeedDetails = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [comment, setComment] = useState<string | any>('');

  const [showComment, setShowComment] = useState<boolean>(true)

  const images = [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80'
  ];

  const comments = [
    { user: 'Favour', handle: '@favvy', text: 'Nice Work!', time: '2m' },
    { user: 'Favour', handle: '@favvy', text: 'Beautiful work, love!', time: '5m' },
    { user: 'Favour', handle: '@favvy', text: '', time: '8m' }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className=" bg-white p-4 md:p-8">
      <div className="mx-auto">
        <div className="  overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Image Gallery Section */}
            <div className="lg:w-2/3 relative  rounded-2xl  ">


              <div className="relative h-96 lg:h-full flex items-center justify-center  rounded-2xl">
                <img
                  src={images[currentImage]}
                  alt="Film reels"
                  className="w-full h-full object-cover  rounded-2xl "
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 bg-[#fafafa]/40 hover:bg-white rounded-full p-3 transition shadow-lg"
                >
                  <IoChevronBack className="w-6 h-6 text-secondary-100" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 bg-[#fafafa]/40 hover:bg-white rounded-full p-2.5 transition shadow-lg"
                >
                  <IoChevronForward className="w-6 h-6 text-secondary-100" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === currentImage ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* Comments Section */}
            <div className="lg:w-1/3 bg-secondary-100/5 rounded-2xl shadow border border-gray-50 flex flex-col">
              <div className=" pb-2">
                <div className="flex items-center gap-3 shadow p-6">
                 <Image src={'/profile.png'} alt='profile' width={100} height={100} className='w-10 h-10' />
                  <div>
                    <h3 className="font-normal text-base text-secondary-100">Favour</h3>
                    <p className="text-sm text-dark font-light -mt-1">@favvy</p>
                  </div>
                </div>
                <p className="mt-4 text-secondary-100 text-xl px-6">Creators caption here</p>
              </div>

              <div className={`flex-1 overflow-y-auto px-6 pt-4 bg-white rounded-t-3xl space-y-3 ${!showComment && "hidden" }  `}>
                <HiX className="text-secondary-100 ml-auto cursor-pointer" onClick={() => setShowComment(false)} />
                {comments.map((cmt, idx) => (
                  <div key={idx} className="flex gap-3">
                    <Image src={'/profile.png'} alt='profile' width={100} height={100} className='w-10 h-10' />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">
                          {cmt.user}
                        </span>
                        <span className="text-xs text-gray-500">{cmt.time}</span>
                      </div>
                      {cmt.text && (
                        <p className="text-sm text-gray-700 mt-1">{cmt.text}</p>
                      )}
                      <button className="text-xs text-gray-500 hover:text-gray-700 mt-1">
                        Reply
                      </button>
                    </div>
                    <button className="hover:bg-gray-100 rounded-full p-2 h-fit">
                      <IoThumbsUpOutline className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/50">
                <div className="flex gap-2 items-center">
                <Image src={'/profile.png'} alt='profile' width={100} height={100} className='w-8 h-8 rounded-full' />

                  <CustomInput type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} className='!rounded-full !py-2 !w-full !grow'  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetails;