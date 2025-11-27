import { motion } from 'framer-motion';
import { IoClose, IoCheckmarkCircleOutline, IoTimeOutline } from 'react-icons/io5';
import { BiBookOpen } from 'react-icons/bi';

const ChallengeDetails = () => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:min-w-3xl"
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full"
            >
                {/* Header */}
                <div className=" bg-white border-b px-8 py-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">Challenge Details</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <IoClose size={28} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Brand Section */}
                    <div className="flex items-start gap-4 mb-6">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=tiktok"
                            alt="TikTok Brand"
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">Tiktok Brand</h3>
                            <p className="text-sm text-gray-500">
                                Brand description - From brands running high-impact challenges to creators winning rewards and building
                            </p>
                        </div>
                    </div>

                    {/* Winnings and Deadline */}
                    <div className="flex items-center justify-between mb-6 bg-gray-50 rounded-xl p-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Winnings:</p>
                            <p className="text-2xl font-bold text-orange-500">$400</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Deadline:</p>
                            <div className="flex items-center gap-2 text-gray-700">
                                <IoTimeOutline size={18} />
                                <span className="font-medium">7 days</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Hook Suggestions */}
                    <div className="mb-6">
                        <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium">
                            <BiBookOpen size={18} />
                            AI Hook Suggestions
                        </button>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                            Fashion
                        </span>
                    </div>

                    {/* About Challenge */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">About Challenge:</h4>
                        <p className="text-gray-900">
                            Challenge description - From brands running high-impact challenges to creators winning rewards and building
                        </p>
                    </div>

                    {/* Challenge Brief */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-4">Challenge Brief:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-start gap-3">
                                <IoCheckmarkCircleOutline className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                                <span className="text-gray-700 text-sm">3–5 product moments</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <IoCheckmarkCircleOutline className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                                <span className="text-gray-700 text-sm">Soft aesthetic</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <IoCheckmarkCircleOutline className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                                <span className="text-gray-700 text-sm">Natural lighting</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <IoCheckmarkCircleOutline className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                                <span className="text-gray-700 text-sm">Authentic reactions to product</span>
                            </div>
                        </div>
                    </div>

                    {/* Join Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-indigo-900 text-white font-semibold py-4 rounded-full hover:bg-indigo-800 transition-colors shadow-lg"
                    >
                        Join
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default ChallengeDetails