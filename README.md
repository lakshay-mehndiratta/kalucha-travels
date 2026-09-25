# Kalucha Travels

A travel agency web application for **Kalucha Travels**, offering destination browsing, holiday package customization, flight enquiries, and visa application services. Includes a full admin dashboard for managing destinations, enquiries, and visa applications.

## Features

**Holiday Destinations**
- Browse destinations and view package details, pricing, and itineraries
- Customize packages with optional attractions and see dynamic pricing
- Submit destination enquiries

**Flight Enquiries**
- One-way, round-trip, and multi-city search
- Traveller count and cabin class selection
- Contact and travel detail collection

**Visa Services**
- Online visa application with destination, visa type, and travel date selection
- Passport and supporting document upload with secure storage
- Automatic document cleanup after the retention period

**Admin Dashboard**
- Manage destinations, packages, and itineraries
- Review and update the status of destination enquiries, flight enquiries, and visa applications
- Access uploaded visa documents via signed URLs
- Export enquiries to Excel

**General**
- Responsive design across desktop, tablet, and mobile
- Server-side input validation on all forms

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Supabase), Prisma ORM |
| Auth & Storage | Supabase |
| Validation | Zod |
| Animation | Framer Motion |
| Icons | Lucide React, React Icons |
| Deployment | Vercel |

## Project Structure

```
kalucha-travels/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── destinations/
│   │   ├── flights/
│   │   ├── visa-application/
│   │   ├── about/
│   │   └── contact/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   └── lib/
│       ├── prisma/
│       └── supabase/
├── prisma/
│   └── schema.prisma
├── public/
└── package.json
```

## Getting Started

### Prerequisites
- Node.js
- npm

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/lakshay-mehndiratta/kalucha-travels.git
   cd kalucha-travels
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=
   DIRECT_URL=

   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=

   SUPABASE_SERVICE_ROLE_KEY=
   ```
   Fill in the values with credentials from your Supabase project.

   > **Never commit `.env` or expose server-side Supabase credentials in client-side code.**

4. Set up the database
   ```bash
   npx prisma migrate dev
   ```
   Optionally, inspect the database with Prisma Studio:
   ```bash
   npx prisma studio
   ```

5. Start the development server
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database

The application uses Supabase PostgreSQL with Prisma as the ORM. Core data includes destinations, packages, itineraries, attractions, destination and flight enquiries, and visa applications with their associated documents and statuses.

Row Level Security (RLS) is enabled on Supabase tables where required.

## File Storage

Visa documents (passport scans, photographs, and supporting files) are stored in a private Supabase Storage bucket, organized by visa application. Administrators access these files through temporary signed URLs rather than public links.

## Security

- Server-side validation of all submitted data using Zod
- Private Supabase Storage for sensitive documents, accessed only via signed URLs
- Supabase Row Level Security on protected tables
- Server-only Supabase credentials, never exposed via `NEXT_PUBLIC_` variables
- File type and size restrictions on uploads
- Automatic cleanup of expired visa documents

## Deployment

The application is deployed on Vercel. To deploy your own instance, connect the GitHub repository to Vercel and configure the required environment variables in the project settings.

## Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm run lint` | Run linting |

## License

This project is developed for Kalucha Travels.
