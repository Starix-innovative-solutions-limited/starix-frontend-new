import { motion } from 'framer-motion';
import { IoCheckmarkCircleOutline, IoTimeOutline } from 'react-icons/io5';
import { BiBookOpen } from 'react-icons/bi';
import NextStep from '../NextStep';
import { useModal } from '@/components/GlobalModal';

const ChallengeDetails = () => {
    const { open } = useModal();
    return (
        <div
            className="bg-white rounded-lg shadow-xl w-full max-md:max-w-[80vw] md:min-w-3xl mx-auto py-6  h-full"
        >
            {/* Header */}
            <h2 className="text-xl text-center font-medium text-secondary-100 p-4">Challenge details</h2>

            {/* Content */}
            <div className='grid grid-cols-3'>
                <div className="col-span-2 px-8 pb-8">
                    {/* Brand Section */}
                    <div className="flex items-start gap-4 mb-6 border-b-[0.5px] border-dark pb-5">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=tiktok"
                            alt="TikTok Brand"
                            className="w-10 h-10 border rounded-full"
                        />
                        <div className="flex-1 flex-col">
                            <h3 className="text-lg text-secondary-100 mb-1">Tiktok Brand</h3>
                            <p className="text-sm text-dark">
                                Brand description - From brands running high-impact challenges to creators winning rewards and building
                            </p>
                        </div>
                    </div>


                    <div className='flex gap-3'>
                        {/* Category Badge */}
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                                Fashion
                            </span>
                        </div>

                        <div>
                            {/* About Challenge */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-dark mb-2">About Challenge:</h4>
                                <p className="text-secondary-100">
                                    Challenge description - From brands running high-impact challenges to creators winning rewards and building
                                </p>
                            </div>

                            {/* Challenge Brief */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-4">Challenge Brief:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-secondary-100 ">
                                    <div className="flex items-start gap-3">
                                        <IoCheckmarkCircleOutline className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-sm">3–5 product moments</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <IoCheckmarkCircleOutline className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-sm">Soft aesthetic</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <IoCheckmarkCircleOutline className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-sm">Natural lighting</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <IoCheckmarkCircleOutline className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className=" text-sm">Authentic reactions to product</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='px-5 bg-white border border-gray-50 shadow p-3 py-8 h-fit'>
                    {/* Winnings and Deadline */}
                    <div className="">
                        <div className="flex items-center justify-between mb-2 gap-3 rounded-xl p-4">
                            <p className="text-xs text-dark mb-1">Winnings:</p>
                            <p className="text-xl font-bold text-orange-500">$400</p>
                        </div>
                        <div className="text-right flex items-center justify-between mb-6 gap-3 rounded-xl p-4">
                            <p className="text-xs text-dark mb-1">Deadline:</p>
                            <div className="flex items-center gap-2 text-gray-700 bg-gray-100 border border-gray-100 px-2 py-1">
                                <IoTimeOutline size={18} />
                                <span className="font-medium">7 days</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Hook Suggestions */}
                    <div className="mb-6">
                        <button className="flex underline  items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors text-xs font-medium">
                            <BiBookOpen size={18} />
                            AI Hook Suggestions
                        </button>
                    </div>

                    {/* Join Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-secondary-100 text-white font-semibold py-2 rounded-full  transition-colors shadow-lg"
                        onClick={() => open(<NextStep id={1} />)}
                    >
                        Join
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default ChallengeDetails