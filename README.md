# QuadWear MVP

A modern e-commerce website for QuadWear, selling hand-drawn university and major-themed t-shirts.

## Features

- **Shop Catalog**: Filter by university, major, size, and price
- **Product Pages**: Detailed product views with size guides
- **Shopping Cart**: Real-time cart with quantity management
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

4. (Optional) Seed one example product for local development:
```bash
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Adding products (checklist)

Products can be added via **Prisma Studio** (`npx prisma studio`), **`npx prisma db seed`** (example row only), or any SQL/SQLite tool against `prisma/dev.db`.

### Canonical `university` and `major` strings

Filters and shop URLs rely on **exact** matches:

- **`university`** must equal the `name` field from [`lib/universities.ts`](lib/universities.ts) (e.g. `"JMU"`, `"UVA"`, `"Virginia Tech"`). Do **not** use `fullName`, `slug`, or abbreviations unless they match `name` exactly.
- **`major`** should match the `name` field from [`lib/majors.ts`](lib/majors.ts) (e.g. `"Computer Science"`, `"Nursing"`). If you use a major not in that list, filters still work, but major landing pages and slugs use a fallback slug derived from the string.

### JSON fields (copy-paste examples)

Store these as **strings** in the database (what Prisma shows as `String` fields):

| Field | Example value |
|-------|----------------|
| `badges` | `["New","Best Seller"]` |
| `colors` | `["purple","white"]` |
| `sizes` | `{"S":10,"M":15,"L":8,"XL":5}` |

Use **uppercase** size keys (`S`, `M`, `L`, `XL`, `XXL`) to match the product page and cart. Values are **stock counts** (integers ≥ 0).

### Images

Use paths under [`public/`](public/) (e.g. `/products/my-shirt-mockup.png`) or any `https://` URL. The app is configured to allow remote images in [`next.config.js`](next.config.js).

### Featured products on the home page

The landing page loads featured products with `?university=JMU` (see [`app/page.tsx`](app/page.tsx)). Either add products with `university` set to **`JMU`**, or change that fetch to another canonical `name` / remove the filter once you have a broader catalog.

### Product schema (reference)

- `name`: Product name
- `slug`: URL-friendly identifier (must be unique); product page is `/shop/[slug]`
- `price`: Price in cents
- `university`: Canonical university `name` (see above)
- `major`: Canonical major `name` (see above)
- `designImage`: URL to hand-drawn preview image
- `mockupImage`: URL to shirt mockup image
- `badges`: JSON array string
- `colors`: JSON array string
- `sizes`: JSON object string (size → stock count)
- `description`, `material`, `fit`: Optional

## Environment Variables

- `STRIPE_SECRET_KEY`: Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret (for production)
- `DATABASE_URL`: Prisma database URL

### Zoho Mail (contact form SMTP)

Used when the app sends mail via Zoho (e.g. Nodemailer in an API route). Set in `.env` locally and in Vercel/hosting env.

| Variable | Purpose |
|----------|---------|
| `SMTP_HOST` | Usually `smtp.zoho.com` (EU: `smtp.zoho.eu`) |
| `SMTP_PORT` | `587` with `SMTP_SECURE=false`, or `465` with `SMTP_SECURE=true` |
| `SMTP_SECURE` | `false` for port 587 (STARTTLS), `true` for port 465 (SSL) |
| `SMTP_USER` | Full Zoho mailbox address (e.g. `support@quadwearshop.com`) |
| `SMTP_PASSWORD` | Mailbox password or **App Password** if 2FA is enabled |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Sender shown on automated messages (must be allowed for that mailbox in Zoho) |

## Deployment

This project is ready to deploy on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Make sure to set up Stripe webhooks pointing to `/api/webhooks/stripe` in production.
