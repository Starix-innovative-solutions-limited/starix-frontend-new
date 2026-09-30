import Image from 'next/image'
import Link from "next/link";

const HowItWorks = () => {
    const brandFeatures = [
        {
            icon: "/briefs.webp", 
            title: "Guide with Briefs",
            description: "Give creators direction. Hooks, tone, what to avoid. They handle the rest.",
            scale: "scale-150 translate-x-[-35px] translate-y-[0px] md:scale-120 md:translate-x-[-16px] md:translate-y-0 xl:scale-100 xl:translate-x-0 xl:translate-y-0"
        },
        {
            icon: "/flag.webp", 
            title: "Create a Challenge",
            description: "Set your goals, budget, and timeline. The challenge goes live.",
            scale: "scale-150 translate-x-[-35px] translate-y-[25px] md:scale-110 md:translate-x-[-16px] md:translate-y-[0px] xl:scale-100 xl:translate-x-0 xl:translate-y-0"
        },
        {
            icon: "/blue gem.png", 
            title: "Track & Reward",
            description: "Performance tracked automatically. Winners get paid. You get the content.",
            scale: "scale-190 translate-x-[-100px] translate-y-[80px] md:scale-140 md:translate-x-[-40px] md:translate-y-[40px] xl:scale-100 xl:translate-x-0 xl:translate-y-0",
        
            
        }
    ];

    const creatorFeatures = [
        {
            icon: "/timer.webp", 
            title: "Discover Challenges",
            description: "Find challenges that fit what you already do. No pitching required.",
            scale: "scale-200 translate-x-[-100px] translate-y-[40px] md:scale-180 md:translate-x-[-60px] md:translate-y-[16px] xl:scale-80 xl:translate-x-0 xl:translate-y-0"
        },
        {
            icon: "/buttons 2.webp", 
            title: "Create Content",
            description: "Make the content your way. Submit when you're ready.",
            scale: "scale-180 translate-x-[-60px] translate-y-[20px] md:scale-160 md:translate-x-[-40px] md:translate-y-[8px] xl:scale-80 xl:translate-x-0 xl:translate-y-0"
        },
        {
            icon: "/or-gem.webp", 
            title: "Earn Rewards",
            description: "Win and get paid. No invoices, no chasing, no waiting.",
            scale: "scale-160 translate-x-[-80px] translate-y-[-20px] rotate-[15deg] md:scale-120 md:translate-x-[-32px] md:translate-y-[-8px] xl:scale-80 xl:translate-x-0 xl:translate-y-0"
        }
    ];

    return (
        <div className='flex flex-col bg-white min-h-screen font-sans py-6 md:py-12 px-6'>
            {/* --- TOP HEADER --- */}
            <div className='max-w-[1300px] mx-auto w-full mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 px-2'>
                <h1 className="text-[32px] sm:text-[44px] md:text-[64px] font-medium tracking-tight text-[#040136] leading-[1.1] flex items-center flex-nowrap whitespace-nowrap gap-x-2 md:gap-x-3">
                    <span>Here&apos;s how</span> 
                    <Image
                        src="/n-logo.svg"
                        width={180}
                        height={72}
                        className="w-24 sm:w-32 md:w-45 h-auto translate-y-1 md:translate-y-2 pb-2 md:pb-5"
                        alt="starix logo"
                    />
                    <span>works</span>
                </h1>
                <p className="max-w-[300px] text-[#6E6E6E] text-[16px] md:text-[20px] text-left md:text-right font-regular leading-snug mb-2">
                    Find challenges that fit what you already do. No pitching required.
                </p>
            </div>

            <div className='max-w-[1300px] mx-auto w-full flex flex-col gap-8'>
                
                {/* 1. FOR BRANDS SECTION */}
                <div className='bg-[#E2E7FA] rounded-[32px] p-8 md:p-14 flex flex-col items-center'>
                    <span className="self-start bg-[#0033FF1F] text-[#0033FF] text-[12px] md:text-[14px] xl:text-[16px] font-semibold p-2 rounded-full mb-6 md:mb-12 uppercase tracking-none md:self-center">
                        For Brands
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8 md:mb-12">
                        {brandFeatures.map((feature: any, index) => (
                            <div key={index} className="bg-[#F5F5FF] rounded-3xl p-6 flex flex-col h-full overflow-hidden">
                                <div className="h-40 w-full relative flex justify-end mb-4">
                                    <Image 
                                        src={feature.icon} 
                                        alt={feature.title} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 380px"
                                        className={`object-contain object-right-top transition-transform duration-500 ${feature.scale}`} 
                                    />
                                </div>
                                <h3 className="font-['Geist'] font-normal text-[32px] md:text-[34px] xl:text-[40px] leading-none tracking-[-0.04em] text-[#040136] max-w-[200px] md:max-w-[3000px] xl:max-w-[200px] mb-1">
                                    {feature.title}
                                </h3>
                                <p className="font-['Geist'] font-normal text-[16px] md:text-[18px] xl:text-[24px] leading-[1.4] tracking-[-0.03em] text-[#6E6E6E]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link href="/for-brands" className="self-start bg-[#0033FF] text-white p-3 md:p-3 xl:p-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-sm transition-all text-[16px] md:text-[18px] xl:text-[20px] md:self-center">
                        Join as a Brand
                    </Link>
                </div>

                {/* 2. FOR CREATORS SECTION */}
                <div className='bg-[#FAE6DA] rounded-[32px] p-8 md:p-14 flex flex-col items-center'>
                    <span className="self-start bg-[#FD6C1D26] text-[#FD6C1D] text-[12px] md:text-[14px] xl:text-[16px] font-semibold p-2 rounded-full mb-6 md:mb-12 uppercase tracking-none md:self-center">
                        For Creators
                    </span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8 md:mb-12">
                        {creatorFeatures.map((feature: any, index) => (
                            <div key={index} className="bg-[#FFF9F5] rounded-3xl p-6 flex flex-col h-full overflow-hidden">
                                <div className="h-40 w-full relative flex justify-end mb-4">
                                    <Image 
                                        src={feature.icon} 
                                        alt={feature.title} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 380px"
                                        className={`object-contain object-right-top transition-transform duration-500 ${feature.scale}`} 
                                    />
                                </div>
                                <h3 className="font-['Geist'] font-normal text-[32px] md:text-[34px] xl:text-[40px] leading-none tracking-[-0.04em] text-[#040136] max-w-[200px] md:max-w-[3000px] xl:max-w-[200px] mb-1">
                                    {feature.title}
                                </h3>
                                <p className="font-['Geist'] font-normal text-[16px] md:text-[18px] xl:text-[24px] leading-[1.4] tracking-[-0.03em] text-[#6E6E6E]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Link href="/for-creators" className="self-start bg-[#FF6B00] text-white p-3 md:p-3 xl:p-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-sm transition-all text-[16px] md:text-[18px] xl:text-[20px] md:self-center">
                        Join as a Creator
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;