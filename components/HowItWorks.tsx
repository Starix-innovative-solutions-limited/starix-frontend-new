"use client"
import React from 'react'
import Image from 'next/image'
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

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
        <div className='general-space flex flex-col   bg-white min-h-screen'>

            <div className='flex max-md:flex-col max-md:gap-5 justify-between mt-10'>
                <div className='text-5xl max-md:text-2xl font-semibold max-md:flex items-center max-md:justify-between'>
                    <span>How It Works</span>
                    <Image
                        src={'/arrow.png'}
                        width={100}
                        height={100}
                        alt='howitworks'
                        className=' -ml-5 max-md:rotate-180'
                    />
                </div>
                <div className='text-right max-w-md text-neut/60 font-light text-2xl '>
                    Starix transforms how brands and creators collaborate. Our challenge-based system drives authentic engagement and measurable results — helping creators grow faster and brands connect deeper with real audiences.
                </div>
            </div>

            <div className='mt-10 bg-white py-14 rounded-2xl shadow grid max-md:px-6 px-8 border border-gray-100'>
                <div className='flex max-md:flex-col items-center gap-6'>
                    <div className='bg-[#FAFAFA]  py-1 text-dark-navy font-light text-base inline-block whitespace-nowrap
'>
                        FOR BRANDS.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  w-full">
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
                <button className='mx-auto text-lg mt-14 bg-dark-navy rounded-full px-5 py-3 text-white flex-center'>
                    <span>Learn more</span> &nbsp;
                    <HiOutlineArrowLongRight />
                </button>
            </div>


            <div className=' bg-white py-14 rounded-2xl shadow grid max-md:px-6 md:pl-8 border border-gray-200'>
                <div className='flex max-md:flex-col items-center gap-20'>
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
                <button className='mx-auto text-lg mt-14 bg-dark-navy rounded-full px-5 py-3 text-white flex-center'>
                    <span>Learn more</span> &nbsp;
                    <HiOutlineArrowLongRight />
                </button>
            </div>


            {/* Achievement */}
            <div className='grid grid-cols-1  md:grid-cols-2 items-center max-md:place-items-center gap-20 my-32'>
                <Image
                    src={'/achievement2.png'}
                    alt='achievement'
                    width={9999}
                    height={9999}
                    className='w-full h-auto order-2 md:order-1'
                />
                <div className='flex flex-col gap-3'>
                    <h2 className='font-semibold text-2xl md:text-[48px] text-dark-navy max-md:text-center'>What You Achieve on Starix</h2>
                    <p className='text-xl md:text-xl font-light text-neut/60 max-md:text-center'>From brands running high-impact challenges to creators winning rewards and building portfolios—Starix drives real engagement, content, and community growth.</p>
                    <button className='w-fit text-lg mt-14 bg-dark-navy rounded-full px-5 py-3 text-white flex-center max-md:mx-auto'>
                        <span>Get Started</span>
                        <HiOutlineArrowLongRight />
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-20'>
                <div className='p-7'>
                    <Image
                        src={'/bigLogo.png'}
                        alt='blurred'
                        width={9999}
                        height={9999}
                        className='object-cover'
                    />
                </div>

                <div className=" relative min-h-[55vh] grid place-items-center bg-[url('/blurredBg.png')] bg-no-repeat bg-center bg-cover">
                    <div className='text-auto bg-dark-navy/22 h-full w-full  p-9 md:px-20 grid place-items-center'>
                        <div>
                            <h3 className='text-2xl text-white text-center'>
                                Starix is a challenge-based marketing platform
                                connecting brands with content creators.
                            </h3>
                            <p className='text-off-white/80 text-xl font-light mt-4 text-center'>
                                Brands launch sponsored challenges with clear rewards, while creators participate by producing and sharing content across their social media channels.
                            </p>

                            <button className='mx-auto w-fit text-lg mt-10 bg-transparent border border-off-white/70 rounded-full px-5 py-3 text-white flex-center'>
                                <span>Get Started</span>
                                <HiOutlineArrowLongRight />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HowItWorks