"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";

const PrivacyPolicy = () => {
  const sections = [
  { id: "collect", title: "What information do we collect?" },
  { id: "process", title: "How do we process your information?" },
  { id: "legal-bases", title: "What legal bases do we rely on to process your information?" },
  { id: "share", title: "When and with whom do we share your personal information?" },
  { id: "cookies", title: "Do we use cookies and other tracking technologies?" },
  { id: "ai", title: "Do we offer artificial intelligence-based products?" },
  { id: "social-logins", title: "How do we handle your social logins?" },
  { id: "retention", title: "How long do we keep your information?" },
  { id: "safety", title: "How do we keep your information safe?" },
  { id: "minors", title: "Do we collect information from minors?" },
  { id: "rights", title: "What are your privacy rights?" },
  { id: "dnt", title: "Controls for do-not-track features?" },
  { id: "us-residents", title: "Do United States residents have specific privacy rights?" },
  { id: "intellectual-property", title: "Platform data & intellectual property" },
  { id: "updates", title: "Do we make updates to this notice?" },
  { id: "contact", title: "How can you contact us about this notice?" },
  { id: "review", title: "How can you review, update, or delete the data we collect from you?" },
];

// State for Accordion +/- functionality
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(true);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);

  return (
    <div className="bg-[#FCF9F7] min-h-screen pt-15 pb-20 px-6 md:px-10 lg:px-12">
      <div className="max-w-full  mx-auto grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-16">
        
        {/* LEFT SIDEBAR - ACCORDION STYLE NAVIGATION */}
<aside className="hidden lg:block bg-[#FD6C1D]/[0.1] h-fit sticky top-32">
 

  <div className="flex p-10 flex-col gap-4">
     {/* STARIX PRIVACY BADGE - Added to match Frame 51 UI */}
  <div className="mb-4">
    <span className="bg-white text-[#040136] px-2 py-2 rounded-md text-[14px] font-normal tracking-wider uppercase">
      STARIX PRIVACY
    </span>
  </div>
    {/* PRIMARY NAVIGATION CARD */}
    <div className="bg-white border border-[#040136] rounded-2xl overflow-hidden shadow-sm">
      {/* Header with Toggle Icon (Accordion Style) */}
      <div 
        className="flex items-center justify-between p-6 border-b border-[#F0EBE5] cursor-pointer"
        onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
      >
        <h3 className="font-['Geist'] font-normal text-[#040136] text-xl">
          Privacy Policy
        </h3>
        {/* Toggle Icon Logic */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className="absolute w-5 h-[2px] bg-[#040136]" />
          {!isPrivacyOpen && <div className="absolute w-[2px] h-5 bg-[#040136]" />}
        </div>
      </div>

      {/* Numbered Navigation List - Collapsible */}
      {isPrivacyOpen && (
        <nav className="p-6 flex flex-col gap-3 max-h-[60vh] overflow-y-auto no-scrollbar">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-start gap-3 text-[#6E6E6E] hover:text-[#040136] transition-colors"
            >
              <span className="text-[16px] font-medium pt-0.5">{index + 1}.</span>
              <span className="text-[15px] uppercase tracking-wide leading-tight font-light">
                {section.title}
              </span>
            </a>
          ))}
        </nav>
      )}
    </div>

    {/* COMPLIANCE ADDENDUM CARD */}
    <div 
      className="bg-white border border-[#040136]/[0.4] rounded-2xl p-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => setIsComplianceOpen(!isComplianceOpen)}
    >
      <h3 className="font-['Geist'] font-[28px] text-[#040136] text-xl">
        Compliance Addendum
      </h3>
      <div className="relative w-5 h-5 flex items-center justify-center">
        <div className="absolute w-5 h-[2px] bg-[#040136]" />
        {!isComplianceOpen && <div className="absolute w-[2px] h-5 bg-[#040136]" />}
      </div>
    </div>
  </div>
</aside>

        {/* RIGHT CONTENT - LEGAL TEXT */}
<main className="font-['Geist'] text-[#040136]">
  <h1 className="text-[48px] font-semibold leading-tight mb-4">
    Privacy Policy
  </h1>
  <p className="text-[#6E6E6E] italic text-lg mb-12">Last updated February 2026</p>

  <div className="space-y-16 max-w-[850px]">
    {/* ABOUT / INTRO */}
<section id="intro">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">About</h2>
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      This Privacy Notice for STARIX INNOVATIVE SOLUTIONS LIMITED hereinafter also referred to as "we," "us," or "our," describes and regulates <span className="text-[#040136] font-semibold">our</span> interaction with data; how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services.
    </p>

    <p className="font-medium text-[#040136]">Some of these services include, but are not limited to:</p>
    
    <ul className="list-none space-y-4">
      <li className="flex gap-2">
        <span>•</span>
        <span>Visiting our website at “starixapp.com” or any website of ours that links to this Privacy Notice.</span>
      </li>
      <li className="flex gap-2">
        <span>•</span>
        <span>
          Use of Starix. Starix is a technology platform that provides data-driven insights, analytics, and trust signals for digital creators, brands, and online platforms. The service collate, aggregates and analyzes publicly available and user-authorized data from social media platforms and other third-party services to generate trust scores, performance, insights, and trend intelligence.
        </span>
      </li>
    </ul>

    <p>
      Simply put, Starix sorts relevant data in the public domain, and utilizes this data as a tool to generate performance insights and trend intelligence for the benefit of brands and creators alike. Starix uses automated systems, including algorithms and artificial intelligence, to evaluate engagement patterns, detect anomalies, and support transparency and informed decision-making.
    </p>

    <p className="text-[#040136] font-semibold">
      Specifically, we use AI to analyze public social media engagement and create "trust scores" for creators. These scores are based on engagement frequency, sentiment analysis, and consistency metrics. These scores may influence brand collaboration opportunities.
    </p>

    <p>
      The platform may include web and mobile applications, APIs, dashboards, and related tools.
    </p>
    
    <p>
      • Engage with us in other related ways, including any marketing or events.
    </p>
  </div>
</section>

    {/* 1. DATA COLLECTION */}
<section id="collect">
  <h2 className="text-[28px] font-normal mb-6">1. What information do we collect?</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    
    <div>
      <p className="font-semibold text-[#040136] mb-4">Personal information you disclose to us:</p>
      
      <p className="mb-4">
        We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
      </p>
      
      <p className="font-semibold text-[#040136] mb-4">
        We at Starix do not have access to information that is not voluntarily given to us by users.
      </p>

      <p className="mb-4">The personal information we collect may include the following:</p>
      
      <ul className="list-none space-y-1 mb-6">
        <li>• Names</li>
        <li>• Phone numbers</li>
        <li>• Email addresses</li>
        <li>• Job titles</li>
        <li>• Usernames</li>
        <li>• Passwords</li>
        <li>• Contact Preferences</li>
        <li>• Billing Addresses</li>
        <li>• Contact or Authentication Data</li>
        <li>• Debit/Credit Card Numbers</li>
        <li>• Brand Details</li>
        <li>• Brand Website/URL</li>
        <li>• Creator Account Details</li>
        <li>• Account Details Sensitive Information.</li>
      </ul>

      <p className="mb-4">
        We do not process sensitive information. Payment Data. We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Paystack. You may find their privacy notice link(s) here: <a href="https://paystack.com/compliance" className="text-blue-600 underline">https://paystack.com/compliance</a>.
      </p>
    </div>

    <div>
      <p className="font-semibold text-[#040136] mb-2">Social Media Login Data:</p>
      <p className="mb-4">
        We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?". The profile information we receive may often include your name, email address, friends list, <span className="font-semibold text-[#040136]">and social media handle.</span>
      </p>
    </div>

    <div>
      <p className="font-semibold text-[#040136] mb-2">Information automatically collected:</p>
      <p>
        Some information such as your Internet Protocol (IP) address and/or browser and device characteristics is collected automatically when you visit our Services.
      </p>
    </div>

  </div>
</section>

    {/* 2. PROCESSING */}
    <section id="process">
      <h2 className="text-[28px] font-normal mb-6">2. How do we process your information?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
        We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
      </p>
    </section>

    {/* 3. LEGAL BASES */}
    <section id="legal-bases">
      <h2 className="text-[28px] font-normal mb-6">3. What legal bases do we rely on?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
  We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law.
  If you are located in the EU, UK or Africa, we rely on <span className="text-[#040136] font-semibold">
    Consent, Performance of a Contract, Legitimate Interests</span> (specifically to analyze usage and diagnose problems), 
    and <span className="text-[#040136] font-semibold">Legal Obligations.</span>
</p>
    </section>

    {/* 4. SHARING */}
    <section id="share">
      <h2 className="text-[28px] font-normal mb-6">4. When and with whom do we share data?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
        We may share information in specific situations and with specific categories of third parties, such as Vendors, Consultants,
         and Other Third-Party Service Providers (e.g., Cloud Computing Services, Data Analytics Services, Payment Processors like Paystack).  </p>
    </section>

    {/* 5. COOKIES */}
    <section id="cookies">
      <h2 className="text-[28px] font-normal mb-6">5. Do we use cookies?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
  We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services.
  Specific information about how we use such technologies is set out in our Cookie Notice: 
  <a 
    href="http://www.starixapp.com/cookies" 
    className="text-blue-600 underline"
  >
    http://www.starixapp.com/cookies
  </a>.
</p>
    </section>

    {/* 6. AI PRODUCTS */}
    <section id="ai">
      <h2 className="text-[28px] font-normal mb-6">6. AI-based products</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
        We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies. 
        All personal information processed using our AI Products is handled in line with our Privacy Notice and our agreement with third parties.
        <span className="text-[#040136] font-semibold"> Importantly, we conduct regular reviews of our AI models to ensure they do not produce discriminatory outcomes.</span>
         </p>
    </section>

    {/* 7. SOCIAL LOGINS */}
    <section id="social-logins">
      <h2 className="text-[28px] font-normal mb-6">7. How do we handle social logins?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
        If you choose to register or log in to our Services using a social media account, we may have access to certain information about you. 
        We will use the information we receive only for the purposes that are described in this Privacy Notice. </p>
    </section>

    {/* 8. RETENTION */}
    <section id="retention">
      <h2 className="text-[28px] font-normal mb-6">8. How long do we keep your info?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
        We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, <span className="font-semibold text-[#040136]">generally for a period of 5 years after account deactivation,</span>
        unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). </p>
    </section>

    {/* 9. SAFETY */}
    <section id="safety">
      <h2 className="text-[28px] font-normal mb-6">9. How do we keep your info safe?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
        We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process.  </p>
    </section>

    {/* 10. MINORS */}
    <section id="minors">
      <h2 className="text-[28px] font-normal mb-6">10. Do we collect info from minors?</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
       We do not knowingly collect data from or market to minors. We understand that regulations vary per jurisdiction with respect to age limits and we adhere to those regulations.</p>
    </section>

    {/* 11. PRIVACY RIGHTS */}
    <section id="rights">
  <h2 className="text-[28px] font-normal mb-6 uppercase tracking-tight">
    11. What are your privacy rights?
  </h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      Depending on your region, you have rights that allow you greater access to and control over your personal information. These may include the right to request access, rectification, erasure, and <span className="text-[#040136] font-semibold">data portability</span>.
    </p>

    <p className="text-[#040136] font-semibold">
      If a decision that produces legal or similarly significant effects is made solely by automated means (such as an AI-generated trust score), we will inform you, explain the main factors, and offer a simple way to request human review. If you believe an automated trust score is inaccurate, you have the right to request human review of that specific score.
    </p>

    <p>
      <span className="text-[#040136] font-semibold">Data Protection Officer (DPO):</span> You may contact our DPO at 
      <a href="mailto:dpo@starixapp.com" className="text-[#040136] font-semibold hover:underline ml-1">
        dpo@starixapp.com
      </a> for any questions regarding this policy.
    </p>
  </div>
</section>

    {/* 12. CONTROLS FOR DO-NOT-TRACK FEATURES */}
    <section id="dnt">
      <h2 className="text-[28px] font-normal mb-6">12. Controls for Do-Not-Track Features</h2>
      <p className="text-[#6E6E6E] text-[20px] leading-relaxed font-light">
        We do not currently respond to DNT browser signals.</p>
    </section>

    {/* 13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? */}
    <section id="us-residents">
      <h2 className="text-[28px] font-normal mb-6">13. Do United States residents have specific privacy rights?</h2>
      <div className="text-[#6E6E6E] text-[20px] font-light">
        <p>If you are a resident of certain US states, you may have the right to request access to and receive details about the personal information
             we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information</p>
        
      </div>
    </section>

    {/* 14. INTELLECTUAL PROPERTY */}
    <section id="intellectual-property">
      <h2 className="text-[28px] font-normal mb-6">14. Platform data & intellectual property </h2>
      <div className="text-[#6E6E6E] text-[20px] font-light">
        <p>All user data collected on this platform, including profile information, usage metrics, and payment history, is used solely to provide services, facilitate transactions between brands and creators, 
            and improve the platform. Intellectual property rights in content and work submitted remain the exclusive property
             of STARIX INNOVATIVE SOLUTIONS LIMITED, and no personal information will be sold to third parties.
        </p>
        
      </div>
    </section>

    {/* 15. UPDATES */}
    <section id="updates">
      <h2 className="text-[28px] font-normal mb-6">15. Do we make updates to this notice?</h2>
      <div className="text-[#6E6E6E] text-[20px] font-light">
        <p>Yes, we will update this notice as necessary to stay compliant with relevant laws. In the event of an update,
            we will ensure to put notice of these updates on our platform to ensure that users are well informed.
        </p>
        
      </div>
    </section>

    {/* 16. CONTACT */}
    <section id="contact">
      <h2 className="text-[28px] font-normal mb-6">16. How can you contact us about this notice?</h2>
      <div className="text-[#6E6E6E] text-[20px] font-light">
        <p>If you have questions or comments about this notice, you may email us at dpo@starixapp.com.</p>
        
      </div>
    </section>

    {/* 17. REVIEW */}
    <section id="review">
      <h2 className="text-[28px] font-normal mb-6">17. How can you review, update, or delete the data we collect from you?</h2>
      <div className="text-[#6E6E6E] text-[20px] font-light">
        <p>To request to review, update, or delete your personal information, please fill out and submit a data subject access request to dpo@starixapp.com.</p>
        
      </div>
    </section>

  </div>
</main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;