/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import CustomInput from '../../CustomInput'

const FeedBack = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean | null>(false)
  return (
    <div className="bg-white rounded-lg  w-full max-md:max-w-[80vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between md:max-w-2xl h-full">
      {/* Header */}
      <h2 className="text-xl text-center font-medium text-secondary-100 p-4">
        {hasSubmitted ? 'Get Feedback' : 'Starix Feedback'}
      </h2>

      <div className="px-8 pb-8 flex flex-col gap-2">

        {
          hasSubmitted ? (
            <div className='space-y-3 mt-10 text-center'>
              <h3 className='text-secondary-100 text-lg'>Feedback Request Sent 🎉</h3>
              <p className='text-dark font-light text-base '>Brands usually respond within 24–48 hours.</p>
            </div>
          ) : (
            <CustomInput label='What would you like to ask about?' placeholder='“What improvements would help on”' onChange={() => { }} className="rounded-lg" />
          )
        }


        {
          !hasSubmitted && (
            <button className='btn  bg-secondary-100 text-[#fafafa] mt-12 ' onClick={() => setHasSubmitted(true)}>
              Send.
            </button>
          )
        }
      </div>
    </div>
  )
}

export default FeedBack