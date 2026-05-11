-- CreateTable Category
CREATE TABLE "Category" (
    "id"   TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- Add categoryId to Product (nullable temporarily for safe migration)
ALTER TABLE "Product" ADD COLUMN "categoryId" TEXT;

-- Drop the old plain-text column
ALTER TABLE "Product" DROP COLUMN "category";

-- Add FK constraint
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "Category"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
