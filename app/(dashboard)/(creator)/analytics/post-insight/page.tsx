"use client"

import { EngagementChart } from '@/components/dashboard'
import { variants } from '@/constant'
import { motion } from 'framer-motion'
import React from 'react'
import RouteHeader from '@/components/dashboard/RouteHeader'
import EngagementInsight from '@/components/dashboard/creator/EngagementInsight'
import ImageCarousel from '@/components/dashboard/creator/ImageCarousel'

const Page = () => {


    return (
        <div className=' flex flex-col gap-10'>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants?.containerVariants}
                className=" flex flex-col gap-4"
            >

                <RouteHeader label='Post Insights' />

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Image Carousel */}
                    <ImageCarousel />

                    {/* Insights Panel */}
                    <div>
                        <EngagementInsight />
                    </div>
                </div>


            </motion.div>

            <EngagementChart showLabel />
        </div>
    )
}

export default Page