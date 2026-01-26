"use client"
import Image from 'next/image'
import { motion } from 'framer-motion';
import Link from "next/link";

const HowItWorks = () => {
    const brandFeatures = [
        {
            icon: "playButtons.png",
            title: "Create a Challenge",
            description: "Set campaign goals, budget, and duration.",
            gradient: "from-orange-100 via-pink-50 to-green-100"
        },
        {
            icon: "diamond.png",
            title: "Guide with Briefs",
            description: "Suggest hooks, captions, and tone that fit your brand voice.",
            gradient: "from-blue-100 via-indigo-50 to-purple-100"
        },
        {
            icon: "trophy.png",
            title: "Track & Reward",
            description: "Starix measures likes and comments automatically.",
            gradient: "from-red-100 via-orange-50 to-blue-100"
        }
    ];


    const creatorFeatures = [
        {
            icon: "creatorFeature1.png",
            title: "Discover Challenges",
            description: "Browse brand-sponsored tasks that match your niche.",
            gradient: "from-orange-100 via-pink-50 to-green-100"
        },
        {
            icon: "creatorFeature2.png",
            title: "Create Content",
            description: "Submit your entries with your unique style.",
            gradient: "from-blue-100 via-indigo-50 to-purple-100"
        },
        {
            icon: "creatorFeature3.png",
            title: "Earn Rewards",
            description: "Receive your payment for every sponsored content. ",
            gradient: "from-red-100 via-orange-50 to-blue-100"
        }
    ];
    return (
        <div className='general-space flex flex-col bg-white min-h-screen'>

            <div className='flex max-md:flex-col max-md:gap-5 justify-between mt-10'>
                <div className='text-5xl max-md:text-2xl font-semibold max-md:flex items-center max-md:justify-between'>
                    <span>How It Works</span>

                    <motion.div
                        animate={{ rotate: [0, -3, 4, -8, 0] }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="-ml-5 max-md:rotate-180"
                    >
                        <Image
                            src={'/arrow.png'}
                            width={100}
                            height={100}
                            alt='howitworks'
                        // className=' -ml-5 max-md:rotate-180'
                        />

                    </motion.div>
                </div>
                <div className='text-right max-w-md text-neut/60 font-light text-2xl '>
                    Starix transforms how brands and creators collaborate. Our challenge-based system drives authentic engagement and measurable results — helping creators grow faster and brands connect deeper with real audiences.
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='mt-10 bg-white py-14 rounded-2xl shadow-[0px_2px_16px_0px_#0033FF1A] grid max-md:px-6 px-8'>
                    <div className=' md:grid md:grid-cols-[1.5fr__9.5fr] max-md:flex max-md:flex-col items-center gap-6'>
                        <div className='bg-[#FAFAFA]  py-1 text-dark-navy font-light text-base inline-block whitespace-nowrap'>
                            FOR BRANDS.
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {brandFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-1  shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300`}
                                >
                                    <div className='bg-white p-8 h-full w-full rounded-2xl'>
                                        <div className="">
                                            <Image
                                                src={`/${feature?.icon}`}
                                                width={100}
                                                height={100}
                                                alt={feature?.icon}
                                                className={`${index == 1 ? 'w-16 ' : 'w-16'} h-auto`}
                                            />
                                        </div>

                                        <h3 className="text-[28px] font-normal text-dark-navy mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-neut/60 font-light text-xl">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link
                    href="/for-brands"
                    className="
                        group
                        mx-auto mt-14
                        text-lg
                        bg-dark-navy text-white
                        rounded-full px-5 py-3
                        flex-center gap-2
                        border border-dark-navy
                        transition-all duration-300
                        hover:bg-white hover:text-dark-navy
                    "
                    >
                    <span>Learn more</span>
                    <Image
                        src="/rightArrow.svg"
                        alt="right-arrow"
                        width={100}
                        height={100}
                        className="
                        w-5
                        transition-all duration-300
                        group-hover:invert
                        "
                    />
                    </Link>


                </div>


                <div className=' bg-white py-14 rounded-2xl shadow-[0px_2px_16px_0px_#0033FF1A] grid max-md:px-6 md:pl-8'>
                    <div className='md:grid md:grid-cols-[1.5fr__9.5fr] max-md:flex max-md:flex-col items-center gap-6 max-md:gap-20'>
                        <div className='bg-[#FAFAFA] px-2 py-1 text-dark-navy font-light text-base inline-block whitespace-nowrap
'>
                            FOR CREATORS.
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  w-full">
                            {creatorFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`rounded-3xl p-1  transition-shadow duration-300`}
                                >
                                    <div className='bg-white md:p-8 h-full w-full flex flex-col gap-2 rounded-2xl'>
                                        <div className='w-full'>
                                            <Image
                                                src={`/${feature?.icon}`}
                                                width={1000}
                                                height={1000}
                                                alt={feature?.icon}
                                                className={`w-full}`}
                                            />
                                        </div>

                                        <h3 className="text-[28px] font-normal text-dark-navy mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-neut/60 font-light text-xl">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link
                        href="/for-creators"
                        className="
                            group
                            mx-auto mt-14
                            text-lg
                            bg-dark-navy text-white
                            rounded-full px-5 py-3
                            flex-center gap-2
                            border border-dark-navy
                            transition-all duration-300
                            hover:bg-white hover:text-dark-navy
                        "
                        >
                        <span>Learn more</span>
                        <Image
                            src="/rightArrow.svg"
                            alt="right-arrow"
                            width={100}
                            height={100}
                            className="
                            w-5
                            transition-all duration-300
                            group-hover:invert
                            "
                        />
                    </Link>


                </div>
            </div>
        </div>
    )
}

export default HowItWorks