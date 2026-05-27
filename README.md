# TrustFi

TrustFi is a Web3 Trust & Security Gateway that protects users before they sign, transact, deposit, or participate onchain.

It combines a Signing Firewall, Trust Score, Vault, Pools, Trust Points, transaction intelligence, and reputation-based security layers into one user-facing application. The goal is simple: make Web3 interactions safer, clearer, and more trustworthy without removing the speed and openness that make onchain finance powerful.

## Vision

Web3 users are asked to make high-risk decisions with very little context.

Every signature, token approval, wallet connection, bridge transfer, pool deposit, or vault strategy can expose users to phishing, malicious contracts, hidden permissions, suspicious counterparties, or poor risk visibility.

TrustFi exists to become the trust layer between users and Web3 actions.

Instead of showing raw transactions and asking users to guess, TrustFi explains risk, assigns trust signals, and helps users make informed decisions before committing assets.

## Product Concept

TrustFi is built around five core layers.

### Signing Firewall

The Signing Firewall reviews risky Web3 actions before users approve them.

It is designed to detect and explain:

- Suspicious wallet interactions
- Risky token approvals
- Unusual contract calls
- High-risk transaction patterns
- Potential phishing or impersonation flows
- Dangerous permissions and asset exposure

The MVP focuses on presenting transaction intent, risk context, and clear user-facing security signals before signing.

### Trust Score

Trust Score is a reputation and risk signal system for wallets and users.

It can include:

- Onchain behavior
- Transaction history
- Security incidents
- Wallet age and activity
- Community and institutional signals
- Safe usage patterns
- Trust Point progression

The score is designed to become a portable trust primitive that can be used across vaults, pools, rewards, access control, and partner integrations.

### Vault

The Vault experience gives users a protected place to manage assets and security-aware financial activity.

The Vault should feel different from a generic DeFi dashboard. It is designed around:

- Asset visibility
- Risk-aware actions
- Secure transaction review
- Trust-based access and benefits
- Clear protection states
- User confidence before movement of funds

### Pools

Pools represent TrustFi's trust-based participation layer.

Instead of treating every wallet equally, pools can use Trust Score and Trust Points to shape:

- Eligibility
- Risk tiers
- Reward multipliers
- Access levels
- Community ranking
- Safer participation flows

This creates a foundation for DeFi experiences where trust and security become part of the product logic.

### Trust Points

Trust Points are the engagement and progression layer of TrustFi.

They reward users for safer, more trustworthy behavior such as:

- Completing onboarding
- Reviewing risky transactions
- Maintaining healthy wallet activity
- Participating in trusted pools
- Improving security posture
- Earning or upgrading Trust NFT credentials

Trust Points help translate security behavior into visible product progress.

## MVP Scope

The current MVP focuses on demonstrating the core TrustFi experience:

- Web3 wallet onboarding
- Trust Score dashboard
- Transaction review flow
- Signing Firewall style risk checks
- Multichain wallet visibility
- Vault interface
- Earn and Pools pages
- Trust Point and reward concepts
- Trust NFT badge and upgrade flow
- Notification system
- Alchemy transaction and webhook integration
- Supabase-backed user and activity data
- Security-focused dark UI with shadcn/ui components

The MVP is not only a dashboard. It is a product prototype for a safer Web3 interaction layer.

## Design Direction

TrustFi uses a dark, high-signal interface designed for security, finance, and trust.

The visual language should remain consistent across all new work:

- Dark theme by default
- Security-first interface patterns
- Clear risk states and trust indicators
- shadcn/ui component primitives
- Structured dashboards and dense information layouts
- Subtle 3D and motion elements
- Neon-accented trust, security, and vault visuals
- Professional Web3 fintech tone
- No generic landing-page redesigns that weaken the product identity

New pages and features should extend the existing design system rather than replace it.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Privy
- Wagmi
- Viem
- Alchemy SDK
- Supabase
- Recharts
- Solidity

## Project Structure

```txt
app/
  actions/             Server actions for blockchain-related flows
  api/                 API routes and webhook handlers
  app/                 Authenticated TrustFi application routes
  demo/                Security and transaction demo flows
  globals.css          Global app styling
  layout.tsx           Root layout
  page.tsx             Public landing page
  providers.tsx        App providers

components/
  analytics/           Transaction and wallet analytics UI
  app/                 Core authenticated app components
  auth/                Login and wallet connection components
  demo/                Interactive security demo components
  landing/             Public website sections
  nft/                 Trust NFT badge and manager components
  notifications/       Notification UI
  security/            Signing Firewall and transaction simulation UI
  trust-score/         Trust Score display components
  ui/                  shadcn/ui primitives
  wallet/              Wallet and multichain asset components

contracts/
  TrustScoreNFT.sol    Trust NFT smart contract

data/
  Demo, transaction, wallet, and Trust Score data

docs/
  Setup, webhook, notification, Trust Score, and NFT system documentation

lib/
  alchemy/             Transaction simulation and webhook logic
  analytics/           Transaction analysis
  auth/                User sync utilities
  nft/                 Trust NFT logic
  security/            Security review and risk layer logic
  supabase/            Supabase clients
  trust-score/         Trust Score calculation and signal modules
  utils/               Shared utilities

scripts/
  Database setup, Alchemy demos, and operational scripts

styles/
  Shared global styles
```

## Core Routes

```txt
/                     Public TrustFi landing page
/app                 Main TrustFi dashboard
/app/onboarding      User onboarding flow
/app/trust-score     Trust Score view
/app/transactions    Transaction review and history
/app/multichain      Multichain wallet overview
/app/vault           Protected vault experience
/app/earn            Trust-based earning interface
/app/pools           Pool participation layer
/app/analytics       Transaction analytics
/app/notifications   Security and system notifications
/app/profile         User profile and trust identity
/app/leaderboard     Trust Point and reputation ranking
/demo                Interactive security demo
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start production mode:

```bash
pnpm start
```

## Environment Variables

Create a local environment file and configure the services used by your deployment.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

ALCHEMY_API_KEY=
ALCHEMY_WEBHOOK_SIGNING_KEY=

NEXT_PUBLIC_PRIVY_APP_ID=
```

Additional wallet, chain, or deployment-specific variables may be required depending on the enabled integrations.

## Security Model

TrustFi should treat every wallet action as a security-relevant event.

The application should prioritize:

- Clear transaction intent
- Risk explanation before approval
- Minimal ambiguity in dangerous flows
- User-readable security states
- Defensive defaults
- Auditable trust signals
- Separation between demo data and production integrations

TrustFi does not replace user custody. It gives users better context before they make custody decisions.

## Development Principles

When extending TrustFi:

- Preserve the official base structure
- Keep the dark security-focused design language
- Reuse existing shadcn/ui primitives
- Keep `/vault`, `/earn`, `/pools`, and other core pages visually consistent
- Avoid unrelated product concepts that dilute TrustFi's identity
- Prefer clear risk communication over decorative UI
- Keep trust, security, wallet safety, and reputation central to every feature

## Roadmap

Near-term product direction:

- Expand Signing Firewall transaction coverage
- Improve Trust Score signal weighting
- Add deeper wallet and contract risk analysis
- Connect Vault and Pools to trust-based eligibility
- Strengthen Trust Point progression
- Improve Trust NFT upgrade logic
- Add partner and protocol trust integrations
- Build clearer user-facing security explanations
- Prepare production-ready webhook and monitoring flows

## Status

TrustFi is currently an MVP-stage Web3 security product prototype.

The official base code defines the project structure, design system, application pages, and feature direction. Future development should build from this base while preserving the TrustFi identity as a Trust & Security Gateway for Web3.
