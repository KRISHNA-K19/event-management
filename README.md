# ClubHub 🌟

ClubHub is a modern, premium Event and Club Management System built for visionaries, creators, and community leaders. The platform provides a beautiful glassmorphic UI alongside a robust backend capable of registering students, managing public events, handling seamless user authentication, and reviewing incoming application data directly from a custom dashboard.

## 🚀 Tech Stack

This project is engineered using modern, bleeding-edge web technologies, housed inside a high-performance monorepo:

### Core Architecture
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed monorepo)
- **Monorepo Engine**: [Turborepo](https://turborepo.org/)
- **Package Manager**: [pnpm](https://pnpm.io/) workspaces

### Frontend & Application
- **Framework**: [Next.js 16.2](https://nextjs.org/) (React 19, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Alpha next-gen PostCSS integration)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Design System**: Custom glassmorphic styles, neon-glow palettes, and highly animated responsive utilities.

### Backend & Infrastructure
- **BaaS (Backend as a Service)**: [Supabase](https://supabase.com/)
- **Authentication**: `@supabase/ssr` with session synchronization across components.
- **Database**: PostgreSQL (via Supabase) with strictly typed relational mapping.
- **CI/CD**: GitHub Actions & Cloud Deployment (Vercel)

---

## 📂 Repository Structure

The project code is modular, separated neatly into distinct independent applications and shared packages:

### Applications (`apps/`)

- `web`: The public-facing Next.js application. Where users explore events, sign up for membership, and edit their profiles.
- `admin`: The administrative Next.js application. Used by club managers to overview and manage applications (approval/rejection) and event creation.
- `docs`: A lightweight Next.js app used to securely store platform and developer documentation.

### Packages (`packages/`)

- `@repo/ui`: A shared, reusable React component library scaling standard UI tokens.
- `@repo/lib`: A highly centralized utility library housing the database types and typed Supabase standard client functions (`createClientSupabase`).
- `@repo/eslint-config`: Shared `eslint` configurations to strict-enforce clean, highly synchronized code across environments.
- `@repo/typescript-config`: Shared `tsconfig.json` configurations used homogeneously.

---

## 🛠️ Usage & Development

### 1. Prerequisites
Make sure you have Node >20 and `pnpm` installed.

### 2. Setup

Clone the repository and install all localized monorepo dependencies:
```sh
npm install -g pnpm
pnpm install
```

Set up your `.env.local` files based on the `.env.example` configurations available across the `/apps` and `/packages` structures.
```sh
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 3. Development Server
Run the unified developer server via Turborepo:
```sh
pnpm dev
```
- `web` typically runs on [http://localhost:3000](http://localhost:3000)
- `docs` typically runs on [http://localhost:3001](http://localhost:3001)
- `admin` typically runs on [http://localhost:3002](http://localhost:3002)

### 4. Build and Code Quality
Ensure the project remains warning-free and production-ready before PRs:

```sh
pnpm check-types  # Verifies strict typing across all packages
pnpm lint         # Runs linting across the monorepo
pnpm build        # Compiles an optimized production build via Turbopack
```

---

## ✨ Features

* **Real-time Approvals**: Real-time admin views to accept, reject, or mark registrations as pending. 
* **State of the Art Design**: Seamless backdrop-blurs, responsive layouts, hover scale events, and dynamic glass layouts.
* **Shared Authentication**: Login seamlessly cascades from the `lib/supabase` ecosystem to both `web` and `admin` boundaries. 

## 🤝 Contribution Best Practices
* Commits should follow standard conventional formats.
* Make sure `pnpm check-types`, and `pnpm lint` resolve effectively before merging.
* UI adjustments should be placed in `packages/ui` only if they represent universally shared components or hooks.
