/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react';

const WhyStarix = () => {

    const [openSection, setOpenSection] = useState('discovering');

    const sections = [
        {
            id: 'discovering',
            title: 'Discovering Trends Early',
            content: 'Build campaigns with real creators that aligns with your brand story.'
        },
        {
            id: 'analytics',
            title: 'Understanding Analytics',
            content: 'Track performance metrics and gain insights into your campaign effectiveness with detailed analytics dashboards.'
        },
        {
            id: 'quality',
            title: 'Managing UGC Quality',
            content: 'Ensure high-quality user-generated content through approval workflows and brand guideline management.'
        },
        {
            id: 'opportunities',
            title: 'Getting Opportunities',
            content: 'Connect with the right creators and discover new partnership opportunities to grow your brand reach.'
        }
    ];

    const toggleSection = (id: any) => {
        setOpenSection(openSection === id ? null : id);
    };
    return (
        <div className='general-space bg-[#EBEFFF] min-h-screen '>
            <h3 className='text-secondary-100 text-5xl font-semibold text-center'>
                Why Starix Works Better
            </h3>

            <div className="max-md:flex max-md:flex-col md:grid md:grid-cols-5 gap-5 my-11">
                <div className='bg-[#E0E7FF]  rounded-3xl p-7 col-span-2 border border-gray-100/30'>
                    <span className='bg-[#FAFAFAB2] text-[#6E6E6E99] px-3 py-2 text-md font-medium'>
                        THE PROBLEM
                    </span>

                    <div className="w-full  space-y-3 mt-20">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden transition-all duration-200"
                            >
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-2xl text-secondary-100">
                                        {section.title}
                                    </span>
                                    {openSection === section.id ? (
                                        <Minus className="w-6 h-6 text-secondary-100 flex-shrink-0" />
                                    ) : (
                                        <Plus className="w-6 h-6 text-secondary-100 flex-shrink-0" />
                                    )}
                                </button>

                                {openSection === section.id && (
                                    <div className="px-6 pb-5 pt-1">
                                        <p className="text-dark text-lg leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                <div className='col-span-3 bg-[#ffffff] rounded-3xl pl-7 pt-7 border  border-gray-100/30'>

                    <span className='bg-[#FAFAFA] text-secondary-100 shadow-2xs px-3 py-2 text-md font-medium'>
                        THE PROBLEM
                    </span>

                    <div className='grid grid-cols-2 items-center'>
                        <div className='flex flex-col gap-3'>
                            <h2 className='text-secondary-100 text-4xl'>Trend Intelligence</h2>
                            <p className='text-dark text-lg'>Build campaigns with real creators that aligns with your brand story.</p>
                        </div>

                        <Image
                            src="/why-starix.png"
                            alt="Why Starix Image"
                            width={400}
                            height={400}
                            className="w-full object-contain rounded-br-4xl"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WhyStarix