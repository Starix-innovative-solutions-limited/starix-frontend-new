"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsBell } from 'react-icons/bs';
import Image from 'next/image';

const NavBar = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const navItems = [
        { name: 'Overview', active: true },
        { name: 'Challenges', active: false },
        { name: 'Submissions', active: false },
        { name: 'Analytics', active: false },
        { name: 'Payments', active: false },
        { name: 'Profile', active: false }
    ];

    return (
        <nav className="pb-10 pt-4">
            <div className="py-4.5 md:py-8">
                <div className="flex items-center justify-between ">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center">
                            <Image
                                src={'/logo.svg'}
                                width={100}
                                height={100}
                                alt=''
                                className=''
                            />
                        </div>
                    </motion.div>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className="relative px-1 py-2"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span
                                    className={` transition-colors duration-200 text-lg ${activeTab === item.name
                                        ? 'text-dark-navy '
                                        : 'text-neut/60 hover:text-gray-600 font-light'
                                        }`}
                                >
                                    {item.name}
                                </span>
                                {/* {activeTab === item.name && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                                        layoutId="activeTab"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )} */}
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Bell Icon */}
                        <motion.button
                            className="p-2 rounded-full bg-[#f5f5f5] border border-neut/20 hover:bg-gray-200 transition-colors duration-200 relative"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                rotate: [0, -15, 15, -15, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 8
                            }}
                        >
                            <BsBell className="w-6 h-6 text-gray-700" />
                            <motion.div
                                className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.button>

                        {/* Profile Image */}
                        <motion.div
                            className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;