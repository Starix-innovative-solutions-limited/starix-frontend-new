"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const ImageCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const images = [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
        "https://images.unsplash.com/photo-1574267432624-f74f8ec60d40?w=800&q=80",
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80"
    ];

    const nextSlide = () => {
        setCurrentSlide((prev: number) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev: number) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-white rounded-3xl shadow-xl overflow-hidden aspect-[19/10] col-span-2"
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentSlide}
                    src={images[currentSlide]}
                    alt="Post content"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6 text-dark-navy" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
            >
                <ChevronRight className="w-6 h-6 text-dark-navy" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-white/70' : 'w-2 bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default ImageCarousel