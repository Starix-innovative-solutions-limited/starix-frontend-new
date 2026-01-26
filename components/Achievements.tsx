"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Achievements = () => {
    return (
        <section className='general-space bg-white'>
            {/* Achievement */}
            <div className='grid grid-cols-1 md:grid-cols-2 items-center max-md:place-items-center gap-20 my-10 md:my-32'>
                <Image
                    src={'/achievement2.png'}
                    alt='achievement'
                    width={9999}
                    height={9999}
                    className='w-full h-auto md:order-1'
                />
                <div className='flex flex-col gap-8 order-1 md:order-2'>
                    <h2 className='font-semibold text-2xl md:text-[48px] text-dark-navy max-md:text-center leading-tight'>What You Achieve on Starix</h2>
                    <p className='text-lg md:text-xl font-light text-neut/60 max-md:text-center'>From brands running high-impact challenges to creators winning rewards and building portfolios—Starix drives real engagement, content, and community growth.</p>
                    <Link
                        href="/for-brands"
                        className="
                        group
                        w-fit text-lg mt-8 md:mt-14
                        bg-dark-navy text-white
                        rounded-full px-5 py-3
                        flex-center gap-3
                        border border-dark-navy
                        transition-all duration-300
                        hover:bg-white hover:text-dark-navy
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
                        transition-all duration-300
                        group-hover:invert
                        group-hover:translate-x-1
                        "
                        />
                    </Link>

                </div>
            </div>
        </section>
    )
}

export default Achievements