export type Product = {
  id: number;
  slug: string;
  name: string;
  flavor: string;
  collection: "Winter" | "Spring" | "Summer" | "Autumn";
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

export const collections = [
  {
    id: "winter",
    title: "Winter Collection",
    subtitle: "Cool spice, berry depth, frosted elegance",
    description:
      "A crisp, polished seasonal line with tart fruit, bergamot, spiced pear, and layered winter botanicals.",
    accent: "from-slate-700/80 via-rose-900/60 to-teal-800/70",
    image: "/images/winter/winter_collection.jpg",
  },
  {
    id: "spring",
    title: "Spring Collection",
    subtitle: "Floral freshness and soft botanical lift",
    description:
      "Light, clean, uplifting flavors shaped by elderflower, rose, lavender, mint, and bright citrus notes.",
    accent: "from-lime-100 via-rose-100 to-emerald-100",
    image: "/images/spring/spring-collection.jpg",
  },
  {
    id: "summer",
    title: "Summer Collection",
    subtitle: "Sun-bright fruit with sparkling energy",
    description:
      "Tropical citrus, yellow fruit, juicy basil freshness, and bright sparkling refreshment for active summer moments.",
    accent: "from-amber-100 via-orange-100 to-cyan-100",
    image: "/images/summer/summer-collection.jpg",
  },
  {
    id: "autumn",
    title: "Autumn Collection",
    subtitle: "Orchard spice and richer warmth",
    description:
      "Apple, blackberry, pumpkin spice, maple warmth, and deeper seasonal comfort with a premium finish.",
    accent: "from-orange-100 via-amber-200 to-stone-200",
    image: "/images/autumn/autumn-collection.jpg",
  },
];

export const products: Product[] = [
  {
    id: 1,
    slug: "pomegranate-spruce",
    name: "Pomegranate & Spruce",
    flavor: "Crisp berry finish",
    collection: "Winter",
    tone: "Berry",
    description:
      "A cold, jewel-toned profile with tart fruit, refined sparkle, and a clean mineral finish.",
    longDescription:
      "Pomegranate & Spruce is built as a winter-forward premium soda expression with tart red fruit, subtle evergreen lift, and a polished sparkling finish. It is designed to feel crisp and elevated rather than syrupy, with a visual world that fits colder seasonal merchandising and evening refreshment rituals.",
    accent: "bg-rose-100 text-rose-900",
    price: 3.8,
    size: "330 ml",
    benefits: ["Electrolytes", "Low sugar", "Prebiotic-inspired", "Seasonal ritual"],
    ingredients: ["Pomegranate", "Spruce notes", "Electrolytes", "Sparkling base"],
    image: "/images/winter/Pomegranate-Spruce.jpg",
    heroImage: "/images/winter/Pomegranate-Spruce.jpg",
    gallery: [
      "/images/winter/Pomegranate-Spruce.jpg",
      "/images/winter/winter_collection.jpg",
    ],
    palette: {
      from: "rgba(39, 57, 93, 0.96)",
      via: "rgba(57, 82, 135, 0.76)",
      to: "rgba(214, 225, 238, 0.55)",
    },
  },
  {
    id: 2,
    slug: "cranberry-evergreen",
    name: "Cranberry & Evergreen",
    flavor: "Fresh and forested",
    collection: "Winter",
    tone: "Evergreen",
    description:
      "Bright cranberry layered with herbal coolness for a premium, wintry expression.",
    longDescription:
      "Cranberry & Evergreen balances bright acidity with cooler herbal freshness. It is styled to express winter clarity, botanical depth, and a more composed premium flavor architecture than conventional holiday soda concepts.",
    accent: "bg-emerald-100 text-emerald-900",
    price: 3.8,
    size: "330 ml",
    benefits: ["Hydration-forward", "Botanical character", "Low sugar", "Elegant finish"],
    ingredients: ["Cranberry", "Evergreen botanicals", "Electrolytes", "Sparkling base"],
    image: "/images/winter/Cranberry-Evergreen.jpg",
    heroImage: "/images/winter/Cranberry-Evergreen.jpg",
    gallery: [
      "/images/winter/Cranberry-Evergreen.jpg",
      "/images/winter/winter_collection.jpg",
    ],
    palette: {
      from: "rgba(86, 18, 34, 0.96)",
      via: "rgba(120, 28, 49, 0.76)",
      to: "rgba(188, 220, 200, 0.45)",
    },
  },
  {
    id: 3,
    slug: "spiced-pear",
    name: "Spiced Pear",
    flavor: "Warm orchard spice",
    collection: "Winter",
    tone: "Spiced",
    description:
      "Richer winter warmth with pear notes, aromatic spice, and a polished sparkling finish.",
    longDescription:
      "Spiced Pear adds warmth and seasonal depth to the Aura Winter Collection with orchard fruit, subtle spice, and a smoother amber profile. It is designed for colder evenings, festive meals, and more comforting winter refreshment moments.",
    accent: "bg-amber-100 text-amber-900",
    price: 3.9,
    size: "330 ml",
    benefits: ["Winter warmth", "Low sugar", "Seasonal expression", "Sparkling lift"],
    ingredients: ["Pear", "Warming spice notes", "Electrolytes", "Sparkling base"],
    image: "/images/winter/Spiced-Pear.jpg",
    heroImage: "/images/winter/Spiced-Pear.jpg",
    gallery: [
      "/images/winter/Spiced-Pear.jpg",
      "/images/winter/winter_collection.jpg",
    ],
    palette: {
      from: "rgba(89, 38, 22, 0.96)",
      via: "rgba(143, 78, 44, 0.76)",
      to: "rgba(237, 217, 188, 0.5)",
    },
  },
  {
    id: 4,
    slug: "bergamot-pine",
    name: "Bergamot & Pine",
    flavor: "Citrus forest freshness",
    collection: "Winter",
    tone: "Citrus",
    description:
      "A cool, botanical winter profile with bergamot brightness and clean evergreen depth.",
    longDescription:
      "Bergamot & Pine is the most lifted and aromatic expression in the Winter Collection, balancing citrus freshness with a cool forested finish. It provides a brighter premium winter option while staying inside Aura’s calm and elegant brand language.",
    accent: "bg-cyan-100 text-cyan-900",
    price: 3.9,
    size: "330 ml",
    benefits: ["Bright botanical profile", "Citrus lift", "Low sugar", "Electrolyte-led"],
    ingredients: ["Bergamot", "Pine botanicals", "Electrolytes", "Sparkling base"],
    image: "/images/winter/Bergamot-Pine.jpg",
    heroImage: "/images/winter/Bergamot-Pine.jpg",
    gallery: [
      "/images/winter/Bergamot-Pine.jpg",
      "/images/winter/winter_collection.jpg",
    ],
    palette: {
      from: "rgba(19, 79, 84, 0.96)",
      via: "rgba(42, 123, 126, 0.76)",
      to: "rgba(214, 232, 232, 0.55)",
    },
  },
  {
    id: 5,
    slug: "elderflower-lemon",
    name: "Elderflower & Lemon",
    flavor: "Lifted citrus bloom",
    collection: "Spring",
    tone: "Citrus",
    description:
      "An airy floral profile with subtle lemon brightness and a polished, botanical finish.",
    longDescription:
      "Elderflower & Lemon is designed as a clean, uplifting spring expression with elegant florals and crisp citrus lift. It is the closest profile to a refined hospitality-style welcome drink, but reinterpreted for daily wellness refreshment.",
    accent: "bg-lime-100 text-lime-900",
    price: 3.9,
    size: "330 ml",
    benefits: ["Bright hydration feel", "Citrus freshness", "Prebiotic-inspired", "Spring profile"],
    ingredients: ["Elderflower", "Lemon", "Electrolytes", "Sparkling base"],
    image: "/images/spring/Elderflower-Lemon.jpg",
    heroImage: "/images/spring/Elderflower-Lemon.jpg",
    gallery: [
      "/images/spring/Elderflower-Lemon.jpg",
      "/images/spring/spring-collection.jpg",
    ],
    palette: {
      from: "rgba(168, 187, 123, 0.92)",
      via: "rgba(224, 235, 191, 0.76)",
      to: "rgba(251, 247, 221, 0.62)",
    },
  },
  {
    id: 6,
    slug: "rose-hibiscus",
    name: "Rose & Hibiscus",
    flavor: "Soft floral acidity",
    collection: "Spring",
    tone: "Floral",
    description:
      "Delicate yet vivid, with petal softness balanced by refreshing acidity and bubbles.",
    longDescription:
      "Rose & Hibiscus is the most floral expression in the Spring Collection, created for a premium soft-bloom experience. It pairs a romantic visual identity with crisp sparkling structure so the drink remains bright, airy, and modern rather than overly sweet.",
    accent: "bg-pink-100 text-pink-900",
    price: 3.9,
    size: "330 ml",
    benefits: ["Light botanical profile", "Low sugar", "Refreshing finish", "Wellness-led feel"],
    ingredients: ["Rose", "Hibiscus", "Electrolytes", "Sparkling base"],
    image: "/images/spring/Rose-Hibiscus.jpg",
    heroImage: "/images/spring/Rose-Hibiscus.jpg",
    gallery: [
      "/images/spring/Rose-Hibiscus.jpg",
      "/images/spring/spring-collection.jpg",
    ],
    palette: {
      from: "rgba(188, 128, 147, 0.92)",
      via: "rgba(236, 194, 205, 0.76)",
      to: "rgba(253, 234, 239, 0.62)",
    },
  },
  {
    id: 7,
    slug: "lavender-yuco",
    name: "Lavender & Yuco",
    flavor: "Herbal blossom calm",
    collection: "Spring",
    tone: "Lavender",
    description:
      "A floral-citrus expression with soft herbal notes and a bright, polished finish.",
    longDescription:
      "Lavender & Yuco adds a lighter, more aromatic spring personality to the range, balancing floral softness with lively fruit brightness. It is designed to feel premium, calm, and slightly unexpected while remaining easy to drink.",
    accent: "bg-violet-100 text-violet-900",
    price: 4.0,
    size: "330 ml",
    benefits: ["Aromatic profile", "Spring brightness", "Low sugar", "Elegant finish"],
    ingredients: ["Lavender", "Yuco notes", "Electrolytes", "Sparkling base"],
    image: "/images/spring/Lavender-Yuco.jpg",
    heroImage: "/images/spring/Lavender-Yuco.jpg",
    gallery: [
      "/images/spring/Lavender-Yuco.jpg",
      "/images/spring/spring-collection.jpg",
    ],
    palette: {
      from: "rgba(180, 164, 209, 0.94)",
      via: "rgba(217, 204, 235, 0.78)",
      to: "rgba(247, 241, 255, 0.66)",
    },
  },
  {
    id: 8,
    slug: "botanical-mint",
    name: "Botanical Mint",
    flavor: "Fresh green clarity",
    collection: "Spring",
    tone: "Botanical",
    description:
      "A clean, mint-led profile with fresh herbal character and a lightly sparkling finish.",
    longDescription:
      "Botanical Mint is the freshest and greenest expression in the Spring Collection, built around clarity, lift, and a clean cooling finish. It gives the range a more herbaceous premium option for daytime refreshment.",
    accent: "bg-emerald-100 text-emerald-900",
    price: 4.0,
    size: "330 ml",
    benefits: ["Fresh herbal profile", "Cooling finish", "Low sugar", "Electrolyte-led"],
    ingredients: ["Mint botanicals", "Electrolytes", "Sparkling base"],
    image: "/images/spring/Botanical-Mint.jpg",
    heroImage: "/images/spring/Botanical-Mint.jpg",
    gallery: [
      "/images/spring/Botanical-Mint.jpg",
      "/images/spring/spring-collection.jpg",
    ],
    palette: {
      from: "rgba(126, 180, 120, 0.94)",
      via: "rgba(192, 225, 186, 0.78)",
      to: "rgba(239, 251, 234, 0.66)",
    },
  },
  {
    id: 9,
    slug: "tropical-mango-lime",
    name: "Tropical Mango & Lime",
    flavor: "Golden citrus energy",
    collection: "Summer",
    tone: "Tropical",
    description:
      "A vivid mango-led summer flavor with lime brightness and a polished sparkling finish.",
    longDescription:
      "Tropical Mango & Lime is a sunny premium summer expression built around juicy mango character, citrus lift, and warm-weather refreshment. It is designed to feel vibrant and social while remaining cleaner and more refined than conventional fruit soda.",
    accent: "bg-orange-100 text-orange-900",
    price: 4.1,
    size: "330 ml",
    benefits: ["Summer energy", "Citrus lift", "Low sugar", "Hydration support"],
    ingredients: ["Mango", "Lime", "Electrolytes", "Sparkling base"],
    image: "/images/summer/Tropical-Mango-Lime.jpg",
    heroImage: "/images/summer/Tropical-Mango-Lime.jpg",
    gallery: [
      "/images/summer/Tropical-Mango-Lime.jpg",
      "/images/summer/summer-collection.jpg",
    ],
    palette: {
      from: "rgba(205, 118, 24, 0.94)",
      via: "rgba(242, 170, 73, 0.8)",
      to: "rgba(255, 225, 161, 0.64)",
    },
  },
  {
    id: 10,
    slug: "watermelon-basil",
    name: "Watermelon Basil",
    flavor: "Juicy herb freshness",
    collection: "Summer",
    tone: "Fresh",
    description:
      "A refreshing fruit-and-herb combination with bright watermelon character and a cooling finish.",
    longDescription:
      "Watermelon Basil adds a fresher and more playful summer note to the range, balancing juicy fruit with green herbal lift. It is designed for daytime refreshment, outdoor occasions, and a softer premium summer mood.",
    accent: "bg-green-100 text-green-900",
    price: 4.1,
    size: "330 ml",
    benefits: ["Fresh summer profile", "Herbal lift", "Low sugar", "Electrolyte-led"],
    ingredients: ["Watermelon", "Basil", "Electrolytes", "Sparkling base"],
    image: "/images/summer/Watermelon-Basil.jpg",
    heroImage: "/images/summer/Watermelon-Basil.jpg",
    gallery: [
      "/images/summer/Watermelon-Basil.jpg",
      "/images/summer/summer-collection.jpg",
    ],
    palette: {
      from: "rgba(106, 158, 71, 0.94)",
      via: "rgba(172, 213, 131, 0.8)",
      to: "rgba(237, 249, 217, 0.64)",
    },
  },
  {
    id: 11,
    slug: "blood-orange-passionfruit",
    name: "Blood Orange & Passionfruit",
    flavor: "Bold citrus depth",
    collection: "Summer",
    tone: "Bright",
    description:
      "A sharper citrus-fruit profile with vivid color, lively acidity, and a premium sparkling finish.",
    longDescription:
      "Blood Orange & Passionfruit is the boldest summer expression in the line, built around punchy citrus character and tropical depth. It gives the Summer Collection a more energetic, colorful flavor while staying inside Aura’s premium visual language.",
    accent: "bg-cyan-100 text-cyan-900",
    price: 4.15,
    size: "330 ml",
    benefits: ["Bright fruit profile", "Active refreshment", "Low sugar", "Seasonal energy"],
    ingredients: ["Blood orange", "Passionfruit", "Electrolytes", "Sparkling base"],
    image: "/images/summer/Blood-Orange-Passionfruit.jpg",
    heroImage: "/images/summer/Blood-Orange-Passionfruit.jpg",
    gallery: [
      "/images/summer/Blood-Orange-Passionfruit.jpg",
      "/images/summer/summer-collection.jpg",
    ],
    palette: {
      from: "rgba(34, 116, 140, 0.94)",
      via: "rgba(70, 173, 204, 0.8)",
      to: "rgba(222, 247, 255, 0.64)",
    },
  },
  {
    id: 12,
    slug: "pineapple-ginger",
    name: "Pineapple & Ginger",
    flavor: "Warm bright spice",
    collection: "Summer",
    tone: "Golden",
    description:
      "A golden tropical profile with pineapple sweetness, ginger lift, and crisp sparkling structure.",
    longDescription:
      "Pineapple & Ginger rounds out the Summer Collection with a warmer yellow-fruit expression that combines brightness and spice. It is designed to feel easygoing, vivid, and premium across both casual and hospitality-inspired moments.",
    accent: "bg-yellow-100 text-yellow-900",
    price: 4.1,
    size: "330 ml",
    benefits: ["Tropical brightness", "Ginger lift", "Low sugar", "Hydration-forward"],
    ingredients: ["Pineapple", "Ginger", "Electrolytes", "Sparkling base"],
    image: "/images/summer/Pineapple-Ginger.jpg",
    heroImage: "/images/summer/Pineapple-Ginger.jpg",
    gallery: [
      "/images/summer/Pineapple-Ginger.jpg",
      "/images/summer/summer-collection.jpg",
    ],
    palette: {
      from: "rgba(209, 173, 48, 0.94)",
      via: "rgba(241, 213, 104, 0.8)",
      to: "rgba(255, 245, 194, 0.66)",
    },
  },
  {
    id: 13,
    slug: "apple-cinnamon",
    name: "Apple & Cinnamon",
    flavor: "Orchard warmth",
    collection: "Autumn",
    tone: "Spiced",
    description:
      "Rounded fruit sweetness lifted by aromatic spice and a more grounded seasonal finish.",
    longDescription:
      "Apple & Cinnamon is structured around orchard freshness and soft spice warmth. It gives Autumn a familiar but elevated beverage expression with richer comfort cues and polished seasonal depth.",
    accent: "bg-orange-100 text-orange-900",
    price: 3.95,
    size: "330 ml",
    benefits: ["Comfort profile", "Warm spice notes", "Low sugar", "Seasonal appeal"],
    ingredients: ["Apple", "Cinnamon", "Electrolytes", "Sparkling base"],
    image: "/images/autumn/Apple-Cinnamon.jpg",
    heroImage: "/images/autumn/Apple-Cinnamon.jpg",
    gallery: [
      "/images/autumn/Apple-Cinnamon.jpg",
      "/images/autumn/autumn-collection.jpg",
    ],
    palette: {
      from: "rgba(182, 85, 36, 0.94)",
      via: "rgba(228, 146, 92, 0.8)",
      to: "rgba(253, 222, 193, 0.66)",
    },
  },
  {
    id: 14,
    slug: "blackberry-sage",
    name: "Blackberry & Sage",
    flavor: "Dark botanical depth",
    collection: "Autumn",
    tone: "Berry",
    description:
      "A deeper berry-led profile with herbal sage character and a rich premium finish.",
    longDescription:
      "Blackberry & Sage gives the Autumn Collection a darker, moodier flavor expression with berry depth and botanical lift. It is designed to balance comfort and sophistication in a more evening-oriented seasonal profile.",
    accent: "bg-fuchsia-100 text-fuchsia-900",
    price: 4.0,
    size: "330 ml",
    benefits: ["Berry depth", "Botanical character", "Low sugar", "Premium seasonal feel"],
    ingredients: ["Blackberry", "Sage", "Electrolytes", "Sparkling base"],
    image: "/images/autumn/Blackberry-Sage.jpg",
    heroImage: "/images/autumn/Blackberry-Sage.jpg",
    gallery: [
      "/images/autumn/Blackberry-Sage.jpg",
      "/images/autumn/autumn-collection.jpg",
    ],
    palette: {
      from: "rgba(92, 29, 85, 0.94)",
      via: "rgba(156, 84, 145, 0.8)",
      to: "rgba(238, 216, 236, 0.66)",
    },
  },
  {
    id: 15,
    slug: "spiced-pumpkin",
    name: "Spiced Pumpkin",
    flavor: "Toasted seasonal warmth",
    collection: "Autumn",
    tone: "Pumpkin",
    description:
      "A rich autumn flavor with pumpkin warmth, soft spice, and a smooth sparkling finish.",
    longDescription:
      "Spiced Pumpkin adds a more iconic harvest-season cue to the range, but keeps it refined through lighter sweetness and a cleaner structure. It is designed to evoke cozy autumn rituals without feeling heavy.",
    accent: "bg-amber-100 text-amber-900",
    price: 4.0,
    size: "330 ml",
    benefits: ["Harvest profile", "Warm spice", "Low sugar", "Seasonal storytelling"],
    ingredients: ["Pumpkin notes", "Autumn spice", "Electrolytes", "Sparkling base"],
    image: "/images/autumn/Spiced-Pumpkin.jpg",
    heroImage: "/images/autumn/Spiced-Pumpkin.jpg",
    gallery: [
      "/images/autumn/Spiced-Pumpkin.jpg",
      "/images/autumn/autumn-collection.jpg",
    ],
    palette: {
      from: "rgba(176, 107, 36, 0.94)",
      via: "rgba(224, 162, 89, 0.8)",
      to: "rgba(250, 228, 194, 0.66)",
    },
  },
  {
    id: 16,
    slug: "ginger-maple",
    name: "Ginger & Maple",
    flavor: "Warm mineral finish",
    collection: "Autumn",
    tone: "Amber",
    description:
      "A richer seasonal flavor built around warmth, depth, and smooth sparkling structure.",
    longDescription:
      "Ginger & Maple is designed for a rounder, deeper seasonal profile with warmth, subtle sweetness, and sparkling lift. It supports autumn merchandising with a richer premium tone while remaining cleaner than dessert-style soda products.",
    accent: "bg-yellow-100 text-yellow-900",
    price: 3.95,
    size: "330 ml",
    benefits: ["Warm finish", "Seasonal depth", "Hydration-forward", "Modern soda ritual"],
    ingredients: ["Ginger", "Maple notes", "Electrolytes", "Sparkling base"],
    image: "/images/autumn/Ginger-Maple.jpg",
    heroImage: "/images/autumn/Ginger-Maple.jpg",
    gallery: [
      "/images/autumn/Ginger-Maple.jpg",
      "/images/autumn/autumn-collection.jpg",
    ],
    palette: {
      from: "rgba(160, 123, 38, 0.94)",
      via: "rgba(214, 176, 86, 0.8)",
      to: "rgba(248, 233, 190, 0.66)",
    },
  },
];

export const benefits = [
  {
    title: "Hydration-first",
    text: "Electrolyte-led refreshment designed to feel cleaner and more functional than conventional soda.",
  },
  {
    title: "Low sugar profile",
    text: "A more balanced daily drink direction with less heaviness and stronger premium wellness positioning.",
  },
  {
    title: "Prebiotic angle",
    text: "Supports a modern better-for-you beverage narrative centered on gut-friendly refreshment.",
  },
  {
    title: "Seasonal storytelling",
    text: "Collections create stronger brand identity, merchandising rhythm, and more memorable flavor discovery.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(collection: Product["collection"], currentSlug: string) {
  return products.filter(
    (product) => product.collection === collection && product.slug !== currentSlug
  );
}