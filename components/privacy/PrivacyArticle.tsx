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

export default function PrivacyArticle() {
  return (
    <article className="space-y-14 text-[15px] leading-[1.75] text-[#5F6368] md:space-y-16 md:text-[16px] md:leading-[1.8] xl:text-[17px]">
      <section id="about" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          About this notice
        </h2>
        <div className="space-y-4">
          <P>
            This Privacy Notice for STARIX INNOVATIVE SOLUTIONS LIMITED (also referred to
            as “we,” “us,” or “our”) describes how and why we might access, collect, store,
            use, and/or share (“process”) your personal information when you use our
            services.
          </P>
          <P>
            For most processing described in this Privacy Notice, we act as a data
            controller (or equivalent role under applicable law). Where we process personal
            information on behalf of a business customer or brand partner in connection
            with a specific campaign or engagement, we may act as a processor/service
            provider (or equivalent role) and will process such information only on
            documented instructions and for the purposes described.
          </P>
          <P>Some of these services include, but are not limited to:</P>
          <Ul>
            <li>
              Visiting our website at{" "}
              <Ext href="https://starixapp.com">starixapp.com</Ext> or any website of
              ours that links to this Privacy Notice.
            </li>
            <li>Use of Starix.</li>
            <li>Engaging with us in other related ways, including any marketing or events.</li>
          </Ul>
          <P>
            Starix is a technology platform that provides data-driven insights, analytics,
            and trust signals for digital creators, brands, and online platforms. The
            service collates, aggregates, and analyzes publicly available and
            user-authorized data from social media platforms and other third-party
            services to generate trust scores, performance insights, and trend
            intelligence. Simply put, Starix sorts relevant data in the public domain and
            uses this data as a tool to generate performance insights and trend
            intelligence for the benefit of brands and creators alike.
          </P>
          <P>
            Starix uses automated systems, including algorithms and artificial
            intelligence, to evaluate engagement patterns, detect anomalies, and support
            transparency and informed decision-making. Specifically, we use AI to analyze
            public social media engagement and create “trust scores” for creators. These
            scores are based on engagement frequency, sentiment analysis, and consistency
            metrics. These scores may influence brand collaboration opportunities. The
            platform may include web and mobile applications, APIs, dashboards, and
            related tools.
          </P>
        </div>
      </section>

      <section id="information-we-collect" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          1. What information do we collect?
        </h2>
        <div className="space-y-4">
          <Sub>Personal information you disclose to us</Sub>
          <P>
            We collect personal information that you voluntarily provide to us when you
            register on the Services, express an interest in obtaining information about
            us or our products and Services, when you participate in activities on the
            Services, or otherwise when you contact us.
          </P>
          <P>
            We at Starix do not access personal information from your connected accounts
            beyond what you voluntarily provide to us or explicitly authorize through the
            relevant platform’s consent (OAuth) flow.
          </P>
          <P>The personal information we collect may include the following:</P>
          <Ul>
            <li>Names</li>
            <li>Phone numbers</li>
            <li>Email addresses</li>
            <li>Job titles</li>
            <li>Usernames</li>
            <li>Passwords</li>
            <li>Contact preferences</li>
            <li>Billing addresses</li>
            <li>Contact or authentication data</li>
            <li>Debit/credit card numbers</li>
            <li>Brand details</li>
            <li>Brand website/URL</li>
            <li>Creator account details</li>
            <li>Account details</li>
          </Ul>
          <P>
            <span className="font-medium text-[#040136]">Sensitive information.</span> We
            do not process sensitive information.
          </P>
          <P>
            <span className="font-medium text-[#040136]">Payment data.</span> We may
            collect data necessary to process your payment if you choose to make
            purchases, such as your payment instrument number and the security code
            associated with your payment instrument. All payment data is handled and
            stored by Paystack. You may find their privacy notice{" "}
            <Ext href="https://paystack.com/compliance">here</Ext>.
          </P>

          <Sub>Social media integration data</Sub>
          <P>
            When you connect your social media accounts (Instagram, Facebook, TikTok,
            YouTube), we collect public profile information and performance metrics via
            official platform APIs using OAuth 2.0 authorization.
          </P>
          <P>Some of the information collected via APIs includes:</P>
          <Ul>
            <li>Profile information (username, follower counts, bio, profile picture)</li>
            <li>
              Content metrics (post performance, engagement rates, reach, impressions)
            </li>
            <li>Audience insights (demographics — aggregated and anonymized)</li>
            <li>Growth trends and posting consistency data</li>
          </Ul>
          <P>
            We collect only data you explicitly authorize during the OAuth consent flow.
            See Section 7A for comprehensive details about social media data collection,
            usage, and your control options.
          </P>
          <P>Information that we do not process:</P>
          <Ul>
            <li>Private messages or direct communications</li>
            <li>Private/draft content</li>
            <li>Passwords or login credentials</li>
            <li>Personal contact lists</li>
            <li>Non-public account information</li>
          </Ul>

          <Sub>Information automatically collected</Sub>
          <P>
            Some information such as your Internet Protocol (IP) address and/or browser
            and device characteristics is collected automatically when you visit our
            Services.
          </P>
        </div>
      </section>

      <section id="how-we-process" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          2. How do we process your information?
        </h2>
        <P>
          We process your information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply with
          law.
        </P>
      </section>

      <section id="legal-bases" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          3. What legal bases do we rely on to process your information?
        </h2>
        <P>
          We only process your personal information when we believe it is necessary and
          we have a valid legal reason (i.e., legal basis) to do so under applicable
          law. If you are in the EU, UK, or Africa, we rely on consent, performance of a
          contract, legitimate interests (specifically to analyze usage and diagnose
          problems), and legal obligations.
        </P>
      </section>

      <section id="sharing" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          4. When and with whom do we share your personal information?
        </h2>
        <div className="space-y-4">
          <P>
            We may share information in specific situations and with specific categories
            of third parties, such as vendors, consultants, and other third-party
            service providers (i.e. cloud computing services, data analytics services,
            payment processors like Paystack).
          </P>
          <P>
            We share minimal data with social media platforms (Instagram, Facebook,
            TikTok, YouTube) only as necessary to:
          </P>
          <Ul>
            <li>Authenticate your account via OAuth</li>
            <li>Retrieve authorized data via their APIs</li>
            <li>Comply with their platform terms</li>
          </Ul>
          <P>
            We do not share your Starix data (scores, challenge participation, earnings)
            back to these platforms. Data flow is one-way: from platforms to Starix
            only.
          </P>
          <Sub>Brands & campaign partners</Sub>
          <P>
            When you participate in brand challenges or apply for partnerships:
          </P>
          <Ul>
            <li>
              Brands can view your public creator portfolio (which includes social media
              metrics you’ve chosen to display)
            </li>
            <li>Brands can see your Starix Score and leaderboard ranking</li>
            <li>
              Brands cannot see raw social media data, private information, or detailed
              analytics beyond what you publicly display (for example, we do not provide
              brands with API responses, post-level raw export files, or
              follower/audience lists)
            </li>
          </Ul>
          <P>
            You control what appears in your public portfolio through your profile
            settings.
          </P>
        </div>
      </section>

      <section id="cookies" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          5. Do we use cookies and other tracking technologies?
        </h2>
        <P>
          We may use cookies and similar tracking technologies (like web beacons and
          pixels) to gather information when you interact with our Services. Specific
          information about how we use such technologies is set out in our Cookie
          Notice:{" "}
          <Link
            href="/cookies"
            className="text-[#0033FF] underline decoration-[#0033FF]/30 underline-offset-2 hover:decoration-[#0033FF]"
          >
            starixapp.com/cookies
          </Link>
          .
        </P>
      </section>

      <section id="ai-products" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          6. Do we offer artificial intelligence-based products?
        </h2>
        <div className="space-y-4">
          <P>
            Yes. We use artificial intelligence, machine learning, and automated
            decision-making systems to enable key AI-powered features.
          </P>
          <Sub>Starix Score calculation</Sub>
          <P>We use algorithms and machine learning to calculate your Starix Score by analyzing:</P>
          <Ul>
            <li>Engagement patterns across social media platforms</li>
            <li>Content performance trends over time</li>
            <li>Audience growth and consistency</li>
            <li>Authenticity signals and fraud indicators</li>
          </Ul>
          <Sub>Fraud detection</Sub>
          <P>
            We use AI to detect artificial engagement, purchased followers, and
            suspicious activity patterns that may indicate inauthentic influence. This
            helps ensure that followership, account growth, and progress are organic.
          </P>
          <Sub>Content analysis</Sub>
          <P>
            We use automated systems to categorize content, identify trends, and match
            creators with relevant brand opportunities.
          </P>
          <Sub>Leaderboard rankings</Sub>
          <P>
            We use algorithms to rank creators fairly based on performance data,
            normalizing platform differences and creator niche.
          </P>
          <Sub>How AI affects you</Sub>
          <P>
            <span className="font-medium text-[#040136]">Automated decisions.</span> Your
            Starix Score and leaderboard rankings are generated automatically using AI.
            These scores may significantly affect your opportunities, as brands use
            scores to evaluate and select creators for campaigns.
          </P>
          <P>
            <span className="font-medium text-[#040136]">Transparency & explanation.</span>{" "}
            When AI makes decisions that affect you (such as fraud flags or score
            reductions), we will:
          </P>
          <Ul>
            <li>Notify you of the decision</li>
            <li>Explain the key factors that influenced the decision in plain language</li>
            <li>
              Provide information about the data sources used (e.g., “sudden follower
              spike detected on Instagram”)
            </li>
          </Ul>
          <P>
            <span className="font-medium text-[#040136]">Human review right.</span> If
            you believe an AI-generated score, ranking, or fraud flag is inaccurate, you
            have the right to:
          </P>
          <Ul>
            <li>Request human review of the automated decision</li>
            <li>Submit evidence supporting your case</li>
            <li>Receive a response within 14 business days</li>
            <li>Appeal the decision if you disagree</li>
          </Ul>
          <P>
            To request human review, contact{" "}
            <Mail address="support@starixapp.com" /> with the subject line “AI Decision
            Review Request”.
          </P>
          <P>
            <span className="font-medium text-[#040136]">AI data handling.</span> All
            personal information processed by our AI systems is handled according to
            this Privacy Policy. We:
          </P>
          <Ul>
            <li>Use only data you’ve provided or authorized us to collect</li>
            <li>Do not train AI models on your private data without consent</li>
            <li>Regularly audit AI models for bias, fairness, and accuracy</li>
            <li>Update algorithms to improve fairness and reduce discriminatory outcomes</li>
          </Ul>
          <P>
            <span className="font-medium text-[#040136]">Third-party AI services.</span>{" "}
            We may use third-party AI services for natural language processing (content
            categorization), image analysis (content quality assessment), and fraud
            detection (pattern recognition). These providers are contractually required
            to process data only according to our instructions, maintain security and
            privacy standards equivalent to ours, and not use your data for their own
            purposes.
          </P>
        </div>
      </section>

      <section id="social-logins" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          7. How do we handle your social logins?
        </h2>
        <div className="space-y-4">
          <P>
            If you choose to register or log in to our Services using a social media
            account, we may have access to certain information about you. We will use
            the information we receive only for the purposes that are described in this
            Privacy Notice.
          </P>

          <Sub>7A. Social media integrations & data collection</Sub>
          <P>
            Starix integrates with multiple social media platforms to provide
            comprehensive creator performance analytics. When you connect your social
            media accounts to Starix, we access and process publicly available data and
            data you explicitly authorize us to access through official platform APIs.
          </P>
          <P>Supported platforms:</P>
          <Ul>
            <li>Instagram (via Meta Graph API)</li>
            <li>Facebook (via Meta Graph API)</li>
            <li>TikTok (via TikTok API for Developers)</li>
            <li>YouTube (via YouTube Data API)</li>
            <li>Additional platforms may be added in the future</li>
          </Ul>
          <P>
            All social media connections use OAuth 2.0 authorization, which means you
            are redirected to the social media platform’s official authorization page;
            you explicitly grant Starix permission to access specific data scopes; the
            platform provides us with a secure access token (never your password); we
            use this token to retrieve only the data you authorized; and you can revoke
            access at any time through your Starix settings or directly through the
            platform’s app authorization settings.
          </P>
          <P>General principles (all platforms):</P>
          <Ul>
            <li>We collect only public data and explicitly authorized data</li>
            <li>We never access private messages, contacts, or non-public content</li>
            <li>
              We never post, publish, or modify content without your explicit permission
            </li>
            <li>
              We use data solely for Starix Score calculation, portfolios, and platform
              functionality
            </li>
            <li>You can disconnect any platform at any time</li>
            <li>Data from disconnected platforms is deleted within 90 days</li>
          </Ul>

          <Sub>7A.2 Instagram integration (Meta Graph API)</Sub>
          <P>What Instagram data we collect — profile information:</P>
          <Ul>
            <li>Instagram username and display name</li>
            <li>Public profile picture</li>
            <li>Follower count and following count</li>
            <li>Public bio and website URL</li>
            <li>Account type (personal, creator, business)</li>
            <li>Verification status</li>
          </Ul>
          <P>Content & performance metrics:</P>
          <Ul>
            <li>List of your public posts (photos, videos, Reels, Stories highlights)</li>
            <li>
              Post performance metrics (likes, comments, shares, saves, reach,
              impressions)
            </li>
            <li>Post dates, timestamps, and captions</li>
            <li>Hashtags used</li>
            <li>Engagement rates and trends</li>
            <li>Reel-specific metrics (plays, average watch time)</li>
          </Ul>
          <P>Insights data (for Creator/Business accounts):</P>
          <Ul>
            <li>Audience demographics (age, gender, location — aggregated only)</li>
            <li>Reach and impressions</li>
            <li>Profile views</li>
            <li>Website clicks</li>
          </Ul>
          <P>We do not collect:</P>
          <Ul>
            <li>Private or draft content</li>
            <li>Direct messages (DMs)</li>
            <li>Personal contact information beyond public profile</li>
            <li>Private account content (if your account is private)</li>
            <li>Stories (unless saved as highlights)</li>
            <li>Information about your followers or following beyond counts</li>
          </Ul>
          <P>How we use Instagram data:</P>
          <Ul>
            <li>Calculate your Starix Score based on engagement quality</li>
            <li>Display best-performing content in your creator portfolio</li>
            <li>Rank you on challenge leaderboards</li>
            <li>Detect artificial engagement or fraud patterns</li>
            <li>Show brands your content performance and audience reach</li>
            <li>Generate aggregate market insights (non-personal)</li>
          </Ul>
          <P>
            We comply with Meta’s Platform Terms and Instagram API Terms, including: (a)
            using Instagram data only to provide and improve Starix functionality
            requested by you (for example, Starix Score calculation, portfolio display,
            and fraud detection); (b) not selling, renting, licensing, or otherwise
            commercializing Instagram data; (c) not using Instagram data for advertising
            targeting or to build advertising profiles; (d) not providing brands or
            other third parties with raw Instagram API data (we show only the metrics
            and content you choose to display in your public portfolio and summarized
            outputs such as scores/aggregates); and (e) honoring your ability to
            disconnect and control what is displayed.
          </P>
          <P>
            Your use of Instagram is subject to Meta’s Privacy Policy:{" "}
            <Ext href="https://www.facebook.com/privacy/policy">
              facebook.com/privacy/policy
            </Ext>
            .
          </P>

          <Sub>7A.3 Facebook integration (Meta Graph API)</Sub>
          <P>What Facebook data we collect — profile information:</P>
          <Ul>
            <li>Facebook name and profile picture</li>
            <li>Public profile information you choose to share</li>
            <li>Page information (if you manage a Facebook Page)</li>
          </Ul>
          <P>Page performance (for Page admins):</P>
          <Ul>
            <li>Page likes and followers</li>
            <li>Post performance metrics (likes, comments, shares, reach)</li>
            <li>Page insights and analytics</li>
            <li>Audience demographics (aggregated)</li>
          </Ul>
          <P>We do not collect:</P>
          <Ul>
            <li>Personal timeline posts (unless you manage a public Page)</li>
            <li>Private messages</li>
            <li>Friend list</li>
            <li>Personal life events or private information</li>
          </Ul>
          <P>
            How we use Facebook data: to calculate Starix Score for Facebook Page
            managers; display Page performance in creator portfolios; rank Page
            performance on leaderboards; and verify Page ownership and authenticity.
            Facebook integration is primarily for creators who manage Facebook Pages
            (not personal profiles). Personal profile data is not used for Starix Score
            calculation.
          </P>
          <P>
            Your use of Facebook is subject to Meta’s Privacy Policy:{" "}
            <Ext href="https://www.facebook.com/privacy/policy">
              facebook.com/privacy/policy
            </Ext>
            .
          </P>

          <Sub>7A.4 TikTok integration (TikTok API)</Sub>
          <P>What TikTok data we collect — profile information:</P>
          <Ul>
            <li>TikTok username and display name</li>
            <li>Public profile picture</li>
            <li>Follower count and following count</li>
            <li>Public bio information</li>
            <li>Account verification status</li>
          </Ul>
          <P>Content & performance metrics:</P>
          <Ul>
            <li>List of your public videos</li>
            <li>Video performance metrics (views, likes, shares, comments)</li>
            <li>Video posting dates and timestamps</li>
            <li>Engagement rates and trends over time</li>
            <li>Content categories and hashtags used</li>
            <li>Video completion rates (if available via API)</li>
          </Ul>
          <P>We do not collect:</P>
          <Ul>
            <li>Private or draft videos</li>
            <li>Direct messages</li>
            <li>Personal contact information from TikTok</li>
            <li>Information about your followers or following list (beyond counts)</li>
            <li>TikTok LIVE data</li>
            <li>Private account information</li>
          </Ul>
          <P>
            How we use TikTok data: to calculate your Starix Score based on video
            performance; display best-performing TikTok videos in your portfolio; rank
            you on challenge leaderboards; analyze engagement patterns for authenticity;
            show brands your content virality and engagement quality; and track
            performance trends over time.
          </P>
          <P>
            We comply with TikTok’s API Terms of Service and Developer Policies,
            including data usage and storage limitations, user privacy and consent
            requirements, rate limiting and API restrictions, and prohibited use cases.
            Your use of TikTok is subject to TikTok’s Privacy Policy:{" "}
            <Ext href="https://www.tiktok.com/legal/privacy-policy">
              tiktok.com/legal/privacy-policy
            </Ext>
            .
          </P>

          <Sub>7A.5 YouTube integration (YouTube Data API)</Sub>
          <P>What YouTube data we collect — channel information:</P>
          <Ul>
            <li>Channel name and handle</li>
            <li>Channel profile picture and banner</li>
            <li>Subscriber count</li>
            <li>Channel description</li>
            <li>Verification status</li>
            <li>Channel creation date</li>
          </Ul>
          <P>Content & performance metrics:</P>
          <Ul>
            <li>List of your public videos</li>
            <li>Video performance metrics (views, likes, dislikes, comments)</li>
            <li>Video titles, descriptions, and tags</li>
            <li>Upload dates and video duration</li>
            <li>Engagement rates and watch time (if available)</li>
            <li>Subscriber growth trends</li>
          </Ul>
          <P>We do not collect:</P>
          <Ul>
            <li>Private or unlisted videos (unless you specifically grant access)</li>
            <li>
              YouTube Studio analytics (detailed revenue, demographics) unless
              explicitly authorized
            </li>
            <li>Comments content (only comment count)</li>
            <li>Private messages</li>
            <li>Watch history</li>
          </Ul>
          <P>
            How we use YouTube data: to calculate your Starix Score based on video
            performance; display channel metrics and best videos in your portfolio; rank
            you on leaderboards; verify channel authenticity; show brands your audience
            reach and engagement; and track subscriber growth and content consistency.
          </P>
          <P>
            We comply with YouTube’s API Services Terms and Google API Services User
            Data Policy, including limited use requirements (data used only for Starix
            functionality), data retention limitations, user privacy and consent
            requirements, and prohibition on storing video content. Your use of YouTube
            is subject to Google’s Privacy Policy:{" "}
            <Ext href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </Ext>
            .
          </P>

          <Sub>7A.6 How we calculate Starix Score using social media data</Sub>
          <P>
            Your Starix Score is calculated by analyzing multiple performance dimensions
            across your connected social media accounts:
          </P>
          <Ul>
            <li>Engagement quality: likes, comments, shares relative to reach</li>
            <li>Growth trends: follower/subscriber growth patterns over time</li>
            <li>Content consistency: posting frequency and regularity</li>
            <li>Audience authenticity: detection of artificial engagement patterns</li>
            <li>Cross-platform presence: performance across multiple platforms (bonus)</li>
          </Ul>
          <P>
            We use automated algorithms and artificial intelligence to normalize metrics
            across different platforms, weight recent performance more heavily than
            historical data, detect and flag suspicious engagement patterns, compare
            your performance to similar creators in your niche, and generate a composite
            score (0–100 scale).
          </P>
          <Ul>
            <li>Exact formulas and weights may evolve to improve accuracy</li>
            <li>Scores are recalculated every 24 hours for active creators</li>
            <li>Connecting multiple platforms improves score accuracy</li>
            <li>Disconnecting a platform recalculates your score without that data</li>
          </Ul>

          <Sub>7A.7 Fraud detection & authenticity analysis</Sub>
          <P>
            We analyze social media data to detect artificial engagement (bots,
            engagement pods, purchased likes), suspicious follower growth patterns,
            inconsistent engagement rates, and content authenticity issues, using
            pattern analysis, historical trend analysis, cross-platform consistency
            checks, and engagement rate benchmarking. Authentic engagement increases
            your score; detected artificial engagement decreases your score; repeated
            fraud patterns may result in account suspension. If you believe your
            authenticity score is incorrect, you can request human review by contacting{" "}
            <Mail address="support@starixapp.com" />.
          </P>

          <Sub>7A.8 Your control over social media data</Sub>
          <P>
            You can connect or disconnect any social media platform at any time through
            your Starix Account Settings → Connected Accounts. We refresh your social
            media data every 24 hours for active users; you can manually trigger a
            refresh from your profile settings; historical data (last 90 days) is used
            for trend analysis.
          </P>
          <P>When you disconnect a platform:</P>
          <Ul>
            <li>We immediately stop collecting new data from that platform</li>
            <li>Your Starix Score is recalculated without that platform’s data</li>
            <li>
              Existing data is retained for 90 days, then permanently deleted (unless
              required by law for disputes or compliance)
            </li>
            <li>You can reconnect the platform at any time</li>
          </Ul>
          <P>
            You can request a copy of all social media data we’ve collected about you,
            correction of inaccurate data, or immediate deletion of all your social
            media data (which results in score recalculation). Submit requests to{" "}
            <Mail address="dpo@starixapp.com" />.
          </P>

          <Sub>7A.9 Security of social media data</Sub>
          <P>
            Social media data is protected using the same security measures described in
            Section 9: AES-256 encryption at rest, TLS 1.3 in transit; access controls
            so only authorized Starix systems can access data; OAuth tokens encrypted
            and never exposed; regular security assessments and penetration testing; and
            data minimization so we collect only necessary data and delete it when no
            longer needed.
          </P>

          <Sub>7A.10 Third-party access to social media data</Sub>
          <P>We do not share your social media data with third parties except:</P>
          <Ul>
            <li>
              Brands: when you apply to or win a challenge, brands can see your public
              portfolio (which includes social media metrics you’ve chosen to display)
            </li>
            <li>
              Payment processors: minimal data needed for identity verification (e.g.,
              account name matching)
            </li>
            <li>Legal requirements: if required by law or to protect our rights</li>
          </Ul>
          <P>
            We never sell your social media data to data brokers; share your data with
            advertisers for targeting (including by uploading, matching, or using
            platform-derived data to build advertising audiences); or provide raw data
            to brands (only portfolio/score summaries).
          </P>

          <Sub>7A.11 Updates to social media integrations</Sub>
          <P>
            If we add new social media platforms or change how we use data, we will
            update this Privacy Policy and notify you via email. You will be asked to
            explicitly authorize any new data collection. You can choose not to connect
            new platforms without affecting existing integrations.
          </P>
        </div>
      </section>

      <section id="retention" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          8. How long do we keep your information?
        </h2>
        <div className="space-y-4">
          <P>
            We will only keep your personal information for as long as it is necessary
            for the purposes set out in this Privacy Notice, generally for a period of 5
            years after account deactivation, unless a longer retention period is
            required or permitted by law (such as tax, accounting, or other legal
            requirements).
          </P>
          <P>
            Data collected from social media platforms (Instagram, TikTok, YouTube,
            Facebook) is deleted within 90 days after disconnecting the platform, unless
            it is required for ongoing legal disputes, required for tax/financial
            compliance (in the case of payment records only), or aggregated and fully
            anonymized for analytics (no personal identifiers).
          </P>
        </div>
      </section>

      <section id="security" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          9. How do we keep your information safe?
        </h2>
        <P>
          We have implemented appropriate and reasonable technical and organizational
          security measures designed to protect the security of any personal information
          we process.
        </P>
      </section>

      <section id="minors" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          10. Do we collect information from minors?
        </h2>
        <P>
          Our Services are not intended for children under 16, and we do not knowingly
          collect, use, or disclose personal information from children under 16. If we
          learn that we have collected personal information from a child under 16, we
          will take reasonable steps to delete such information. If you are 16 or 17
          years old, you may use the Services only to the extent permitted by applicable
          law, and where required by applicable law your parent or legal guardian must
          consent to your use of the Services and to our processing of your personal
          information.
        </P>
      </section>

      <section id="privacy-rights" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          11. What are your privacy rights?
        </h2>
        <div className="space-y-4">
          <P>
            Depending on your region, you have rights that allow you greater access to
            and control over your personal information. These may include the right to
            request access, rectification, erasure, and data portability.
          </P>
          <P>
            If a decision that produces legal or similarly significant effects is made
            solely by automated means (such as an AI-generated trust score), we will
            inform you, explain the main factors, and offer a simple way to request
            human review. If you believe an automated trust score is inaccurate, you
            have the right to request human review of that specific score.
          </P>
          <Sub>Automated decision-making & AI scores</Sub>
          <P>
            If decisions that produce legal or similarly significant effects (such as
            exclusion from brand opportunities based on a low Starix Score or fraud
            flags) are made solely by automated means, you have the right to be
            informed, the right to human review, the right to challenge the decision and
            provide evidence, and the right to an explanation of our decision-making
            logic in understandable terms.
          </P>
          <P>
            Submit requests to <Mail address="support@starixapp.com" /> or{" "}
            <Mail address="dpo@starixapp.com" />. Response time: within 14 business
            days. Include your account details and the specific decision you’re
            contesting.
          </P>
          <Sub>Fraud flag appeals</Sub>
          <P>If your account is flagged for suspected fraud or artificial engagement:</P>
          <Ul>
            <li>We will notify you via email with specific reasons</li>
            <li>You can request human review within 30 days</li>
            <li>You can submit evidence (screenshots, analytics, explanations)</li>
            <li>A human reviewer will assess your case within 14 business days</li>
            <li>You will receive a detailed explanation of the final decision</li>
          </Ul>
          <P>
            Data Protection Officer (DPO): you may contact our DPO at{" "}
            <Mail address="dpo@starixapp.com" /> for any questions regarding this
            policy.
          </P>
        </div>
      </section>

      <section id="dnt" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          12. Controls for Do-Not-Track features
        </h2>
        <P>We do not currently respond to DNT browser signals.</P>
      </section>

      <section id="us-residents" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          13. Do United States residents have specific privacy rights?
        </h2>
        <P>
          If you are a resident of certain US states, you may have the right to request
          access to and receive details about the personal information we maintain about
          you and how we have processed it, correct inaccuracies, get a copy of, or
          delete your personal information.
        </P>
      </section>

      <section id="platform-ip" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          14. Platform data & intellectual property
        </h2>
        <div className="space-y-4">
          <Sub>User data usage & ownership</Sub>
          <P>
            All personal information, social media data, and content you provide or
            authorize us to access remains your property. For processing described in
            this Privacy Notice, we generally act as a data controller (or equivalent
            role under applicable law). In limited circumstances (for example, where we
            process personal information on behalf of a business customer for a specific
            campaign), we may act as a processor/service provider and will process such
            personal information only on documented instructions.
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
            non-exclusive, worldwide license to display your public social media content
            in your Starix portfolio; show your content to brands when you apply to
            challenges; use aggregate, anonymized metrics for platform analytics; and
            cache content temporarily for performance optimization.
          </P>
          <P>
            You can disconnect platforms and revoke this license at any time. You
            maintain all ownership and can use your content elsewhere. We do not claim
            ownership of your creative work.
          </P>
          <P>
            Content you create directly within Starix (profile bio, challenge
            submissions, Circle descriptions) remains your intellectual property. By
            submitting this content, you grant Starix a license to display and
            distribute it within the platform for the purpose of facilitating brand
            partnerships.
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
            data occurs only as explicitly described in Section 4 of this Privacy
            Policy.
          </P>
        </div>
      </section>

      <section id="updates" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          15. Do we make updates to this notice?
        </h2>
        <P>
          Yes, we will update this notice as necessary to stay compliant with relevant
          laws. In the event of an update, we will put notice of these updates on our
          platform to ensure that users are well informed.
        </P>
      </section>

      <section id="contact" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          16. How can you contact us about this notice?
        </h2>
        <P>
          If you have questions or comments about this notice, you may email us at{" "}
          <Mail address="contact@starixapp.com" />.
        </P>
      </section>

      <section id="review-data" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          17. How can you review, update, or delete the data we collect from you?
        </h2>
        <P>
          To request to review, update, or delete your personal information, please fill
          out and submit a data subject access request to{" "}
          <Mail address="dpo@starixapp.com" />.
        </P>
      </section>

      <section id="platform-terms" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          18. Platform-specific terms & compliance
        </h2>
        <div className="space-y-4">
          <Sub>Data deletion instructions (Meta / Instagram / Facebook)</Sub>
          <P>
            You can request deletion of data we received from Meta platforms (Instagram
            and Facebook) at any time by using one (or both) of the following methods.
          </P>
          <P>
            <span className="font-medium text-[#040136]">
              Option 1 (recommended): Disconnect Meta access (self-service).
            </span>{" "}
            In Starix, go to Account Settings → Connected Accounts. Select Instagram or
            Facebook and click Disconnect/Remove Access. Optionally also remove Starix
            from Meta: in Facebook/Instagram, review your connected apps and remove
            Starix access. Once disconnected, we stop collecting new Meta data
            immediately and delete Meta-derived data within 90 days, unless retention is
            required by law (for example, for disputes or compliance).
          </P>
          <P>
            <span className="font-medium text-[#040136]">
              Option 2: Email deletion request.
            </span>{" "}
            Send an email to <Mail address="dpo@starixapp.com" /> with the subject line
            “Meta Data Deletion Request”. Please include your Starix account email
            address (or Starix username); the platform(s) to delete: Instagram and/or
            Facebook; and your Instagram username and/or Facebook Page name/ID connected
            to Starix (as applicable). We will acknowledge your request and may ask for
            additional information to verify your identity. After verification, we will
            complete deletion of Meta-derived data without undue delay and in any event
            within 90 days (unless a longer period is required by law). If you request
            deletion sooner, we will delete sooner where technically feasible and
            lawful.
          </P>

          <Sub>
            Instagram/Facebook integration data minimization (permissions, data
            elements, purpose, retention)
          </Sub>
          <P>
            When you connect Instagram or Facebook, we request only the minimum
            permissions/scopes needed to provide Starix functionality. The specific
            scopes shown to you may vary depending on your account type (e.g.,
            Creator/Business) and available APIs, but we apply the following
            minimization controls:
          </P>
          <Ul>
            <li>
              Authentication (OAuth token): used to authenticate your connection and
              retrieve authorized data; token is stored encrypted and is
              revoked/invalidated upon disconnect; deleted within 90 days of disconnect
              (or sooner if technically feasible).
            </li>
            <li>
              Basic profile identifiers (e.g., username, display name, profile picture,
              verification status, account type): used to display your connected account
              inside Starix and populate your creator portfolio (only if you choose to
              display it); deleted within 90 days of disconnect.
            </li>
            <li>
              Aggregate counts and performance metrics (e.g., follower/page-like counts;
              reach/impressions; likes/comments/shares/saves; engagement rates): used to
              calculate Starix Scores, generate analytics, and rank leaderboards;
              deleted within 90 days of disconnect, except metrics may be retained only
              in aggregated, fully anonymized form for analytics.
            </li>
            <li>
              Content identifiers/metadata for public posts (e.g., post IDs/URLs,
              timestamps, captions, hashtags) where available via API: used to identify
              and display best-performing public content in your portfolio (if you
              choose to display it) and to compute trends; deleted within 90 days of
              disconnect; we do not store private messages or private content.
            </li>
            <li>
              Insights (creator/business accounts only) in aggregated form (e.g.,
              audience demographic breakdowns as provided by Meta): used to present
              high-level audience insights to you and to provide summarized portfolio
              insights to brands only where you choose to display; deleted within 90
              days of disconnect; we do not disclose raw audience-level data to brands.
            </li>
          </Ul>

          <Sub>Meta limited use commitments (Instagram/Facebook)</Sub>
          <P>
            With respect to data received from Meta platforms (Instagram/Facebook): (a)
            we use such data only to provide Starix features requested by you (including
            score calculation, portfolio display, fraud detection, and analytics); (b)
            we do not sell, rent, license, or otherwise commercialize Meta data; (c) we
            do not use Meta data for advertising targeting, retargeting, or to build
            advertising audiences; (d) we do not provide brands or other third parties
            with raw Meta API data or raw API responses; and (e) you control what
            Meta-derived metrics/content appear in your public portfolio through your
            profile settings, and you can disconnect at any time.
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
            We comply with Meta’s requirements including limited use of
            Instagram/Facebook data (only to provide Starix functionality requested by
            you, such as scores, portfolios, fraud detection, and analytics); data
            deletion within 90 days of user account deletion or platform disconnect; no
            selling, renting, trading, or licensing of Instagram/Facebook data to third
            parties; and compliance with Instagram’s Brand Guidelines.
          </P>
          <P>
            Meta is not responsible for Starix’s data practices. Our relationship with
            Meta is limited to API access. Your use of Instagram and Facebook is
            governed by Meta’s terms, not Starix’s.
          </P>

          <Sub>TikTok</Sub>
          <P>
            Our use of TikTok’s API is subject to TikTok API Terms of Service, TikTok
            Developer Policies, and TikTok Community Guidelines. We comply with TikTok’s
            requirements including limited use of TikTok data per API terms, respect for
            user privacy and data protection, and no use of TikTok data for purposes
            prohibited by TikTok policies. TikTok is not responsible for Starix’s data
            practices. Your use of TikTok is governed by TikTok’s terms, not Starix’s.
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
            We comply with Google’s requirements including limited use of YouTube data
            (only for explicit Starix functionality); no storage of YouTube video
            content or audio; compliance with YouTube’s attribution requirements; and
            user control over YouTube data access. Google is not responsible for
            Starix’s data practices. Your use of YouTube is governed by Google’s terms,
            not Starix’s.
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
            If any terms of this Privacy Policy conflict with the requirements of social
            media platform APIs, the platform’s terms take precedence for data from that
            specific platform.
          </P>

          <Sub>Platform changes</Sub>
          <P>
            Social media platforms may change their APIs, terms, or data access
            policies. If such changes affect our ability to provide Starix services or
            require changes to our data practices, we will update this Privacy Policy,
            notify affected users via email, provide at least 30 days’ notice before
            implementing changes, and offer alternative options where possible (e.g.,
            alternative platforms or manual data entry).
          </P>
        </div>
      </section>

      <section id="addendum" className="scroll-mt-28 md:scroll-mt-32">
        <h2 className="mb-4 text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#040136] md:text-[28px] xl:text-[32px]">
          Compliance addendum
        </h2>
        <div className="space-y-4">
          <P>
            This Addendum supplements the STARIX Privacy Policy to ensure full
            compliance with GDPR (EU/UK), CCPA/CPRA (California, US), and Nigeria’s NDPA
            2023.
          </P>

          <Sub>Annex A: GDPR (EU/UK) compliance</Sub>
          <Ul>
            <li>
              Subject Access Requests (SARs): STARIX will respond to all data subject
              requests (access, rectification, erasure, portability) within 30 days.
            </li>
            <li>
              Records of Processing Activities (ROPA): STARIX maintains detailed records
              of all processing activities, including categories of data, purposes,
              recipients, and retention periods.
            </li>
            <li>
              Data Protection Impact Assessments (DPIAs): STARIX conducts DPIAs for
              high-risk processing, including AI-driven trust scoring, to evaluate risks
              and ensure fairness.
            </li>
            <li>
              Automated decision-making: where trust scores may produce significant
              effects, STARIX provides clear explanations of the logic involved and
              ensures a simple mechanism for requesting human review.
            </li>
            <li>
              Data Protection Officer (DPO): STARIX has appointed a DPO, reachable at{" "}
              <Mail address="dpo@starixapp.com" />.
            </li>
          </Ul>

          <Sub>Annex B: CCPA/CPRA (California, US) compliance</Sub>
          <Ul>
            <li>
              Do Not Sell or Share My Personal Information: STARIX does not sell
              personal data. However, a “Do Not Sell or Share My Personal Information”
              request may be submitted by California residents to exercise opt-out
              rights by emailing <Mail address="dpo@starixapp.com" />.
            </li>
            <li>
              Consumer requests: California residents may request access, correction,
              deletion, or portability of their personal data. STARIX will respond
              within 45 days of receiving a verifiable request.
            </li>
            <li>
              Verification process: STARIX requires identity verification before
              fulfilling consumer requests to protect privacy.
            </li>
            <li>
              Sensitive personal information: STARIX does not use sensitive personal
              information for purposes beyond those permitted under CPRA.
            </li>
          </Ul>

          <Sub>Annex C: Nigeria NDPA 2023 compliance</Sub>
          <Ul>
            <li>
              Registration with NDPC: STARIX is registered with the Nigeria Data
              Protection Commission (NDPC) as required for controllers processing data
              of more than 2,000 individuals annually.
            </li>
            <li>
              Annual Data Protection Compliance Audit (DPCA): STARIX conducts annual
              audits to ensure ongoing compliance with NDPA 2023 and submits reports to
              the NDPC.
            </li>
            <li>
              Lawful basis: STARIX processes personal data under lawful bases including
              consent, contract, legitimate interest, and legal obligation, consistent
              with NDPA requirements.
            </li>
            <li>
              Minors’ data: STARIX does not knowingly collect data from individuals
              under 16 years of age. Where parental consent is required for users aged
              16 or 17 under applicable law, STARIX ensures compliance before
              processing.
            </li>
            <li>
              Data subject rights: Nigerian residents may exercise rights of access,
              rectification, erasure, portability, and restriction of processing.
              Requests will be handled within 30 days.
            </li>
          </Ul>

          <Sub>Annex D: Security & accountability</Sub>
          <Ul>
            <li>
              Security measures: STARIX employs encryption, access controls, and regular
              security audits to safeguard personal data.
            </li>
            <li>
              Third-party processors: STARIX ensures that third-party processors (e.g.,
              Paystack) comply with equivalent data protection standards.
            </li>
            <li>
              Policy updates: STARIX commits to regular reviews and updates of this
              Addendum to reflect evolving legal requirements.
            </li>
          </Ul>
          <P>
            If you have questions or comments about this notice, you may email us at{" "}
            <Mail address="contact@starixapp.com" />.
          </P>
        </div>
      </section>
    </article>
  );
}
