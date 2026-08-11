/**
 * Legacy product shape retained only for the unused prototype product drawer.
 * Active storefront code uses the API-backed types in src/lib/catalog.
 */
export type Product = {
  id: number;
  slug: string;
  name: string;
  flavor: string;
  collection: 'Winter' | 'Spring' | 'Summer' | 'Autumn';
  tone: string;
  description: string;
  longDescription: string;
  accent: string;
  price: number;
  size: string;
  benefits: string[];
  ingredients: string[];
  image: string;
  heroImage?: string;
  gallery?: string[];
  palette: {
    from: string;
    via: string;
    to: string;
  };
};

// The legacy prototype grid is not rendered by any active page.
export const products: Product[] = [];

export const benefits = [
  {
    title: 'Hydration-first',
    text: 'Electrolyte-led refreshment designed to feel cleaner and more functional than conventional soda.',
  },
  {
    title: 'Low sugar profile',
    text: 'A more balanced daily drink direction with less heaviness and stronger premium wellness positioning.',
  },
  {
    title: 'Prebiotic angle',
    text: 'Supports a modern better-for-you beverage narrative centered on gut-friendly refreshment.',
  },
  {
    title: 'Seasonal storytelling',
    text: 'Collections create stronger brand identity, merchandising rhythm, and more memorable flavor discovery.',
  },
];
