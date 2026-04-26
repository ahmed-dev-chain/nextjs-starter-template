# Next.js Production Starter Template

A premium, production-ready Next.js boilerplate designed for high-performance applications with a focus on type safety, scalability, and robust architecture.

## 🚀 Features

### Core Stack

- **Next.js 16 (App Router)**: Utilizing the latest features like `proxy.ts` and promise-based metadata.
- **Tailwind CSS 4**: Modern styling with zero runtime cost and premium design resets.
- **TypeScript**: Strict type safety across the entire application.

### Data & State Management

- **TanStack Query (v5)**: Clean server-state management with custom hooks and optimized caching.
- **Zustand**: Lightweight global state management for application state (UI, Theme, Local sessions).
- **Persistent Storage**: Automatic state hydration for user sessions.

### Service Layer (The Engine)

- **Robust ApiService**: A base class for all API interactions featuring:
  - **Automatic 401 Interceptors**: Self-healing auth flow that refreshes tokens and retries failed requests.
  - **Single-Retry Logic**: Prevents infinite loops while ensuring reliability.
  - **Discriminated Union Responses**: Forces explicit handling of success/failure states in every component.
  - **Native Fetch Integration**: Leverages Next.js native caching and revalidation.

### Forms & Validation

- **React Hook Form**: High-performance, flexible, and extensible forms.
- **Yup Validation**: Centralized, schema-based validation externalized from UI components.
- **Custom UI Components**: Premium, accessible form elements (Input, Error states, etc.).

### SEO & Performance

- **Dynamic SEO Utilities**: Centralized `constructMetadata` and `constructViewport` helpers.
- **Automated Metadata**: Auto-generated `sitemap.xml`, `robots.txt`, and `manifest.json`.
- **Route Fallbacks**: Custom premium designs for `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- **Proxy Support**: Root-level `proxy.ts` for advanced request handling/security.

## 📁 Project Structure

```text
src/
├── app/                  # App Router: Pages, Layouts, Fallbacks
├── components/           # Reusable UI & Logic Components
│   ├── auth/             # Domain-specific components (e.g., LoginForm)
│   └── ui/               # Base design system components
├── config/               # Centralized environment configuration
├── hooks/                # Custom React & TanStack Query hooks
├── providers/            # Context & Client providers (Query, Auth)
├── services/             # API Service layer (AuthService, etc.)
├── store/                # Zustand state definitions
├── types/                # Global TypeScript definitions
└── utils/                # Pure utility functions (SEO, Form helpers)
```

## 🛠️ Getting Started

### 1. Variables

Copy the `.env.example` file and set your API URLs:

```bash
cp .env.example .env.local
```

### 2. Dependencies

```bash
pnpm install
```

### 3. Development

```bash
pnpm dev
```

## 🔐 Authentication Flow

This template comes with a built-in "Refresher" logic:

1. `ApiService` catches a 401 Unauthorized error.
2. It automatically triggers `authService.refresh()`.
3. If successful, it updates the local tokens and **retries the original request** once.
4. If it fails again, it cleans the session and redirects correctly.
