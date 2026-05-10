import { prisma } from "@/shared/db/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return Response.json(products);
}
