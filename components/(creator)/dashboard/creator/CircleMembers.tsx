'use client'
import React from 'react'
import Image from 'next/image'

const CircleMembers = () => {
  return (
    <div className="flex items-center justify-center md:min-w-lg  ">
      <div className="w-full p-8 max-h-[70vh] h-full relative">
        <h2 className="text-xl text-center font-medium text-secondary-100 mb-6">
          View Members
        </h2>

        <div className='space-y-2 mt-7 '>
            {
                [1,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1]?.map((i) => (
                    <div className="flex items-center justify-between pb-2" key={i}>
                    <div className="flex items-center gap-3">
                     <Image src={'/profile.png'} alt='profile' width={100} height={100} className='w-10 h-10' />
                      <div>
                        <h3 className="font-normal text-base text-secondary-100">Favour</h3>
                        <p className="text-sm text-dark font-light -mt-1">@favvy</p>
                      </div>
                    </div>
                    <p className=" text-dark text-sm">Joined 20, Oct, 2024</p>
                  </div>
                ))
            }
        </div>
        </div>

    </div>
  )
}

export default CircleMembers