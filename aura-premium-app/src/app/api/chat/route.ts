import { NextResponse } from "next/server";

type Product = {
  slug: string;
  name: string;
  collection: string;
  shortDescription: string;
  ingredients: string[];
  benefits: string[];
  tags: string[];
};

const catalog = {
  collections: [
    {
      slug: "spring-collection",
      name: "Spring Collection",
      season: "spring",
      description: "Light, floral, botanical flavors.",
    },
    {
      slug: "summer-collection",
      name: "Summer Collection",
      season: "summer",
      description: "Bright citrus and tropical flavors.",
    },
    {
      slug: "autumn-collection",
      name: "Autumn Collection",
      season: "autumn",
      description: "Spiced and warming blends.",
    },
    {
      slug: "winter-collection",
      name: "Winter Collection",
      season: "winter",
      description: "Deep berry and aromatic winter flavors.",
    },
  ],
  products: [
    {
      slug: "elderflower-lemon",
      name: "Elderflower & Lemon",
      collection: "spring-collection",
      shortDescription: "A bright floral citrus soda.",
      ingredients: ["carbonated water", "elderflower", "lemon", "electrolytes"],
      benefits: ["light citrus profile", "refreshing finish"],
      tags: ["floral", "citrus", "light", "refreshing", "spring"],
    },
    {
      slug: "rose-hibiscus",
      name: "Rose & Hibiscus",
      collection: "spring-collection",
      shortDescription: "Soft floral notes with a delicate tart edge.",
      ingredients: ["carbonated water", "rose", "hibiscus", "electrolytes"],
      benefits: ["floral profile", "crisp finish"],
      tags: ["floral", "light", "refreshing", "spring"],
    },
    {
      slug: "lavender-yuzu",
      name: "Lavender & Yuzu",
      collection: "spring-collection",
      shortDescription: "A floral-citrus blend with a clean finish.",
      ingredients: ["carbonated water", "lavender", "yuzu", "electrolytes"],
      benefits: ["aromatic profile", "bright citrus lift"],
      tags: ["floral", "citrus", "botanical", "spring"],
    },
    {
      slug: "botanical-mint",
      name: "Botanical Mint",
      collection: "spring-collection",
      shortDescription: "Cooling herbal refreshment.",
      ingredients: ["carbonated water", "mint", "botanical extracts", "electrolytes"],
      benefits: ["cooling herbal profile", "clean finish"],
      tags: ["herbal", "botanical", "refreshing", "spring"],
    },
    {
      slug: "tropical-mango-lime",
      name: "Tropical Mango & Lime",
      collection: "summer-collection",
      shortDescription: "Juicy tropical flavor with citrus brightness.",
      ingredients: ["carbonated water", "mango", "lime", "electrolytes"],
      benefits: ["tropical fruit profile", "zesty finish"],
      tags: ["tropical", "citrus", "summer", "bright"],
    },
    {
      slug: "watermelon-basil",
      name: "Watermelon Basil",
      collection: "summer-collection",
      shortDescription: "Fresh melon balanced by green basil notes.",
      ingredients: ["carbonated water", "watermelon", "basil", "electrolytes"],
      benefits: ["fresh profile", "cool finish"],
      tags: ["summer", "refreshing", "herbal", "light"],
    },
    {
      slug: "blood-orange-passionfruit",
      name: "Blood Orange & Passionfruit",
      collection: "summer-collection",
      shortDescription: "Bold citrus and exotic fruit character.",
      ingredients: ["carbonated water", "blood orange", "passionfruit", "electrolytes"],
      benefits: ["bright citrus profile", "juicy finish"],
      tags: ["summer", "citrus", "bold", "tropical"],
    },
    {
      slug: "pineapple-ginger",
      name: "Pineapple & Ginger",
      collection: "summer-collection",
      shortDescription: "Tropical sweetness with warming spice.",
      ingredients: ["carbonated water", "pineapple", "ginger", "electrolytes"],
      benefits: ["vivid tropical profile", "spiced finish"],
      tags: ["summer", "tropical", "spiced", "bold"],
    },
  ],
  demoPolicies: {
    signIn:
      "You can create a demo account with email or use the demo Google sign-in option. No real Google account is required.",
    favorites:
      "Customers can save beverages to their favorites in the demo experience from product cards or product detail views.",
    checkout:
      "Checkout is available as a demo flow only. The app can guide customers through cart and checkout steps, but no real payment is processed.",
    shipping:
      "Shipping information in this demo is informational only. Live shipping rates, delivery tracking, and real order status are not connected.",
    account:
      "Account features in this demo are simulated, including sign-up, sign-in, profile access, and favorites.",
  },
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function findProductsByTag(tagList: string[]) {
  return catalog.products.filter((product) =>
    product.tags.some((tag) => tagList.includes(tag))
  );
}

function formatProductList(products: Product[]) {
  return products.map((p) => p.name).join(", ");
}

function answerFromCatalog(message: string) {
  const q = normalize(message);

  if (q.includes("checkout") || q.includes("pay") || q.includes("cart")) {
    return {
      message:
        `${catalog.demoPolicies.checkout} You can review selected drinks, continue to the checkout screen, and complete a simulated purchase flow.`,
    };
  }

  if (
    q.includes("sign in") ||
    q.includes("signup") ||
    q.includes("sign up") ||
    q.includes("login") ||
    q.includes("account") ||
    q.includes("gmail") ||
    q.includes("google")
  ) {
    return {
      message:
        `${catalog.demoPolicies.signIn} ${catalog.demoPolicies.account}`,
    };
  }

  if (q.includes("favorite") || q.includes("favourite") || q.includes("save")) {
    return {
      message:
        `${catalog.demoPolicies.favorites} Saved items can be viewed later on the favorites page inside the demo account area.`,
    };
  }

  if (q.includes("shipping") || q.includes("delivery") || q.includes("order")) {
    return {
      message: catalog.demoPolicies.shipping,
    };
  }

  if (q.includes("collection") || q.includes("seasonal")) {
    return {
      message:
        "Aura currently features four seasonal collections: Spring Collection, Summer Collection, Autumn Collection, and Winter Collection.",
    };
  }

  if (q.includes("floral")) {
    const matches = findProductsByTag(["floral"]);
    return {
      message:
        `For a floral taste, I recommend ${formatProductList(matches)}. These drinks lean into soft botanical and blossom-led flavor profiles.`,
    };
  }

  if (q.includes("summer")) {
    const matches = catalog.products.filter(
      (product) => product.collection === "summer-collection"
    );
    return {
      message:
        `For summer, I recommend ${formatProductList(matches)}. These flavors are brighter, fruit-forward, and especially refreshing.`,
    };
  }

  if (q.includes("ingredient") || q.includes("benefit")) {
    return {
      message:
        "Aura drinks are presented as premium electrolyte sodas. Depending on the flavor, ingredients include fruit, floral, herbal, or botanical elements paired with electrolytes. Benefits in this demo focus on taste profile and refreshment rather than medical claims.",
    };
  }

  const featured = catalog.products.slice(0, 4);
  return {
    message:
      `Hello — I’m the Aura assistant. I can help with flavors, collections, ingredients, favorites, accounts, and checkout questions. A few drinks to explore first are ${formatProductList(featured)}.`,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const latestUserMessage =
      [...messages].reverse().find((m) => m?.role === "user")?.content ?? "";

    const response = answerFromCatalog(latestUserMessage);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        message:
          "I’m sorry — the Aura assistant is unavailable right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}