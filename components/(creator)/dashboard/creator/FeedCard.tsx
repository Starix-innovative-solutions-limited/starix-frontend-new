import React from 'react'
import Image from 'next/image'
import FeedDetails from './FeedDetails'

import { useModal } from '@/hooks/useModal'
import LikeComment from '@/components/ui/LikeComment'

const FeedCard = () => {

  const { open } = useModal();

  const openDetails = () => {
    open(<FeedDetails />)
  }
  return (
    <div className='bg-white rounded-2xl p-4  md:p-6 shadow border border-gray-100 w-full space-y-10'>
      <Image src="/feed.png" alt="feed" width={1000} height={1000} className='w-full h-80 object-cover rounded-2xl cursor-pointer' onClick={openDetails} />
      <div className='flex items-center gap-2'>
        <Image src="/profile.png" alt="profile" width={100} height={100} className='w-10 h-10 rounded-full' />
        <div className='flex gap-3 items-center'>
          <h3 className='text-secondary-100 text-lg font-medium'>John Doe</h3>
          <p className='text-dark font-light text-xs'>@favvy</p>
        </div>

        <span className='text-dark font-light text-xs ml-auto'>
          20h
        </span>
      </div>

      <p className='text-secondary-100 text-xl font-light' onClick={openDetails}>
        I’ve been using this for about a week now, and honestly, I’m genuinely surprised at how well it works, so I had to share it with you guys.
        #product #life
      </p>

      <LikeComment />


    </div>
  )
}

export default FeedCard