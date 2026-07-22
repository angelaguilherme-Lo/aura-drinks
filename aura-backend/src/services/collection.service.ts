import { prisma } from "../db/prisma.js";

export async function getPublicCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      _count: {
        select: {
          products: {
            where: { active: true },
          },
        },
      },
    },
  });

  return collections.map(({ _count, ...collection }) => ({
    ...collection,
    productCount: _count.products,
  }));
}

export function getPublicCollectionBySlug(slug: string) {
  return prisma.collection.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      products: {
        where: { active: true },
        orderBy: { name: "asc" },
        select: {
          id: true,
          slug: true,
          name: true,
          flavor: true,
          description: true,
          priceCents: true,
          currency: true,
          size: true,
          image: true,
          active: true,
        },
      },
    },
  });
}
