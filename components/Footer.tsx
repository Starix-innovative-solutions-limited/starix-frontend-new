import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <section className="flex flex-col  py-6 text-[#444444] general-space">
      {/* <div className="h-[50vh]"></div> */}
      <div className="flex flex-col gap-3 max-md:gap-10">
        <p className="flex-center text-xl text-[#444444] font-medium">
          Trusted by 100+ creators | Loved by 550K+ audiences | Backed by 50+
          brands
        </p>
        <div className="flex gap-3 overflow-hidden">
          <div className="flex-center mx-auto gap-3 ">
            {[7, 8, 9, 10, 11, 12].map((item) => (
              <Image
                key={item}
                src={`/images/Rectangle ${item}.png`}
                alt={`Rectangle ${item}.png`}
                className="h-8 md:h-10 flex-shrink-0"
                width={90}
                height={50}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-between mt-10  pt-6">
        <div className="flex items-center gap-3">
          <span>Follow us on </span>
          {["linkedIn", "x", "instagram"].map((icon: string) => (
            <Image
              key={icon}
              src={`/images/${icon}.png`}
              height={25}
              width={25}
              alt={icon}
            />
          ))}
        </div>
        <p>© 2025 Starix.</p>
      </div>
    </section>
  );
};

export default Footer;
