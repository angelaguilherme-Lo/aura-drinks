export interface Product {
  id: number;
  slug: string;
  name: string;
  flavor: string | null;
  collectionId: string | null;
  description: string;
  longDescription: string | null;
  // Store prices in cents to avoid floating point rounding errors.
  priceCents: number;
  currency: string;
  size: string | null;
  image: string;
  heroImage: string | null;
  benefits: string[];
  ingredients: string[];
  galleryImages: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  slug: string;
  name: string;
  flavor?: string | null;
  collectionId?: string | null;
  description: string;
  longDescription?: string | null;
  priceCents: number;
  currency: string;
  size?: string | null;
  image: string;
  heroImage?: string | null;
  benefits?: string[];
  ingredients?: string[];
  galleryImages?: string[];
  active?: boolean;
}

export type UpdateProductInput = Partial<CreateProductInput>;
