import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { id: "seed-category-apparel", slug: "apparel", name: "Apparel" },
  { id: "seed-category-footwear", slug: "footwear", name: "Footwear" },
  { id: "seed-category-accessories", slug: "accessories", name: "Accessories" },
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
    collection: "Basics",
    style: "Casual",
    colors: ["White"],
    materials: ["Cotton"],
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
    collection: "Denim",
    style: "Casual",
    colors: ["Dark Blue"],
    materials: ["Denim", "Elastane"],
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
    collection: "Minimalist",
    style: "Modern",
    colors: ["White", "Black"],
    materials: ["Leather", "Rubber"],
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
    collection: "Everyday",
    colors: ["Olive", "Navy", "Black"],
    materials: ["Canvas", "Leather"],
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
    collection: "Winter",
    style: "Casual",
    colors: ["Charcoal", "Cream", "Burgundy"],
    materials: ["Wool"],
    images: ["https://placehold.co/800x800?text=Beanie"],
    thumbnail: "https://placehold.co/400x400?text=Beanie",
    stock: 75,
    isFeatured: true,
  },
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

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
