import React from 'react'
import Image from 'next/image'
import { CgArrowLongRight } from 'react-icons/cg'
// import { AuthBgEnum } from '@/constant'



interface AuthProps {
    brand?: boolean,
    creator?: boolean
    showLabel?: boolean
}

const AuthBg = ({ brand, creator, showLabel }: AuthProps) => {
    return (
        <div className={`${brand ? "bg-[#FBFBEE] border border-gray-100" : "bg-[#C9D4F5]"} max-md:hidden  h-full rounded-3xl py-8 px-2 grid `}>
            {
                showLabel && <span className='bg-[#859DFF66] absolute ml-8 w-fit h-fit px-3 py-1.5 font-light text-dark-navy text-sm'>
                    FOR {brand ? 'BRAND' : 'CREATOR'}
                </span>
            }


            <div className="my-auto flex flex-col gap-10">

                <div className="mx-auto w-fit">
                    <Image src={'/dash-section.png'} width={300} height={100} alt="" className="" />
                    <Image src={'/dash-section2.png'} width={300} height={100} alt="" className="ml-20 -mt-40" />
                </div>

                <h2 className="tracking-[-0.02em] text-dark-navy line-clamp-2 text-2xl text-center">
                    {
                        brand && <span> Redefine your Brand <br /> Story. </span>
                    }

                    {
                        creator && <span>Redefine Your Creativity,</span>
                    }

                    {
                        !brand && !creator && <span> Build campaigns, Join <br /> challenges, Earn rewards.</span>
                    }
                </h2>
                <div className="flex flex-col gap-4">

                    <div className="bg-[#A9BAEF6E] rounded-full px-3 py-2 shadow-2xs flex-center w-fit mx-auto" >
                        <Image src={'/auth-icon-placard.png'} alt="" width={120} height={100} />
                        <span className="italics text-dark-navy/70 ml-3 mr-1">
                            <i>start here</i>
                        </span>

                        <CgArrowLongRight className="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthBg