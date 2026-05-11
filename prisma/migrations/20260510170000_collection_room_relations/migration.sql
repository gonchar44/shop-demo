-- CreateTable Collection
CREATE TABLE "Collection" (
    "id"   TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateTable Room
CREATE TABLE "Room" (
    "id"   TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_slug_key" ON "Room"("slug");

-- Add FK columns (nullable)
ALTER TABLE "Product" ADD COLUMN "collectionId" TEXT;
ALTER TABLE "Product" ADD COLUMN "roomId"       TEXT;

-- Drop old plain-text columns
ALTER TABLE "Product" DROP COLUMN "collection";
ALTER TABLE "Product" DROP COLUMN "room";

-- Add FK constraints
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey"
    FOREIGN KEY ("collectionId") REFERENCES "Collection"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product" ADD CONSTRAINT "Product_roomId_fkey"
    FOREIGN KEY ("roomId") REFERENCES "Room"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
