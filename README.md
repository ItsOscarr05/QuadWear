# QuadWear MVP

A modern e-commerce website for QuadWear, selling hand-drawn university and major-themed t-shirts.

## Features

- **Bulk Ordering**: Minimum 12 shirts per order (mix designs & sizes)
- **Shop Catalog**: Filter by university, major, size, and price
- **Product Pages**: Detailed product views with size guides
- **Shopping Cart**: Real-time cart with bulk validation
- **Checkout**: Stripe integration for secure payments
- **Collection Pages**: Auto-generated pages for universities and majors
- **Wishlist**: Save products for later (localStorage)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** (SQLite)
- **Stripe** (Payments)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Add your Stripe keys to .env
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Adding Products

Products can be added manually via Prisma Studio:
```bash
npx prisma studio
```

Or by directly inserting into the database. Product schema:
- `name`: Product name
- `slug`: URL-friendly identifier (must be unique)
- `price`: Price in cents
- `university`: University name (e.g., "JMU")
- `major`: Major name (e.g., "Computer Science")
- `designImage`: URL to hand-drawn preview image
- `mockupImage`: URL to shirt mockup image
- `badges`: JSON array string (e.g., `["New", "Best Seller"]`)
- `colors`: JSON array string (e.g., `["purple", "white"]`)
- `sizes`: JSON object string (e.g., `{"S": 10, "M": 15, "L": 8}`)
- `material`: Optional (e.g., "100% cotton")
- `fit`: Optional (e.g., "midweight")

## Environment Variables

- `STRIPE_SECRET_KEY`: Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret (for production)
- `DATABASE_URL`: Prisma database URL

## Deployment

This project is ready to deploy on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Make sure to set up Stripe webhooks pointing to `/api/webhooks/stripe` in production.
