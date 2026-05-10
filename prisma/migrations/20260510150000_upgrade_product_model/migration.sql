-- Drop old columns
ALTER TABLE "Product" DROP COLUMN IF EXISTS "price";
ALTER TABLE "Product" DROP COLUMN IF EXISTS "imageUrl";

-- Add new required columns with temporary defaults, then drop defaults
ALTER TABLE "Product" ADD COLUMN "slug" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "priceCents" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Product" ADD COLUMN "category" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "thumbnail" TEXT NOT NULL DEFAULT '';

ALTER TABLE "Product" ALTER COLUMN "slug" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "priceCents" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "thumbnail" DROP DEFAULT;

-- Add optional columns
ALTER TABLE "Product" ADD COLUMN "compareAtCents" INTEGER;
ALTER TABLE "Product" ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'USD';
ALTER TABLE "Product" ADD COLUMN "collection" TEXT;
ALTER TABLE "Product" ADD COLUMN "room" TEXT;
ALTER TABLE "Product" ADD COLUMN "style" TEXT;
ALTER TABLE "Product" ADD COLUMN "colors" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ADD COLUMN "materials" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ADD COLUMN "dimensions" TEXT;
ALTER TABLE "Product" ADD COLUMN "weight" TEXT;
ALTER TABLE "Product" ADD COLUMN "images" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Product" ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN "isNew" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Product" ADD COLUMN "rating" DOUBLE PRECISION;
ALTER TABLE "Product" ADD COLUMN "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- Add unique constraint on slug
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
