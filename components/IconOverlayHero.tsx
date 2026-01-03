import React from 'react';

const IconOverlayHero = () => {
    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden md:h-[80vh] pt-[58px]">

            {/* Layer 1: The Grid Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/hero-bg.png')`, // Replace with your grid image path
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Layer 2: The Icons Image (Ribbon, Star, etc.) */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    backgroundImage: `url('/hero-grid-img.svg')`, // Replace with your icons image path
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />



        </div>
    );
};

export default IconOverlayHero;