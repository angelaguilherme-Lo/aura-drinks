import { Router } from "express";

import {
  getProduct,
  listProducts,
} from "../controllers/product.controller.js";

export const productRouter = Router();

productRouter.get("/products", listProducts);
productRouter.get("/products/:slug", getProduct);
