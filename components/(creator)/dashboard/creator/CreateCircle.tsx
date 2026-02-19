"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import CustomInput from '@/components/CustomInput'

const CreateCircle = () => {
  const [formPart, setFormPart] = useState(0)
  return (
    <div className="w-full max-md:max-w-[80vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between md:max-w-2xl">
      {/* Header */}
      <h2 className="text-2xl text-center font-medium text-secondary-100 p-8">Create Circle</h2>

      <div className="px-6 pb-10 flex flex-col gap-4">


        {
          formPart == 0 ? <>
            <CustomInput label='Circle Name' placeholder='Enter Circle Name' onChange={() => { }} className="rounded-lg" />
            <CustomInput label='Circle Description' placeholder='Enter Circle Description' onChange={() => { }} className="rounded-lg" />
          </> : (
            <>
              <CustomInput
                type="select"
                label="Category"
                placeholder="Select Category"
                options={[
                  "Fashion",
                  "Tech",
                  "Gaming",
                  "Education",
                  "Finance",
                ]}
                onChange={(value) => console.log(value)}
                className="rounded-full h-14 px-4 text-lg"
              />

              <div className='flex items-center gap-4 overflow-x-hidden'>
              {
                ['Trophy 2.svg', 'ball.svg', 'stars.svg', 'Badge 1.svg', 'heart 1.svg', 'Play buttons 1.svg']
                  .map((item, i) => {
                    const isTrophy = item === 'Trophy 2.svg';

                    return (
                      <span
                        key={i}
                        className='bg-[#f5f2f2] rounded-xl w-16 h-16 grid place-items-center shadow-xs'
                      >
                        <Image
                          src={`/${item}`}
                          alt=''
                          width={100}
                          height={100}
                          className={`
                            object-contain
                            ${isTrophy ? 'w-12 h-12' : 'w-16 h-16'}
                          `}
                        />
                      </span>
                    );
                  })
              }
            </div>

            </>
          )
        }


        {
          formPart == 0 ? (
            <button
              onClick={() => setFormPart(1)}
              className="
                w-full
                h-16
                
                rounded-full
                bg-secondary-100
                text-white
                text-lg
                font-medium
                hover:opacity-90
                transition
              "
            >
              Next
            </button>
          ) : (
            <>
              <button
                onClick={() => setFormPart(0)}
                className="
                  w-full
                  h-14
                  rounded-full
                  border border-secondary-100
                  text-secondary-100
                  text-lg
                  font-medium
                  hover:bg-secondary-100 hover:text-white
                  transition
                "
              >
                Back
              </button>

              <button
                className="
                  w-full
                  h-16
                  rounded-full
                  bg-secondary-100
                  text-white
                  text-lg
                  font-medium
                  hover:opacity-90
                  transition
                "
              >
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