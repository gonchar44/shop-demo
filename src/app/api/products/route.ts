import { prisma } from "@/shared/db/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      collection: true,
      room: true,
      style: true,
      colors: true,
      materials: true,
      variants: { include: { color: true, material: true } },
    },
    orderBy: { createdAt: "asc" },
  });
  return Response.json(products);
}
