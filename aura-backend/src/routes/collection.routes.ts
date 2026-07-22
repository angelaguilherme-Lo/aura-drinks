import { Router } from "express";

import {
  getCollection,
  listCollections,
} from "../controllers/collection.controller.js";

export const collectionRouter = Router();

collectionRouter.get("/collections", listCollections);
collectionRouter.get("/collections/:slug", getCollection);
