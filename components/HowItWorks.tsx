"use client"
import { px } from 'framer-motion';
import { style } from 'framer-motion/client';
import Image from 'next/image'
import Link from "next/link";

const HowItWorks = () => {
    const brandFeatures = [
        {
            icon: "/briefs.svg", 
            title: "Guide with Briefs",
            description: "Give creators direction. Hooks, tone, what to avoid. They handle the rest."
        },
        {
            icon: "/flag.svg", 
            title: "Create a Challenge",
            description: "Set your goals, budget, and timeline. The challenge goes live."
        },
        {
            icon: "/trophyy.svg", 
            title: "Track & Reward",
            description: "Performance tracked automatically. Winners get paid. You get the content."
        }
    ];

    const creatorFeatures = [
        {
            icon: "/timer.svg", 
            title: "Discover Challenges",
            description: "Find challenges that fit what you already do. No pitching required."
        },
        {
            icon: "/media.svg", 
            title: "Create Content",
            description: "Make the content your way. Submit when you're ready."
        },
        {
        icon: "/medal.svg", 
        title: "Earn Rewards",
        description: "Win and get paid. No invoices, no chasing, no waiting.",
        // Individual sizes for this specific asset
        iconWidth: "w-[200px]", 
        iconHeight: "h-[200px]", 
        }
    ];

    return (
        <div className='flex flex-col bg-white min-h-screen font-sans py-20 px-6'>
            {/* --- TOP HEADER --- */}
            <div className='max-w-325 mx-auto w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 px-4'>
                <h1 className="text-[44px] md:text-[64px] font-regular tracking-tight text-dark-navy leading-[1.1] flex flex-wrap items-center gap-x-3">
                    <span>Here&apos;s how</span> 
                    <img 
                        src="/n-logo.svg" 
                        className="inline-block w-35 md:w-47.5 h-auto translate-y-0.5" 
                        alt="starix logo" 
                    /> 
                    <span>works</span>
                </h1>
                <p className="max-w-75 text-[#6E6E6E] text-[16px] md:text-[20px] md:text-right font-regular leading-snug mb-2">
                    Find challenges that fit what you already do. No pitching required.
                </p>
            </div>

            <div className='max-w-325 mx-auto w-full flex flex-col gap-8'>
                
                {/* 1. FOR BRANDS SECTION (Blue Theme) */}
                <div className='bg-[#E2E7FA] rounded-4xl p-8 md:p-14 flex flex-col items-center'>
                    <span className="bg-[#0033FF1F] text-[#0033FF] text-[16px] font-medium px-5 py-1.5 rounded-full mb-12 uppercase tracking-widest">
                        For Brands
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                        {brandFeatures.map((feature, index) => (
                            <div key={index} className="bg-[#F5F5FF] rounded-3xl p-6 flex flex-col h-full ">
                                <div className="h-35 w-full relative flex justify-end">
                                    <Image src={feature.icon} alt={feature.title} fill className="object-contain object-top-right" />
                                </div>
                                <h3 className="font-['Geist'] font-normal text-[40px] leading-none tracking-[-0.04em] text-dark-navy max-w-50 mb-3">
                                {feature.title}
                                </h3>
                                <p className="font-['Geist'] font-normal text-[20px] leading-5.5 tracking-[-0.03em] text-[#6E6E6E]">
                                {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link href="/for-brands" className="bg-[#0033FF] text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all text-lg">
                        Learn More <span className="text-2xl">→</span>
                    </Link>
                </div>

                {/* 2. FOR CREATORS SECTION (Orange Theme) */}
                <div className='bg-[#FAE6DA] rounded-4xl p-8 md:p-14 flex flex-col items-center'>
                    <span className="bg-[#FD6C1D26] text-[#FD6C1D] text-[16px] font-medium px-5 py-1.5 rounded-full mb-12 uppercase tracking-widest">
                        For Creators
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                        {creatorFeatures.map((feature: any, index) => (
                            <div key={index} className="bg-[#FFF9F5] rounded-3xl p-6 flex flex-col h-full">
                                
                                {/* --- THE FIX IS HERE --- */}
                                {/* We check if iconWidth/Height exists, otherwise we fallback to a default size like h-40 */}
                                <div 
                                    className={`relative w-full flex justify-end ml-auto ${
                                        feature.iconHeight ? feature.iconHeight : "h-40"
                                    } ${
                                        feature.iconWidth ? feature.iconWidth : "w-full"
                                    }`}
                                >
                                    <Image 
                                        src={feature.icon} 
                                        alt={feature.title} 
                                        fill 
                                        className="object-contain object-right-top" 
                                    />
                                </div>

                                <h3 className="font-['Geist'] font-normal text-[40px] leading-none tracking-[-0.04em] text-dark-navy max-w-50 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="font-['Geist'] font-normal text-[20px] leading-5.5 tracking-[-0.03em] text-[#6E6E6E]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

    <Link href="/for-creators" className="bg-[#FF6B00] text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-all text-lg">
        Learn More <span className="text-2xl">→</span>
    </Link>
</div>

            </div>
        </div>
    )
}

export default HowItWorks;