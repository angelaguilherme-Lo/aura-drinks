// lib/ai/aura-schemas.ts
import { z } from 'zod';

export const AuraIntentSchema = z.enum([
  'product_inquiry',
  'ingredient_benefit_overview',
  'collection_discovery',
  'account_help',
  'favorites_help',
  'sign_in_help',
  'shipping_help',
  'checkout_help',
  'demo_limitations',
  'fallback_general',
]);

export const ProductTagSchema = z.enum([
  'citrus',
  'floral',
  'berry',
  'herbal',
  'spiced',
  'refreshing',
  'light',
  'bold',
  'botanical',
  'seasonal',
]);

export const AuraProductSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  collection: z.string().min(1),
  shortDescription: z.string().min(1),
  ingredients: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  tags: z.array(ProductTagSchema).default([]),
  price: z.number().nonnegative(),
  currency: z.string().default('EUR'),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export const AuraCollectionSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  season: z
    .enum(['spring', 'summer', 'autumn', 'winter', 'core'])
    .default('core'),
  description: z.string().default(''),
  productSlugs: z.array(z.string()).default([]),
});

export const AuraDemoPoliciesSchema = z.object({
  googleSignIn: z.string().min(1),
  checkout: z.string().min(1),
  shipping: z.string().min(1),
  favorites: z.string().min(1),
  account: z.string().min(1),
});

export const AuraCatalogSchema = z.object({
  brand: z.literal('AURA'),
  currency: z.string().default('EUR'),
  collections: z.array(AuraCollectionSchema),
  products: z.array(AuraProductSchema),
  demoPolicies: AuraDemoPoliciesSchema,
});

export type AuraIntent = z.infer<typeof AuraIntentSchema>;
export type AuraProduct = z.infer<typeof AuraProductSchema>;
export type AuraCollection = z.infer<typeof AuraCollectionSchema>;
export type AuraCatalog = z.infer<typeof AuraCatalogSchema>;
