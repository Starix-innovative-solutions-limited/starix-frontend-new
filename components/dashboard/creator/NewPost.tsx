import React, { useState } from 'react';
import { HiOutlineDocumentAdd} from 'react-icons/hi';
import { AiOutlineRobot } from 'react-icons/ai';

const NewPostComponent = () => {
    const [caption, setCaption] = useState('');

    const handlePost = () => {
        console.log('Posting:', caption);
        // Handle post logic here
    };

    return (
        <div className="bg-white rounded-lg shadow-xl w-full max-md:max-w-[80vw] md:min-w-3xl mx-auto py-5 ">
            <div className="bg-white rounded-lg shadow-xl w-full">
                {/* Header */}
                {/* <div className="flex items-center justify-between p-4 "> */}
                    <h2 className="text-xl text-center font-semibold text-gray-800 p-4">New Post</h2>

                {/* </div> */}

                {/* Content */}
                <div className="flex flex-col md:flex-row">
                    {/* Left side - Upload area */}
                    <div className="flex-1 p-8  md:border-b-0">
                        <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition cursor-pointer">
                            <HiOutlineDocumentAdd size={64} className="text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-2">
                                Select From Computer
                            </p>
                            <p className="text-sm text-gray-400">
                                Drop or Paste File here
                            </p>
                        </div>
                    </div>

                    {/* Right side - Caption and post */}
                    <div className="flex-1 p-6 flex flex-col">
                        {/* User info */}
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="font-medium text-gray-800">Favour</span>
                        </div>

                        {/* Caption textarea */}
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write caption Here"
                            maxLength={2000}
                            className="flex-1 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                        />

                        {/* Character count */}
                        <div className="text-right text-sm text-gray-400 mt-2">
                            {caption.length}/2000
                        </div>

                        {/* AI Summary Review */}
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mt-4 mb-4">
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