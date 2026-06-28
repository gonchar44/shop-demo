/*
  Warnings:

  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- Backfill: assign any NULL categoryId rows to an existing or placeholder category
-- before the NOT NULL constraint is applied, so the migration is safe on live data.
DO $$
DECLARE
  fallback_id TEXT;
BEGIN
  SELECT id INTO fallback_id FROM "Category" LIMIT 1;
  IF fallback_id IS NULL THEN
    INSERT INTO "Category" ("id", "slug", "name")
    VALUES ('uncategorized', 'uncategorized', 'Uncategorized')
    ON CONFLICT DO NOTHING;
    fallback_id := 'uncategorized';
  END IF;
  UPDATE "Product" SET "categoryId" = fallback_id WHERE "categoryId" IS NULL;
END $$;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "images" DROP DEFAULT,
ALTER COLUMN "categoryId" SET NOT NULL;

-- CreateTable
CREATE TABLE "ShippingOption" (
    "id" TEXT NOT NULL,
    "methodId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "freeAboveSubtotalCents" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ShippingOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShippingOption_methodId_key" ON "ShippingOption"("methodId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
