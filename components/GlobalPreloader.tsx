"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Massive registry of all project assets to push directly into the browser disk cache
const CRITICAL_IMAGES = [
  // --- CORE LAYOUT & NAVIGATION ---
  "/home.svg",
  "/challenges.svg",
  "/circles.svg",
  "/walletss.svg",
  "/pie.svg",
  "/user.svg",
  "/logout.svg",
  "/logout.png",
  "/dash-logo.svg",
  "/dashlogo.svg",
  "/bigLogo.png",
  "/lightLogo.png",
  "/logo.png",
  "/logo.svg",
  "/logoss.svg",
  "/logo light.svg",
  "/logo white.svg",
  "/logo-white.svg",
  "/icon-logs.svg",
  "/Header.png",
  "/header1.png",
  "/footer.png",
  "/footer.svg",
  "/dash-group.svg",

  // --- BRAND LOGOS & SOCIAL INTEGRATIONS ---
  "/Google.svg",
  "/Spotify.svg",
  "/Tesla.svg",
  "/starbucks.svg",
  "/Walmart.svg",
  "/Cocacola.svg",
  "/Mercedes.svg",
  "/Nasa.svg",
  "/facebook logo.svg",
  "/ig.svg",
  "/igs logo.svg",
  "/linkd logo.svg",
  "/linkedin logo.svg",
  "/tiktok.svg",
  "/tt.svg",
  "/twix logo.svg",
  "/X logo.svg",
  "/x.png",
  "/x.svg",
  "/yt.svg",
  "/fcmb.svg",
  "/gtb.svg",
  "/moniepoint.svg",
  "/zenith.svg",
  "/indomie.svg",
  "/indomie-circle.svg",
  "/nvidia.svg",
  "/nvidia-circle.svg",
  "/tesla-circle.svg",
  "/ps.svg",
  "/ps-circle.svg",
  "/mcdonald.svg",
  "/nivea.svg",
  "/n-logo.svg",
  "/figma.svg",
  "/next.svg",
  "/vercel.svg",

  // --- CHALLENGES, ACHIEVEMENTS, & CAMPAIGNS ---
  "/challengeIcon.png",
  "/challengesIcon.svg",
  "/challengeStep1.png",
  "/challengeStep1.svg",
  "/challengeStep2.png",
  "/challengeStep2.svg",
  "/challengeStep3.png",
  "/challengeStep3.svg",
  "/challengeStep4.png",
  "/challengeStep4.svg",
  "/achievement.png",
  "/achievement2.png",
  "/achievement33.png",
  "/badge.png",
  "/badge.svg",
  "/badge4x.png",
  "/Badge 1.png",
  "/Badge 1.svg",
  "/medal.svg",
  "/troph.svg",
  "/trophy.png",
  "/trophy.svg",
  "/trophys.svg",
  "/trophyy.svg",
  "/Trophy 2.svg",
  "/Trophy22.svg",
  "/purple-trophy.svg",
  "/or-trophy.svg",
  "/trophy-flo.svg",
  "/blue gem.png",
  "/blue gem.svg",
  "/gem.svg",
  "/or-gem.svg",

  // --- HEROES, FEATURES, & SOLUTIONS ---
  "/brand-hero.png",
  "/brand-hero.svg",
  "/brand-hero1.png",
  "/brand-problems.png",
  "/brand2.png",
  "/brands.svg",
  "/creator-hero.png",
  "/creator-hero1.png",
  "/creator.png",
  "/creator1.png",
  "/creatorCard1.png",
  "/creatorCard2.png",
  "/creatorCard3.png",
  "/creatorFeature1.png",
  "/creatorFeature1.svg",
  "/creatorFeature2.png",
  "/creatorFeature2.svg",
  "/creatorFeature3.png",
  "/creatorFeature3.svg",
  "/creatorIcon.png",
  "/creatorIcon.svg",
  "/creatorProblem1.png",
  "/creatorProblem1.svg",
  "/creatorProblem2.png",
  "/creatorProblem2.svg",
  "/creatorProblem3.png",
  "/creatorProblem3.svg",
  "/creatorProblem4.png",
  "/creatorProblem4.svg",
  "/starixSolution1.png",
  "/starixSolution2.png",
  "/starixSolution33.png",
  "/starixSolution4.png",
  "/starixSolution44.png",
  "/starixSolution5.png",
  "/starixSolution6.png",
  "/starixSolutions1.png",
  "/starixSolutions2.png",
  "/starixSolutions3.png",
  "/starixSolutions4.png",
  "/why-star.png",
  "/why-starix.png",
  "/why-starix2 blur.png",
  "/whystarix.png",
  "/whystarix2.png",
  "/whystarix3.png",
  "/keyFeaturesFram3.png",
  "/keyFeaturesFram4.png",
  "/keyFeaturesFram5.png",
  "/keyFeaturesFram6.png",
  "/features1.png",
  "/features2.png",
  "/features3.png",

  // --- DASHBOARD UI PANELS & SECTIONS ---
  "/dash-section1.png",
  "/dash-section1.svg",
  "/dash-section11.svg",
  "/dash-section12.svg",
  "/dash-section123.png",
  "/dash-section2.png",
  "/dash-section2.svg",
  "/dash.svg",
  "/dashboard 2.svg",
  "/dashboard.svg",
  "/dashs.png",
  "/dashs.svg",
  "/imageDash 1.png",
  "/imageDash1.png",
  "/imageDash11.png",
  "/imageDash12.png",
  "/analyticsIcon.png",
  "/analyticsIcon.svg",
  "/analytics.svg",
  "/portfolioIcon.png",
  "/portfolioIcon.svg",
  "/profileIcon.png",
  "/profileIcon.svg",
  "/profile.png",
  "/feed.png",

  // --- BUTTONS, ICONS, & GRAPHIC ELEMENTS ---
  "/1.svg", "/2.svg", "/3.svg", "/4.svg", "/5.svg",
  "/Arrow 1.png", "/Arrow 2.png", "/arrow.png", "/rightArrow.svg",
  "/left1.svg", "/left2.svg", "/right1.svg", "/right21.svg", "/right22.svg",
  "/up.svg", "/down.svg", "/slidedown.svg",
  "/Blue 1.png", "/Blue 1.svg", "/blue.svg", "/green.svg", "/orange.svg", "/purple.png", "/purple.svg", "/purple1.png",
  "/Play buttons 1.svg", "/playButtons.png", "/playButtons.svg", "/bluplay 2.svg", "/bluplay.svg",
  "/candy 1.svg", "/candy 2 (3).svg", "/candy 3.svg", "/candy-or.svg", "/candyyy.svg", "/or-sweet.svg",
  "/star.png", "/star.svg", "/star2.png", "/star 2.svg", "/star4x.png", "/stars.svg", "/bigstar.svg", "/blustar.svg", "/bstars.svg", "/contact star.svg",
  "/Ellipse 2.svg", "/Ellipse 3.svg", "/Ellipse 4.svg", "/circle.svg", "/cc-circle.svg", "/chase-circle.svg", "/fw-circle.svg", "/purple-circle.svg",
  "/Frame 19.png", "/Frame 53.svg", "/frame.png", "/frame1.png", "/frame2.png", "/frame22.png",
  "/Parent (1).svg", "/Parent (2).svg", "/Parent (3).svg", "/Parent (4).svg", "/Parent.svg",
  "/incident-ball-1.png", "/incident-ball-2.png", "/ball 2.svg", "/ball.png", "/ball.svg",
  "/auth-icon-placard-brand.png", "/auth-icon-placard.png",
  "/avatar 1.svg", "/avatar.svg",
  "/ribbon1.png", "/ribbon2.png", "/ribbons.svg", "/bigribbon.svg",
  "/rings4x.png", "/Stacked-rings.svg", "/stacked.svg",
  "/diamond.png", "/diamond.svg", "/diamonddd.svg", "/diamondssss.svg",
  "/explore1.svg", "/explore2.svg", "/explore3.svg", "/explore4.svg", "/explore5.svg", "/explore6.svg",
  "/grp.svg", "/grp1.svg", "/grp2.svg", "/grp3.svg", "/groupss.svg",
  "/sw1.svg", "/sw2.svg",
  "/a.png", "/i.png", "/r.png", "/s.png", "/t.png",

  // --- MISCELLANEOUS GENERAL SYSTEM ASSETS ---
  "/Earth.svg", "/Fit Life.svg", "/Mask.svg", "/Red Line.svg", "/SolarBold.png", "/Stroke.svg", "/Vector.png", "/Vectorss.svg", "/Vectorsss.svg", "/vectros.svg",
  "/access.svg", "/ago.svg", "/bar-chart.svg", "/bars.svg", "/binocular.svg", "/blogger.svg", "/book.svg", "/box.svg", "/briefs.svg", "/bubble.svg",
  "/buttons 2.svg", "/buttons 3.svg", "/card22.png", "/chain.svg", "/clipboard.svg", "/close.svg", "/closeup.svg", "/coin.svg", "/cracked.svg",
  "/crown.svg", "/charts.svg", "/dish.svg", "/doc.svg", "/dp.svg", "/editIcon.png", "/file-upload.png", "/file.svg", "/flag.svg", "/flash.svg",
  "/foot 2.svg", "/foot.svg", "/gateway.svg", "/globe.svg", "/gr8.svg", "/gridLayer.png", "/hand.svg", "/handsss.svg", "/headphone.svg",
  "/heart 1.svg", "/heart.png", "/heart1.png", "/heart12.png", "/hero-bg.png", "/hero-grid-img.svg", "/hero-mobile.png", "/hero1.png", "/hero2.png", "/hero3.png",
  "/heroes.svg", "/homeIcon.svg", "/horoscope.svg", "/howBrands.png", "/howBrandsWork.png", "/idaya.svg", "/joystick.svg", "/layers.png",
  "/lock-money.svg", "/mailbox.svg", "/masked.svg", "/mbag.svg", "/media.svg", "/megaphone.svg", "/or-clock.svg", "/or-tag.svg", "/packer.svg",
  "/pdf.svg", "/people.svg", "/poor.png", "/poor12.png", "/post.png", "/products.svg", "/puzzle.svg", "/recty.png", "/rule.png", "/share.png",
  "/sits.svg", "/skincare.svg", "/thumb.svg", "/timer.svg", "/torch.svg", "/uneasy.png", "/uneasy1.png", "/wallet.svg", "/wax-seal.svg",
  "/white bubble.svg", "/window.svg", "/withdraw.svg", "/blue-seats.svg", "/blurredBg.png",

  // --- SUBFOLDER IMAGES (images/*) ---
  "/images/Rectangle 10.png",
  "/images/Rectangle 11.png",
  "/images/Rectangle 12.png",
  "/images/Rectangle 7.png",
  "/images/Rectangle 8.png",
  "/images/Rectangle 9.png",
  "/images/auth/BottomRight.png",
  "/images/auth/TopLeft.png",
  "/images/auth/apple.png",
  "/images/auth/center.png",
  "/images/auth/frame.png",
  "/images/auth/google.png",
  "/images/avatar.png",
  "/images/decentalization.png",
  "/images/diff-img.png",
  "/images/faq1.png",
  "/images/faq2.png",
  "/images/faq3.png",
  "/images/goal-img.png",
  "/images/hero-image.png",
  "/images/hero-img.png",
  "/images/how-img.png",
  "/images/instagram.png",
  "/images/likes-step.png",
  "/images/linkedIn.png",
  "/images/logo.png",
  "/images/logout.png",
  "/images/master.png",
  "/images/post-step.png",
  "/images/prob-img.png",
  "/images/smart-contract.png",
  "/images/support.png",
  "/images/token-step.png",
  "/images/token.png",
  "/images/visa.png",
  "/images/wallet-step.png",
  "/images/x.png",
  "/images/you-step.png"
];

export default function GlobalPreloader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let loadedCount = 0;
    const totalImages = CRITICAL_IMAGES.length;

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = src;
        
        const handleLoad = () => {
          loadedCount++;
          // Calculate precise loading ratio percentage
          setProgress(Math.floor((loadedCount / totalImages) * 100));
          resolve();
        };

        img.onload = handleLoad;
        img.onerror = handleLoad; // Fallback so broken image paths don't freeze app boot
      });
    };

    // Parallel background caching tracking
    Promise.all(CRITICAL_IMAGES.map((src) => preloadImage(src)))
      .then(() => {
        // Smooth transition finish
        setTimeout(() => {
          setIsReady(true);
        }, 600);
      });
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none overflow-hidden">
        
        {/* SOLAR ORBIT SYSTEMS & CENTER LOGO WRAPPER - Increased container size */}
        <div className="relative w-80 h-80 flex items-center justify-center mb-8">
          
          {/* Main 3D Glossy Orbit Panel (The refractable glass surface) */}
          <div className="absolute inset-2 bg-white/40 backdrop-blur-2xl rounded-full shadow-[0_16px_48px_-12px_rgba(0,51,255,0.12),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-4px_16px_rgba(0,51,255,0.06)] border border-white/50 z-0 overflow-hidden">
            {/* Soft backdrop glow layer within the glass */}
            <div className="absolute inset-10 bg-[#EAF1FF] rounded-full animate-pulse -z-10" />
            
            {/* Complex Glossy Overlay (Specularity) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[linear-gradient(135deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0)_100%)] rotate-12 -z-5" />
          </div>

          {/* Orbit Line 1 (Fastest Track - Sharp Blue Glow) */}
          <div className="absolute w-[260px] h-[260px] border border-[#0033FF]/40 rounded-full animate-[spin_8s_linear_infinite] shadow-[0_0_12px_rgba(0,51,255,0.15)] z-10">
            {/* Sun/Star Element - Bolder, sharper shadow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full shadow-[0_0_16px_#f59e0b,inset_0_1px_2px_rgba(255,255,255,0.8)] border border-orange-600/30" />
          </div>

          {/* Orbit Line 2 (Mid Track - Counter Rotating - Darker Contrast) */}
          <div className="absolute w-[190px] h-[190px] border border-[#62636C]/30 rounded-full animate-[spin_12s_linear_infinite_reverse] shadow-[0_0_10px_rgba(98,99,108,0.1)] z-10">
            {/* Blue Planet/Gem Accent - Bolder, sharper shadow */}
            <div className="absolute bottom-4 left-4 w-5 h-5 bg-[#0047FF] rounded-full shadow-[0_0_14px_rgba(0,71,255,0.7),inset_0_1px_2px_rgba(255,255,255,0.6)] border border-blue-700/30" />
            {/* Tiny Asteroid Point - Sharper border */}
            <div className="absolute top-2 right-6 w-2 h-2 bg-white border border-gray-400 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />
          </div>

          {/* Orbit Line 3 (Inner Track - Softest Glow) */}
          <div className="absolute w-[130px] h-[130px] border border-[#0033FF]/15 rounded-full animate-[spin_18s_linear_infinite] z-10">
            {/* Purple Moon Variant - Bolder, sharper shadow */}
            <div className="absolute top-0 right-2 w-4 h-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-[0_0_10px_#8b5cf6,inset_0_1px_1px_rgba(255,255,255,0.5)] border border-purple-700/30" />
          </div>

          {/* CENTER: Candy Logo with Glossy Glass Overlay */}
          <div className="relative w-28 h-28 flex items-center justify-center bg-white/60 backdrop-blur-3xl rounded-full shadow-[0_16px_60px_-12px_rgba(0,51,255,0.15),inset_0_2px_2px_rgba(255,255,255,0.8)] z-20 transition-transform duration-300 hover:scale-105 border border-white/50 overflow-hidden">
            {/* Glossy Overlay (Specularity) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180%] h-[180%] bg-[linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_100%)] rotate-12" />
            
            <Image 
              src="/candyyy.svg" 
              alt="Starix Candy Logo" 
              width={64} 
              height={64} 
              priority 
              className="object-contain animate-[bounce_3s_ease-in-out_infinite] relative z-10"
            />
          </div>
        </div>

        {/* LOADING PROGRESS STRIP TEXT */}
        <div className="flex flex-col items-center w-full max-w-[340px] px-6 text-center">
          <p className="text-[18px] font-bold text-[#1A1A1A] mb-5 tracking-tight">
            Preparing your Starix experience...
          </p>
          
          {/* PROGRESS CONTAINER - Bolder shadow */}
          <div className="relative w-full h-6 bg-[#F9F9FB] border border-[#EFF0F3] rounded-full overflow-hidden p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
            {/* Filler segment */}
            <div 
              className="h-full bg-gradient-to-r from-[#0047FF] to-[#0033FF] rounded-full transition-all duration-300 ease-out shadow-[0_2px_4px_rgba(0,51,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)] relative flex items-center justify-end pr-3 overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Glossy sheen on the progress fill */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0)_100%)] animate-[pulse_2s_infinite]" />
              
              {/* Internal text status badge metrics - Bolder */}
              {progress > 15 && (
                <span className="text-white font-extrabold text-[11px] tracking-wider relative z-10">
                  {progress}%
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  }

  return <>{children}</>;
}