/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';
// import { BsSearch } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Minus, Plus } from 'lucide-react';
import { PiWarningCircleLight } from 'react-icons/pi';

const Page = () => {
  const problems = [
    'Poor UGC quality',
    'Hard to verify engagement',
    'Struggle to discover content',
    'No clear ROI from creator campaigns'
  ];

  const [activeProblem, setActiveProblem] = useState<number>(0);

  const solutions = [
    {
      id: 1,
      title: 'UGC Scoring Engine',
      description: 'An algorithm that grades the viral-readiness of user generated content'
    },
    {
      id: 2,
      title: 'Verified Creator Profiles',
      description: 'To forecast the success of each post from validated creator analytics'
    },
    {
      id: 3,
      title: 'Trend Intelligence',
      description: 'An influence bot to predict the viral trends and emerging creator insights'
    },
    {
      id: 4,
      title: 'Challenge Dashboard',
      description: 'Gamified creator challenges with real-time tracking'
    }
  ];

  const features = ['Creative', 'Curators', 'Events', 'Reward'];

  const challengeSteps = [
    { id: 1, title: 'Create a Challenge', description: 'Set up your campaign with specific goals and guidelines' },
    { id: 2, title: 'Find Escrow', description: 'Secure funds for winner payouts' },
    { id: 3, title: 'Get Submissions', description: 'Receive and review creator content' },
    { id: 4, title: 'Approve Winners', description: 'Select and reward top performers' }
  ];
  const brandFeatures = [
    {
      icon: "playButtons.png",
      title: "Real-time Leaderboard",
      description: "Set campaign goals, budget, and duration.",
      gradient: "from-orange-100 via-pink-50 to-green-100"
    },
    {
      icon: "diamond.png",
      title: "Content Insight",
      description: "Suggest hooks, captions, and tone that fit your brand voice.",
      gradient: "from-blue-100 via-indigo-50 to-purple-100"
    },
    {
      icon: "trophy.png",
      title: "Content Performance",
      description: "Starix measures likes and comments automatically.",
      gradient: "from-red-100 via-orange-50 to-blue-100"
    }
  ];

  const [openSection, setOpenSection] = useState(1);

  const toggleSection = (id: any) => {
    setOpenSection(openSection === id ? null : id);
  };
  return (

    <>
      <div className="bg-off-white overflow-hidden">
        <main className="relative general-space min-h-screen">
          <div className='grid grid-cols-1 md:items-center gap-6 md:grid-cols-2 mt-20'>
            <div className=' flex flex-col  gap-6 md:gap-10 h-fit relative  py-2 '>
              <div className='flex flex-col gap-6 md:gap-10m col-span-2 '>
                <h3 className='font-semibold text-4xl max-md:text-center md:text-6xl w-full leading-snug  text-dark-navy grow '>
                  High‐Quality <br className='' />
                  UGC, Powered by <br className='' />
                  Real Data
                </h3>

                <p className='font-light text-xl md:text-2xl text-neut/60 max-md:text-center'>Run smarter creator challenges with verified creators and trend insight</p>

                <button className=' bg-dark-navy p-4 rounded-full text-off-white w-full md:w-fit'>
                  Join as a brand.
                </button>
              </div>

              <Image
                src={'/hero1.png'}
                alt=""
                width={500}
                height={500}
                className='absolute w-lg h-auto -top-5/12 -right-6/12  md:-top-5/12 md:-right-14 lg:-right-5'
              />

            </div>


            <Image
              src={'/brand-hero1.png'}
              alt=""
              width={1000}
              height={1000}
            />

          </div>

          <div className=" flex flex-col py-20">
            {/* Hero Section - Problems */}
            <section className="">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col lg:flex-row items-center gap-12"
              >
                <div className="lg:w-1/2">


                  <Image
                    src={'/brand-problems.png'}
                    alt=""
                    width={800}
                    height={800}
                    className='object-scale-down'
                  />
                </div>

                <div className="lg:w-1/2 flex flex-col gap-4">
                  <motion.h1
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl lg:text-5xl font-semibold text-dark-navy mb-6"
                  >
                    Problem For Brands
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-3"
                  >
                    {problems.map((problem, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className={`flex flex-col  gap-1 tracking-tight ${activeProblem == index ? 'text-dark-navy' : 'text-neut/60'} `}
                        onClick={() => setActiveProblem(index)}
                      >

                        <div className='flex items-center gap-10'>
                          <PiWarningCircleLight className='text-2xl' />

                          <span className="text-2xl">{problem}</span>
                        </div>
                        <div className={` h-5 ${index > 2 && 'hidden'} border-l ${activeProblem == index ? 'border-dark-navy' : 'border-neut/60'} ml-3 divide-x-2 `} />
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* Solutions Section */}
            <section className="bg-white py-16">
              <div className="flex flex-col gap-20">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold text-dark-navy text-center"
                >
                  Starix Solutions
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white  py-6"
                    >
                      <div className="mb-4">
                        <Image
                          src={`/starixSolution${index > 2 ? 1 : index + 1}.png`}
                          alt='dash section'
                          width={1000}
                          height={1000}
                          className='md:max-w-4/5'
                        />
                      </div>
                      <h3 className="font-normal text-xl md:text-2xl  text-dark-navy mb-2">{solution.title}</h3>
                      <p className="text-neut/60 text-base md:text-xl font-light">{solution.description}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.button className=' bg-dark-navy p-4 rounded-full text-off-white w-fit flex-center gap-2 mx-auto'>
                    <span>Join as a brand.</span>
                    <HiOutlineArrowNarrowRight />
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* Key Features Section */}
            <section className="py-16">
              <div className="flex-between">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-4xl font-bold text-dark-navy mb-4">Key Features For Brands <br /> On Starix</h2>
                </motion.div>

                <div className="flex flex-wrap gap-3 mb-8 ">
                  {features.map((feature, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`px-6 py-2  rounded-full text-gray-700 font-normal border hover:text-gray-900 transition-colors
                         ${index == 0 ? ' border-dark-navy text-dark-navy' : ' border-neut/60 text-neut/60'} `}
                    >
                      {feature}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 relative pl-8 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/3">
                    <div className="flex-col gap-3">
                      <span className=" bg-off-white font-light text-base text-dark-navy mb-2 p-2">UGC CHALLENGE</span>
                      <p className="text-dark-navy text-2xl mb-4">
                        Create Challenges for Thousands of Creators
                      </p>

                      <Image
                        src={"/playButtons.png"}
                        alt="play"
                        width={100}
                        height={100}
                        className='w-20'
                      />
                    </div>
                  </div>
                  <div className="lg:w-2/3  gap-4">
                    <Image
                      src={'/keyFeaturesFram2.png'}
                      alt='key features'
                      width={1000}
                      height={1000}
                      className='min-w-full border-r-3xl '
                    />
                  </div>
                </div>
              </motion.div>

            </section>



          </div>

        </main >

        {/* Challenge System Section */}
        <section className="bg-[#EBEFFF] text-dark-navy py-16 general-space">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className=""
              >
                <div className="relative">
                  <Image
                    src={'/howBrandsWork.png'}
                    alt='hw brand'
                    width={1000}
                    height={1000}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className=" text-4xl lg:text-5xl font-semibold mb-8 md:leading-snug">How Starix Challenge <br className='max-md:hidden' /> System Works</h2>
                <div className="space-y-6">
                  <div className="w-full  space-y-3 mt-20">
                    {challengeSteps.map((item, index) => (
                      <div
                        key={index}
                        className=" border-b border-secondary-100 overflow-hidden transition-all duration-200"
                      >

                        <div className="flex items-center">
                          <Image
                            src={`/challengeStep${index + 1}.png`}
                            alt=''
                            width={100}
                            height={100}
                            className='w-6'
                          />


                          <div className='grow'>
                            <button
                              onClick={() => toggleSection(item?.id)}
                              className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                            >
                              <span className="text-2xl text-secondary-100">

                                {item.title}
                              </span>
                              {openSection === item.id ? (
                                <Minus className="w-6 h-6 text-secondary-100 flex-shrink-0" />
                              ) : (
                                <Plus className="w-6 h-6 text-secondary-100 flex-shrink-0" />
                              )}
                            </button>

                            {openSection === item?.id && (
                              <div className="px-6 pb-5 pt-1">
                                <p className="text-dark-navy/70 text-lg leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        <section className='general-space'>
          <div className='mt-10 bg-white py-14 rounded-2xl shadow grid max-md:px-6 px-8 border border-gray-100'>
            <div className='flex max-md:flex-col items-center gap-6'>
              <div className='bg-[#FAFAFA]  py-1 text-dark-navy font-light text-base inline-block whitespace-nowrap
'>
                BRAND ANALYTICS.
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
          </div>
        </section>

      </div >

    </>
  )
}

export default Page