import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { id: "seed-category-apparel", slug: "apparel", name: "Apparel" },
  { id: "seed-category-footwear", slug: "footwear", name: "Footwear" },
  { id: "seed-category-accessories", slug: "accessories", name: "Accessories" },
];

const collections = [
  { id: "seed-collection-basics", slug: "basics", name: "Basics" },
  { id: "seed-collection-denim", slug: "denim", name: "Denim" },
  { id: "seed-collection-minimalist", slug: "minimalist", name: "Minimalist" },
  { id: "seed-collection-everyday", slug: "everyday", name: "Everyday" },
  { id: "seed-collection-winter", slug: "winter", name: "Winter" },
];

const rooms = [
  { id: "seed-room-living-room", slug: "living-room", name: "Living Room" },
  { id: "seed-room-bedroom", slug: "bedroom", name: "Bedroom" },
  { id: "seed-room-office", slug: "office", name: "Office" },
  { id: "seed-room-outdoor", slug: "outdoor", name: "Outdoor" },
];

const styles = [
  { id: "seed-style-casual", slug: "casual", name: "Casual" },
  { id: "seed-style-modern", slug: "modern", name: "Modern" },
];

const colors = [
  { id: "seed-color-white", slug: "white", name: "White", hex: "#FFFFFF" },
  { id: "seed-color-dark-blue", slug: "dark-blue", name: "Dark Blue", hex: "#1A2E5A" },
  { id: "seed-color-black", slug: "black", name: "Black", hex: "#000000" },
  { id: "seed-color-olive", slug: "olive", name: "Olive", hex: "#6B7A40" },
  { id: "seed-color-navy", slug: "navy", name: "Navy", hex: "#001F5B" },
  { id: "seed-color-charcoal", slug: "charcoal", name: "Charcoal", hex: "#36454F" },
  { id: "seed-color-cream", slug: "cream", name: "Cream", hex: "#FFFDD0" },
  { id: "seed-color-burgundy", slug: "burgundy", name: "Burgundy", hex: "#800020" },
];

const materials = [
  { id: "seed-material-cotton", slug: "cotton", name: "Cotton" },
  { id: "seed-material-denim", slug: "denim", name: "Denim" },
  { id: "seed-material-elastane", slug: "elastane", name: "Elastane" },
  { id: "seed-material-leather", slug: "leather", name: "Leather" },
  { id: "seed-material-rubber", slug: "rubber", name: "Rubber" },
  { id: "seed-material-canvas", slug: "canvas", name: "Canvas" },
  { id: "seed-material-wool", slug: "wool", name: "Wool" },
];

const products = [
  {
    id: "seed-product-1",
    slug: "classic-white-t-shirt",
    name: "Classic White T-Shirt",
    description: "A timeless white cotton t-shirt for everyday wear.",
    priceCents: 1999,
    compareAtCents: 2499,
    currency: "USD",
    categoryId: "seed-category-apparel",
    collectionId: "seed-collection-basics",
    styleId: "seed-style-casual",
    colors: { connect: [{ id: "seed-color-white" }] },
    materials: { connect: [{ id: "seed-material-cotton" }] },
    images: ["https://placehold.co/800x800?text=T-Shirt"],
    thumbnail: "https://placehold.co/400x400?text=T-Shirt",
    stock: 100,
    isFeatured: true,
    isNew: false,
  },
  {
    id: "seed-product-2",
    slug: "slim-fit-jeans",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans in dark wash denim.",
    priceCents: 5999,
    currency: "USD",
    categoryId: "seed-category-apparel",
    collectionId: "seed-collection-denim",
    styleId: "seed-style-casual",
    colors: { connect: [{ id: "seed-color-dark-blue" }] },
    materials: { connect: [{ id: "seed-material-denim" }, { id: "seed-material-elastane" }] },
    dimensions: "30x32",
    images: ["https://placehold.co/800x800?text=Jeans"],
    thumbnail: "https://placehold.co/400x400?text=Jeans",
    stock: 50,
    isNew: true,
  },
  {
    id: "seed-product-3",
    slug: "leather-sneakers",
    name: "Leather Sneakers",
    description: "Clean white leather sneakers with a minimalist design.",
    priceCents: 8999,
    compareAtCents: 11999,
    currency: "USD",
    categoryId: "seed-category-footwear",
    collectionId: "seed-collection-minimalist",
    styleId: "seed-style-modern",
    colors: { connect: [{ id: "seed-color-white" }, { id: "seed-color-black" }] },
    materials: { connect: [{ id: "seed-material-leather" }, { id: "seed-material-rubber" }] },
    weight: "600g",
    images: ["https://placehold.co/800x800?text=Sneakers"],
    thumbnail: "https://placehold.co/400x400?text=Sneakers",
    stock: 30,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 28,
  },
  {
    id: "seed-product-4",
    slug: "canvas-backpack",
    name: "Canvas Backpack",
    description: "Durable canvas backpack with multiple compartments.",
    priceCents: 4499,
    currency: "USD",
    categoryId: "seed-category-accessories",
    collectionId: "seed-collection-everyday",
    colors: { connect: [{ id: "seed-color-olive" }, { id: "seed-color-navy" }, { id: "seed-color-black" }] },
    materials: { connect: [{ id: "seed-material-canvas" }, { id: "seed-material-leather" }] },
    weight: "800g",
    images: ["https://placehold.co/800x800?text=Backpack"],
    thumbnail: "https://placehold.co/400x400?text=Backpack",
    stock: 25,
    isNew: true,
    rating: 4.8,
    reviewCount: 14,
  },
  {
    id: "seed-product-5",
    slug: "wool-beanie",
    name: "Wool Beanie",
    description: "Soft ribbed wool beanie for cold weather.",
    priceCents: 1499,
    currency: "USD",
    categoryId: "seed-category-accessories",
    collectionId: "seed-collection-winter",
    styleId: "seed-style-casual",
    colors: { connect: [{ id: "seed-color-charcoal" }, { id: "seed-color-cream" }, { id: "seed-color-burgundy" }] },
    materials: { connect: [{ id: "seed-material-wool" }] },
    images: ["https://placehold.co/800x800?text=Beanie"],
    thumbnail: "https://placehold.co/400x400?text=Beanie",
    stock: 75,
    isFeatured: true,
  },
];

const variants = [
  // T-Shirt variants
  { productId: "seed-product-1", name: "White / S", sku: "TSHIRT-WHITE-S", colorId: "seed-color-white", materialId: "seed-material-cotton", stock: 25 },
  { productId: "seed-product-1", name: "White / M", sku: "TSHIRT-WHITE-M", colorId: "seed-color-white", materialId: "seed-material-cotton", stock: 30 },
  { productId: "seed-product-1", name: "White / L", sku: "TSHIRT-WHITE-L", colorId: "seed-color-white", materialId: "seed-material-cotton", stock: 25 },
  { productId: "seed-product-1", name: "White / XL", sku: "TSHIRT-WHITE-XL", colorId: "seed-color-white", materialId: "seed-material-cotton", stock: 20 },

  // Jeans variants
  { productId: "seed-product-2", name: "Dark Blue / 28", sku: "JEANS-DB-28", colorId: "seed-color-dark-blue", materialId: "seed-material-denim", stock: 15 },
  { productId: "seed-product-2", name: "Dark Blue / 30", sku: "JEANS-DB-30", colorId: "seed-color-dark-blue", materialId: "seed-material-denim", stock: 18 },
  { productId: "seed-product-2", name: "Dark Blue / 32", sku: "JEANS-DB-32", colorId: "seed-color-dark-blue", materialId: "seed-material-denim", stock: 17 },

  // Sneakers variants
  { productId: "seed-product-3", name: "White / EU41", sku: "SNEAKER-W-41", colorId: "seed-color-white", materialId: "seed-material-leather", stock: 10 },
  { productId: "seed-product-3", name: "White / EU42", sku: "SNEAKER-W-42", colorId: "seed-color-white", materialId: "seed-material-leather", stock: 12 },
  { productId: "seed-product-3", name: "White / EU43", sku: "SNEAKER-W-43", colorId: "seed-color-white", materialId: "seed-material-leather", stock: 10 },
  { productId: "seed-product-3", name: "Black / EU41", sku: "SNEAKER-B-41", colorId: "seed-color-black", materialId: "seed-material-leather", stock: 8 },
  { productId: "seed-product-3", name: "Black / EU42", sku: "SNEAKER-B-42", colorId: "seed-color-black", materialId: "seed-material-leather", stock: 10 },
  { productId: "seed-product-3", name: "Black / EU43", sku: "SNEAKER-B-43", colorId: "seed-color-black", materialId: "seed-material-leather", stock: 8 },

  // Backpack variants
  { productId: "seed-product-4", name: "Olive / One Size", sku: "BACKPACK-OL-OS", colorId: "seed-color-olive", materialId: "seed-material-canvas", stock: 8 },
  { productId: "seed-product-4", name: "Navy / One Size", sku: "BACKPACK-NV-OS", colorId: "seed-color-navy", materialId: "seed-material-canvas", stock: 9 },
  { productId: "seed-product-4", name: "Black / One Size", sku: "BACKPACK-BK-OS", colorId: "seed-color-black", materialId: "seed-material-canvas", stock: 8 },

  // Beanie variants
  { productId: "seed-product-5", name: "Charcoal / One Size", sku: "BEANIE-CH-OS", colorId: "seed-color-charcoal", materialId: "seed-material-wool", stock: 25 },
  { productId: "seed-product-5", name: "Cream / One Size", sku: "BEANIE-CR-OS", colorId: "seed-color-cream", materialId: "seed-material-wool", stock: 25 },
  { productId: "seed-product-5", name: "Burgundy / One Size", sku: "BEANIE-BR-OS", colorId: "seed-color-burgundy", materialId: "seed-material-wool", stock: 25 },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
  }
  console.log(`Seeded ${categories.length} categories.`);

  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { id: collection.id },
      update: collection,
      create: collection,
    });
  }
  console.log(`Seeded ${collections.length} collections.`);

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { id: room.id },
      update: room,
      create: room,
    });
  }
  console.log(`Seeded ${rooms.length} rooms.`);

  for (const style of styles) {
    await prisma.style.upsert({
      where: { id: style.id },
      update: style,
      create: style,
    });
  }
  console.log(`Seeded ${styles.length} styles.`);

  for (const color of colors) {
    await prisma.color.upsert({
      where: { id: color.id },
      update: color,
      create: color,
    });
  }
  console.log(`Seeded ${colors.length} colors.`);

  for (const material of materials) {
    await prisma.material.upsert({
      where: { id: material.id },
      update: material,
      create: material,
    });
  }
  console.log(`Seeded ${materials.length} materials.`);

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: { ...product, colors: { set: [] }, materials: { set: [] } },
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);

  // Re-set M2M relationships for products
  for (const product of products) {
    const colors = (product.colors as any).connect;
    const materials = (product.materials as any).connect;
    if (colors || materials) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          colors: colors ? { connect: colors } : undefined,
          materials: materials ? { connect: materials } : undefined,
        },
      });
    }
  }

  for (const variant of variants) {
    await prisma.productVariant.create({
      data: variant,
    });
  }
  console.log(`Seeded ${variants.length} product variants.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
