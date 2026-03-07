# PosterVerse - Premium Aesthetic Poster Ecommerce

## Overview
PosterVerse is a modern ecommerce website for premium aesthetic posters. Built with React, Express, PostgreSQL, and Tailwind CSS. Features a premium design with Inter + Playfair Display fonts.

## Architecture
- **Frontend**: React + TypeScript with Tailwind CSS and shadcn/ui components
- **Backend**: Express.js with REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Cart**: localStorage-based cart persistence with custom event system
- **Routing**: wouter for client-side routing

## Pages
- `/` - Home: Hero banner, featured products, promo section, category browsing
- `/shop` - Shop: Product grid with search, category filters, orientation filters, sort
- `/product/:id` - Product detail with quantity selector, related products, size selection (A4/A3)
- `/cart` - Cart with quantity controls, totals, checkout
- `/custom-studio` - Custom Studio: Premium custom poster ordering (₹200→₹140)
- `/about` - Brand story, values, stats
- `/contact` - Contact form (saves to database)

## API Routes
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/contact` - Submit contact form
- `POST /api/orders` - Create order (logs to console)

## Data Model
- **products**: id, name, description, price, discountPrice, image, category, orientation (portrait/landscape), isNew, featured
- **contact_messages**: id, name, email, subject, message, createdAt

## Categories
Cars (19 posters), Anime (12), Cricket (3), Football (1), Others (22)
**Total: 57 products**

## Currency & Pricing
- Currency: INR (₹) throughout the site
- Original prices: whole numbers randomly from [200, 210, 220, 230, 240, 250] (shown with strikethrough)
- Discount prices: ₹95, ₹100, or ₹110 (assigned via name hash, consistent across reloads)
- Cart totals use discount prices
- **Shipping**: ₹30 on orders under ₹399, FREE on orders ₹399+
- Easy Returns – 7 Days Return Policy

## Key Features
- **Size Selection**: A4 and A3 poster sizes with size modal in product cards
- **Landscape Support**: 3 F1 racing posters display in landscape (4:3) aspect ratio
- **NEW Badge**: 25 newly added posters marked with animated NEW badge
- **Featured Badge**: Premium featured products highlighted throughout site
- **Custom Posters**: Custom poster ordering with premium 30% discount
- **Min Order**: 2 posters minimum required for checkout
- **EmailJS Integration**: Order confirmations sent via email

## Key Files
- `shared/schema.ts` - Database schema and types
- `server/seed.ts` - Database seeding with 57 products (random INR pricing)
- `server/routes.ts` - API endpoints including /api/orders
- `client/src/lib/cart-store.ts` - Cart logic with localStorage and size selection
- `client/src/components/product-card.tsx` - Reusable product card with size modal
- `client/src/pages/checkout.tsx` - Checkout with EmailJS integration
- `client/src/pages/cart.tsx` - Shopping cart with min order validation
- `client/src/pages/product.tsx` - Product detail with size selector

## Design Tokens
- Font Sans: Inter
- Font Serif: Playfair Display
- Warm beige/neutral color palette (Champagne & Charcoal light, Midnight Gold dark)
- 57 poster images in `/client/public/images/` (jpg/jpeg format)
- 6 new automotive posters added (poster-cars-14 through poster-cars-19)
