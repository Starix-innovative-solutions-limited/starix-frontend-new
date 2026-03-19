"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CTASection = () => {
  const path = usePathname();
  const isForBrands = path === "/for-brands";
  const isForCreators = path === "/for-creators";

  if (path === "/contact") return null;

  return (
    <section className="w-full px-6 md:px-10 md:py-10 bg-white flex justify-center">
      
      {/* INNER CARD */}
      <div 
        className={`relative w-full max-w-[1340px] rounded-[20px] overflow-hidden flex flex-col shadow-2xl transition-all duration-500
          ${isForCreators 
            ? "h-auto md:h-[400px] bg-[#001BB7] pt-12 md:pt-0 items-start justify-center" // Creator Path Blue
            : isForBrands 
            ? "h-auto md:h-[400px] bg-[#020525] pt-12 md:pt-0 items-start justify-center" 
            : "h-auto md:h-[604px] bg-[#001361] pt-16 md:pt-20 items-center" // Hero Path Blue
          }
        `}
      >
        
        {/* WATERMARK - Only for Home Page */}
        {!isForBrands && !isForCreators && (
          <div 
            className="absolute pointer-events-none select-none overflow-hidden"
            style={{ width: '1407px', height: '434px', top: '230px', left: '-64px' }}
          >
            <img 
                src="/foot.svg" 
                alt="starix watermark" 
                className="w-full h-full object-contain brightness-0 invert" 
            />
          </div>
        )}

        {/* CONTENT WRAPPER */}
        <div className={`relative z-10 flex flex-col px-10 md:px-20 max-w-7xl w-full 
          ${(isForBrands || isForCreators) ? "text-left items-start" : "items-center text-center mx-auto"}`}
        >
          
          <h2 className={`font-['Merriweather'] text-white font-light tracking-[-0.02em] mb-10
            ${(isForBrands || isForCreators) ? "text-[48px] md:text-[56px] leading-[58px]" : "text-[56px]"}
          `}>
            {isForCreators || isForBrands ? (
              <>Your next opportunity <br /> is here.</> // Figma Text
            ) : (
              <>Redefine Your <br /> Creativity & Brand Story contents.</> // Hero Text
            )}
          </h2>

          {/* BUTTON GROUP */}
          <div className={`flex flex-col sm:flex-row gap-5 items-center w-full mb-10 
            ${(isForBrands || isForCreators) ? "justify-start" : "justify-center"}`}
          >
            {/* 1. Join as a Creator - Always shows on Hero, hidden on Brands page */}
            {!isForBrands && (
              <Link 
                href="/signup" 
                className={`inline-flex items-center justify-center w-52 h-16 rounded-[40px] text-white text-lg font-medium transition-all duration-300
                  ${isForCreators 
                    ? "bg-[#FF6B00] hover:brightness-110 shadow-[0_10px_30px_rgba(255,107,0,0.3)]" // Orange on Creator Page
                    : "border border-white hover:bg-white/10" // Outline on Hero Page
                  }
                `}
              >
                Join as a Creator
              </Link>
            )}

            {/* 2. Join as a Brand - Shows side-by-side on Hero, and on Brands page */}
            {!isForCreators && (
              <Link
                href="/signup?role=brand"
                className={`inline-flex items-center justify-center w-52 h-16 rounded-[40px] text-white text-lg font-medium transition-all duration-300
                  ${isForBrands ? "bg-[#0033FF] hover:bg-[#0041cc]" : "bg-[#FF6B00] hover:brightness-110 shadow-[0_10px_30px_rgba(255,107,0,0.3)]"}
                `}
              >
                Join as a Brand
              </Link>
            )}
          </div>

          {/* ============================================================
              ASSET LAYERS
              ============================================================ */}

          {/* CREATOR PAGE ASSET (Blue Glass Star) */}
          {isForCreators && (
            <div className="absolute z-20 pointer-events-none top-1/2 -translate-y-1/2 right-[20px] md:right-[60px] w-[200px] md:w-[303px]">
              <Image 
                src="/candy 1.svg" 
                alt="3D Blue Star" 
                width={2000} height={1700} 
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          )}

          {/* BRANDS PAGE ASSET (Candy) */}
          {isForBrands && (
            <div className="absolute z-20 pointer-events-none top-1/2 -translate-y-1/2 right-[20px] md:right-[60px] w-[200px] md:w-[303px]">
              <Image 
                src="/candy 1.svg" 
                alt="3D Candy" 
                width={2000} height={1700} 
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
          )}

          {/* HOME PAGE ASSET (Trophy) */}
          {!isForBrands && !isForCreators && (
            <div className="absolute z-20 pointer-events-none top-[110%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] lg:w-[850px]">
              <Image 
                src="/troph.svg" 
                alt="3D Trophy" 
                width={2000} height={1700} 
                className="w-full h-auto object-contain scale-125"
                priority
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default CTASection;