import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dubai = await prisma.destination.upsert({
    where: { slug: "dubai" },
    update: {},
    create: {
      slug: "dubai",
      name: "Dubai",
      country: "United Arab Emirates",
      heroImage:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80&auto=format",
      shortDescription:
        "Soaring skyscrapers, golden deserts and world-class luxury — Dubai has it all.",
    },
  });

  const existingPackage = await prisma.package.findFirst({
    where: { destinationId: dubai.id },
  });

  if (existingPackage) {
    console.log("Dubai package already seeded, skipping.");
    return;
  }

  const dubaiPackage = await prisma.package.create({
    data: {
      destinationId: dubai.id,
      name: "Dubai Getaway",
      durationDays: 5,
      durationNights: 4,
      basePrice: 45000,
      includedServices: [
        "Return Flights",
        "4-Star Hotel Accommodation",
        "Daily Breakfast",
        "Airport Transfers",
        "Visa Assistance",
      ],
      itinerary: {
        create: [
          {
            dayNumber: 1,
            title: "Arrival in Dubai",
            description:
              "Arrive at Dubai International Airport, transfer to hotel and evening at leisure.",
          },
          {
            dayNumber: 2,
            title: "City Tour & Burj Khalifa",
            description:
              "Explore Downtown Dubai, visit the Dubai Mall and enjoy the Burj Khalifa observation deck.",
          },
          {
            dayNumber: 3,
            title: "Desert Safari",
            description:
              "Afternoon desert safari with dune bashing, camel riding and a BBQ dinner under the stars.",
          },
          {
            dayNumber: 4,
            title: "Leisure Day / Optional Activities",
            description:
              "Free day to explore add-on attractions or relax at the hotel.",
          },
          {
            dayNumber: 5,
            title: "Departure",
            description: "Check out and transfer to the airport for departure.",
          },
        ],
      },
      attractions: {
        create: [
          {
            name: "Burj Khalifa – At the Top",
            description: "Skip-the-line access to the 124th & 125th floor observation deck.",
            price: 3500,
            image:
              "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80&auto=format",
            includedByDefault: true,
          },
          {
            name: "Desert Safari with BBQ Dinner",
            description: "Dune bashing, camel ride, live entertainment and BBQ dinner.",
            price: 2800,
            image:
              "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&q=80&auto=format",
            includedByDefault: true,
          },
          {
            name: "Dubai Marina Yacht Cruise",
            description: "2-hour luxury yacht cruise along Dubai Marina at sunset.",
            price: 4200,
            image:
              "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&q=80&auto=format",
            includedByDefault: false,
          },
          {
            name: "Museum of the Future",
            description: "Entry to one of the most iconic architectural landmarks in Dubai.",
            price: 2200,
            image:
              "https://images.unsplash.com/photo-1580674684089-5c8b0e1b8a1c?w=400&q=80&auto=format",
            includedByDefault: false,
          },
          {
            name: "Dhow Cruise Dinner",
            description: "Traditional dhow cruise along Dubai Creek with a buffet dinner.",
            price: 1800,
            image:
              "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80&auto=format",
            includedByDefault: false,
          },
        ],
      },
    },
  });

  console.log("Seeded Dubai package:", dubaiPackage.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });