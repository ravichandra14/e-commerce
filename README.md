# Maison Linen — E-Commerce Launchpad

Maison Linen is a premium, modern e-commerce storefront specializing in slow-made heirloom garments crafted from natural fibers (linen, cashmere, and leather) in small batches across Europe.

This project is built using a state-of-the-art modern web stack featuring **TanStack Start**, **Vite**, and **Tailwind CSS v4**, configured to run on **Cloudflare Workers / Pages** edge architecture.

---

## 🚀 Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/latest/docs/start/overview) (React 19 + TanStack Router) for full-stack SSR and edge-rendering.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for lightning-fast utilities and native Vite integration.
- **Query Management**: [TanStack React Query v5](https://tanstack.com/query/latest) for declarative state and server caching.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, uniform iconography.
- **Runtime & Compilation**: [Vite 7](https://vite.dev/) with TypeScript.
- **Target Platform**: [Cloudflare Workers / Pages](https://workers.cloudflare.com/) (configured via `@cloudflare/vite-plugin` and `wrangler.jsonc`).

---

## 📁 Project Structure

```text
├── src/
│   ├── assets/              # Static image assets (hero, atelier, products)
│   ├── components/
│   │   ├── site/            # Core website layout components (Header, Footer, ProductCard)
│   │   └── ui/              # Reusable Shadcn UI primitives
│   ├── hooks/               # Custom React hooks (useMobile, etc.)
│   ├── lib/                 # Core state logic (Cart context, Product definitions, error capture)
│   ├── routes/              # TanStack File-Based Router structure
│   │   ├── __root.tsx       # Shell layout & Context providers
│   │   ├── index.tsx        # Homepage / Landing
│   │   ├── shop.tsx         # Shop grid & filters
│   │   ├── products.$slug.tsx # Product details view
│   │   ├── cart.tsx         # Cart overview
│   │   ├── checkout.tsx     # Checkout form
│   │   ├── about.tsx        # Brand story page
│   │   └── contact.tsx      # Contact page
│   ├── routeTree.gen.ts     # Auto-generated TanStack Route tree
│   ├── router.tsx           # Router instance definition
│   ├── start.ts             # App entry configuration
│   ├── server.ts            # Server-side entry wrapper & SSR error capture
│   └── styles.css           # Global CSS & Tailwind imports
├── public/                  # Public static files
├── tsconfig.json            # TypeScript configuration
├── wrangler.jsonc           # Cloudflare deployment settings
└── vite.config.ts           # Standard Vite configuration with official plugins
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### Installation

Install the project dependencies:

```bash
npm install
```

### Running Locally

To run the Vite dev server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the client, server, and edge worker bundles:

```bash
npm run build
```

This compiles:
- A client build inside `dist/client`
- A server bundle inside `dist/server`
- An edge-compatible bundle inside `dist/tanstack_start_app`

### Previewing the Production Build

You can preview the compiled production server locally using:

```bash
npm run preview
```

---

## 🌐 Deploying to Cloudflare

This application is ready to deploy directly to Cloudflare Pages/Workers. It includes:
- `@cloudflare/vite-plugin` in `vite.config.ts` to package the server entry point correctly.
- `wrangler.jsonc` specifying the `nodejs_compat` compatibility flag and `src/server.ts` as the entry worker file.

To deploy using Wrangler:

```bash
npx wrangler deploy
```

---

## 📜 License

This project is private and proprietary. All rights reserved.
