/*
  Warnings:

  - A unique constraint covering the columns `[destinationId,slug]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Package` required. This step will fail if there are existing NULL values in that column.

*/

UPDATE "Package"
SET "slug" = lower(regexp_replace(regexp_replace(trim("name"), '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'))
WHERE "slug" IS NULL;

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Package_destinationId_slug_key" ON "Package"("destinationId", "slug");
