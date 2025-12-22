import React, { useState } from 'react';
import { AiOutlineRobot } from 'react-icons/ai';
import ImageUploader from '@/components/ImageUploader';
// import useScreen from 'use-screen';

import useBreakpoint from '@/hooks/useBreakPoint';

import { useModal } from '@/components/GlobalModal';
import NextStep from '../NextStep';





const NewPostComponent = () => {
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState('');

    const { isMobile } = useBreakpoint()

    const handlePost = () => {
        console.log('Posting:', caption);

        open(<NextStep id={2} />)
        // Handle post logic here
    };

    const handleImage = (file: File) => {
        const url = URL.createObjectURL(file);
        setImage(url);
    };

    const { open } = useModal()

    return (
        <div className="w-full max-w-2xl md:min-w-4xl  h-full">
            <div className="  w-full h-full  py-8 md:p-8">
                {/* Header */}
                {/* <div className="flex items-center justify-between p-4 "> */}
                <h2 className="text-xl text-center font-medium text-secondary-100 px-4">New Post</h2>

                {/* </div> */}

                {/* Content */}
                <div className="grid md:grid-cols-5">
                    {/* Left side - Upload area */}
                    <div className="flex p-6  md:border-b-0 md:col-span-2 w-auto mx-auto">
                        <ImageUploader height={isMobile ? 230 : 300} value={image} onChange={handleImage} label='Drop or Paste File here' />
                    </div>

                    {/* Right side - Caption and post */}
                    <div className="flex-1 p-6 flex flex-col col-span-3">
                        {/* User info */}
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-semibold text-gray-800">Favour</span>
                        </div>

                        {/* Caption textarea */}
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write caption Here"
                            maxLength={2000}
                            className="flex-1 p-3 md:min-h-[150px] lg:min-h-[200px] border border-dark rounded-lg resize-none focus:outline-none outline-0 focus:ring-2 focus:ring-dark focus:border-transparent text-gray-800 placeholder-dark"
                        />

                        {/* Character count */}
                        <div className="text-right text-sm text-gray-400 mt-2">
                            {caption.length}/2000
                        </div>

                        {/* AI Summary Review */}
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mt-4 mb-4 underline">
                            <AiOutlineRobot size={18} />
                            <span>AI Summation Review</span>
                        </button>

                        {/* Post button */}
                        <button
                            onClick={handlePost}
                            className="w-full bg-secondary-100 hover:bg-indigo-800 text-white font-medium py-3 rounded-full transition"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPostComponent