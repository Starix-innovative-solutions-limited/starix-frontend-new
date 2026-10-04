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

export default function CookieArticle() {
  return (
    <article className="space-y-14 text-[15px] leading-[1.75] text-[#5F6368] md:space-y-16 md:text-[16px] md:leading-[1.8] xl:text-[17px]">
      <section id="about" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          About this Cookie Policy
        </h2>
        <div className="space-y-4">
          <P>
            This Cookie Policy (this “Cookie Policy”) explains how STARIX INNOVATIVE
            SOLUTIONS LIMITED (Starix, “we”, “us”, or “our”) uses cookies and similar
            tracking technologies when you visit{" "}
            <Ext href="https://starixapp.com">starixapp.com</Ext> (the “Website”)
            (excluding subdomains). It also explains your choices, including how to
            manage your preferences using our cookie consent banner. This Cookie Policy
            should be read together with our <PrivacyLink /> (the “Privacy Policy”).
          </P>
        </div>
      </section>

      <section id="definitions" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          1. Definitions
        </h2>
        <div className="space-y-4">
          <P>For the purpose of this Cookie Policy:</P>
          <Ul>
            <li>
              “Cookies” are small text files placed on your device (computer, smartphone,
              tablet) by websites that you visit. Cookies may be “session cookies”
              (deleted when you close your browser) or “persistent cookies” (remain on
              your device until they expire or are deleted).
            </li>
            <li>
              “Pixels” (also called “web beacons” or “tags”) are small pieces of code that
              allow a website or third party to collect information about how users
              interact with a webpage (for example, page views or conversions).
            </li>
            <li>
              “SDKs” (software development kits) are code libraries included in
              applications or websites that may allow data to be collected or shared with
              third parties (for example, for analytics or performance monitoring).
            </li>
            <li>
              “Local Storage” (including browser local storage and similar technologies)
              refers to data stored locally on your device by your browser or app, which
              may be used to remember preferences or support functionality and may
              operate similarly to cookies.
            </li>
            <li>
              “Non-essential cookies” are cookies and similar technologies that are not
              strictly necessary to provide the Website you request (for example,
              analytics and marketing cookies).
            </li>
            <li>
              “Strictly necessary cookies” are cookies and similar technologies required
              for the Website to function and to provide the service you request (for
              example, security and load balancing).
            </li>
            <li>
              “Consent” means your freely given, specific, informed, and unambiguous
              indication of your wishes, signified by a clear affirmative action, as
              required under applicable EU/UK laws for non-essential cookies.
            </li>
          </Ul>
        </div>
      </section>

      <section id="categories" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          2. Categories of cookies and similar technologies we use
        </h2>
        <div className="space-y-4">
          <P>
            We use (or may use) the following categories of Cookies, Pixels, SDKs, and
            Local Storage on the Website:
          </P>
          <Sub>2.1 Strictly necessary cookies</Sub>
          <P>
            These technologies are required for the Website to operate and cannot be
            switched off in our systems. They are usually set in response to actions made
            by you which amount to a request for services (for example, setting your
            privacy preferences, logging in (if applicable), filling in forms, security,
            fraud prevention, and load balancing). You can set your browser to block or
            alert you about these technologies, but some parts of the Website may not
            work.
          </P>
          <Sub>2.2 Functional / preferences cookies</Sub>
          <P>
            These technologies enable the Website to provide enhanced functionality and
            personalization (for example, remembering choices you make such as language
            or region, and remembering settings you apply). If you do not allow these
            technologies, some or all of these services may not function properly.
          </P>
          <Sub>2.3 Analytics / performance cookies</Sub>
          <P>
            These technologies allow us (and our service providers) to count visits and
            traffic sources and understand how visitors move around the Website, so we
            can measure and improve the performance of the Website (for example, which
            pages are the most and least popular and whether visitors encounter errors).
            If you do not allow these technologies, we will not know when you have
            visited the Website and may not be able to improve it as effectively.
          </P>
          <Sub>2.4 Advertising / marketing cookies</Sub>
          <P>
            These technologies may be used to deliver content and advertisements that
            are more relevant to you and your interests, and to measure the
            effectiveness of campaigns. As of the Effective date of this Cookie Policy, we
            do not use advertising/marketing cookies on the Website. If we introduce
            advertising/marketing cookies in the future, we will do so only after
            providing appropriate notice and, where required under EU/UK law, obtaining
            your prior opt-in Consent via our cookie consent banner.
          </P>
        </div>
      </section>

      <section id="social-media" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          3. Social media OAuth integrations
        </h2>
        <div className="space-y-4">
          <P>
            If you choose to connect third-party social media accounts (e.g., Instagram,
            Facebook, TikTok, YouTube), you authorize us to access and process public
            data and the specific data scopes you approve through the applicable OAuth
            consent flow, subject to these Terms, the <PrivacyLink />, and the applicable
            third-party platform terms. We do not request or store your social media
            passwords.
          </P>
          <P>
            Depending on the category, Cookies, Pixels, SDKs, and Local Storage may be
            used for purposes such as: (a) operating the Website and enabling core
            functionality (including security and fraud prevention); (b) remembering your
            preferences and settings; (c) understanding and improving Website
            performance and user experience through analytics; and (d) if enabled in the
            future, supporting advertising/marketing activities (for example, measuring
            campaign effectiveness).
          </P>
        </div>
      </section>

      <section id="lawful-basis" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          4. Lawful basis and consent mechanics (EU/UK)
        </h2>
        <div className="space-y-4">
          <P>
            Where EU/UK data protection and ePrivacy rules apply, we rely on: (a)
            necessity to provide the Website you request for strictly necessary cookies
            and similar technologies; and (b) your Consent for non-essential cookies and
            similar technologies (including functional/preferences and
            analytics/performance cookies, and any future advertising/marketing
            cookies). Our cookie consent banner is designed to request your opt-in
            Consent before we set non-essential cookies. You may withdraw or change
            your Consent at any time (see Section 5).
          </P>
        </div>
      </section>

      <section id="manage" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          5. How to manage your cookie preferences
        </h2>
        <div className="space-y-4">
          <Sub>5.1 Manage preferences via our cookie banner</Sub>
          <P>
            You can manage your cookie preferences at any time by using the cookie
            settings available through our cookie consent banner (for example, by
            selecting “Cookie Settings” or a similarly labeled control). If you previously
            consented to non-essential cookies, you may withdraw Consent through the
            banner, and we will apply your updated preferences going forward.
          </P>
          <Sub>5.2 Manage preferences via your browser or device</Sub>
          <P>
            Most browsers allow you to control cookies through their settings preferences
            (for example, to delete existing cookies, block cookies, or receive alerts
            before a cookie is stored). If you disable cookies using browser settings,
            strictly necessary cookies may still be placed (where permitted) and certain
            features of the Website may not function. For mobile devices, you may also be
            able to reset your device identifier and limit certain tracking through your
            device settings.
          </P>
          <Sub>5.3 Local Storage and similar technologies</Sub>
          <P>
            Some preferences may be stored using Local Storage or similar technologies.
            You may be able to clear Local Storage through your browser settings (for
            example, by clearing site data) which may also remove saved preferences.
          </P>
        </div>
      </section>

      <section id="third-party" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          6. Third-party cookies and service providers
        </h2>
        <div className="space-y-4">
          <P>
            Some cookies and similar technologies may be set by third parties that
            provide services to us, such as analytics, performance monitoring, content
            delivery, or security. Where we use third-party providers, they may collect
            information about your device and your interactions with the Website subject
            to their own privacy/cookie notices.
          </P>
          <P>Our current and potential third-party cookie/service provider categories may include:</P>
          <Ul>
            <li>analytics providers: [Vendor name(s)]</li>
            <li>performance monitoring providers: [Vendor name(s)]</li>
            <li>security/fraud prevention providers: [Vendor name(s)]</li>
            <li>content delivery/network providers: [Vendor name(s)]</li>
          </Ul>
          <P>
            We will update this Cookie Policy if we materially change the third parties
            that set cookies or similar technologies on the Website.
          </P>
        </div>
      </section>

      <section id="retention" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          7. Retention / duration of cookies
        </h2>
        <div className="space-y-4">
          <P>
            We do not scrape, crawl, spider, harvest, extract, or otherwise collect data
            from the Services or any outputs (including scores, rankings, or creator
            portfolio information) by automated means without our prior written consent;
            bypass or circumvent any access controls, rate limits, or security measures;
            or use any method to systematically download, copy, or reproduce any
            portion of the Services.
          </P>
        </div>
      </section>

      <section id="dnt" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          8. Do Not Track
        </h2>
        <div className="space-y-4">
          <P>
            We do not currently respond to “Do Not Track” (DNT) browser signals. For more
            information about our privacy practices, please see our <PrivacyLink />.
          </P>
        </div>
      </section>

      <section id="updates" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          9. Updates to this Cookie Policy
        </h2>
        <div className="space-y-4">
          <P>
            We may update this Cookie Policy from time to time to reflect changes in the
            cookies and similar technologies we use, or for other operational, legal, or
            regulatory reasons. When we do, we will revise the “Last updated” date at the
            top of this Cookie Policy. Where required by applicable law, we will provide
            additional notice and/or seek your Consent again (for example, if we
            introduce new non-essential cookies or materially change how they are used).
          </P>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          10. Contact us
        </h2>
        <div className="space-y-4">
          <P>
            If you have questions about this Cookie Policy or our use of cookies and
            similar technologies, please contact us at{" "}
            <Mail address="contact@starixapp.com" />. If you wish to contact our Data
            Protection Officer (DPO), please email <Mail address="dpo@starixapp.com" />.
          </P>
        </div>
      </section>

      <section id="related-policies" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          11. Related policies
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
    </article>
  );
}
