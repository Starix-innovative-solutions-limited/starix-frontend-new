"use client"

import CustomInput from '@/components/CustomInput'
import React from 'react'
import { IoCopyOutline } from 'react-icons/io5'

const Page = () => {
    return (
        <div className='general-space'>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-20 gap-40 items-center'>
                <div className='space-y-10'>
                    <h3 className='font-semibold text-dark-navy text-6xl'>
                        Get in touch- <br />
                        Let’s build the future of creator marketing together.
                    </h3>
                    <p className='font-extralight text-neut/60 text-2xl'>
                        Have questions, partnership ideas, or feedback? We’d love to hear from you.
                    </p>
                    <div className='text-xl text-neut/60 space-y-4'>
                        <span>
                            You can reach us here:
                        </span>
                        <div className='flex flex-row'>
                            <span>Email:</span>
                            <span className='text-dark-navy'>Starix@mail.com</span>
                            <IoCopyOutline />
                        </div>
                    </div>
                </div>

                <div className='bg-primary-orange/5 flex flex-col gap-3.5 px-10 py-10 rounded-3xl'>
                    <CustomInput label='Full name' placeholder='fullname' onChange={() => { }} className='bg-transparent' />
                    <CustomInput label='Email address' placeholder='Email address' onChange={() => { }} className='bg-transparent' />
                    <CustomInput label='Role' placeholder='role' onChange={() => { }} className='bg-transparent' />
                    <CustomInput type='textarea' label='How can we help you?' placeholder='Enter message here' onChange={() => { }} className='bg-transparent' />
                    <button className='btn w-full bg-dark-navy rounded-full text-white'>
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page