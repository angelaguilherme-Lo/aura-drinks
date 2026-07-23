// lib/ai/aura-demo-catalog.ts
import { AuraCatalog } from './aura-schemas';

export const auraDemoCatalog: AuraCatalog = {
  brand: 'AURA',
  currency: 'EUR',
  collections: [
    {
      slug: 'spring-collection',
      name: 'Spring Collection',
      season: 'spring',
      description: 'Light, floral, botanical flavors.',
      productSlugs: [
        'elderflower-lemon',
        'rose-hibiscus',
        'lavender-yuzu',
        'botanical-mint',
      ],
    },
    {
      slug: 'summer-collection',
      name: 'Summer Collection',
      season: 'summer',
      description: 'Bright citrus and tropical flavors.',
      productSlugs: [
        'tropical-mango-lime',
        'watermelon-guava-basil',
        'blood-orange-passionfruit',
        'pineapple-ginger',
      ],
    },
    {
      slug: 'autumn-collection',
      name: 'Autumn Collection',
      season: 'autumn',
      description: 'Spiced and warming fruit blends.',
      productSlugs: [
        'apple-cinnamon',
        'blackberry-sage',
        'spiced-pumpkin',
        'ginger-maple',
      ],
    },
    {
      slug: 'winter-collection',
      name: 'Winter Collection',
      season: 'winter',
      description: 'Deep berry and aromatic winter flavors.',
      productSlugs: [
        'pomegranate-spice',
        'cranberry-coriander',
        'spiced-pear',
        'bergamot-fir',
      ],
    },
  ],
  products: [
    {
      slug: 'elderflower-lemon',
      name: 'Elderflower & Lemon',
      collection: 'spring-collection',
      shortDescription: 'A bright floral citrus soda.',
      ingredients: ['carbonated water', 'elderflower', 'lemon', 'electrolytes'],
      benefits: ['light citrus profile', 'refreshing finish'],
      tags: ['citrus', 'floral', 'light', 'refreshing', 'seasonal'],
      price: 3.9,
      currency: 'EUR',
      available: true,
      featured: true,
    },
    {
      slug: 'rose-hibiscus',
      name: 'Rose & Hibiscus',
      collection: 'spring-collection',
      shortDescription: 'Soft floral notes with a delicate tart edge.',
      ingredients: ['carbonated water', 'rose', 'hibiscus', 'electrolytes'],
      benefits: ['floral profile', 'crisp finish'],
      tags: ['floral', 'light', 'refreshing', 'seasonal'],
      price: 3.9,
      currency: 'EUR',
      available: true,
      featured: true,
    },
    {
      slug: 'lavender-yuzu',
      name: 'Lavender & Yuzu',
      collection: 'spring-collection',
      shortDescription: 'A floral-citrus blend with a clean finish.',
      ingredients: ['carbonated water', 'lavender', 'yuzu', 'electrolytes'],
      benefits: ['aromatic profile', 'bright citrus lift'],
      tags: ['floral', 'citrus', 'light', 'botanical', 'seasonal'],
      price: 3.9,
      currency: 'EUR',
      available: true,
      featured: false,
    },
    {
      slug: 'botanical-mint',
      name: 'Botanical Mint',
      collection: 'spring-collection',
      shortDescription: 'Cooling herbal refreshment.',
      ingredients: [
        'carbonated water',
        'mint',
        'botanical extracts',
        'electrolytes',
      ],
      benefits: ['cooling herbal profile', 'clean finish'],
      tags: ['herbal', 'botanical', 'light', 'refreshing', 'seasonal'],
      price: 3.9,
      currency: 'EUR',
      available: true,
      featured: false,
    },
  ],
  demoPolicies: {
    googleSignIn:
      'Google sign-in is simulated for demo purposes and does not connect to real Google accounts.',
    checkout:
      'Checkout is a demo flow only and does not process real payments or orders.',
    shipping:
      'Shipping guidance in this demo is informational only and does not reflect live fulfillment or delivery tracking.',
    favorites:
      'Favorites are saved only within the demo experience and may reset when the session ends.',
    account:
      'Account creation and sign-in are simulated for demo purposes and do not create real customer accounts.',
  },
};
