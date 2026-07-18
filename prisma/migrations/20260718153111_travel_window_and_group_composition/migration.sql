/*
  Warnings:

  - You are about to drop the column `numTravelers` on the `Enquiry` table. All the data in the column will be lost.
  - You are about to drop the column `travelDate` on the `Enquiry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enquiry" DROP COLUMN "numTravelers",
DROP COLUMN "travelDate",
ADD COLUMN     "adults" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "children" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "infants" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "seniors" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "travelWindowEnd" TIMESTAMP(3),
ADD COLUMN     "travelWindowStart" TIMESTAMP(3);
