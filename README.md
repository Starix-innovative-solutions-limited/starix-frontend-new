# Starix

Starix is a creator economy platform designed to connect creators with opportunities, campaigns, communities, and earnings management tools.

The platform enables creators to:

* Participate in brand challenges
* Join creator communities (Creator Circles)
* Build professional portfolios
* Track analytics and performance
* Manage earnings and withdrawals
* Configure wallet security settings
* Securely reset wallet PINs using security questions

---

# Overview

Starix is built using modern web technologies and follows a frontend-driven architecture powered by external APIs and backend services.

## Core Modules

### Creator Dashboard

Provides creators with:

* Account overview
* Earnings insights
* Portfolio statistics
* Challenge participation metrics

### Challenges

Creators can:

* Browse active campaigns
* Participate in challenges
* Submit entries
* Earn rewards

### Creator Circles

Community-focused engagement features:

* Creator networking
* Discussions
* Collaboration opportunities

### Portfolio

Creators can showcase:

* Creative work
* Campaign submissions
* Professional achievements

### Analytics

Provides:

* Performance insights
* Engagement metrics
* Earnings tracking

### Wallet

Supports:

* Wallet balance retrieval
* Earnings management
* Withdrawal requests
* Withdrawal account configuration
* Transaction history

### Security

Supports:

* Wallet PIN setup
* Security questions
* PIN recovery workflows
* Withdrawal verification

---

# Technology Stack

## Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Recharts
* React Icons
* Lucide React

## Backend Services

Integrated via REST APIs:

* Authentication APIs
* Wallet APIs
* Withdrawal APIs
* Creator APIs
* Analytics APIs

## Third-Party Services

* Supabase
* Gemini AI
* GitHub
* Netlify

---

# Project Structure

```text
src/
├── app/
├── components/
├── hooks/
├── services/
├── lib/
├── utils/
├── types/
├── public/
└── styles/
```

---

# Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=
```

Additional environment variables may be required depending on the deployment environment.

---

# Local Development Setup

This is a Next.js project bootstrapped using Create Next App.

## Install Dependencies

```bash
npm install
```

or

```bash
yarn
```

or

```bash
pnpm install
```

---

## Start Development Server

Run the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

or

```bash
pnpm dev
```

or

```bash
bun dev
```

Open:

```text
http://localhost:3000
```

in your browser.

The application supports hot reload and will automatically refresh when files change.

---

## Development Notes

You can begin development by editing:

```text
app/page.tsx
```

Changes are reflected automatically without restarting the development server.

---

## Fonts

The project uses:

* Geist Font Family

via Next.js font optimization.

This is configured using:

```typescript
next/font
```

for optimized loading and performance.

---

# Build

Create a production build:

```bash
npm run build
```

---

# Run Production Build

```bash
npm run start
```

---

# Deployment

## Netlify

Current deployment target.

### Build Command

```bash
npm run build
```

### Publish Directory

```text
.next
```

### Deployment Checklist

* Configure environment variables
* Verify API endpoints
* Verify Supabase configuration
* Verify authentication configuration
* Verify wallet service configuration
* Run production build validation

---

## Alternative Deployment

The application can also be deployed using:

* Vercel
* AWS Amplify
* Azure Static Web Apps
* DigitalOcean App Platform

---

# Security Considerations

Wallet-related actions implement additional protection mechanisms:

### Wallet PIN

Required for:

* Withdrawals
* Sensitive wallet actions

### Security Questions

Required for:

* PIN recovery
* Identity verification

### Withdrawal Verification

Users must:

1. Configure wallet security.
2. Verify identity.
3. Complete withdrawal validation.

---

# API Integration Notes

The frontend relies heavily on backend APIs.

Important integrations include:

* Authentication
* Wallet
* Withdrawals
* Earnings
* Security Questions
* PIN Recovery
* Analytics
* Creator Profiles

Cloud engineers should ensure:

* API URLs are environment-driven
* Secrets are never committed
* CORS policies are configured correctly
* SSL/TLS termination is properly configured
* Rate limiting is implemented at the API layer

---

# Cloud Infrastructure Notes

Recommended production architecture:

```text
GitHub
   ↓
CI/CD Pipeline
   ↓
Netlify
   ↓
Starix Frontend
   ↓
Backend APIs
   ↓
Database / Wallet Services
```

Recommended monitoring:

* Netlify Analytics
* Sentry
* Log aggregation
* API health monitoring

---

# Learn More

Useful resources:

* [Next.js Documentation](https://nextjs.org/docs?utm_source=chatgpt.com)
* [Learn Next.js](https://nextjs.org/learn?utm_source=chatgpt.com)
* [Next.js GitHub Repository](https://github.com/vercel/next.js?utm_source=chatgpt.com)

---

# Future Roadmap

* Enhanced creator-brand matching
* AI-powered creator assistance
* Mobile applications
* Advanced creator analytics
* Referral systems
* Creator reputation scoring
* Real-time notifications
* Expanded wallet services


