import Link from "next/link";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#0033FF] underline decoration-[#0033FF]/30 underline-offset-2 hover:decoration-[#0033FF]"
    >
      {children}
    </a>
  );
}

function Mail({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="text-[#0033FF] underline decoration-[#0033FF]/30 underline-offset-2 hover:decoration-[#0033FF]"
    >
      {address}
    </a>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 text-[18px] font-medium tracking-[-0.02em] text-[#040136] md:text-[20px]">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 md:pl-6">{children}</ul>;
}

function PrivacyLink() {
  return (
    <Link
      href="/privacy"
      className="text-[#0033FF] underline decoration-[#0033FF]/30 underline-offset-2 hover:decoration-[#0033FF]"
    >
      Privacy Policy
    </Link>
  );
}

export default function TermsArticle() {
  return (
    <article className="space-y-14 text-[15px] leading-[1.75] text-[#5F6368] md:space-y-16 md:text-[16px] md:leading-[1.8] xl:text-[17px]">
      <section id="about" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          About these Terms
        </h2>
        <div className="space-y-4">
          <P>
            These Terms of Service (these “Terms”) are a binding agreement between you
            and STARIX INNOVATIVE SOLUTIONS LIMITED (“Starix”, “we”, “us”, or “our”)
            governing your access to and use of our websites, applications, dashboards,
            APIs, and related services (collectively, the “Services”). These Terms apply to
            individual users (including creators) and businesses (including brands,
            agencies, and other organizations) (together, “Users”). By accessing or using
            the Services, you agree to these Terms. You do not need to sign these Terms
            for them to be effective.
          </P>
        </div>
      </section>

      <section id="definitions" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          1. Definitions
        </h2>
        <P>For purposes of these Terms:</P>
        <Ul>
          <li>
            “Account” means the user account you create to access the Services.
          </li>
          <li>
            “Brand” means a business user using the Services to evaluate, discover,
            engage, or collaborate with creators.
          </li>
          <li>
            “Creator” means a user who connects one or more social media accounts
            and/or provides information for evaluation, analytics, trust scoring, or brand
            matching.
          </li>
          <li>
            “Content” means any text, images, videos, audio, links, posts, submissions,
            profiles, and other materials submitted to, displayed on, or otherwise made
            available through the Services.
          </li>
          <li>
            “Starix Score” or “trust score” means Starix’s AI-assisted scoring outputs,
            rankings, flags, and related trust or authenticity signals generated from public
            and/or user-authorized data.
          </li>
          <li>
            “OAuth” means the third-party authorization flow used to connect social
            media accounts via official APIs.
          </li>
          <li>
            “Privacy Policy” means Starix’s separate privacy policy made available
            through the Services (as updated from time to time).
          </li>
        </Ul>
      </section>

      <section id="services-eligibility" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          2. The Services; eligibility; account registration
        </h2>
        <div className="space-y-4">
          <Sub>2.1 Eligibility</Sub>
          <P>
            You must be at least 16 years old to use the Services. If you are 16 or 17 years
            old, you may use the Services only to the extent permitted by applicable law
            and, where required by applicable law, only if your parent or legal guardian
            consents to your use of the Services and to our processing of your personal
            information as described in our <PrivacyLink />. If you use the Services on
            behalf of an organization, you represent and warrant that you have authority
            to bind that organization, and references to “you” include that organization.
          </P>
          <Sub>2.2 Free platform; future paid features</Sub>
          <P>
            The Services are currently offered free of charge. We may introduce optional
            paid features, subscriptions, premium tiers, or transactional services in the
            future. If we do, we will provide pricing and applicable additional terms before
            you incur charges, and your continued use of any paid feature will constitute
            acceptance of the applicable pricing and terms for that feature.
          </P>
          <Sub>2.3 Accounts</Sub>
          <P>
            You are responsible for maintaining the confidentiality of your Account
            credentials and for all activities that occur under your Account. You agree to
            provide accurate information and to keep your Account information updated.
            We may refuse registration, or suspend or terminate Accounts, in accordance
            with these Terms.
          </P>
        </div>
      </section>

      <section id="privacy-integrations" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          3. Privacy; social media integrations; AI trust scores
        </h2>
        <div className="space-y-4">
          <Sub>3.1 Privacy</Sub>
          <P>
            Our <PrivacyLink /> (available through the Services) explains how we collect,
            use, disclose, retain, and protect personal information. The Privacy Policy is
            incorporated into these Terms by reference. To the extent permitted by
            applicable law, you agree that you have read and understood the Privacy
            Policy. We do not sell your personal information.
          </P>
          <Sub>3.2 Social media OAuth integrations</Sub>
          <P>
            If you choose to connect third-party social media accounts (e.g., Instagram,
            Facebook, TikTok, YouTube), you authorize us to access and process public
            data and the specific data scopes you approve through the applicable OAuth
            consent flow, subject to these Terms, the <PrivacyLink />, and the applicable
            third-party platform terms. We do not request or store your social media
            passwords.
          </P>
          <Sub>3.3 Starix Scores and analytics</Sub>
          <P>
            The Services may provide data-driven insights, analytics, rankings, anomaly
            detection, fraud indicators, and trust signals (including Starix Scores) for
            creators and brands. Starix Scores and related outputs are informational and
            may be based on publicly available data and user-authorized data from
            third-party platforms; they may change over time as data changes or as our
            methodologies evolve.
          </P>
          <Sub>3.4 AI-assisted processing; human review</Sub>
          <P>
            We use automated systems (which may include algorithms and artificial
            intelligence) to generate Starix Scores, rankings, and flags that may influence
            eligibility for certain opportunities on the Services. You may request human
            review of certain automated outputs as described in the <PrivacyLink /> by
            contacting <Mail address="support@starixapp.com" /> with the subject line
            “AI Decision Review Request”.
          </P>
          <Sub>3.5 Disconnecting social accounts</Sub>
          <P>
            You can disconnect a connected third-party account through your account
            settings (or as otherwise made available by the third-party platform). The
            effects of disconnecting (including retention and deletion timelines) are
            described in the <PrivacyLink />.
          </P>
        </div>
      </section>

      <section id="acceptable-use" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          4. Acceptable use
        </h2>
        <div className="space-y-4">
          <Sub>4.1 Compliance</Sub>
          <P>
            You will use the Services only in accordance with these Terms, applicable law,
            and any third-party platform terms that apply to your connected accounts or
            Content.
          </P>
          <Sub>4.2 Prohibited conduct</Sub>
          <P>
            You must not, and must not attempt to, directly or indirectly:
          </P>
          <Ul>
            <li>
              4.2.1 Scrape, crawl, spider, harvest, extract, or otherwise collect data from
              the Services or any outputs (including scores, rankings, or creator portfolio
              information) by automated means without our prior written consent; bypass
              or circumvent any access controls, rate limits, or security measures; or use
              any method to systematically download, copy, or reproduce any portion of
              the Services.
            </li>
            <li>
              4.2.2 Reverse engineer, decompile, disassemble, or otherwise attempt to
              discover source code, underlying ideas, or algorithms of the Services
              (including Starix Score methodologies), except to the limited extent such
              restriction is prohibited by applicable law.
            </li>
            <li>
              4.2.3 Commit fraud, manipulate engagement metrics, purchase
              followers/likes, use bots or automation to create inauthentic activity, or
              otherwise interfere with the integrity of Starix Scores, rankings, or platform
              analytics.
            </li>
            <li>
              4.2.4 Impersonate any person or entity, misrepresent your identity or
              affiliation, or create Accounts for anyone other than yourself (or, if
              applicable, for your organization through an authorized representative).
            </li>
            <li>
              4.2.5 Post, submit, transmit, or make available any Content that is unlawful,
              defamatory, threatening, harassing, hateful, discriminatory, pornographic, or
              that infringes any intellectual property, privacy, or other rights of any person.
            </li>
            <li>
              4.2.6 Probe, scan, or test the vulnerability of any system or network;
              introduce malware; or engage in any activity that could disable, overburden,
              or impair the Services.
            </li>
            <li>
              4.2.7 Use the Services to violate any law or regulation, including data
              protection, consumer protection, advertising, or anti-spam laws; or to
              facilitate illegal goods or services.
            </li>
          </Ul>
          <Sub>4.3 Enforcement</Sub>
          <P>
            We may investigate suspected violations and may suspend or terminate your
            access to the Services, remove or restrict Content, and cooperate with law
            enforcement or regulators where required or appropriate.
          </P>
        </div>
      </section>

      <section id="user-content" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          5. User content; moderation
        </h2>
        <div className="space-y-4">
          <Sub>5.1 Your Content and responsibility</Sub>
          <P>
            You are solely responsible for your Content and for ensuring you have all
            rights necessary to submit or display Content through the Services (including
            rights from any third-party platforms). You represent and warrant that your
            Content and our use of it as permitted by these Terms will not violate any law
            or any third-party rights.
          </P>
        </div>
      </section>

      <section id="platform-ip" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          6. Platform data & intellectual property
        </h2>
        <div className="space-y-4">
          <Sub>User data usage & ownership</Sub>
          <P>
            All personal information, social media data, and content you provide or
            authorize us to access remains your property. We act as a service provider of
            the Services and do not claim ownership of your personal information.
          </P>
          <P>How we use your data:</P>
          <Ul>
            <li>Provide Starix platform functionality (scores, portfolios, leaderboards)</li>
            <li>Calculate Starix Scores and performance rankings</li>
            <li>Facilitate connections between creators and brands</li>
            <li>Detect fraud and maintain platform integrity</li>
            <li>Improve our algorithms and services</li>
            <li>Generate aggregate, anonymized market insights</li>
            <li>Comply with legal obligations</li>
          </Ul>
          <P>We do not:</P>
          <Ul>
            <li>Sell your personal information to third parties</li>
            <li>Use your data for purposes beyond Starix functionality</li>
            <li>Share your data with advertisers for ad targeting</li>
            <li>Train AI models on your private data without consent</li>
          </Ul>
          <Sub>Content & intellectual property rights</Sub>
          <P>
            Content accessed from your connected social media accounts (Instagram,
            TikTok, YouTube, Facebook) remains your property and is subject to the terms
            of those platforms.
          </P>
          <P>
            By connecting social media accounts, you grant Starix a limited,
            non-exclusive, worldwide license to:
          </P>
          <Ul>
            <li>Display your public social media content in your Starix portfolio</li>
            <li>Show your content to brands when you apply to challenges</li>
            <li>Use aggregate, anonymized metrics for platform analytics</li>
            <li>Cache content temporarily for performance optimization</li>
          </Ul>
          <P>
            You can disconnect platforms and revoke this license at any time. You
            maintain all ownership and can use your content elsewhere. We do not claim
            ownership of your creative work.
          </P>
          <P>
            Content you create directly within Starix (profile bio, challenge submissions,
            Circle descriptions) remains your intellectual property. By submitting this
            content, you grant Starix a license to display and distribute it within the
            platform for the purpose of facilitating brand partnerships.
          </P>
          <P>
            All Starix platform technology, algorithms, scoring systems, software, and
            features are the exclusive intellectual property of STARIX INNOVATIVE
            SOLUTIONS LIMITED and are protected by intellectual property laws.
          </P>
          <P>You may not:</P>
          <Ul>
            <li>Reverse engineer our algorithms or scoring systems</li>
            <li>Scrape or extract data from the platform without authorization</li>
            <li>Reproduce or copy platform features without permission</li>
            <li>Use our intellectual property without explicit license</li>
          </Ul>
          <Sub>Data selling prohibition</Sub>
          <P>
            We do not and will never sell, rent, or trade your personal information to
            third parties for their marketing or advertising purposes. Any sharing of
            personal information is described in our <PrivacyLink />.
          </P>
        </div>
      </section>

      <section id="third-party" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          7. Third-party platform terms; API compliance; revocation
        </h2>
        <div className="space-y-4">
          <Sub>Third-party platform terms</Sub>
          <P>
            If you connect a third-party platform account, your use of that third-party
            platform remains subject to its terms and policies. You may revoke Starix’s
            access by disconnecting the applicable account in your Starix settings (and,
            where applicable, through the third-party platform’s app authorization
            settings). Data deletion/retention practices are described in our{" "}
            <PrivacyLink />.
          </P>
          <Sub>Meta platforms (Instagram, Facebook)</Sub>
          <P>Our use of Meta’s APIs is subject to:</P>
          <Ul>
            <li>
              Meta Platform Terms:{" "}
              <Ext href="https://www.facebook.com/terms.php">facebook.com/terms.php</Ext>
            </li>
            <li>
              Meta Platform Policy:{" "}
              <Ext href="https://developers.facebook.com/docs/development/release/policies">
                developers.facebook.com/docs/development/release/policies
              </Ext>
            </li>
            <li>
              Instagram API Terms of Use:{" "}
              <Ext href="https://developers.facebook.com/terms">
                developers.facebook.com/terms
              </Ext>
            </li>
          </Ul>
          <P>
            Meta is not responsible for Starix’s data practices. Our relationship with Meta
            is limited to API access. Your use of Instagram and Facebook is governed by
            Meta’s terms, not Starix’s.
          </P>
          <Sub>TikTok</Sub>
          <P>Our use of TikTok’s API is subject to:</P>
          <Ul>
            <li>TikTok API Terms of Service</li>
            <li>TikTok Developer Policies</li>
            <li>TikTok Community Guidelines</li>
          </Ul>
          <P>
            TikTok is not responsible for Starix’s data practices. Your use of TikTok is
            governed by TikTok’s terms, not Starix’s.
          </P>
          <Sub>YouTube (Google)</Sub>
          <P>Our use of YouTube’s API is subject to:</P>
          <Ul>
            <li>
              YouTube API Services Terms:{" "}
              <Ext href="https://developers.google.com/youtube/terms/api-services-terms-of-service">
                developers.google.com/youtube/terms/api-services-terms-of-service
              </Ext>
            </li>
            <li>
              Google API Services User Data Policy:{" "}
              <Ext href="https://developers.google.com/terms/api-services-user-data-policy">
                developers.google.com/terms/api-services-user-data-policy
              </Ext>
            </li>
            <li>YouTube Terms of Service</li>
          </Ul>
          <P>
            Google is not responsible for Starix’s data practices. Your use of YouTube is
            governed by Google’s terms, not Starix’s.
          </P>
          <P>
            You can revoke Starix’s access to your YouTube data at any time via the
            Google security settings page:{" "}
            <Ext href="https://security.google.com/settings/security/permissions">
              security.google.com/settings/security/permissions
            </Ext>
            .
          </P>
          <Sub>API terms conflicts</Sub>
          <P>
            If any terms of these Terms conflict with the requirements of social media
            platform APIs, the platform’s terms take precedence for data from that
            specific platform.
          </P>
        </div>
      </section>
    </article>
  );
}
