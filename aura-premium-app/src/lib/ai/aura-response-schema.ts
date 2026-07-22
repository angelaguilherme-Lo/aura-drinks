// lib/ai/aura-response-schema.ts
import { z } from "zod";
import { AuraIntentSchema } from "./aura-schemas";

export const AuraAssistantResultSchema = z.object({
  intent: AuraIntentSchema,
  answer: z.string().min(1),
  productSlugs: z.array(z.string()).default([]),
  collectionSlugs: z.array(z.string()).default([]),
  limitationNotice: z.string().nullable().default(null),
  uiActions: z.array(
    z.enum([
      "open_sign_in",
      "open_sign_up",
      "open_favorites",
      "open_checkout",
      "open_account",
      "view_collection",
      "view_product",
      "none",
    ])
  ).default(["none"]),
});

export type AuraAssistantResult = z.infer<typeof AuraAssistantResultSchema>;

export const auraAssistantResultJsonSchema = {
  name: "aura_assistant_result",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      intent: {
        type: "string",
        enum: [
          "product_inquiry",
          "ingredient_benefit_overview",
          "collection_discovery",
          "account_help",
          "favorites_help",
          "sign_in_help",
          "shipping_help",
          "checkout_help",
          "demo_limitations",
          "fallback_general",
        ],
      },
      answer: { type: "string" },
      productSlugs: {
        type: "array",
        items: { type: "string" },
      },
      collectionSlugs: {
        type: "array",
        items: { type: "string" },
      },
      limitationNotice: {
        type: ["string", "null"],
      },
      uiActions: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "open_sign_in",
            "open_sign_up",
            "open_favorites",
            "open_checkout",
            "open_account",
            "view_collection",
            "view_product",
            "none",
          ],
        },
      },
    },
    required: [
      "intent",
      "answer",
      "productSlugs",
      "collectionSlugs",
      "limitationNotice",
      "uiActions",
    ],
  },
} as const;