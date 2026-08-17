import { NextResponse } from "next/server";
import { auraDemoCatalog } from "../../../lib/ai/aura-demo-catalog";

type AuraProduct = {
  slug: string;
  name: string;
  collection: string;
  shortDescription: string;
  ingredients?: string[];
  benefits?: string[];
  tags?: string[];
  price?: number;
  currency?: string;
  available?: boolean;
};

type AuraCollection = {
  slug: string;
  name: string;
  season?: string;
  description?: string;
  productSlugs?: string[];
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function listNames(products: AuraProduct[]) {
  return products.map((product) => product.name).join(", ");
}

function getProducts(): AuraProduct[] {
  return auraDemoCatalog.products as AuraProduct[];
}

function getCollections(): AuraCollection[] {
  return auraDemoCatalog.collections as AuraCollection[];
}

function findProductsByKeywords(keywords: string[]) {
  return getProducts().filter((product) => {
    const searchable = [
      product.name,
      product.collection,
      product.shortDescription,
      ...(product.ingredients ?? []),
      ...(product.benefits ?? []),
      ...(product.tags ?? [])
    ]
      .join(" ")
      .toLowerCase();

    return keywords.some((keyword) => searchable.includes(keyword));
  });
}

function response(
  answer: string,
  options?: {
    intent?: string;
    productSlugs?: string[];
    collectionSlugs?: string[];
    uiActions?: string[];
    limitationNotice?: string | null;
  }
) {
  return {
    intent: options?.intent ?? "fallback_general",
    answer,
    productSlugs: options?.productSlugs ?? [],
    collectionSlugs: options?.collectionSlugs ?? [],
    uiActions: options?.uiActions ?? ["none"],
    limitationNotice: options?.limitationNotice ?? null
  };
}

function answerAuraQuestion(userMessage: string) {
  const message = normalize(userMessage);
  const products = getProducts();
  const collections = getCollections();

  const policies = auraDemoCatalog.demoPolicies;

  // Checkout, cart, payments
  if (
    message.includes("checkout") ||
    message.includes("check out") ||
    message.includes("cart") ||
    message.includes("payment") ||
    message.includes("pay")
  ) {
    return response(
      `${policies.checkout} You can add drinks to your cart, adjust quantities, review the subtotal, and continue through the simulated checkout experience.`,
      {
        intent: "checkout_help",
        uiActions: ["open_checkout"],
        limitationNotice: policies.checkout
      }
    );
  }

  // Shipping, delivery, tracking, orders
  if (
    message.includes("shipping") ||
    message.includes("delivery") ||
    message.includes("track") ||
    message.includes("tracking") ||
    message.includes("where is my order") ||
    message.includes("order status")
  ) {
    return response(policies.shipping, {
      intent: "shipping_help",
      limitationNotice: policies.shipping
    });
  }

  // Sign in / account / Google
  if (
    message.includes("sign in") ||
    message.includes("signin") ||
    message.includes("login") ||
    message.includes("log in") ||
    message.includes("sign up") ||
    message.includes("signup") ||
    message.includes("create account") ||
    message.includes("google") ||
    message.includes("gmail")
  ) {
    return response(
      `${policies.account} ${policies.googleSignIn}`,
      {
        intent: "sign_in_help",
        uiActions: ["open_sign_in"],
        limitationNotice: policies.googleSignIn
      }
    );
  }

  // Favorites
  if (
    message.includes("favorite") ||
    message.includes("favourite") ||
    message.includes("save drink") ||
    message.includes("saved drink")
  ) {
    return response(policies.favorites, {
      intent: "favorites_help",
      uiActions: ["open_favorites"],
      limitationNotice: policies.favorites
    });
  }

  // Floral recommendations
  if (
    message.includes("floral") ||
    message.includes("flower") ||
    message.includes("rose") ||
    message.includes("lavender") ||
    message.includes("elderflower")
  ) {
    const matches = findProductsByKeywords([
      "floral",
      "rose",
      "lavender",
      "elderflower",
      "hibiscus"
    ]);

    return response(
      `For a floral taste, I recommend ${listNames(matches)}. These options lean into botanical, blossom-led, and fresh citrus-floral flavor profiles.`,
      {
        intent: "collection_discovery",
        productSlugs: matches.map((product) => product.slug),
        collectionSlugs: ["spring-collection"],
        uiActions: ["view_collection", "view_product"]
      }
    );
  }

  // Summer recommendations
  if (
    message.includes("summer") ||
    message.includes("tropical") ||
    message.includes("mango") ||
    message.includes("watermelon") ||
    message.includes("pineapple") ||
    message.includes("passionfruit")
  ) {
    const matches = products.filter(
      (product) =>
        product.collection === "summer-collection" ||
        product.tags?.includes("summer") ||
        product.tags?.includes("tropical")
    );

    return response(
      `For summer, I recommend ${listNames(matches)}. The Summer Collection focuses on bright citrus, tropical fruit, and refreshing herbal notes.`,
      {
        intent: "collection_discovery",
        productSlugs: matches.map((product) => product.slug),
        collectionSlugs: ["summer-collection"],
        uiActions: ["view_collection", "view_product"]
      }
    );
  }

  // Spring recommendations
  if (message.includes("spring")) {
    const springCollection = collections.find(
      (collection) => collection.slug === "spring-collection"
    );

    const matches = products.filter(
      (product) => product.collection === "spring-collection"
    );

    return response(
      `${springCollection?.name ?? "Spring Collection"} includes ${listNames(matches)}. It is the best place to explore light, floral, citrus, and botanical flavors.`,
      {
        intent: "collection_discovery",
        productSlugs: matches.map((product) => product.slug),
        collectionSlugs: ["spring-collection"],
        uiActions: ["view_collection"]
      }
    );
  }

  // Autumn recommendations
  if (
    message.includes("autumn") ||
    message.includes("fall") ||
    message.includes("spiced") ||
    message.includes("pumpkin") ||
    message.includes("cinnamon") ||
    message.includes("maple")
  ) {
    const matches = products.filter(
      (product) =>
        product.collection === "autumn-collection" ||
        product.tags?.includes("spiced")
    );

    return response(
      `For a warming seasonal profile, explore ${listNames(matches)} from the Autumn Collection.`,
      {
        intent: "collection_discovery",
        productSlugs: matches.map((product) => product.slug),
        collectionSlugs: ["autumn-collection"],
        uiActions: ["view_collection", "view_product"]
      }
    );
  }

  // Winter recommendations
  if (
    message.includes("winter") ||
    message.includes("berry") ||
    message.includes("cranberry") ||
    message.includes("pomegranate") ||
    message.includes("bergamot") ||
    message.includes("pear")
  ) {
    const matches = products.filter(
      (product) => product.collection === "winter-collection"
    );

    return response(
      `For winter, I recommend ${listNames(matches)}. The Winter Collection brings together deep berry, spiced fruit, citrus, and evergreen-inspired flavor profiles.`,
      {
        intent: "collection_discovery",
        productSlugs: matches.map((product) => product.slug),
        collectionSlugs: ["winter-collection"],
        uiActions: ["view_collection", "view_product"]
      }
    );
  }

  // Ingredient or benefit overview
  if (
    message.includes("ingredient") ||
    message.includes("benefit") ||
    message.includes("electrolyte") ||
    message.includes("what is in") ||
    message.includes("what's in")
  ) {
    return response(
      "Aura is presented as a premium electrolyte soda collection. Product ingredients and taste profiles vary by flavor and can include fruit, citrus, botanical, floral, herbal, or spiced elements paired with electrolytes. This demo describes flavor and refreshment characteristics only and does not make medical claims.",
      {
        intent: "ingredient_benefit_overview",
        limitationNotice:
          "This demo provides flavor and product information only, not medical or nutritional advice."
      }
    );
  }

  // Exact product name matching
  const directMatches = products.filter((product) => {
    const productName = normalize(product.name);
    const slugWords = product.slug.replaceAll("-", " ");

    return (
      message.includes(productName) ||
      message.includes(slugWords) ||
      productName.split(" ").some(
        (word) => word.length > 4 && message.includes(word)
      )
    );
  });

  if (directMatches.length > 0) {
    const product = directMatches[0];

    const ingredientText =
      product.ingredients && product.ingredients.length > 0
        ? ` Ingredients include ${product.ingredients.join(", ")}.`
        : "";

    const benefitText =
      product.benefits && product.benefits.length > 0
        ? ` Aura describes it as ${product.benefits.join(", ")}.`
        : "";

    return response(
      `${product.name}: ${product.shortDescription}.${ingredientText}${benefitText}`,
      {
        intent: "product_inquiry",
        productSlugs: [product.slug],
        collectionSlugs: [product.collection],
        uiActions: ["view_product"]
      }
    );
  }

  // General collections request
  if (
    message.includes("collection") ||
    message.includes("season") ||
    message.includes("seasonal")
  ) {
    return response(
      `Aura has four seasonal collections: ${collections.map((collection) => collection.name).join(", ")}. Each collection has its own flavor direction, from floral spring drinks and tropical summer options to spiced autumn and deep winter profiles.`,
      {
        intent: "collection_discovery",
        collectionSlugs: collections.map((collection) => collection.slug),
        uiActions: ["view_collection"]
      }
    );
  }

  // Default helpful answer
  const featuredProducts = products.slice(0, 4);

  return response(
    `Hello — I’m the Aura demo assistant. I can help with product flavors, seasonal collections, ingredients, favorites, sign-in, account support, and checkout guidance. You could start with ${listNames(featuredProducts)}.`,
    {
      intent: "fallback_general",
      productSlugs: featuredProducts.map((product) => product.slug)
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = String(body.message ?? "").trim();

    if (!userMessage) {
      return NextResponse.json(
        response("Please enter a question about Aura drinks, collections, favorites, account access, or checkout."),
        { status: 400 }
      );
    }

    const result = answerAuraQuestion(userMessage);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Aura demo assistant error:", error);

    return NextResponse.json(
      response(
        "I’m sorry — the Aura demo assistant could not process that request. Please try asking about a drink, collection, favorites, sign-in, or checkout.",
        {
          intent: "demo_limitations",
          limitationNotice:
            "The Aura assistant is running in local demo mode without an external AI service."
        }
      ),
      { status: 500 }
    );
  }
}