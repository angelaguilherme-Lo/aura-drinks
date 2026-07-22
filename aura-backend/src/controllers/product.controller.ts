import type { Request, Response } from "express";

import { HttpError } from "../errors/http-error.js";
import {
  getPublicProductBySlug,
  getPublicProducts,
} from "../services/product.service.js";

export async function listProducts(
  _request: Request,
  response: Response,
): Promise<void> {
  const products = await getPublicProducts();
  response.status(200).json({ data: products });
}

export async function getProduct(
  request: Request<{ slug: string }>,
  response: Response,
): Promise<void> {
  const product = await getPublicProductBySlug(request.params.slug);

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  response.status(200).json({ data: product });
}
