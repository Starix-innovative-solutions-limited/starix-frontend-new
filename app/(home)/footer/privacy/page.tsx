"use client";

import React, { useState } from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  // Navigation IDs synced to the new summarized sections
  const sections = [
    { id: "collect", title: "1. What information do we collect?" },
    { id: "process", title: "2. How do we process your information?" },
    { id: "legal-bases", title: "3. What legal bases do we rely on?" },
    { id: "share", title: "4. When and with whom do we share data?" },
    { id: "cookies", title: "5. Do we use cookies and tracking?" },
    { id: "ai", title: "6. AI-based products & Automated decisions" },
    { id: "social-logins", title: "7. How do we handle social logins?" },
    { id: "retention", title: "8. How long do we keep your information?" },
    { id: "safety", title: "9. How do we keep your information safe?" },
    { id: "minors", title: "10. Do we collect information from minors?" },
    { id: "rights", title: "11. What are your privacy rights?" },
    { id: "dnt", title: "12. Controls for do-not-track features" },
    { id: "us-residents", title: "13. US resident privacy rights" },
    { id: "intellectual-property", title: "14. Platform data & intellectual property" },
    { id: "updates", title: "15. Do we make updates to this notice?" },
    { id: "contact", title: "16. How can you contact us?" },
    { id: "review", title: "17. Reviewing, updating, or deleting data" },
    { id: "platform-terms", title: "18. Platform-Specific Terms & Compliance" },
  ];

  // State for Accordion +/- functionality
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(true);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);

  return (
    <div className="bg-[#FCF9F7] min-h-screen pt-15 pb-20 px-6 md:px-10 lg:px-12">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-16">
        
        {/* LEFT SIDEBAR - ACCORDION STYLE NAVIGATION */}
        <aside className="hidden lg:block bg-[#FD6C1D]/[0.1] h-screen sticky top-32 overflow-y-auto no-scrollbar">
          <div className="flex p-10 flex-col gap-4">
            
            {/* STARIX PRIVACY BADGE */}
            <div className="mb-4">
              <span className="bg-white text-[#040136] px-3 py-2 rounded-md text-[14px] font-normal tracking-wider uppercase border border-[#EBE3D9]">
                STARIX PRIVACY
              </span>
            </div>
            
            {/* PRIMARY NAVIGATION CARD */}
            <div className="bg-white border border-[#040136] rounded-2xl overflow-hidden shadow-sm">
              <div 
                className="flex items-center justify-between p-6 border-b border-[#F0EBE5] cursor-pointer"
                onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
              >
                <h3 className="font-['Geist'] font-normal text-[#040136] text-xl">
                  Privacy Policy Overview
                </h3>
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="absolute w-5 h-[2px] bg-[#040136]" />
                  {!isPrivacyOpen && <div className="absolute w-[2px] h-5 bg-[#040136]" />}
                </div>
              </div>

              {/* Numbered Navigation List - Collapsible */}
              {isPrivacyOpen && (
                <nav className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-start gap-3 text-[#6E6E6E] hover:text-[#040136] transition-colors"
                    >
                      <span className="text-[15px] leading-tight font-light">
                        {section.title}
                      </span>
                    </a>
                  ))}
                </nav>
              )}
            </div>

            {/* COMPLIANCE ADDENDUM CARD */}
            <div className="bg-white border border-[#040136]/[0.4] rounded-2xl p-6 flex flex-col shadow-sm">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsComplianceOpen(!isComplianceOpen)}
              >
                <h3 className="font-['Geist'] font-normal text-[#040136] text-xl">
                  Compliance Addendum
                </h3>
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="absolute w-5 h-[2px] bg-[#040136]" />
                  {!isComplianceOpen && <div className="absolute w-[2px] h-5 bg-[#040136]" />}
                </div>
              </div>

              {/* Addendum Summary Dropdown */}
              {isComplianceOpen && (
                <div className="mt-6 pt-4 border-t border-[#F0EBE5] text-[#6E6E6E] text-[14px] font-light leading-relaxed space-y-3">
                   <p>Our comprehensive framework ensuring full compliance with GDPR (EU/UK), CCPA/CPRA (California), and Nigeria's NDPA 2023. {/* [cite: 551] */}</p>
                  <p className="italic text-[#040136]">→ See the complete Compliance Addendum at the end of the downloadable PDF.</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT - LEGAL TEXT */}
        <main className="font-['Geist'] text-[#040136]">
          <h1 className="text-[48px] font-semibold leading-tight mb-4">
            Privacy Policy
          </h1>
           <p className="text-[#6E6E6E] italic text-lg mb-8">Last updated February 12, 2026 {/* [cite: 1] */}</p>

          {/* DOWNLOAD PDF BUTTON */}
          <a 
            href="/starix-privacy-policy.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#040136] text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl transition-all duration-300 mb-12 shadow-md w-fit"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="currentColor"/>
            </svg>
            Download Full Privacy Policy (PDF)
          </a>

          <div className="space-y-16 max-w-[850px]">
            
            {/* ABOUT / INTRO */}
            <section id="intro">
              <h2 className="text-[28px] font-normal mb-6 text-[#040136]">About</h2>
              <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
                <p>
                  This Privacy Notice for STARIX INNOVATIVE SOLUTIONS LIMITED hereinafter also referred to as "we," "us," or "our", describes and regulates our interaction with data; how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services.  {/* [cite: 20]  */}{/* [cite: 21] */}
                </p>
                <p>
                  For most processing described in this Privacy Notice, we act as a data controller (or equivalent role under applicable law).  {/* [cite: 22] */} Where we process personal information on behalf of a business customer or brand partner in connection with a specific campaign or engagement, we may act as a processor/service provider (or equivalent role) and will process such information only on documented instructions and for the purposes described.  {/* [cite: 23] */}
                </p>
                 <p className="font-medium text-[#040136]">Some of these services include, but are not limited to: {/* [cite: 24] */}</p>
                <ul className="list-none space-y-4 pl-2">
                  <li className="flex gap-2"><span>•</span><span>Visiting our website at "starixapp.com" or any website of ours that links to this Privacy Notice.  {/* [cite: 25] */}</span></li>
                  <li className="flex gap-2"><span>•</span><span>Use of Starix.  {/* [cite: 26] */} Starix is a technology platform that provides data-driven insights, analytics, and trust signals for digital creators, brands, and online platforms.  {/* [cite: 27] */} The service collates, aggregates and analyzes publicly available and user-authorized data from social media platforms and other third-party services to generate trust scores, performance Insights, and trend intelligence.  {/* [cite: 28] */}</span></li>
                </ul>
                <p>
                  Simply put, Starix sorts relevant data in the public domain, and utilizes this data as a tool to generate performance insights and trend intelligence for the benefit of brands and creators alike.  {/* [cite: 29] */} Starix uses automated systems, including algorithms and artificial intelligence, to evaluate engagement patterns, detect anomalies, and support transparency and informed decision-making.  {/* [cite: 30] */}
                </p>
                <p className="text-[#040136] font-semibold">
                  Specifically, we use AI to analyze public social media engagement and create "trust scores" for creators.  {/* [cite: 31] */} These scores are based on engagement frequency, sentiment analysis, and consistency metrics. These scores may influence brand collaboration opportunities.  {/* [cite: 32] */}
                </p>
                <p>
                  The platform may include web and mobile applications, APIs, dashboards, and related tools.  {/* [cite: 33] */} Engage with us in other related ways, including any marketing or events.  {/* [cite: 34] */}
                </p>
              </div>
            </section>

            {/* 1. DATA COLLECTION */}
            <section id="collect">
              <h2 className="text-[28px] font-normal mb-6">1. What information do we collect?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>We collect personal information you voluntarily provide (like your name, email, and billing address), payment data processed securely via Paystack, and data you authorize us to access when connecting social media accounts.  {/* [cite: 37]  */}{/* [cite: 58]  */}{/* [cite: 61] */} We <span className="font-semibold text-[#040136]">do not</span> process sensitive information or access private direct messages.  {/* [cite: 57]  */}{/* [cite: 71] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ For the complete list of collected data points and excluded data, see <span className="font-semibold">Section 1</span> of the downloadable PDF.</p>
                </div>
              </div>
            </section>

            {/* 2. PROCESSING */}
            <section id="process">
              <h2 className="text-[28px] font-normal mb-6">2. How do we process your information?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>We process your information to provide, improve, and administer our Services, communicate with you, ensure security and fraud prevention, and to comply with the law.  {/* [cite: 81] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See <span className="font-semibold">Section 2</span> of the PDF for more details on processing activities.</p>
                </div>
              </div>
            </section>

            {/* 3. LEGAL BASES */}
            <section id="legal-bases">
              <h2 className="text-[28px] font-normal mb-6">3. What legal bases do we rely on?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>If you are in the EU, UK, or Africa, we rely on Consent, Performance of a Contract, Legitimate Interests, and Legal Obligations to process your data.  {/* [cite: 84] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Detailed legal bases can be found in <span className="font-semibold">Section 3</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 4. SHARING */}
            <section id="share">
              <h2 className="text-[28px] font-normal mb-6">4. When and with whom do we share data?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>We share minimal data with service providers (like payment processors).  {/* [cite: 86] */} When you participate in brand challenges, brands can view your public creator portfolio and Starix Score, but they <span className="font-semibold text-[#040136]">cannot</span> see your raw social media data.  {/* [cite: 98]  */}{/* [cite: 99]  */}{/* [cite: 100] */} Data flow from social platforms is one-way to Starix only.  {/* [cite: 94] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ For full disclosure on data sharing and brand visibility, see <span className="font-semibold">Section 4</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 5. COOKIES */}
            <section id="cookies">
              <h2 className="text-[28px] font-normal mb-6">5. Do we use cookies and tracking?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services.  {/* [cite: 103] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Specific information is set out in our Cookie Notice (Section 5) in the PDF, or visit <a href="https://www.starixapp.com/cookies" className="underline hover:text-[#FD6C1D]">starixapp.com/cookies</a>.  {/* [cite: 104] */}</p>
                </div>
              </div>
            </section>

            {/* 6. AI PRODUCTS */}
            <section id="ai">
              <h2 className="text-[28px] font-normal mb-6">6. AI-based products & Automated decisions</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>We use AI and machine learning to calculate your Starix Score, detect artificial engagement (fraud), analyze content, and rank creators fairly.  {/* [cite: 106]  */}{/* [cite: 108]  */}{/* [cite: 114]  */}{/* [cite: 117]  */}{/* [cite: 119] */} If an AI-generated decision negatively impacts you, you have the right to request a human review.  {/* [cite: 130] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Learn how our algorithms work and how to appeal an AI decision in <span className="font-semibold">Section 6</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 7. SOCIAL LOGINS */}
            <section id="social-logins">
              <h2 className="text-[28px] font-normal mb-6">7. How do we handle social logins?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>When you connect platforms like Instagram, TikTok, Facebook, or YouTube, we use OAuth 2.0 to access only the public metrics you explicitly authorize.  {/* [cite: 164]  */}{/* [cite: 165] */} We never access passwords or direct messages.  {/* [cite: 171] */} You can disconnect a platform at any time.  {/* [cite: 336] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ For a comprehensive breakdown of exactly what API data we collect per platform, see <span className="font-semibold">Section 7A</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 8. RETENTION */}
            <section id="retention">
              <h2 className="text-[28px] font-normal mb-6">8. How long do we keep your information?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>Generally, we retain personal data for 5 years after account deactivation.  {/* [cite: 374] */} However, data collected from social media platforms is deleted within 90 days after you disconnect the platform (unless required for legal disputes or financial compliance).  {/* [cite: 375] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See <span className="font-semibold">Section 8</span> of the PDF for exact retention policies.</p>
                </div>
              </div>
            </section>

            {/* 9. SAFETY */}
            <section id="safety">
              <h2 className="text-[28px] font-normal mb-6">9. How do we keep your information safe?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>We implement robust technical and organizational security measures designed to protect the security of any personal information we process.  {/* [cite: 380] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Read about our security infrastructure in <span className="font-semibold">Section 9</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 10. MINORS */}
            <section id="minors">
              <h2 className="text-[28px] font-normal mb-6">10. Do we collect information from minors?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                 <p>Our Services are not intended for children under 16. {/* [cite: 383] */} If you are 16 or 17, you may use the Services only where permitted by law, and your parent or legal guardian must consent to your use.  {/* [cite: 384] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See <span className="font-semibold">Section 10</span> of the PDF for age limitations.</p>
                </div>
              </div>
            </section>

            {/* 11. PRIVACY RIGHTS */}
            <section id="rights">
              <h2 className="text-[28px] font-normal mb-6">11. What are your privacy rights?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>Depending on your region, you have the right to access, rectify, erase, or port your personal data.  {/* [cite: 386]  */}{/* [cite: 387] */} You may also challenge automated AI decisions and request human intervention.  {/* [cite: 388] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ View your complete rights and how to exercise them in <span className="font-semibold">Section 11</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 12. DNT */}
            <section id="dnt">
              <h2 className="text-[28px] font-normal mb-6">12. Controls for do-not-track features</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>We do not currently respond to DNT browser signals.  {/* [cite: 410] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See <span className="font-semibold">Section 12</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 13. US RESIDENTS */}
            <section id="us-residents">
              <h2 className="text-[28px] font-normal mb-6">13. US resident privacy rights</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>If you reside in certain US states, you may have specific rights to request access to, correct, or delete your personal information.  {/* [cite: 412] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Check <span className="font-semibold">Section 13</span> of the PDF for state-specific provisions.</p>
                </div>
              </div>
            </section>

            {/* 14. INTELLECTUAL PROPERTY */}
            <section id="intellectual-property">
              <h2 className="text-[28px] font-normal mb-6">14. Platform data & intellectual property</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>All personal information and social media content remains your property.  {/* [cite: 416] */} By connecting accounts, you grant us a limited license to display your public content in your portfolio.  {/* [cite: 435] */} We do not, and will never, sell your personal information to third parties for marketing purposes.  {/* [cite: 455] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ Read more about data ownership and licensing in <span className="font-semibold">Section 14</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 15. UPDATES */}
            <section id="updates">
              <h2 className="text-[28px] font-normal mb-6">15. Do we make updates to this notice?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>Yes, we will update this notice as necessary to stay compliant with relevant laws and will provide clear notice on our platform when we do so.  {/* [cite: 458]  */}{/* [cite: 459] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See <span className="font-semibold">Section 15</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 16. CONTACT */}
            <section id="contact">
              <h2 className="text-[28px] font-normal mb-6">16. How can you contact us?</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>If you have questions or comments about this notice, you may email us at <a href="mailto:contact@starixapp.com" className="font-semibold text-[#040136] hover:underline">contact@starixapp.com</a>.  {/* [cite: 461] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See <span className="font-semibold">Section 16</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 17. REVIEW DATA */}
            <section id="review">
              <h2 className="text-[28px] font-normal mb-6">17. Reviewing, updating, or deleting data</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>To request to review, update, or delete your personal information, please submit a data subject access request to our DPO at <a href="mailto:dpo@starixapp.com" className="font-semibold text-[#040136] hover:underline">dpo@starixapp.com</a>.  {/* [cite: 463] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ See <span className="font-semibold">Section 17</span> of the PDF.</p>
                </div>
              </div>
            </section>

            {/* 18. PLATFORM-SPECIFIC TERMS */}
            <section id="platform-terms">
              <h2 className="text-[28px] font-normal mb-6">18. Platform-Specific Terms & Compliance</h2>
              <div className="text-[#6E6E6E] text-[20px] leading-relaxed font-light space-y-4">
                <p>Our integrations strictly comply with the API Terms of Service for Meta, TikTok, and Google.  {/* [cite: 506]  */}{/* [cite: 514]  */}{/* [cite: 524] */} Disconnecting a platform from your settings immediately stops data collection, and historical data is deleted within 90 days.  {/* [cite: 471] */}</p>
                <div className="bg-[#FD6C1D]/[0.05] p-4 rounded-lg border border-[#EBE3D9]">
                  <p className="italic text-[16px] text-[#040136]">→ For detailed deletion instructions and API compliance breakdown, refer to <span className="font-semibold">Section 18</span> and the Addendums of the PDF.</p>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;