"use client"
import Image from 'next/image'
import { motion } from 'framer-motion';
import Link from "next/link";

const HowItWorks = () => {
    const brandFeatures = [
        {
            icon: "playButtons.svg",
            title: "Create a Challenge",
            description: "Set campaign goals, budget, and duration.",
            gradient: "from-orange-100 via-pink-50 to-green-100"
        },
        {
            icon: "diamond.svg",
            title: "Guide with Briefs",
            description: "Suggest hooks, captions, and tone that fit your brand voice.",
            gradient: "from-blue-100 via-indigo-50 to-purple-100"
        },
        {
            icon: "trophy.svg",
            title: "Track & Reward",
            description: "Starix measures likes and comments automatically.",
            gradient: "from-red-100 via-orange-50 to-blue-100"
        }
    ];


    const creatorFeatures = [
        {
            icon: "creatorFeature1.svg",
            title: "Discover Challenges",
            description: "Browse brand-sponsored tasks that match your niche.",
            gradient: "from-orange-100 via-pink-50 to-green-100"
        },
        {
            icon: "creatorFeature2.svg",
            title: "Create Content",
            description: "Submit your entries with your unique style.",
            gradient: "from-blue-100 via-indigo-50 to-purple-100"
        },
        {
            icon: "creatorFeature3.svg",
            title: "Earn Rewards",
            description: "Receive your payment for every sponsored content. ",
            gradient: "from-red-100 via-orange-50 to-blue-100"
        }
    ];
    return (
        <div className='general-space flex flex-col bg-white min-h-screen overflow-x-hidden'>

            <div className='flex max-md:flex-col max-md:gap-5 justify-between mt-10 max-md:px-4'>
                <div
  className="
    relative
    w-[293px]
    h-[58px]
    max-md:mx-auto
    max-md:h-auto
    font-['Geist']
    font-[600]
    text-[48px]
    max-md:text-[25px]
    leading-[57.6px]
    max-md:leading-[33.4px]
    tracking-[-0.02em]
    text-[#040136]
    flex
    items-center
    max-md:justify-center
  "
>
  <span>How It Works</span>

  {/* Arrow Group */}
<motion.div
  className="
    absolute
    w-[140px]
    h-[96px]
    top-[calc(50px-18%)]
    -left-[18%]
    max-md:static
    max-md:mt-4
    max-md:ml-0
    flex
    flex-col
    items-center
    justify-center
    pointer-events-none
  "
  animate={{
    rotate: [0, 20, 20, 0, 0],   // center → right → pause → center → pause
  }}
  transition={{
    duration: 4.0,              // 2s to right, 2s back
    repeat: Infinity,
    ease: "easeInOut",
    times: [0, 0.25, 0.5, 0.75, 1],
  }}
>

  {/* TOP ARROW */}
  <motion.div
    animate={{
      opacity: [
        1,    // center
        0.3,  // tilt right → take bottom opacity
        0.3,  // pause
        1,    // back to center
        1     // pause
      ],
    }}
    transition={{
      duration: 4.0,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    }}
    className="w-full object-contain"
  >
    <Image
      src="/Arrow 1.png"
      alt="arrow-top"
      width={140}
      height={96}
      className="w-full object-contain"
    />
  </motion.div>

  {/* Bottom Arrow */}
  <motion.div
    className="
      absolute
      w-[117px]
      h-[80px]
      top-[50px]
      left-[20px]
      pointer-events-none
    "
    animate={{
      opacity: [
        0.3,  // center
        1,    // tilt right → top takes this
        1,    // pause
        0.3,  // back to center → bottom takes top
        0.3
      ],
    }}
    transition={{
      duration: 4.0,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    }}
  >
    <Image
      src="/Arrow 1.png"
      alt="arrow-bottom"
      width={117}
      height={80}
      className="w-full h-full object-contain"
    />
  </motion.div>

</motion.div>
</div>
                <div
                    className="
                        w-[610px]
                        h-[180px]
                        max-md:w-full
                        max-md:h-auto
                        text-right
                        max-md:text-center
                        font-[300]
                        text-[28px]
                        max-md:text-[18px]
                        leading-[28px]
                        max-md:leading-[24px]
                        tracking-[0%]
                        text-[#6E6E6E99]
                        font-['Geist']
                    "
                    >
                    Starix transforms how brands and creators collaborate. Our challenge-based system drives authentic engagement and measurable results — helping creators grow faster and brands connect deeper with real audiences.
                </div>

            </div>

            <div className='flex flex-col gap-3'>
                <div className='mt-10 bg-white py-14 rounded-2xl shadow-[0px_2px_16px_0px_#0033FF1A] grid max-md:px-6 px-8'>
                    <div className=' md:grid md:grid-cols-[1.5fr__9.5fr] max-md:flex max-md:flex-col items-center gap-6'>
                        <div className='bg-[#FAFAFA]  py-1 text-dark-navy font-light text-base inline-block whitespace-nowrap'>
                            FOR BRANDS.
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-4 w-full">
                            {brandFeatures.map((feature, index) => (
                                <div key={index} className="relative group">

  {/* GLOW BORDER */}
  <div
    className={`
      absolute
      inset-[-6px]
      rounded-[32px]
      opacity-0
      transition-opacity
      duration-300
      pointer-events-none
      group-hover:opacity-100
      bg-gradient-to-br ${feature.gradient}
      blur-[10px]
    `}
  />

  {/* GRADIENT BORDER */}
  <div
    className={`
      relative
      bg-gradient-to-br ${feature.gradient}
      rounded-3xl
      p-[3px]
    `}
  >
    {/* INNER CARD */}
    <div
  className="
    bg-white

    md:w-[330px]
    w-full
    max-w-[420px]
    h-[249px]
    md:h-[249px]
    rounded-[20px]
    border-[6px]
    max-md:border-[3px]
    border-transparent
    relative
    z-10
    p-8
    max-md:p-6
    mx-auto
  "
>


      <div>
        <Image
          src={`/${feature.icon}`}
          width={64}
          height={64}
          alt={feature.title}
          className="w-16 h-auto"
        />
      </div>

      <h3
  className="
    font-['Geist']
    font-[400]
    text-[28px]
    max-md:text-[22px]
    leading-relaxed
    max-md:leading-[28px]
    tracking-[-0.02em]
    text-[#040136]
    w-[335px]
    h-[36px]
    mb-3
  "
>
  {feature.title}
</h3>

      <p
  className="
    font-['Geist']
    font-[300]
    text-[18px]
    max-md:text-[14px]
    leading-relaxed
    max-md:leading-[22px]
    tracking-[0]
    text-[#6E6E6E99]
    w-[220px]
    h-[52px]
  "
>
  {feature.description}
</p>

    </div>
  </div>

</div>

                            ))}
                        </div>
                    </div>
                    <Link
                    href="/for-brands"
                    className="
                        group
                        mx-auto mt-14
                        text-lg
                        bg-dark-navy text-white
                        rounded-full px-5 py-3
                        flex-center gap-2
                        border border-dark-navy
                        transition-all duration-300
                        hover:bg-white hover:text-dark-navy
                    "
                    >
                    <span>Learn more</span>
                    <Image
                        src="/rightArrow.svg"
                        alt="right-arrow"
                        width={100}
                        height={100}
                        className="
                        w-5
                        transition-all duration-300
                        group-hover:invert
                        "
                    />
                    </Link>


                </div>


                <div className="
  bg-white
  py-14
  max-md:pt-6
  max-md:pb-10
  rounded-2xl
  shadow-[0px_2px_16px_0px_#0033FF1A]
  grid
  max-md:px-6
  md:px-8
">


  <div className="md:grid md:grid-cols-[1.5fr_9.5fr] max-md:flex max-md:flex-col items-center gap-6 max-md:gap-10">

    {/* Label */}
    <div className="bg-[#FAFAFA] text-dark-navy font-light text-base inline-block whitespace-nowrap md:translate-x-[20%]">
      FOR CREATORS.
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px] max-md:gap-4 w-full">
      {creatorFeatures.map((feature, index) => (
        <div
          key={index}
          className="p-[6px]"
        >
          <div className="bg-white h-full w-full flex flex-col overflow-hidden">

            {/* Image */}
            <div className="w-full h-[220px] md:h-[220px] flex items-center justify-center bg-transparent">
            <Image
                src={`/${feature.icon}`}
                width={600}
                height={600}
                alt={feature.title}
                className="w-full h-full object-cover md:object-contain"
            />
            </div>


            {/* Text */}
            <div className="pt-6 pb-8">
              <h3
  className="
    font-['Geist']
    font-[400]
    text-[28px]
    max-md:text-[22px]
    leading-[28px]        /* 100% line-height */
    tracking-[-0.02em]   /* -2% letter-spacing */
    text-[#040136]
    w-[335px]
    h-[36px]
    mb-3
  "
>
  {feature.title}
</h3>


              <p
  className="
    font-['Geist']
    font-[300]
    text-[18px]
    max-md:text-[14px]
    leading-[20px]      /* 100% line-height */
    tracking-[0]
    text-[#6E6E6E99]
    w-[300px]
    max-md:w-full
    h-[52px]
    
  "
>
  {feature.description}
</p>

            </div>

          </div>
        </div>
      ))}
    </div>

  </div>

  {/* CTA */}
  <div className="w-full flex justify-center mt-[48px]">
  <Link
                    href="/for-creators"
                    className="
                        group
                        
                        text-lg
                        bg-dark-navy text-white
                        rounded-full px-5 py-3
                        flex-center gap-2
                        border border-dark-navy
                        transition-all duration-300
                        hover:bg-white hover:text-dark-navy
                    "
                    >
                    <span>Learn more</span>
                    <Image
                        src="/rightArrow.svg"
                        alt="right-arrow"
                        width={100}
                        height={100}
                        className="
                        w-5
                        transition-all duration-300
                        group-hover:invert
                        "
                    />
                    </Link>
</div>

</div>

            </div>


            {/* ================= ACHIEVEMENT SECTION ================= */}
<div className="w-full my-32">
  <div
    className="
      relative
      max-w-[1400px]
      mx-auto
      px-6
      md:px-0
      grid
      grid-cols-1
      md:grid-cols-2
      items-center
      max-md:gap-10
    "
  >
    {/* LEFT — IMAGE */}
    <div className="relative flex justify-start">
      <Image
        src="/achievement2.png"
        alt="achievement"
        width={603}
        height={398}
        className="
          w-[603px]
          h-[398px]
          object-contain
          max-md:w-full
          max-md:h-auto
        "
        priority
      />
    </div>

    {/* RIGHT — TEXT */}
    <div
      className="
        flex
        flex-col
        gap-[28px]
        md:pl-[60px]
        max-md:items-center
        max-md:text-center
      "
    >
      {/* Title */}
      <h2
        className="
          font-['Geist']
          font-[600]
          text-[46px]

          max-md:text-[20px]
          leading-[56px]
          max-md:leading-[24px]
          tracking-[-0.02em]
          text-[#040136]
          max-w-[650px]
        "
      >
        What You Achieve on Starix
      </h2>

      {/* Description */}
      <p
        className="
          font-['Geist']
          font-[300]
          text-[24px]
        
          max-md:text-[16px]
          leading-[36px]
          max-md:leading-[22px]
          tracking-[0]
          text-[#6E6E6E99]
          max-w-[650px]
        "
      >
        From brands running high-impact challenges to creators winning rewards and
        building portfolios — Starix drives real engagement, content, and
        community growth.
      </p>

      {/* CTA */}
      <Link
  href="/for-brands"
  className="
    
    w-[193px]
    max-md:w-auto
    h-[68px]
    max-md:h-auto
    flex
    items-center
    justify-center
    gap-[10px]
    rounded-[40px]
    px-[18px]
    py-[6px]
    bg-[#040136]
    text-white
    font-['Geist']
    font-[400]
    text-[18px]
    max-md:text-[14px]
    border
    border-[#040136]
    transition-all
    duration-300
    hover:bg-white
    hover:text-[#040136]
    group
  "
>
  <span>Get Started</span>

  <Image
    src="/rightArrow.svg"
    alt="right-arrow"
    width={20}
    height={20}
    className="
      w-[20px]
      h-[20px]
      transition-all
      duration-300
      group-hover:invert
      group-hover:translate-x-[2px]
    "
  />
</Link>

    </div>
  </div>
</div>


            {/* SECTION WRAPPER */}
<div
  className="
    w-full
    md:w-full
    max-md:w-full
    md:h-[564px]
    mx-auto
    grid
    grid-cols-1
    md:grid-cols-[500px_804px]
    gap-0
  "
>

  {/* LEFT — LOGO COLUMN */}
<div
  className="
    flex
    items-center
    justify-start
    max-md:justify-center
    md:pl-[50px]
    max-md:pl-0
    pt-10
    mx-auto

    max-md:pt-4
    max-md:pb-2
  "
>

  <motion.div
  className="
    flex
    items-center
    gap-[6px]
    max-md:gap-[4px]
    h-[143px]
    -translate-x-[15%]
    max-md:translate-x-0
    max-md:scale-[0.5]
    max-md:mt-auto
    max-md:mr-4
  "

    animate={{
      opacity: [0, 1, 1, 0],   // fade in → hold → fade out
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.75, 1],
    }}
  >
    {/* s */}
    <Image src="/s.png" alt="s" width={77} height={92} className="h-[92px] w-[77px] object-contain" />
    {/* t */}
    <Image src="/t.png" alt="t" width={80} height={70} className="h-[100px] w-[55px] mb-[10px] object-contain" />
    {/* a */}
    <Image src="/a.png" alt="a" width={80} height={92} className="h-[92px] w-[80px] object-contain" />
    {/* r */}
    <Image src="/r.png" alt="r" width={56} height={90} className="h-[90px] w-[56px] object-contain" />
    {/* i */}
    <Image src="/i.png" alt="i" width={22.6} height={112} className="h-[112px] w-[22.6px] mb-[22px] object-contain" />
    {/* x */}
    <Image src="/x.png" alt="x" width={83} height={88} className="h-[88px] w-[83px] object-contain" />
  </motion.div>

  {/* STAR VECTOR */}
<motion.div
  className="
    h-[108px]
    w-[108px]
    object-contain
    mb-25


    mr-[12px]
    relative

    max-md:h-[64px]
    max-md:w-[64px]
    max-md:mr-2
    max-md:mt-5
    max-md:mb-auto
    max-md:translate-x-0
    
  "

  animate={{
    opacity: [1, 1, 1, 1],   // container stays stable
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
    times: [0, 0.25, 0.75, 1],
  }}
>

  {/* ORIGINAL STAR */}
  <motion.img
    src="/Vector.png"
    className="absolute inset-0 w-full h-full object-contain"
    animate={{
      opacity: [1, 1, 0, 0, 1],   // fully visible → fade out → stay hidden → fade in
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.45, 0.75, 1],
    }}
  />

  {/* SVG STAR (PURPLE / DARK BRAND COLOR) */}
  <motion.img
    src="/Blue 1.svg"
    className="
      absolute
      inset-0
      w-full
      h-full
      object-contain
      text-[#040136]
    "
    style={{ color: "#040136" }}   // forces SVG fill if it uses currentColor
    animate={{
      opacity: [0, 0, 1, 1, 0],    // hidden → fade in → visible → fade out
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.45, 0.75, 1],
    }}
  />

</motion.div>


</div>



  {/* RIGHT — BACKGROUND PANEL */}
<div
  className="
    relative

    /* Desktop */
    md:w-[804px]
    md:h-[564px]
    md:ml-18

    /* Mobile full-bleed */
    max-md:w-screen
    max-md:relative
    max-md:left-1/2
    max-md:right-1/2
    max-md:-ml-[50vw]
    max-md:-mr-[50vw]

    overflow-hidden
    max-md:mt-4
  "
>


  {/* BACKGROUND IMAGE */}
  <div
    className="
      absolute
      inset-0
      bg-[url('/blurredBg.png')]
      bg-no-repeat
      bg-right
      bg-cover
      
    "
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-[#040136]/30" />

  {/* TEXT FRAME */}
  <div
    className="
      relative
      z-10
      w-full
      h-full
      flex
      items-center
    "
  >
    <div
  className="
    w-full
    md:w-[699px]
    max-md:w-full

    md:h-[370px]
    max-md:h-auto

    md:ml-[53px]
    max-md:ml-0

    rounded-[20px]
    grid
    place-items-center
  "
>

      <div
  className="
    w-full
    h-full
    flex
    flex-col
    justify-center
    items-center
    gap-[36px]

    px-[18px]
    py-[40px]

    max-md:px-4
    max-md:py-8

    text-center
  "
>

        {/* HEADING */}
        <h3
          className="
            font-['Geist']
            font-[400]
            text-white
            text-[28px]
            max-md:text-[20px]
            leading-[36px]
            max-w-[600px]
          "
        >
          Starix is a challenge-based marketing platform
          connecting brands with content creators.
        </h3>

        {/* PARAGRAPH */}
        <p
          className="
            font-['Geist']
            font-[300]
            text-[20px]
            max-md:text-[16px]
            leading-[30px]
            text-white/80
            max-w-[640px]
          "
        >
          Brands launch sponsored challenges with clear rewards, while creators
          participate by producing and sharing content across their social media
          channels.
        </p>

        {/* BUTTON */}
        <Link
          href="/for-brands"
          className="
            w-[168px]
            max-md:w-auto
            max-md:max-w-[300px]
            h-[68px]
            max-md:h-auto
            flex
            items-center
            justify-center
            gap-[10px]
            rounded-[40px]
            px-[18px]
            py-[6px]
        
            text-[#fff]
            font-['Geist']
            font-[400]
            text-[18px]
            border
            border-white
            transition-all
            duration-300
        
            hover:text-white
            group
          "
        >
          <span>Contact Us</span>

          <Image
            src="/rightArrow.svg"
            alt="arrow"
            width={20}
            height={20}
            className="
              w-[24px]
              max-md:w-[16px]
              h-[24px]
              
            
              transition-all
              duration-300
              
            "
          />
        </Link>
      </div>
    </div>
  </div>
</div>
</div>

        </div>
    )
}

export default HowItWorks