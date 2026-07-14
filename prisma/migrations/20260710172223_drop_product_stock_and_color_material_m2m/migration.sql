-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_MaterialToProduct" DROP CONSTRAINT "_MaterialToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_MaterialToProduct" DROP CONSTRAINT "_MaterialToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stock";

-- DropTable
DROP TABLE "_ColorToProduct";

-- DropTable
DROP TABLE "_MaterialToProduct";

