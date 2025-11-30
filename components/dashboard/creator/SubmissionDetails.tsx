import React, { useState } from 'react';
import {  IoChevronBack, IoChevronForward, IoHeart, IoChatbubble } from 'react-icons/io5';

const SubmissionDetails = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
        'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80'
    ];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        // <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl md:min-w-2xl py-6  h-full">
            {/* Header */}
            <h2 className="text-xl text-center font-medium text-secondary-100 p-4">Submission Details</h2>



            {/* Content */}
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative md:w-2/3 bg-gray-50 flex items-center justify-center p-8">
                    <img
                        src={images[currentImage]}
                        alt="Film reels"
                        className="w-full h-auto rounded-lg object-cover"
                    />

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                    >
                        <IoChevronBack className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                    >
                        <IoChevronForward className="w-6 h-6" />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition ${idx === currentImage ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-6 flex flex-col">
                    {/* Platform Badge */}
                    <div className="flex justify-end mb-4">
                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded">
                            TIKTOK
                        </span>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-6">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                            alt="Favour"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold">Favour</h3>
                            <p className="text-sm text-gray-500">@favvy</p>
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="mb-6">
                        <p className="text-gray-800">Your Caption here</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-auto">
                        <div className="flex items-center gap-2">
                            <IoHeart className="w-5 h-5 text-gray-700" />
                            <span className="font-medium">500</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoChatbubble className="w-5 h-5 text-gray-700" />
                            <span className="font-medium">10</span>
                        </div>
                        <button className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                            View Insights
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmissionDetails