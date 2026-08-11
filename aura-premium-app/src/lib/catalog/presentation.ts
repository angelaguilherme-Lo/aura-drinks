export type CollectionPresentation = {
  image: string;
  subtitle: string;
  accent: string;
  badgeClass: string;
  palette: {
    from: string;
    via: string;
    to: string;
  };
};

const defaultPresentation: CollectionPresentation = {
  image: '',
  subtitle: 'Seasonal sparkling refreshment',
  accent: 'from-stone-100 via-white to-stone-200',
  badgeClass: 'bg-stone-100 text-stone-800',
  palette: {
    from: 'rgba(71, 111, 87, 0.9)',
    via: 'rgba(148, 177, 158, 0.72)',
    to: 'rgba(239, 243, 238, 0.58)',
  },
};

export const collectionPresentation: Record<string, CollectionPresentation> = {
  winter: {
    image: '/images/winter/winter_collection.jpg',
    subtitle: 'Cool spice, berry depth, frosted elegance',
    accent: 'from-slate-700/80 via-rose-900/60 to-teal-800/70',
    badgeClass: 'bg-rose-100 text-rose-800',
    palette: {
      from: 'rgba(39, 57, 93, 0.96)',
      via: 'rgba(86, 38, 76, 0.76)',
      to: 'rgba(214, 225, 238, 0.55)',
    },
  },
  spring: {
    image: '/images/spring/spring-collection.jpg',
    subtitle: 'Floral freshness and soft botanical lift',
    accent: 'from-lime-100 via-rose-100 to-emerald-100',
    badgeClass: 'bg-lime-100 text-lime-800',
    palette: {
      from: 'rgba(168, 187, 123, 0.92)',
      via: 'rgba(224, 210, 220, 0.76)',
      to: 'rgba(247, 241, 225, 0.62)',
    },
  },
  summer: {
    image: '/images/summer/summer-collection.jpg',
    subtitle: 'Sun-bright fruit with sparkling energy',
    accent: 'from-amber-100 via-orange-100 to-cyan-100',
    badgeClass: 'bg-amber-100 text-amber-800',
    palette: {
      from: 'rgba(225, 145, 56, 0.94)',
      via: 'rgba(244, 188, 93, 0.76)',
      to: 'rgba(210, 239, 239, 0.6)',
    },
  },
  autumn: {
    image: '/images/autumn/autumn-collection.jpg',
    subtitle: 'Orchard spice and richer warmth',
    accent: 'from-orange-100 via-amber-200 to-stone-200',
    badgeClass: 'bg-orange-100 text-orange-800',
    palette: {
      from: 'rgba(116, 56, 31, 0.94)',
      via: 'rgba(178, 102, 54, 0.76)',
      to: 'rgba(235, 213, 180, 0.6)',
    },
  },
};

export function getCollectionPresentation(slug: string) {
  return collectionPresentation[slug] ?? defaultPresentation;
}

export function getCollectionLabel(name: string) {
  return name.replace(/\s+Collection$/i, '');
}
