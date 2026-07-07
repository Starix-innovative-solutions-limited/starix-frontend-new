"use client";

import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-white min-h-screen font-['Geist'] text-[#040136]">
      {/* --- HERO SECTION  --- */}
      <section className="pt-32 pb-20 bg-[#FAFAFA] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-[#6E6E6E] text-lg md:text-xl font-medium">
              Last Updated: April 2026
            </span>
          </div>
          <h1 className="text-[56px] md:text-[80px] font-medium tracking-tight leading-none mb-8">
            Terms of Service
          </h1>
          <p className="text-[#6E6E6E] font-medium text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            These Terms of Service (“Terms”) govern your access to and use of the 
            Starix platform, including all features, content, and services.
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION  --- */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px]  mx-auto">
          <div className="mb-12">
            <p className="text-[#6E6E6E] text-[16px] font-medium">
              By creating an account or using Starix, you agree to these Terms.
            </p>
          </div>
          <div className="space-y-12">
            {/* 1. Eligibility */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">1. Eligibility</h2>
              <p className="text-[#6E6E6E] text-lg">You must be at least 13 years old to use Starix.</p>
              <div className="space-y-2">
                <p className="text-[#6E6E6E] text-lg">By using the platform, you confirm that:</p>
                <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                  <li>You meet the minimum age requirement.</li>
                  <li>You have the authority to enter into these Terms.</li>
                </ul>
              </div>
            </div>

            {/* 2. Your Account */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">2. Your Account</h2>
              <p className="text-[#6E6E6E] text-lg">You agree to:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Keep your login credentials secure</li>
                <li>Be responsible for all activity under your account</li>
              </ul>
              <p className="text-[#6E6E6E] text-lg mt-4">Starix reserves the right to suspend or terminate accounts that violate these Terms.</p>
            </div>

            {/* 3. Platform Overview */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">3. Platform Overview</h2>
              <p className="text-[#6E6E6E] text-lg">Starix is a platform where:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Brands create challenges</li>
                <li>Creators submit content</li>
                <li>Submissions are evaluated</li>
                <li>Winners may receive rewards</li>
              </ul>
              <p className="text-[#040136] font-medium text-sm">Starix does not guarantee selection, visibility, or earnings.</p>
            </div>

            {/* 4. Creator Responsibilities */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">4. Creator Responsibilities</h2>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Submit original content or content you have rights to use</li>
                <li>Follow challenge requirements (including hashtags, mentions, and formats)</li>
                <li>Provide accurate information</li>
              </ul>
              <p className="text-[#6E6E6E] text-lg mt-4">You are solely responsible for the content you submit.</p>
            </div>

            {/* 5. Brand Responsibilities */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">5. Brand Responsibilities</h2>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Provide clear challenge requirements</li>
                <li>Define reward structures accurately</li>
                <li>Review submissions fairly</li>
                <li>Distribute rewards as stated</li>
              </ul>
            </div>

            {/* 6. Submissions */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">6. Submissions</h2>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>You grant Starix the right to display and use your submission within the platform</li>
                <li>You confirm that your submission complies with all applicable laws and platform rules</li>
              </ul>
              <p className="text-[#6E6E6E] text-lg mt-2">Starix does not claim ownership of your content.</p>
            </div>

            {/* 7. Starix Score and Rankings */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">7. Starix Score and Rankings</h2>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Scores range from 0 to 100</li>
                <li>Rankings may change dynamically</li>
                <li>Scores and standings are provided "as is"</li>
              </ul>
              <p className="text-[#6E6E6E] text-lg">Starix does not guarantee accuracy, outcomes, or performance results.</p>
            </div>

            {/* 8. Creator Circles */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">8. Creator Circles</h2>
              <p className="text-[#6E6E6E] text-lg">Creators may form groups (“Circles”) with up to 5 members. Circles may define revenue splits (Total split must equal 100%).</p>
            </div>

            {/* 9. Payments and Rewards */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">9. Payments and Rewards</h2>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Rewards are determined and distributed by brands</li>
                <li>Starix is not responsible for payment disputes between users</li>
              </ul>
            </div>

            {/* 10. Prohibited Conduct */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">10. Prohibited Conduct</h2>
              <p className="text-[#6E6E6E] text-lg">You agree not to:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Submit fake, misleading, or fraudulent content</li>
                <li>Violate intellectual property rights</li>
                <li>Attempt to manipulate rankings or scores</li>
                <li>Abuse or exploit the platform</li>
              </ul>
            </div>

            {/* 11. Suspension and Termination */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">11. Suspension and Termination</h2>
              <p className="text-[#6E6E6E] text-lg">Starix may suspend or terminate accounts that:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Violate these Terms</li>
                <li>Engage in harmful or abusive behavior</li>
                <li>Attempt to manipulate platform systems</li>
              </ul>
            </div>

            {/* 12. Disclaimer of Warranties */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">12. Disclaimer of Warranties</h2>
              <p className="text-[#6E6E6E] text-lg">Starix is provided “as is” and “as available.
                ”We do not guarantee:</p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                <li>Continuous availability</li>
                <li>Accuracy of scores or rankings</li>
                <li>Selection or earnings</li>
                
              </ul>
            </div>

            {/* 13. Limitation of Liability */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">13. Limitation of Liability</h2>
              <p className="text-[#6E6E6E] text-lg">To the fullest extent permitted by law, Starix is not liable for:
                
              </p>
              <ul className="list-disc pl-10 text-[#6E6E6E] text-lg space-y-2">
                  <li>Loss of earnings</li>
                  <li>Platform interruptions</li>
                  <li>User disputes</li>
                </ul>
            </div>

            {/* 14. Changes to these Terms */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">14. Changes to these Terms </h2>
              <p className="text-[#6E6E6E] text-lg">We may update these Terms from time to time. </p>
              <p className="text-[#6E6E6E] text-lg">Continued use of the platform means you accept the updated Terms.</p>

            </div>

            {/* 15. Contact */}
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold mb-4">15. Contact</h2>
              <p className="text-[#6E6E6E] text-lg">
                For questions, contact: <a href="mailto:Starix@mail.com" className="text-blue-600 hover:underline font-medium transition-colors">Starix@mail.com</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-32" />
    </div>
  );
};

export default TermsOfService;