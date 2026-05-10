-- CreateTable Style
CREATE TABLE "Style" (
    "id"   TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Style_slug_key" ON "Style"("slug");

-- CreateTable Color
CREATE TABLE "Color" (
    "id"   TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hex"  TEXT,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_slug_key" ON "Color"("slug");

-- CreateTable Material
CREATE TABLE "Material" (
    "id"   TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_slug_key" ON "Material"("slug");

-- CreateTable ProductVariant
CREATE TABLE "ProductVariant" (
    "id"         TEXT NOT NULL,
    "productId"  TEXT NOT NULL,
    "name"       TEXT NOT NULL,
    "sku"        TEXT,
    "colorId"    TEXT,
    "materialId" TEXT,
    "priceCents" INTEGER,
    "stock"      INTEGER NOT NULL DEFAULT 0,
    "image"      TEXT,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateTable _ColorToProduct (implicit M2M)
CREATE TABLE "_ColorToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColorToProduct_AB_unique" ON "_ColorToProduct"("A", "B");
CREATE INDEX "_ColorToProduct_B_index" ON "_ColorToProduct"("B");

-- CreateTable _MaterialToProduct (implicit M2M)
CREATE TABLE "_MaterialToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialToProduct_AB_unique" ON "_MaterialToProduct"("A", "B");
CREATE INDEX "_MaterialToProduct_B_index" ON "_MaterialToProduct"("B");

-- Add styleId to Product (nullable)
ALTER TABLE "Product" ADD COLUMN "styleId" TEXT;

-- Drop old scalar fields
ALTER TABLE "Product" DROP COLUMN "style";
ALTER TABLE "Product" DROP COLUMN "colors";
ALTER TABLE "Product" DROP COLUMN "materials";

-- Add FKs
ALTER TABLE "Product" ADD CONSTRAINT "Product_styleId_fkey"
    FOREIGN KEY ("styleId") REFERENCES "Style"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "Product"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_colorId_fkey"
    FOREIGN KEY ("colorId") REFERENCES "Color"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_materialId_fkey"
    FOREIGN KEY ("materialId") REFERENCES "Material"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_A_fkey"
    FOREIGN KEY ("A") REFERENCES "Color"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_B_fkey"
    FOREIGN KEY ("B") REFERENCES "Product"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_MaterialToProduct" ADD CONSTRAINT "_MaterialToProduct_A_fkey"
    FOREIGN KEY ("A") REFERENCES "Material"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_MaterialToProduct" ADD CONSTRAINT "_MaterialToProduct_B_fkey"
    FOREIGN KEY ("B") REFERENCES "Product"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
