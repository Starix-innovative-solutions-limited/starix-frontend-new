"use client";

import React, { useState } from "react";
import Link from "next/link";

const CookiesPolicy = () => {
  // Navigation IDs synced to the Cookies Policy UI
  const sections = [
  { id: "definitions", title: "Definitions" },
  { id: "categories", title: "Categories of cookies and similar technologies we use" },
  { id: "social-media", title: "Social media OAuth integrations." },
  { id: "lawful-basis", title: "Lawful bases and consent mechanics (EU/UK)" },
  { id: "manage", title: "How to manage your cookie preferences" },
  { id: "third-party", title: "Third-Party cookies and service providers" },
  { id: "retention", title: "Retention/Duration of cookies" },
  { id: "dnt", title: "Do not track" },
  { id: "updates", title: "Updates to this cookies policy" },
  { id: "contact", title: "Contact us" },
  { id: "related-policies", title: "Related policies" },
];

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(true);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);

  return (
    <div className="bg-[#FCF9F7] min-h-screen pt-22 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-16">
        
        {/* LEFT SIDEBAR - STICKY ACCORDION SYSTEM */}
<aside className="hidden lg:block h-screen sticky top-32 overflow-y-auto no-scrollbar max-w-[550px]">
  <div className="flex bg-[#FD6C1D]/[0.1] rounded-3xl p-10 flex-col gap-4">
    
    {/* STARIX COOKIES BADGE */}
    <div className="mb-2">
      <span className="bg-white text-[#040136] px-4 py-2 rounded-md  text-[14px] font-medium tracking-wider uppercase">
        STARIX COOKIES
      </span>
    </div>

    {/* INDIVIDUAL SECTION CARDS */}
    {sections.map((section, index) => (
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
            Cookies Policy
          </h1>
          <p className="text-[#6E6E6E] italic text-lg mb-12">Last updated February 2026</p>

          <div className="space-y-16 max-w-[850px]">
            {/* ABOUT / INTRO */}
<section id="intro">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">About</h2>
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
        This Cookie Policy (this “Cookie Policy”) explains how STARIX INNOVATIVE SOLUTIONS LIMITED (Starix, “we” “us”) or “our” uses cookies 
        and similar tracking technologies when you visit https://starixapp.com (the “Website”) (excluding subdomains). 
        It also explains your choices, including how to manage your preferences using our cookie consent banner. 
        This Cookie Policy should be read together with our Privacy Policy available at [insert link to Privacy Policy 
        applicable to the Website] (the “Privacy Policy”).
    </p>
  </div>
</section>

            {/* 1. DEFINITIONS */}
<section id="definitions">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">1. Definitions</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p className="text-[#040136]">For the purpose of this Cookie Policy:</p>
    
    <p>
      (a) &lt;Cookies&gt; are small text oles placed on your device (computer, smartphone, tablet) by websites that you visit. Cookies may be &lt;session cookies&gt; (deleted when you close your browser) or &lt;persistent cookies&gt; (remain on your device until they expire or are deleted).
    </p>

    <p>
      (b) &lt;Pixels&gt; (also called &lt;web beacons&gt; or &lt;tags&gt;) are small pieces of code that allow a website or third party to collect information about how users interact with a webpage (for example, page views or conversions).
    </p>

    <p>
      (c) &lt;SDKs&gt; (software development kits) are code libraries included in applications or websites that may allow data to be collected or shared with third parties (for example, for analytics or performance monitoring).
    </p>

    <p>
      (d) &lt;Local Storage&gt; (including browser local storage and similar technologies) refers to data stored locally on your device by your browser or app, which may be used to remember preferences or support functionality and may operate similarly to cookies.
    </p>

    <p>
      (e) &lt;Non-essential cookies&gt; are cookies and similar technologies that are not strictly necessary to provide the Website you request (for example, analytics and marketing cookies).
    </p>

    <p>
      (f) &lt;Strictly necessary cookies&gt; are cookies and similar technologies required for the Website to function and to provide the service you request (for example, security and load balancing).
    </p>

    <p>
      (g) &lt;Consent&gt; means your freely given, specioc, informed, and unambiguous indication of your wishes, signioed by a clear affirmative action, as required under applicable EU/UK laws for non-essential cookies.
    </p>
  </div>
</section>

            {/* 2. CATEGORIES */}
<section id="categories">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">2. Categories of cookies and similar technologies we use</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      We use (or may use) the following categories of Cookies, Pixels, SDKs, and Local Storage on the Website:
    </p>

    <p>
      2.1 Strictly necessary cookies. These technologies are required for the Website to operate and cannot be switched off in our systems. They are usually set in response to actions made by you which amount to a request for services (for example, setting your privacy preferences, logging in (if applicable), filling in forms, security, fraud prevention, and load balancing). You can set your browser to block or alert you about these technologies, but some parts of the Website may not work.
    </p>

    <p>
      2.2 Functional / preferences cookies. These technologies enable the Website to provide enhanced functionality and personalization (for example, remembering choices you make such as language or region, and remembering settings you apply). If you do not allow these technologies, some or all of these services may not function properly.
    </p>

    <p>
      2.3 Analytics / performance cookies. These technologies allow us (and our service providers) to count visits and traffic sources and understand how visitors move around the Website, so we can measure and improve the performance of the Website (for example, which pages are the most and least popular and whether visitors encounter errors). If you do not allow these technologies, we will not know when you have visited the Website and may not be able to improve it as effectively.
    </p>

    <p>
      2.4 Advertising / marketing cookies. These technologies may be used to deliver content and advertisements that are more relevant to you and your interests, and to measure the effectiveness of campaigns. As of the effective date of this Cookie Policy, we do not use advertising/marketing cookies on the Website. If we introduce advertising/marketing cookies in the future, we will do so only after providing appropriate notice and, where required under EU/UK law, obtaining your prior opt-in Consent via our cookie consent banner.
    </p>
  </div>
</section>
{/* 3. SOCIAL MEDIA OAUTH INTEGRATIONS */}
<section id="social-media">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">3. Social media OAuth integrations.</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      If you choose to connect third-party social media accounts (e.g., Instagram, Facebook, TikTok, YouTube), you authorize us to access and process public data and the specific data scopes you approve through the applicable OAuth consent now, subject to these Terms, the Privacy Policy, and the applicable third-party platform terms.
    </p>

    <p>
      We do not request or store your social media passwords. Depending on the category, Cookies, Pixels, SDKs, and Local Storage may be used for purposes such as: (a) operating the Website and enabling core functionality (including security and fraud prevention); (b) remembering your preferences and settings; (c) understanding and improving Website performance and user experience through analytics; and (d) if enabled in the future, supporting advertising/marketing activities (for example, measuring campaign effectiveness).
    </p>
  </div>
</section>

            {/* 4. LAWFUL BASIS */}
<section id="lawful-basis">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">4. Lawful bases and performance (EU, UK & Africa)</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      Our use of non-essential cookies and similar technologies (as described in section 2.2, 2.3, and 2.4 above) is based on your Consent. 
    </p>

    <p>
      If you are located in the EU, UK or Africa, we rely on Consent to set and access non-essential cookies and similar technologies on your device.
    </p>

    <p>
      By Consent, we mean your freely given, specioc, informed, and unambiguous indication of your wishes, signioed by a clear affirmative action, as required under applicable EU/UK laws for non-essential cookies.
    </p>
  </div>
</section>

            {/* 5. MANAGE PREFERENCES */}
            <section id="manage">
            <h2 className="text-[28px] font-normal mb-6 text-[#040136]">5. How to manage your cookie preferences</h2>
            
            <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
                <p>
                5.1 Manage preferences via our cookie banner. You can manage your cookie preferences at any time by using the cookie settings available through our cookie consent banner (for example, by selecting "Cookie Settings" or a similarly labeled control). If you previously consented to non-essential cookies, you may withdraw Consent through the banner, and we will apply your updated preferences going forward.
                </p>

                <p>
                5.2 Manage preferences via your browser or device. Most browsers allow you to control cookies through their settings preferences (for example, to delete existing cookies, block cookies, or receive alerts before a cookie is stored). If you disable cookies using browser settings, strictly necessary cookies may still be placed (where permitted) and certain features of the Website may not function. For mobile devices, you may also be able to reset your device identifier and limit certain tracking through your device settings.
                </p>

                <p>
                5.3 Local Storage and similar technologies. Some preferences may be stored using Local Storage or similar technologies. You may be able to clear Local Storage through your browser settings (for example, by clearing site data) which may also remove saved preferences.
                </p>
            </div>
            </section>

            {/* 6. THIRD-PARTY COOKIES AND SERVICE PROVIDERS */}
<section id="third-party">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">6. Third-Party cookies and service providers</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      Some cookies and similar technologies may be set by third parties that provide services to us, such as analytics, performance monitoring, content delivery, or security. Where we use third-party providers, they may collect information about your device and your interactions with the Website subject to their own privacy/cookie notices.
    </p>

    <p>
      Our current and potential third-party cookie/service provider categories may include: (a) analytics providers; (b) performance monitoring providers; (c) security/fraud prevention providers; and (d) content delivery/network providers. We will update this Cookie Policy if we materially change the third parties that set cookies or similar technologies on the Website.
    </p>
  </div>
</section>

{/* 7. RETENTION/DURATION OF COOKIES */}
<section id="retention">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">7. Retention/Duration of cookies</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      We do not scrape, crawl, spider, harvest, extract, or otherwise collect data from the Services or any outputs (including scores, rankings, or creator portfolio information) by automated means without our prior written consent; bypass or circumvent any access controls, rate limits, or security measures; or use any method to systematically download, copy, or reproduce any portion of the Services.
    </p>
  </div>
</section>

{/* 8. DO NOT TRACK */}
<section id="dnt">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">8. Do not track</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      We do not currently respond to "Do Not Track" (DNT) browser signals. For more information about our privacy practices, please see our Privacy Policy.
    </p>
  </div>
</section>

{/* 9. UPDATES TO THIS COOKIES POLICY */}
<section id="updates">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">9. Updates to this cookies policy</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      We may update this Cookie Policy from time to time to reflect changes in the cookies and similar technologies we use, or for other operational, legal, or regulatory reasons. When we do, we will revise the "Last Updated" date at the top of this Cookie Policy. Where required by applicable law, we will provide additional notice and/or seek your Consent again (for example, if we introduce new non-essential cookies or materially change how they are used).
    </p>
  </div>
</section>

            {/* 10. CONTACT US */}
<section id="contact">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">10. Contact us</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      If you have questions about this Cookie Policy or our use of cookies and similar technologies, please contact us at 
      <a href="mailto:contact@starixapp.com" className="hover:underline ml-1">contact@starixapp.com</a>. 
      If you wish to contact our Data Protection Officer (DPO), please email 
      <a href="mailto:dpo@starixapp.com" className="hover:underline ml-1">dpo@starixapp.com</a>.
    </p>
  </div>
</section>

{/* 11. RELATED POLICIES */}
<section id="review">
  <h2 className="text-[28px] font-normal mb-6 text-[#040136]">11. Related policies</h2>
  
  <div className="space-y-6 text-[#6E6E6E] text-[20px] leading-relaxed font-light">
    <p>
      5.1 Your Content and responsibility. You are solely responsible for your Content and for ensuring you have all rights necessary to submit or display Content through the Services (including rights from any third-party platforms). You represent and warrant that your Content and our use of it as permitted by these Terms will not violate any law or any third party rights.
    </p>
  </div>
</section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CookiesPolicy;