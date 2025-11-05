# Crypto Pulse Mini

A Next.js application for tracking top cryptocurrency prices and market data.

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed
- CoinGecko Demo API Key (free) - [Get it here](https://www.coingecko.com/api/pricing)

### Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env.local` file in the root directory:

```bash
COINGECKO_DEMO_KEY=your_demo_key_here
```

Get your free demo key at: https://www.coingecko.com/api/pricing

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Top 50 cryptocurrencies with real-time prices
- 7-day sparkline charts
- Client-side search and filtering
- Watchlist (localStorage)
- Coin detail pages
- Responsive design with dark mode support

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- CoinGecko API

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
