import { Router } from 'express';

import {
  createUserOrder,
  getUserOrder,
  listUserOrders,
} from '../controllers/order.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const orderRouter = Router();

orderRouter.post('/orders', requireAuth, createUserOrder);
orderRouter.get('/orders', requireAuth, listUserOrders);
orderRouter.get('/orders/:orderId', requireAuth, getUserOrder);
