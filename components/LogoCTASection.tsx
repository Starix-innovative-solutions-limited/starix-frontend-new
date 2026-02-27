"use client"
import Image from 'next/image'
import { motion } from 'framer-motion';
import Link from "next/link";

const LogoCTASection = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] min-h-[564px] items-stretch">
            {/* LEFT — ANIMATED LOGO COLUMN */}
            <div className="flex items-center justify-center bg-white py-12 md:py-0">
                <div className="flex items-center relative">
                    {/* Animated Wordmark */}
                    <motion.div
                        className="flex items-end gap-1 h-[60px] md:h-[90px]"
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.25, 0.75, 1] }}
                    >
                        {['s', 't', 'a', 'r', 'i', 'x'].map((letter) => (
                            <Image
                                key={letter}
                                src={`/${letter}.png`}
                                alt={letter}
                                width={80}
                                height={100}
                                className="h-full w-auto object-contain"
                            />
                        ))}
                    </motion.div>

                    {/* STAR ICON — Positioned as a Trademark/End-piece */}
                    <motion.div
                        className="relative w-[40px] h-[40px] md:w-[70px] md:h-[70px] ml-2 mb-4 md:mb-24"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Layered Star Animation Restored */}
                        <motion.img
                            src="/Vector.png"
                            className="absolute inset-0 w-full h-full object-contain"
                            animate={{ opacity: [1, 1, 0, 0, 1] }}
                            transition={{ duration: 5, repeat: Infinity, times: [0, 0.25, 0.45, 0.75, 1] }}
                        />
                        <motion.img
                            src="/Blue 1.svg"
                            className="absolute inset-0 w-full h-full object-contain"
                            animate={{ opacity: [0, 0, 1, 1, 0] }}
                            transition={{ duration: 5, repeat: Infinity, times: [0, 0.25, 0.45, 0.75, 1] }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* RIGHT — FULL-WIDTH BACKGROUND PANEL */}
            <div className="relative flex items-center justify-center overflow-hidden min-h-[450px]">
                <div
                    className="absolute  w-full inset-0 bg-cover bg-center md:bg-right"
                    style={{ backgroundImage: "url('/blurredBg.png')" }}
                />
                <div className="absolute inset-0 bg-[#040136]/50" />

                <div className="relative z-10 w-full max-w-[600px] px-6 md:px-12 flex flex-col items-center md:items-start text-center md:text-left gap-8">
                    <h3 className="text-white font-['Geist'] text-[24px] md:text-[32px] leading-tight">
                        Starix is a challenge-based marketing platform connecting brands with content creators.
                    </h3>
                    <p className="text-white/80 font-['Geist'] font-[300] text-[16px] md:text-[18px] leading-relaxed">
                        Brands launch sponsored challenges with clear rewards, while creators participate by producing and sharing content across their social media channels.
                    </p>
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center w-[193px]h-[68px] gap-3 border border-white rounded-full px-10 py-4 text-white"
                    >
                        <span>Contact Us</span>
                        <Image src="/rightArrow.svg" alt="arrow" width={20} height={20} className="transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LogoCTASection;