"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CTASection = () => {
  const path = usePathname();

  if (path === "/contact") return null;

  return (
    <section className="w-full px-6 py-12 md:px-10 md:py-12 bg-white flex justify-center">
      
      {/* INNER CARD: Exact Figma Measurements (1340px x 604px, rounded-20px) */}
      <div className="relative w-full max-w-[1340px] h-auto md:h-[604px] bg-[#001361] rounded-[20px] pt-16 md:pt-20 overflow-hidden flex flex-col items-center shadow-2xl">
        
        {/* THE VECTOR: Watermark with exact Figma positioning */}
        <div 
        className="absolute pointer-events-none select-none overflow-hidden"
        style={{
            width: '1407px',
            height: '434px',
            top: '230px',
            left: '-64px',
        }}
        >
        <img 
            src="/foot.svg" 
            alt="starix watermark" 
            className="w-full h-full object-contain brightness-0 invert" // Ensures #ffffff if the SVG isn't already white
        />
        </div>

        {/* CONTENT WRAPPER */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full h-full">
          
          {/* HEADING: Explicitly following Merriweather 56px specs */}
          <h2 className="font-['Merriweather'] text-white font-light text-[56px] leading-[58px] tracking-[-0.01em] text-center mb-10">
            Redefine Your <br />
            {path === "/for-brands"
              ? "Brand Story contents."
              : path === "/for-creators"
              ? "Creativity."
              : "Creativity & Brand Story contents."}
          </h2>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full mb-10">
            {path !== "/for-brands" && (
              <Link
                href="/signup"
                className="inline-flex items-center justify-center w-52 h-16 rounded-[40px] border border-white text-white text-lg font-medium transition-all duration-300"
              >
                Join as a Creator
              </Link>
            )}

            {path !== "/for-creators" && (
              <Link
                href="/signup?role=brand"
                className="inline-flex items-center justify-center w-52 h-16 rounded-[40px] bg-[#FF6B00] text-white text-lg font-medium hover:brightness-110 transition-all duration-300 shadow-[0_10px_30px_rgba(255,107,0,0.3)]"
              >
                Join as a Brand
              </Link>
            )}
          </div>

          
          <div 
            className="absolute z-20 pointer-events-none transition-transform duration-700
              
              top-[120px] left-[180px] 
          
              w-[260px] md:w-[480px] lg:w-[600px]
            "
          >
            <Image 
              src="/troph.svg" 
              alt="3D Trophy" 
            
              width={2000} 
              height={1700} 
              className="w-full h-auto object-contain scale-200 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;