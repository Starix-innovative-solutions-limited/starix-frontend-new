"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PlatformBanner = () => {
    return (
        <section className='general-space bg-white'>
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

                <div className=" relative min-h-[55vh] grid place-items-center bg-[url('/blurredBg.png')] bg-no-repeat bg-center bg-cover rounded-3xl overflow-hidden">
                    <div className='text-auto bg-dark-navy/22 h-full w-full p-9 md:px-20 grid place-items-center'>
                        <div>
                            <h3 className=' text-xl md:text-2xl text-white text-center'>
                                Starix is a challenge-based marketing platform
                                connecting brands with content creators.
                            </h3>
                            <p className='text-off-white/80 text-base md:text-xl font-light mt-4 text-center'>
                                Brands launch sponsored challenges with clear rewards, while creators participate by producing and sharing content across their social media channels.
                            </p>

                            <Link
                                href="/for-brands"
                                className="
                                group
                                w-fit text-lg mt-14
                                bg-white text-dark-navy
                                rounded-full px-5 py-3
                                flex-center gap-3
                                border border-white
                                transition-all duration-300
                                hover:bg-dark-navy hover:text-white
                                max-md:mx-auto
                            "
                            >
                                <span>Get Started</span>
                                <Image
                                    src="/rightArrow.svg"
                                    alt="right-arrow"
                                    width={100}
                                    height={100}
                                    className="
                                w-5
                                invert-0
                                transition-all duration-300
                                group-hover:invert
                                group-hover:translate-x-1
                                "
                                />
                            </Link>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default PlatformBanner