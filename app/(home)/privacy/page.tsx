"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[white] min-h-screen font-['Geist'] text-[#040136]">
      

      {/* --- HERO SECTION (First Image) --- */}
      <section className="pt-32 pb-20 px-6 text-center bg-[#FAFAFA] border-b border-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated Badge */}
          <div className="mb-6">
            <span className="text-[#6E6E6E] text-lg md:text-[24px] font-medium">
              Last Updated: April 2026
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-[56px] md:text-[80px] font-medium text-[#040136] tracking-tight leading-none mb-8">
            Privacy Policy
          </h1>

          {/* Intro Paragraph */}
          <p className="text-[#6E6E6E] font-medium text-xl md:text-[24px] max-w-2xl mx-auto leading-relaxed">
            This Privacy Policy explains how Starix collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION (Second Image Style) --- */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          
          {/* DOWNLOAD BUTTON - Styled like your previous action button but placed below hero */}
          {/* <div className="flex justify-center mb-20">
            <a 
              href="/starix-privacy-policy.pdf" 
              className="inline-flex items-center gap-3 bg-[#040136] text-white px-8 py-4 rounded-xl font-medium hover:scale-[1.02] transition-all shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download Full PDF
            </a>
          </div> */}

          <div className="space-y-12">
            {/* 1. Information We Collect */}
            <div className="space-y-6">
              <h2 className="text-[32px] font-semibold">1. Information We Collect</h2>
              
              <div className="pl-4 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">a. Account Information</h3>
                  <ul className="list-disc pl-6 text-[#6E6E6E] text-lg space-y-2">
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Username</li>
                    <li>Profile details (bio, category, location)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">b. Social Media Data</h3>
                  <p className="text-[#6E6E6E] text-lg mb-2 ">When you connect your accounts, we may collect:</p>
                  <ul className="list-disc pl-6 text-[#6E6E6E] text-lg space-y-2">
                    <li>Follower count</li>
                    <li>Engagement data</li>
                    <li>Content performance metrics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">c. Usage Data</h3>
                  <ul className="list-disc pl-6 text-[#6E6E6E] text-lg space-y-2">
                    <li>Activity on the platform</li>
                    <li>Submissions</li>
                    <li>Interactions with challenges</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">2. How We Use Your Information</h2>
              <p className="text-[#6E6E6E] text-lg">We use your data to:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Provide and operate the platform</li>
                <li>Calculate your Starix Score</li>
                <li>Display rankings and leaderboards</li>
                <li>Enable participation in challenges</li>
                <li>Improve platform performance</li>
              </ul>
            </div>

            {/* 3. Sharing of Information */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">3. Sharing of Information</h2>
              <p className="text-[#6E6E6E] text-lg">We may share information:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>With brands (for evaluating submissions)</li>
                <li>Within the platform (leaderboards, profiles)</li>
              </ul>
              <p className="text-[#6E6E6E] text-lg mt-4">We do not sell your personal data.</p>
            </div>

            {/* 4. Data Retention */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">4. Data Retention</h2>
              <p className="text-[#6E6E6E] text-lg leading-relaxed">
                We retain your data as long as your account is active or as needed to provide services.
              </p>
            </div>

            {/* 5. Security */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">5. Security</h2>
              <p className="text-[#6E6E6E] text-lg mb-4">
                We implement reasonable measures to protect your information, including:
              </p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Secure authentication</li>
                <li>Token-based access</li>
              </ul>
              <p className="text-[#6E6E6E] text-lg  mt-4">However, no system is completely secure.</p>
            </div>

            {/* 6. Your Choices */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">6. Your Choices</h2>
              <p className="text-[#6E6E6E] text-lg">You may:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Update your profile information</li>
                <li>Disconnect social accounts</li>
                <li>Delete your account</li>
              </ul>
            </div>

            {/* 7. Children's Privacy */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">7. Children’s Privacy</h2>
              <p className="text-[#6E6E6E] text-lg leading-relaxed">
                Starix is not intended for users under 13. We do not knowingly collect data from children under this age.
              </p>
            </div>

            {/* 8. Changes to This Policy */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">8. Changes to This Policy</h2>
              <p className="text-[#6E6E6E] text-lg leading-relaxed">
                We may update this Privacy Policy from time to time. Continued use means you accept the changes.
              </p>
            </div>

            {/* 9. Contact */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">9. Contact</h2>
              <p className="text-[#6E6E6E] text-lg">
                For privacy-related questions: <a href="mailto:contact@starixapp.com" className="text-blue-600 underline">contact@starixapp.com</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Space */}
      <div className="h-20" />
    </div>
  );
};

export default PrivacyPolicy;