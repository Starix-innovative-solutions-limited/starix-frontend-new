"use client"


import { variants } from '@/constant'
import { motion } from 'framer-motion'
import React from 'react'
import RouteHeader from '@/components/(creator)/dashboard/RouteHeader'
import ImageCarousel from '@/components/(creator)/dashboard/creator/ImageCarousel'
import EngagementInsight from '@/components/(creator)/dashboard/creator/EngagementInsight'

const Page = () => {

    const details = [
        {
            label: 'Work Description',
            value:
                'Work Description - From brands running high-impact challenges to creators winning rewards and building',
            isLong: true,
        },
        { label: 'Brand Name', value: 'Tiktok' },
        { label: 'Timeline', value: '4 weeks' },
        { label: 'Date', value: '20th - 23rd Oct, 2025' },
    ]

    return (
        <div className=' flex flex-col gap-10'>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants?.containerVariants}
                className=" flex flex-col gap-4"
            >
                <RouteHeader label='Work Insights' />


                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Image Carousel */}
                    <ImageCarousel />

                    {/* Insights Panel */}
                    <EngagementInsight whichSocial='Tiktok' />
                </div>

                {/* Details Section */}
                <div className="mt-8 space-y-5 text-sm text-slate-800">
                    {details.map((item) => (
                        <div key={item.label} className="space-y-1">
                            <p className="text-base font-medium text-dark">
                                {item.label}:
                            </p>
                            <p
                                className={item.isLong ? 'max-w-3xl leading-relaxed text-lg' : 'text-lg'}
                            >
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>


            </motion.div>


        </div>
    )
}

export default Page