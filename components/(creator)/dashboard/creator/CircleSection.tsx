/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FaCircle, FaDotCircle, FaUser, FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';


export const CircleCard = ({ circle, index }: any) => {

  const getImage = (index: any) => {
    const images = [
      '/stars.svg',
      '/ball.svg',
      '/trophys.svg',
    ];
    return images[index % images.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl px-6 py-3 shadow-xs hover:shadow-md transition-shadow"
    >
      <div className='bg-[#F5F5F5] text-dark text-xs  px-3 border border-gray-100 w-fit ml-auto'>
        Fashion
      </div>
      <div className="flex items-center gap-5">
        <Image
          src={getImage(index)}
          alt={circle.name}
          width={120}
          height={100}
          className="rounded-full object-cover w-[120px] h-[100] -ml-5"
        />
        <div className="flex-1">
          <h3 className="text-base text-secondary-100">{circle.name}</h3>
          <p className="text-sm text-dark mt-1">{circle.description}</p>
        </div>

      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCircle className="text-[#040136] text-xs" />
          <span className='text-xs text-secondary-100/70 font-light'>{circle.members} members</span>
        </div>

        <button className="px-3 py-1 text-xs  border-[0.4px] font-light border-secondary-100 text-secondary-100  rounded-full hover:bg-gray-50 transition-colors">
          {circle.joined ? 'Enter Circle' : 'Join'}
        </button>
      </div>
    </motion.div>
  );
};


const CircleSection = ({ title, circles, showSeeAll = true }: any) => {
  return (
    <Link href="/creator-circles/dashboard" className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl  text-secondary-100 tracking-[-0.02em]">{title}</h2>
        {showSeeAll && (
          <button className="text-base font-light text-secondary-100 hover:text-gray-700">
            See All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {circles.map((circle: any, index: any) => (
          <CircleCard key={circle.id} circle={circle} index={index} />
        ))}
      </div>
    </Link>
  );
};


export default CircleSection;