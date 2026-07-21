import "dotenv/config";
import { prisma } from "./prisma.js";

async function main(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
  const [collectionCount, productCount, product] = await Promise.all([
    prisma.collection.count(),
    prisma.product.count(),
    prisma.product.findFirst({
      orderBy: { name: "asc" },
      include: {
        collection: true,
        benefits: { orderBy: { position: "asc" } },
        ingredients: { orderBy: { position: "asc" } },
        galleryImages: { orderBy: { position: "asc" } },
      },
    }),
  ]);
  console.log("Database connection successful");
  console.log(`Collections: ${collectionCount}`);
  console.log(`Products: ${productCount}`);
  console.log("Sample product:", product ? {
    name: product.name,
    collection: product.collection.name,
    benefits: product.benefits.map(({ text }) => text),
    ingredients: product.ingredients.map(({ name }) => name),
    galleryImages: product.galleryImages.map(({ url }) => url),
  } : "none (run the seed first)");
}

main().catch((error: unknown) => {
  console.error("Database connection test failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
