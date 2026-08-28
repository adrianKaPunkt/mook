# MOOK — Zenzakan Restaurant Website

A modern restaurant web application built with **Next.js, React, TypeScript and PostgreSQL**.

The project was developed as a real-world restaurant website with a focus on a premium visual experience, maintainable component architecture and a database-driven menu system.

## Live Demo

**Zenzakan:**
https://mook-woad.vercel.app/zenzakan

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Radix UI / shadcn

### Backend & Data

- Next.js Server Components
- Prisma ORM
- PostgreSQL
- Server-side data fetching

### Deployment

- Vercel

## Features

- Modular page architecture using reusable React components
- Dynamic restaurant menu loaded from PostgreSQL
- Menu categories and individual menu items managed through Prisma
- German and English localization
- Restaurant-specific content and menu structure
- Support for menu information such as:
  - prices
  - allergens
  - spice levels
  - optional upgrades
  - serving information
  - temporary "New" labels

- Configurable restaurant information such as opening hours, contact details and social links
- Optional PDF menu integration
- Animated and interactive UI elements
- Responsive layout for different screen sizes

## Architecture

The application uses the **Next.js App Router** and separates larger pages into individual sections and reusable components.

Example structure:

```text
app/
└── zenzakan/
    ├── _components/
    ├── _sections/
    │   ├── HeroSection.tsx
    │   ├── AboutSection.tsx
    │   ├── MenuSection.tsx
    │   ├── PrivateDiningSection.tsx
    │   ├── GeishaRoomSection.tsx
    │   └── ContactSection.tsx
    ├── dictionaries/
    ├── layout.tsx
    └── page.tsx

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

The menu is rendered server-side and retrieved from PostgreSQL through Prisma.

The current data model contains three core entities:

```text
Location
   │
   └── Category
          │
          └── MenuItem
```

This structure allows multiple restaurant locations to use the same application while maintaining their own categories and menu items.

## Database

The project uses **PostgreSQL** with **Prisma ORM**.

The schema currently includes:

- Restaurant locations
- Menu categories
- Menu items
- Sort ordering
- Active/inactive states
- Multilingual descriptions
- Allergens
- Spice levels
- Menu item upgrades
- Restaurant contact information
- Opening hours
- Social links
- Menu PDF references

## Localization

The interface currently supports:

- German
- English

Locale-specific content is loaded through dictionaries, while database content supports multilingual descriptions.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/adrianKaPunkt/mook.git
cd mook
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
.env
```

Add your PostgreSQL connection:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Apply the database migrations:

```bash
npx prisma migrate dev
```

Optional: seed the development database:

```bash
npx prisma db seed
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/zenzakan
```

## Project Status

This project was developed as a real-world restaurant web project and is presented here as part of my development portfolio.

The architecture is designed so that additional restaurant concepts, content modules and administrative functionality can be added without rebuilding the core application.

## Author

**Adrian Kocelj**

GitHub:
https://github.com/adrianKaPunkt
