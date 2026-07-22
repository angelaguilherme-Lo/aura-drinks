import type { Request, Response } from "express";

import { HttpError } from "../errors/http-error.js";
import {
  getPublicCollectionBySlug,
  getPublicCollections,
} from "../services/collection.service.js";

export async function listCollections(
  _request: Request,
  response: Response,
): Promise<void> {
  const collections = await getPublicCollections();
  response.status(200).json({ data: collections });
}

export async function getCollection(
  request: Request<{ slug: string }>,
  response: Response,
): Promise<void> {
  const collection = await getPublicCollectionBySlug(request.params.slug);

  if (!collection) {
    throw new HttpError(404, "Collection not found");
  }

  response.status(200).json({ data: collection });
}
