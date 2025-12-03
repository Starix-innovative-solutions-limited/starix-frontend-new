"use client"
import React, { useState } from 'react'
import CustomInput from '../CustomInput'
import Image from 'next/image'

const CreateCircle = () => {
  const [formPart, setFormPart] = useState(0)
  return (
    <div className="bg-white rounded-lg  w-full max-md:max-w-[80vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between md:max-w-2xl">
            {/* Header */}
            <h2 className="text-xl text-center font-medium text-secondary-100 p-4">Create Circle</h2>

       <div className="px-8 pb-8 flex flex-col gap-2">
        

        {
          formPart == 0 ? <>
          <CustomInput label='Circle Name' placeholder='Enter Circle Name' onChange={() => {}} className="rounded-lg" />
          <CustomInput label='Circle Description' placeholder='Enter Circle Description' onChange={() => {}} className="rounded-lg" />
            </> : (
              <>
                <CustomInput label='Category' placeholder='Enter Circle Name' onChange={() => {}} className="rounded-lg" />
                  <div className='flex items-center gap-4 overflow-x-hidden'>
                    {
                      ['trophy.png', 'ball.png', 'star.png', 'hero1.png', 'heart.png']?.map((item, i ) => (
                        <span key={i} className='bg-[#fafafa] rounded-xl w-16 h-16 grid place-items-center shadow shad'>
                          <Image src={`/${item}`} alt='' width={100} height={100} className='w-12 h-12 object-cover' />
                        </span>
                      ))
                    }
                  </div>
              </>
            )
        }


       {
        formPart == 0 ? (
          <button className='btn mt-12 bg-secondary-100 text-[#fafafa] ' onClick={() => setFormPart(1)}>
            Next
          </button>
        ) : (
          <>
            <button className='btn mt-12 bg-white border border-secondary-100 text-secondary-100' onClick={() => setFormPart(0)}>
              Back
            </button>

            <button className='btn  bg-secondary-100 text-[#fafafa] '>
              Create Circle
            </button>
       </>
        )
       }
       </div>




    </div>
  )
}

export default CreateCircle