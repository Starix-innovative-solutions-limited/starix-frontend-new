"use client"

import { motion } from 'framer-motion';
import { variants } from '@/constant';
import { useAuthStore } from '@/store/useAuthStore';
import { FiEdit2 } from 'react-icons/fi';

const Page = () => {
    // const [isHovered, setIsHovered] = useState(false);

    const { profile, user } = useAuthStore()


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    console.log("profile", profile)

    return (
        <div className="min-h-screen general-space">


            <motion.div
                variants={variants?.headerVariants}
                className="flex flex-col mb-3 gap-6 -mt-6 md:mt-10"
            >
                <motion.div className='flex items-center justify-between'>
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 py-2 text-[28px] font-normal  transition-colors text-secondary-100 "
                    >
                        Profile
                    </motion.span>

                    {/* <motion.button
                        onClick={() => open(<CreateChallenge />)}
                        className="flex items-center gap-3 bg-dark-navy text-white rounded-full px-3 py-1.5">
                        <FaPlus />
                        <span className='text-base'>Create new</span>
                    </motion.button> */}
                </motion.div>

                <div className="">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
                    >
                        <motion.div variants={itemVariants} className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                                        alt="Profile"
                                        className=" size-14 rounded-full object-cover"
                                    />
                                </motion.div>
                                <div>
                                    <h2 className="text-2xl  text-dark-navy">{profile?.brand_name}</h2>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-dark-navy hover:bg-gray-50 transition-colors"
                            >
                                <FiEdit2 className="w-4 h-4" />
                                Edit Profile
                            </motion.button>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <label className=" text-xs font-medium text-neut/60 uppercase tracking-wide mb-2">
                                    Brand Bio
                                </label>
                                <p className="text-dark-navy leading-relaxed">
                                    {profile?.description ? profile.description : " From brands running high-impact challenges to creators winning rewards and building"}
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start gap-3">
                                <div className="flex-1">
                                    <label className=" text-xs font-medium text-neut/60 uppercase tracking-wide mb-1">
                                        Email
                                    </label>
                                    <p className="text-dark-navy">{user?.email}</p>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start gap-3">
                                <div className="flex-1">
                                    <label className=" text-xs font-medium text-neut/60 uppercase tracking-wide mb-1">
                                        Phone No
                                    </label>
                                    <p className="text-dark-navy">+234 0000 000 000</p>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start gap-3">
                                <div className="flex flex-col">
                                    <label className=" text-xs font-medium text-neut/60 uppercase tracking-wide mb-1">
                                        Website
                                    </label>
                                    <a
                                        href="https://example.com"
                                        className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                                    >
                                        {profile?.website}
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex items-start gap-3">
                                <div className="flex-1">
                                    <label className=" text-xs font-medium text-neut/60 uppercase tracking-wide mb-1">
                                        Industry
                                    </label>
                                    <p className="text-dark-navy">{profile?.industry}</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}

export default Page