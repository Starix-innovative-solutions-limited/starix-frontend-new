"use client";

import React, { useState } from "react";
import Link from "next/link";

const TermsOfService = () => {
  // Navigation IDs synced to the summarized sections
  const sections = [
    { id: "definitions", title: "1. Definitions" },
    { id: "eligibility", title: "2. Eligibility & Account Registration" },
    { id: "privacy-ai", title: "3. Privacy, Integrations & AI Scores" },
    { id: "acceptable-use", title: "4. Acceptable Use" },
    { id: "content-moderation", title: "5. User Content Moderation" },
    { id: "ip-data", title: "6. Platform Data & Intellectual Property" },
    { id: "third-party", title: "7. Third-Party Platform Terms & Revocation" },
  ];

  return (
    <div className="bg-[#FCF9F7] min-h-screen pt-22 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-16">
        
        {/* LEFT SIDEBAR - STICKY ACCORDION SYSTEM */}
        <aside className="hidden lg:block h-screen sticky top-32 overflow-y-auto no-scrollbar max-w-[550px]">
          <div className="flex bg-[#FD6C1D]/[0.1] rounded-3xl p-10 flex-col gap-4">
            
            {/* STARIX TERMS BADGE */}
            <div className="mb-2">
              <span className="bg-white text-[#040136] px-4 py-2 rounded-md text-[14px] font-medium tracking-wider uppercase border border-[#EBE3D9]">
                STARIX TERMS
              </span>
            </div>

            {/* INDIVIDUAL SECTION CARDS */}
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="bg-white border border-[#040136] rounded-2xl p-6 flex items-center justify-between shadow-sm hover:border-[#040136] transition-all group"
              >
                <h3 className="font-['Geist'] font-normal text-[#040136] text-xl leading-snug max-w-[85%]">
                  {section.title}
                </h3>
                
                {/* PLUS ICON */}
                <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <div className="absolute w-5 h-[1.5px] bg-[#040136]" />
                  <div className="absolute w-[1.5px] h-5 bg-[#040136] transition-transform duration-300" />
                </div>
              </a>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT - LEGAL TEXT */}
        <main className="font-['Geist'] text-[#040136]">
          <h1 className="text-[48px] font-semibold leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-[#6E6E6E] italic text-lg mb-8">
            Last updated February 12, 2026 |  Effective date February 12, 2026 {/* [cite: 647] */}
          </p>

          {/* DOWNLOAD PDF BUTTON */}
          <a 
            href="/terms-of-service.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#040136] text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl transition-all duration-300 mb-12 shadow-md w-fit"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="currentColor"/>
            </svg>
            Download Full Terms of Service (PDF)
          </a>

          <div className="space-y-16 max-w-[850px]">
            
            {/* ABOUT / INTRO (Exact Match to PDF) */}
            <section id="intro">
              <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
                <p>
                  These Terms of Service (these "Terms") are a binding agreement between you and STARIX INNOVATIVE SOLUTIONS LIMITED ("Starix", "we", "us", or "our") governing your access to and use of our websites, applications, dashboards, APIs, and related services (collectively, the "Services").  {/* [cite: 648] */}
                </p>
                <p>
                  These Terms apply to individual users (including creators) and businesses (including brands, agencies, and other organizations) (together, "Users").  {/* [cite: 648] */} By accessing or using the Services, you agree to these Terms. You do not need to sign these Terms for them to be effective.  {/* [cite: 648] */}
                </p>
              </div>
            </section>

            {/* 1. DEFINITIONS */}
            <section id="definitions">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">1. Definitions</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>This section outlines the specific meanings of key terms used throughout our platform, such as "Account", "Brand", "Creator", "Content", "Starix Score", and "OAuth".  {/* [cite: 650, 651, 652, 653, 654, 655] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ For the exact legal definitions, please refer to <span className="font-semibold">Section 1</span> of the downloadable PDF.</p>
                </div>
              </div>
            </section>

            {/* 2. ELIGIBILITY */}
            <section id="eligibility">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">2. Eligibility & Account Registration</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>You must be at least 16 years old to use the Services.  {/* [cite: 657] */} The platform is currently free, but we may introduce paid features in the future.  {/* [cite: 660, 661] */} You are responsible for maintaining the confidentiality of your Account credentials and ensuring your information is accurate.  {/* [cite: 663, 664] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Review the complete eligibility requirements and account rules in <span className="font-semibold">Section 2</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 3. PRIVACY & AI */}
            <section id="privacy-ai">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">3. Privacy, Social Media Integrations & AI Trust Scores</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>By connecting social media accounts, you authorize us to process public data via OAuth flows; we never store your passwords.  {/* [cite: 671, 672] */} We use AI and automated systems to generate your Starix Score and platform analytics.  {/* [cite: 673, 676] */} You have the right to request a human review of certain automated decisions.  {/* [cite: 677] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Learn more about data processing and AI logic in <span className="font-semibold">Section 3</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 4. ACCEPTABLE USE */}
            <section id="acceptable-use">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">4. Acceptable Use</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>You agree not to scrape our platform, reverse engineer our algorithms, or commit fraud (such as manipulating engagement metrics or buying followers).  {/* [cite: 683, 686, 687] */} Any unlawful, defamatory, or harmful conduct may result in the suspension or termination of your access.  {/* [cite: 689, 694] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See the full list of prohibited conduct in <span className="font-semibold">Section 4</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 5. CONTENT MODERATION */}
            <section id="content-moderation">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">5. User Content Moderation</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>You are entirely responsible for the Content you submit to the Services. You represent and warrant that your Content does not violate any laws or third-party rights.  {/* [cite: 696, 697] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Read about content responsibilities in <span className="font-semibold">Section 5</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 6. IP & DATA */}
            <section id="ip-data">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">6. Platform Data & Intellectual Property</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>You retain full ownership of your personal data and social media content.  {/* [cite: 701, 718] */} By using Starix, you grant us a limited license to display your portfolio to brands.  {/* [cite: 720, 721] */} We do not sell your personal data.  {/* [cite: 712, 739] */} Conversely, Starix retains all intellectual property rights to our platform technology, algorithms, and scoring systems.  {/* [cite: 731] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Detailed IP rights and licensing grants are located in <span className="font-semibold">Section 6</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 7. THIRD PARTY */}
            <section id="third-party">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">7. Third-Party Platform Terms & API Compliance</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>Your use of connected platforms (like Meta, TikTok, and YouTube) remains subject to their respective terms and policies.  {/* [cite: 743] */} You may revoke Starix's access to these platforms at any time through your account settings or the third-party app authorization settings.  {/* [cite: 744, 745] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Read the specific terms, API compliance rules, and revocation instructions in the <span className="font-semibold">Final Section</span> of the PDF.</p>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsOfService;