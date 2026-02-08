/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaXTwitter, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function SocialMediaConnect() {
    const [connections, setConnections] = useState<any>({
        twitter: false,
        youtube: true,
        tiktok: true,
        instagram: true
    });

    const toggleConnection = (platform: any) => {
        setConnections((prev: any) => ({
            ...prev,
            [platform]: !prev[platform]
        }));
    };

    const socialPlatforms = [
        {
            id: 'twitter',
            icon: FaXTwitter,
            color: 'text-black',
            bgColor: 'bg-black'
        },
        {
            id: 'youtube',
            icon: FaYoutube,
            color: 'text-red-600',
            bgColor: 'bg-red-600'
        },
        {
            id: 'tiktok',
            icon: FaTiktok,
            color: 'text-black',
            bgColor: 'bg-black'
        },
        {
            id: 'instagram',
            icon: FaInstagram,
            color: 'text-pink-600',
            bgColor: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" w-[512px] rounded-3xl p-10"
        >
            <h2 className="text-xl text-center font-medium text-secondary-100 p-4 mb-8">Social Media.</h2>

            <div className="space-y-6">
                {socialPlatforms.map((platform: any, index) => {
                    const Icon = platform.icon;
                    const isConnected = connections[platform.id];

                    return (
                        <motion.div
                            key={platform.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between gap-10"
                        >
                            <div className="flex items-center gap-4">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Icon className={`text-4xl ${platform.color}`} />
                                </motion.div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleConnection(platform.id)}
                                className={`px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${isConnected
                                    ? 'bg-[#f5f5f5] text-gray-400 border border-neut/40'
                                    : 'bg-white text-gray-700 border border-dark-navy/50 hover:border-gray-400'
                                    }`}
                            >
                                {isConnected ? 'Connected' : 'Connect'}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}