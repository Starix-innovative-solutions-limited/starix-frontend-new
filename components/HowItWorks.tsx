"use client"
import Image from 'next/image'
import Link from "next/link";

const HowItWorks = () => {
    const brandFeatures = [
        {
            icon: "/briefs.svg", 
            title: "Guide with Briefs",
            description: "Give creators direction. Hooks, tone, what to avoid. They handle the rest.",
            scale: "scale-100"
        },
        {
            icon: "/flag.svg", 
            title: "Create a Challenge",
            description: "Set your goals, budget, and timeline. The challenge goes live.",
            scale: "scale-100"
        },
        {
            icon: "/blue gem.png", 
            title: "Track & Reward",
            description: "Performance tracked automatically. Winners get paid. You get the content.",
            scale: "scale-190 -translate-x-35 translate-y-15",
        
            
        }
    ];

    const creatorFeatures = [
        {
            icon: "/timer.svg", 
            title: "Discover Challenges",
            description: "Find challenges that fit what you already do. No pitching required.",
            scale: "scale-100"
        },
        {
            icon: "/buttons 2.svg", 
            title: "Create Content",
            description: "Make the content your way. Submit when you're ready.",
            scale: "scale-100"
        },
        {
            icon: "/or-gem.svg", 
            title: "Earn Rewards",
            description: "Win and get paid. No invoices, no chasing, no waiting.",
            scale: "scale-100" // Optical scale for the orange gem
        }
    ];

    return (
        <div className='flex flex-col bg-white min-h-screen font-sans py-20 px-6'>
            {/* --- TOP HEADER --- */}
            <div className='max-w-[1300px] mx-auto w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 px-4'>
                <h1 className="text-[32px] sm:text-[44px] md:text-[64px] font-regular tracking-tight text-dark-navy leading-[1.1] flex items-center flex-nowrap whitespace-nowrap gap-x-2 md:gap-x-3">
                    <span>Here&apos;s how</span> 
                    <img 
                        src="/n-logo.svg" 
                        className="w-24 sm:w-32 md:w-45 h-auto translate-y-1 md:translate-y-2 pb-2 md:pb-5" 
                        alt="starix logo" 
                    /> 
                    <span>works</span>
                </h1>
                <p className="max-w-[300px] text-[#6E6E6E] text-[16px] md:text-[20px] md:text-right font-regular leading-snug mb-2">
                    Find challenges that fit what you already do. No pitching required.
                </p>
            </div>

            <div className='max-w-[1300px] mx-auto w-full flex flex-col gap-8'>
                
                {/* 1. FOR BRANDS SECTION */}
                <div className='bg-[#E2E7FA] rounded-[32px] p-8 md:p-14 flex flex-col items-center'>
                    <span className="bg-[#0033FF1F] text-[#0033FF] text-[16px] font-medium px-5 py-1.5 rounded-full mb-12 uppercase tracking-widest">
                        For Brands
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                        {brandFeatures.map((feature: any, index) => (
                            <div key={index} className="bg-[#F5F5FF] rounded-3xl p-6 flex flex-col h-full overflow-hidden">
                                <div className="h-40 w-full relative flex justify-end mb-4">
                                    <Image 
                                        src={feature.icon} 
                                        alt={feature.title} 
                                        fill 
                                        className={`object-contain object-right-top transition-transform duration-500 ${feature.scale}`} 
                                        priority
                                    />
                                </div>
                                <h3 className="font-['Geist'] font-normal text-[40px] leading-none tracking-[-0.04em] text-[#040136] max-w-[200px] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="font-['Geist'] font-normal text-[20px] leading-[1.4] tracking-[-0.03em] text-[#6E6E6E]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link href="/for-brands" className="bg-[#0033FF] text-white p-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-sm transition-all text-[20px]">
                        Join as a Brand
                    </Link>
                </div>

                {/* 2. FOR CREATORS SECTION */}
                <div className='bg-[#FAE6DA] rounded-[32px] p-8 md:p-14 flex flex-col items-center'>
                    <span className="bg-[#FD6C1D26] text-[#FD6C1D] text-[16px] font-medium px-5 py-1.5 rounded-full mb-12 uppercase tracking-widest">
                        For Creators
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                        {creatorFeatures.map((feature: any, index) => (
                            <div key={index} className="bg-[#FFF9F5] rounded-3xl p-6 flex flex-col h-full overflow-hidden">
                                <div className="h-40 w-full relative flex justify-end mb-4">
                                    <Image 
                                        src={feature.icon} 
                                        alt={feature.title} 
                                        fill 
                                        className={`object-contain object-right-top transition-transform duration-500 ${feature.scale}`} 
                                        priority
                                    />
                                </div>
                                <h3 className="font-['Geist'] font-normal text-[40px] leading-none tracking-[-0.04em] text-[#040136] max-w-[200px] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="font-['Geist'] font-normal text-[20px] leading-[1.4] tracking-[-0.03em] text-[#6E6E6E]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link href="/for-creators" className="bg-[#FF6B00] text-white p-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-sm transition-all text-[20px]">
                        Join as a Creator
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;