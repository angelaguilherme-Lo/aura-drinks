import "dotenv/config";
import { readFileSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

type SeedCollection = { slug: string; name: string; description: string | null };
type SeedProduct = {
  slug: string; name: string; flavor: string; collectionSlug: string;
  description: string; longDescription: string; priceCents: number;
  currency: string; size: string; image: string; heroImage: string;
  benefits: string[]; ingredients: string[]; galleryImages: string[];
};
type SeedData = { collections: SeedCollection[]; products: SeedProduct[] };

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
const seedData = JSON.parse(
  readFileSync(new URL("./seedData.json", import.meta.url), "utf8"),
) as SeedData;

async function main(): Promise<void> {
  for (const collection of seedData.collections) {
    await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: { name: collection.name, description: collection.description },
      create: collection,
    });
  }

  for (const product of seedData.products) {
    const collection = await prisma.collection.findUniqueOrThrow({
      where: { slug: product.collectionSlug }, select: { id: true },
    });
    const { collectionSlug: _collectionSlug, benefits, ingredients, galleryImages, ...data } = product;

    await prisma.$transaction(async (tx) => {
      const savedProduct = await tx.product.upsert({
        where: { slug: product.slug },
        update: { ...data, collectionId: collection.id },
        create: { ...data, collectionId: collection.id },
        select: { id: true },
      });
      await Promise.all([
        tx.productBenefit.deleteMany({ where: { productId: savedProduct.id } }),
        tx.productIngredient.deleteMany({ where: { productId: savedProduct.id } }),
        tx.productGalleryImage.deleteMany({ where: { productId: savedProduct.id } }),
      ]);
      await tx.productBenefit.createMany({
        data: benefits.map((text, position) => ({ productId: savedProduct.id, text, position })),
      });
      await tx.productIngredient.createMany({
        data: ingredients.map((name, position) => ({ productId: savedProduct.id, name, position })),
      });
      await tx.productGalleryImage.createMany({
        data: galleryImages.map((url, position) => ({
          productId: savedProduct.id, url, altText: `${product.name} image ${position + 1}`, position,
        })),
      });
    });
  }
  console.log(`Seed completed: ${seedData.collections.length} collections, ${seedData.products.length} products`);
}

main().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
