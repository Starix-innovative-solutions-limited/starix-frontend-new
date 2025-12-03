import React from 'react'
import { FaRegComment } from 'react-icons/fa'
import { SlLike } from 'react-icons/sl'

const LikeComment = () => {
  return (
    <div className="flex items-center gap-4 text-dark">
                    <div className="flex items-center gap-1.5">
                        {/* <FaHeart className="text-red-400" /> */}
                        <SlLike className='text-secondary-100' />
                        <span className="text-sm font-light text-secondary-100">500</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaRegComment className="text-secondary-100" />
                        <span className="text-sm font-light text-secondary-100">10</span>
                    </div>
                </div>
  )
}

export default LikeComment