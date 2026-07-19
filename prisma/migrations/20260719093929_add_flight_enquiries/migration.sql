-- CreateEnum
CREATE TYPE "TripType" AS ENUM ('ONE_WAY', 'ROUND_TRIP', 'MULTI_CITY');

-- CreateEnum
CREATE TYPE "TravelClass" AS ENUM ('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST');

-- CreateTable
CREATE TABLE "FlightEnquiry" (
    "id" TEXT NOT NULL,
    "tripType" "TripType" NOT NULL,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "travelClass" "TravelClass" NOT NULL DEFAULT 'ECONOMY',
    "preferredAirline" TEXT,
    "budget" INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlightEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightLeg" (
    "id" TEXT NOT NULL,
    "flightEnquiryId" TEXT NOT NULL,
    "legOrder" INTEGER NOT NULL,
    "originCode" TEXT NOT NULL,
    "originCity" TEXT NOT NULL,
    "destinationCode" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlightLeg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlightLeg" ADD CONSTRAINT "FlightLeg_flightEnquiryId_fkey" FOREIGN KEY ("flightEnquiryId") REFERENCES "FlightEnquiry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
