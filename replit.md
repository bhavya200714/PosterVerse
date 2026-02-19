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
- `/shop` - Shop: Product grid with search, category filters, sort
- `/product/:id` - Product detail with quantity selector, related products
- `/cart` - Cart with quantity controls, totals, checkout
- `/about` - Brand story, values, stats
- `/contact` - Contact form (saves to database)

## API Routes
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/contact` - Submit contact form

## Data Model
- **products**: id, name, description, price, image, category, featured
- **contact_messages**: id, name, email, subject, message, createdAt

## Categories
Minimal, Anime, Nature, Quotes

## Key Files
- `shared/schema.ts` - Database schema and types
- `server/seed.ts` - Database seeding with 12 products
- `client/src/lib/cart-store.ts` - Cart logic with localStorage
- `client/src/components/product-card.tsx` - Reusable product card
- `client/src/components/navbar.tsx` - Sticky nav with cart counter

## Design Tokens
- Font Sans: Inter
- Font Serif: Playfair Display
- Warm beige/neutral color palette
- 12 custom AI-generated poster images in `/client/public/images/`
