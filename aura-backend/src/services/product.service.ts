import { prisma } from '../db/prisma.js';

export function getPublicProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
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
      collection: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
    },
  });
}

export async function getPublicProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      active: true,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      flavor: true,
      description: true,
      longDescription: true,
      priceCents: true,
      currency: true,
      size: true,
      image: true,
      heroImage: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      collection: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
      benefits: {
        orderBy: { position: 'asc' },
        select: { text: true },
      },
      ingredients: {
        orderBy: { position: 'asc' },
        select: { name: true },
      },
      galleryImages: {
        orderBy: { position: 'asc' },
        select: {
          url: true,
          altText: true,
        },
      },
    },
  });

  if (!product) return null;

  return {
    ...product,
    benefits: product.benefits.map((benefit) => benefit.text),
    ingredients: product.ingredients.map((ingredient) => ingredient.name),
  };
}
