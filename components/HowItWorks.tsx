"use client"
import Image from 'next/image'
import { motion } from 'framer-motion';
import Link from "next/link";
import LogoCTASection from './LogoCTASection'; 

const HowItWorks = () => {
    const brandFeatures = [
        {
            icon: "playButtons.svg",
            title: "Create a Challenge",
            description: "Set campaign goals, budget, and duration.",
            gradient: "from-orange-100 via-pink-50 to-green-100"
        },
        {
            icon: "diamond.svg",
            title: "Guide with Briefs",
            description: "Suggest hooks, captions, and tone that fit your brand voice.",
            gradient: "from-blue-100 via-indigo-50 to-purple-100"
        },
        {
            icon: "trophy.svg",
            title: "Track & Reward",
            description: "Starix measures likes and comments automatically.",
            gradient: "from-red-100 via-orange-50 to-blue-100"
        }
    ];

    const creatorFeatures = [
        {
            icon: "creatorFeature1.svg",
            title: "Discover Challenges",
            description: "Browse brand-sponsored tasks that match your niche.",
            gradient: "from-orange-100 via-pink-50 to-green-100"
        },
        {
            icon: "creatorFeature2.svg",
            title: "Create Content",
            description: "Submit your entries with your unique style.",
            gradient: "from-blue-100 via-indigo-50 to-purple-100"
        },
        {
            icon: "creatorFeature3.svg",
            title: "Earn Rewards",
            description: "Receive your payment for every sponsored content. ",
            gradient: "from-red-100 via-orange-50 to-blue-100"
        }
    ];

    return (
        <div className=' flex flex-col bg-[#f6f6f6]  min-h-screen overflow-x-hidden'>
            {/* --- TOP HEADER --- */}
            <div className='flex flex-col md:flex-row justify-between mt-10 px-4 md:px-8 gap-5'>
                <div className="relative w-full max-w-[293px] font-['Geist'] font-[600] text-[25px] md:text-[48px] leading-tight tracking-[-0.02em] text-[#040136] flex items-center max-md:justify-center max-md:mx-auto">
                    <span>How It Works</span>

                    <div className="absolute top-[calc(50px-35%)] -left-[18%] max-md:static max-md:mt-4 max-md:ml-0 max-md:rotate-180">
                        <motion.div
                            className="w-[140px] h-[96px] flex flex-col items-center justify-center pointer-events-none"
                            animate={{ rotate: [0, 20, 20, 0, 0] }}
                            transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                        >
                            <motion.div
                                animate={{ opacity: [1, 0.3, 0.3, 1, 1] }}
                                transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                                className="w-full object-contain"
                            >
                                <Image src="/Arrow 1.png" alt="arrow-top" width={140} height={96} className="w-full object-contain" />
                            </motion.div>

                            <motion.div
                                className="absolute w-[117px] h-[80px] top-[50px] left-[20px] pointer-events-none"
                                animate={{ opacity: [0.3, 1, 1, 0.3, 0.3] }}
                                transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
                            >
                                <Image src="/Arrow 1.png" alt="arrow-bottom" width={117} height={80} className="w-full h-full object-contain" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <div className="w-full max-w-[610px] text-center md:text-right font-[300] text-[18px] md:text-[28px] leading-relaxed text-[#6E6E6E99] font-['Geist']">
                    Starix transforms how brands and creators collaborate. Our challenge-based system drives authentic engagement and measurable results — helping creators grow faster and brands connect deeper with real audiences.
                </div>
            </div>

            <div className='flex flex-col gap-3 px-4 md:px-8'>
                {/* FOR BRANDS SECTION */}
                <div className='mt-5 bg-white py-10 rounded-2xl shadow-[0px_2px_16px_0px_#0033FF1A] grid'>
                    <div className='md:grid md:grid-cols-[1.5fr__9.5fr] p-10 flex flex-col items-center gap-4'>
                        <div className='bg-[#FAFAFA] text-center py-1 px-4 text-dark-navy font-light text-base inline-block whitespace-nowrap'>
                            FOR BRANDS.
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-5">
                            {brandFeatures.map((feature, index) => (
                                <div key={index} className="relative group w-full max-w-[420px] mx-auto">
                                    <div className={`absolute inset-[-1px] rounded-[32px] opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 bg-gradient-to-br ${feature.gradient}`} />
                                    <div className={`relative bg-gradient-to-br ${feature.gradient} rounded-3xl p-[3px] h-full`}>
                                        <div className="bg-white w-full h-full min-h-[249px] rounded-[20px] border-[6px] border-transparent relative z-10 p-8 flex flex-col">
                                            <Image src={`/${feature.icon}`} width={64} height={64} alt={feature.title} className="w-16 h-auto mb-4" />
                                            <h3 className="font-['Geist'] font-[400] text-[22px] md:text-[28px] leading-tight text-[#040136] mb-3">{feature.title}</h3>
                                            <p className="font-['Geist'] font-[300] text-[14px] md:text-[17px] text-[#6E6E6E] leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link href="/for-brands" className="group mx-auto mt-14 w-[193px] h-[68px] text-lg bg-dark-navy text-white rounded-full flex items-center justify-center gap-2 border border-dark-navy transition-all duration-300 hover:shadow-lg">
                        <span>Learn more</span>
                        <Image src="/rightArrow.svg" alt="right-arrow" width={20} height={20} className="w-5 transition-all duration-300" />
                    </Link>
                </div>

                {/* FOR CREATORS SECTION */}
                <div className="bg-white py-14 rounded-2xl shadow-[0px_2px_16px_0px_#0033FF1A] grid">
                    <div className="md:grid md:grid-cols-[1.5fr_9.5fr] p-10 flex flex-col items-center gap-6">
                        <div className="bg-[#FAFAFA] text-center text-dark-navy font-light text-base inline-block whitespace-nowrap">
                            FOR CREATORS.
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {creatorFeatures.map((feature, index) => (
                                <div key={index} className="p-[6px] flex flex-col w-full max-w-[420px] mx-auto">
                                    <div className="w-full aspect-video md:h-[220px] flex items-center justify-center bg-transparent overflow-hidden rounded-xl">
                                        <Image src={`/${feature.icon}`} width={600} height={600} alt={feature.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="pt-6">
                                        <h3 className="font-['Geist'] font-[400] text-[28px] text-[#040136] mb-3">{feature.title}</h3>
                                        <p className="font-['Geist'] font-[300] text-[14px] md:text-[18px] text-[#6E6E6E] leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex justify-center mt-12">
                        <Link href="/for-creators" className="group w-[193px] h-[68px] text-lg bg-dark-navy text-white rounded-full flex items-center justify-center gap-2 border border-dark-navy transition-all duration-300 hover:drop-shadow-lg">
                            <span>Learn more</span>
                            <Image src="/rightArrow.svg" alt="right-arrow" width={20} height={20} className="w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ACHIEVEMENT SECTION */}
            <div className="w-full bg-white my-32 min-h-[600px] p-10 md:p-20">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                    <Image src="/achievement2.png" alt="achievement" width={603} height={398} className="w-full h-auto object-contain mx-auto" priority />
                    <div className="flex flex-col gap-7 md:pl-[60px] max-md:text-center items-center md:items-start">
                        <h2 className="font-['Geist'] font-[600] text-[20px] md:text-[46px] leading-tight text-[#040136]">What You Achieve on Starix</h2>
                        <p className="font-['Geist'] font-[300] text-[16px] md:text-[24px] leading-relaxed text-[#6E6E6E99]">From brands running high-impact challenges to creators winning rewards and building portfolios — Starix drives real engagement.</p>
                        <Link href="/for-brands" className="w-[193px] h-[68px] flex items-center justify-center gap-[10px] rounded-[40px] bg-[#040136] text-white text-[18px] border border-[#040136] transition-all hover:shadow-lg group">
                            <span>Get Started</span>
                            <Image src="/rightArrow.svg" alt="arrow" width={20} height={20} className="" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- LOGO & CTA SECTION (NOW A COMPONENT) --- */}
            <LogoCTASection />
        </div>
        
    )
}

export default HowItWorks;