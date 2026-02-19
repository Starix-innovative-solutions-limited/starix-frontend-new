import React from 'react'

const LeaveCircleModal = () => {
  return (
    <div  className='bg-gradient-to-br from-slate-50 to-slate-100 p-8 md:min-w-xl'>
        <div>
            <h2 className='text-xl text-center font-medium text-secondary-100 mb-6'>Leave circle</h2>
            <div className="space-y-3 mt-10 pt-4">
                <h3 className='font-light text-l text-secondary-100 '>Are you sure you want to leave “Circle Name”</h3>

                <button className=' mt-8 bg-secondary-100 rounded-full text-white w-full !py-4'>
                    Leave Circle
                </button>
            </div>
        </div>
    </div>
  )
}

export default LeaveCircleModal