import type { Request, Response } from 'express';

import { HttpError } from '../errors/http-error.js';
import {
  createOrder,
  getOrderForUser,
  getOrdersForUser,
  type OrderItemInput,
} from '../services/order.service.js';

const MAX_PAYLOAD_ITEMS = 50;
const MAX_QUANTITY_PER_PRODUCT = 99;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function requireAuthenticatedUserId(request: Request): string {
  if (!request.auth) throw new HttpError(401, 'Authentication required');
  return request.auth.userId;
}

function requireUuid(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || !UUID_PATTERN.test(value)) {
    throw new HttpError(400, `${fieldName} must be a valid UUID`);
  }
  return value.toLowerCase();
}

function validateOrderItems(body: unknown): OrderItemInput[] {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw new HttpError(400, 'Request body must be an object');
  }

  const items = Reflect.get(body, 'items');
  if (!Array.isArray(items)) throw new HttpError(400, 'items must be an array');
  if (items.length === 0) throw new HttpError(400, 'items must not be empty');
  if (items.length > MAX_PAYLOAD_ITEMS) {
    throw new HttpError(
      400,
      `items must contain at most ${MAX_PAYLOAD_ITEMS} entries`
    );
  }

  const quantitiesByProduct = new Map<string, number>();
  for (const [index, item] of items.entries()) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      throw new HttpError(400, `items[${index}] must be an object`);
    }
    const productId = requireUuid(
      Reflect.get(item, 'productId'),
      `items[${index}].productId`
    );
    const quantity = Reflect.get(item, 'quantity');
    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
      throw new HttpError(400, `items[${index}].quantity must be an integer`);
    }
    if (quantity < 1) {
      throw new HttpError(400, `items[${index}].quantity must be positive`);
    }
    if (quantity > MAX_QUANTITY_PER_PRODUCT) {
      throw new HttpError(
        400,
        `Quantity per product must not exceed ${MAX_QUANTITY_PER_PRODUCT}`
      );
    }

    const normalizedQuantity =
      (quantitiesByProduct.get(productId) ?? 0) + quantity;
    if (normalizedQuantity > MAX_QUANTITY_PER_PRODUCT) {
      throw new HttpError(
        400,
        `Quantity per product must not exceed ${MAX_QUANTITY_PER_PRODUCT}`
      );
    }
    quantitiesByProduct.set(productId, normalizedQuantity);
  }

  return Array.from(quantitiesByProduct, ([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

export async function createUserOrder(
  request: Request<Record<string, never>, unknown, unknown>,
  response: Response
): Promise<void> {
  const order = await createOrder(
    requireAuthenticatedUserId(request),
    validateOrderItems(request.body)
  );
  response.status(201).json({ data: order });
}

export async function listUserOrders(
  request: Request,
  response: Response
): Promise<void> {
  const orders = await getOrdersForUser(requireAuthenticatedUserId(request));
  response.status(200).json({ data: orders });
}

export async function getUserOrder(
  request: Request<{ orderId: string }>,
  response: Response
): Promise<void> {
  const orderId = requireUuid(request.params.orderId, 'orderId');
  const order = await getOrderForUser(
    orderId,
    requireAuthenticatedUserId(request)
  );
  if (!order) throw new HttpError(404, 'Order not found');
  response.status(200).json({ data: order });
}
