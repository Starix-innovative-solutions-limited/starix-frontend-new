/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';
// import { BsSearch } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';


export const CreatorCard = ({ image, title, description, buttonText, delay }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col justify-between  bg-white  overflow-hidden  hover:shadow-xl transition-shadow duration-300 px-5 p-5"
        >
            <div className='flex flex-col gap-7'>
                <motion.div
                    className="relative h-56 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-4xl"
                    />
                </motion.div>

                <div className=" flex flex-col gap-3">
                    <h3 className="text-2xl  text-dark-navy tracking-tight ">{title}</h3>
                    <p className="text-neut/60 font-light text-xl mb-6 flex-grow">
                        {description}
                    </p>


                </div>
            </div>

            <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-dark-navy/70 ml-auto text-base font-light hover:gap-4 transition-all duration-300 group"
            >
                <span className="border-b border-dark-navy/70 font-light">{buttonText}</span>
                <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </motion.div>
    );
};

const Page = () => {
    const creators = [
        {
            image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
            title: "New Creators",
            description: "No followers? No problem. Build your creator portfolio day by day one and watch your Starix Score grow with every challenge you join.",
            buttonText: "Create Portfolio"
        },
        {
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
            title: "Micro Creators",
            description: "Get consistent access to paid challenges without pitching brands or waiting for collaborations to come to you. Your creativity speaks for itself here.",
            buttonText: "Create Consistency"
        },
        {
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
            title: "Trend Creators",
            description: "If you love jumping on trends, you're in the right place. Join fast-moving challenges designed for viral energy and high engagement.",
            buttonText: "Create Impact"
        },
        {
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
            title: "Mega Creators",
            description: "Create your own branded challenges, earn rewards, and ship impactful content at scale.",
            buttonText: "Create Influence"
        }
    ];


    const audienceChallenges = [
        {
            title: "Hard to Grow Audience",
            description: "Hard to grow without knowing what works in the industry"
        },
        {
            title: "Fast-Moving Trends",
            description: "Trends change quickly, making it hard to stay relevant"
        },
        {
            title: "Brand Credibility",
            description: "Struggling to appear professional to potential brand partners"
        },
        {
            title: "Limited Opportunities",
            description: "New creators often find it hard to get noticed or collaborate"
        }
    ];

    const solutions = [
        {
            id: 1,
            title: 'Creator circle',
            description: 'No followers? No problem. Build your creator portfolio from day one '
        },
        {
            id: 2,
            title: 'Trend Radar',
            description: 'No followers? No problem. Build your creator portfolio from day one '
        },
        {
            id: 3,
            title: 'Starix score',
            description: 'No followers? No problem. Build your creator portfolio from day one '
        },
        {
            id: 4,
            title: 'Professional Dashboard',
            description: 'No followers? No problem. Build your creator portfolio from day one '
        }
    ];

    return (

        <>
            <div className="bg-off-white bg-lines">
                <main className="relative general-space min-h-screen">
                    <div className='grid grid-cols-1 md:items-center md:grid-cols-2 mt-20 h-fit'>
                        <div className='flex flex-col gap-10 h-fit relative '>
                            <div className="">
                                <h3 className='font-semibold text-6xl w-full leading-snug line-clamp-3 text-dark-navy grow '>
                                    Grow Smarter, <br />
                                    Build Your Creator <br /> Identity
                                </h3>
                            </div>


                            <p className='font-light text-2xl text-neut/60'>
                                Get discovered. Get opportunities. Improve faster. Earn more.
                            </p>

                            <button className=' bg-dark-navy py-2 px-5 rounded-full text-off-white w-fit'>
                                Join as a creator.
                            </button>


                            <Image
                                src={'/star2.png'}
                                alt=""
                                width={400}
                                height={400}
                                className=' absolute -top-5/12 right-0'
                            />


                        </div>

                        <div className='grid place-items-center'
                            style={{
                                background: 'url(gridLayer.png)'
                            }}>

                            <Image
                                src={'/creator-hero.png'}
                                alt=""
                                width={1000}
                                height={1000}
                                className='max-h-[100vh] min-h-[80vh] w-auto opacity-90 '
                            />

                        </div>




                    </div>

                    <div className=" flex flex-col py-20">
                        {/* Hero Section - Problems */}

                        <motion.h1
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl lg:text-5xl font-semibold text-dark-navy mb-6 text-center"
                        >
                            “ The Creator Problem”
                        </motion.h1>

                        <section className=" py-10 md:py-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col gap-12"
                            >


                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="space-y-6 grid md:grid-cols-4 gap-12"
                                >
                                    {audienceChallenges.map((problem, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                            className="flex flex-col items-center gap-3 text-gray-600"
                                        >
                                            <span className='bg-[#f3f5f7] rounded-full border border-gray-100 shadow-2xs p-4 mb-6  mx-auto'>
                                                <Image
                                                    src={'/editIcon.png'}
                                                    alt='edit icons'
                                                    width={1000}
                                                    height={1000}
                                                    className='w-12 '
                                                />
                                            </span>
                                            <span className="text-2xl text-dark-navy tracking-tight">{problem?.title}</span>
                                            <span className='text-neut/60 text-xl text-center'>{problem?.description}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </section>

                    </div>

                </main >

                {/* Solutions Section */}
                <section className="bg-off-white">
                    <div className="bg-primary-orange/5 general-space relative">
                        <Image
                            src={'/incident-ball-1.png'}
                            alt='incident ball 1'
                            width={100}
                            height={100}
                            className='absolute w-32 object-cover -top-1/12 left-0'
                        />

                        <Image
                            src={'/incident-ball-2.png'}
                            alt='incident ball 2'
                            width={1000}
                            height={1000}
                            className='absolute w-52 object-scale-down right-0 -bottom-[10%]'
                        />
                        <div className="container mx-auto ">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl lg:text-5xl font-semibold text-dark-navy mb-12 text-center"
                            >
                                Starix Solutions
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
                                {solutions.map((solution, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-off-white  p-6"
                                    >
                                        <div className="mb-4">
                                            <Image
                                                src={'/dash-section2.png'}
                                                alt='dash section'
                                                width={1000}
                                                height={1000}
                                            />
                                        </div>
                                        <h3 className="font-normal text-2xl tracking-[-0.02rem] text-dark-navy mb-2">{solution.title}</h3>
                                        <p className="text-neut/60 text-xl font-light mt-3">{solution.description}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mt-10"
                            >
                                <motion.button className=' bg-dark-navy py-2 px-5 rounded-full text-off-white w-fit flex-center gap-2 mt-2.5 mx-auto'>
                                    <span>Join as a creator.</span>
                                    <HiOutlineArrowNarrowRight />
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Key Features Section */}
                    <div className="general-space">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <h2 className="text-4xl font-bold text-dark-navy mb-4 text-center">Key Features For Creators On Starix</h2>
                        </motion.div>


                        <div className='grid grid-cols-1 md:grid-cols-5 gap-20 '>
                            <div className='md:col-span-3 bg-primary-orange grid grid-cols-10 rounded-3xl border border-gray-200'>
                                <div className='col-span-4 p-5 pl-20 flex flex-col gap-20 justify-center'>
                                    <span className='bg-off-white/30 text-dark-navy px-2 py-1 text-base font-light w-fit '>
                                        CHALLENGE MARKETPLACE
                                    </span>
                                    <p className='text-off-white text-[28px] tracking-tight'>
                                        Created Challenge for
                                        Thousands of Creators
                                    </p>
                                </div>

                                <div className='bg-[#F3E3D9] col-span-6 pl-20 relative rounded-r-3xl'>
                                    <Image
                                        src={'/features1.png'}
                                        alt='dash section'
                                        width={1000}
                                        height={1000}
                                        className='w-full rounded-r-3xl'
                                    />
                                </div>
                            </div>

                            <div className='bg-[#1DD6C60D] rounded-3xl md:col-span-2 py-10 px-14  border border-gray-200'>
                                <div className="flex flex-col items-center justify-between h-full ">
                                    <Image
                                        src={'/playButtons.png'}
                                        alt='play bittons'
                                        width={100}
                                        height={100}
                                        className='w-20 mx-auto'
                                    />

                                    <span className='bg-off-white text-dark-navy text-base font-light px-2 py-1'>
                                        CREATOR INCUBATOR
                                    </span>

                                    <p className='text-dark-navy text-[28px] tracking-tight text-center'>Tutorial + Mini <br /> Tasks Curated For You</p>

                                    <Image
                                        src={'/imageDash.png'}
                                        alt='image dash'
                                        width={1000}
                                        height={1000}
                                        className=' mx-10'
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='grid grid-cols-1 md:grid-cols-5  gap-20 '>
                            <div className='bg-primary-orange/20 rounded-3xl md:col-span-2 py-10 px-14  border border-gray-200'>
                                <div className="flex flex-col items-center justify-between h-full ">
                                    <Image
                                        src={'/heart.png'}
                                        alt='heart'
                                        width={100}
                                        height={100}
                                        className='w-20 mx-auto'
                                    />

                                    <span className='bg-off-white text-dark-navy text-base font-light px-2 py-1'>
                                        CREATOR TAG
                                    </span>

                                    <p className='text-dark-navy text-[28px] tracking-tight text-center'>
                                        Get Discovered Even With <br /> Small Following
                                    </p>

                                    <Image
                                        src={'/imageDash.png'}
                                        alt='image dash'
                                        width={1000}
                                        height={1000}
                                        className=' mx-10'
                                    />
                                </div>
                            </div>


                            <div className='md:col-span-3 bg-[#1DD6C6] grid grid-cols-10 rounded-3xl border border-gray-200'>
                                <div className='col-span-4 p-5 pl-20 flex flex-col gap-20 justify-center'>
                                    <span className='bg-off-white/30 px-2 py-1 text-base text-white font-light w-fit '>
                                        CREATOR CV
                                    </span>
                                    <p className='text-off-white text-[28px] tracking-tight'>
                                        Your Professional Portfolio + Analytics
                                    </p>
                                </div>

                                <div className='bg-[#F5F5F5] col-span-6 pl-20 relative rounded-r-3xl'>
                                    <Image
                                        src={'/features3.png'}
                                        alt='dash section'
                                        width={1000}
                                        height={1000}
                                        className='w-full rounded-r-3xl'
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </section>


                {/* Challenge System Section */}
                <section className=" text-dark-navy py-16 general-space">

                    <div className="flex flex-col gap-20">
                        <div className="flex-between">
                            <p className='text-5xl text-dark-navy font-semibold tracking-tight'>We’re Made for Every Creator</p>
                            <p className='max-w-md line-clamp-3 text-right font-extralight text-neut/60 text-[28px]'>{'"'}From zero followers to your first thousand, We{'’'}ll help you grow your audience step by step.{'"'}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {creators.map((creator, index) => (
                                <CreatorCard
                                    key={index}
                                    image={creator.image}
                                    title={creator.title}
                                    description={creator.description}
                                    buttonText={creator.buttonText}
                                    delay={index * 0.1}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div >

        </>
    )
}

export default Page