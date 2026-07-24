import { prisma } from '../db/prisma.js';
import { HttpError } from '../errors/http-error.js';
import { OrderStatus, Prisma } from '../generated/prisma/client.js';

const DATABASE_INT_MAX = 2_147_483_647;

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

const orderSelect = {
  id: true,
  status: true,
  totalCents: true,
  currency: true,
  createdAt: true,
  updatedAt: true,
  items: {
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      productId: true,
      productName: true,
      unitPriceCents: true,
      quantity: true,
    },
  },
} satisfies Prisma.OrderSelect;

export function createOrder(userId: string, items: OrderItemInput[]) {
  return prisma.$transaction(
    async (transaction) => {
      const products = await transaction.product.findMany({
        where: { id: { in: items.map(({ productId }) => productId) } },
        select: {
          id: true,
          name: true,
          priceCents: true,
          currency: true,
          active: true,
        },
      });
      const productsById = new Map(
        products.map((product) => [product.id, product])
      );

      for (const item of items) {
        const product = productsById.get(item.productId);
        if (!product) {
          throw new HttpError(404, `Product not found: ${item.productId}`);
        }
        if (!product.active) {
          throw new HttpError(400, `Product is inactive: ${item.productId}`);
        }
      }

      const currencies = new Set(products.map(({ currency }) => currency));
      if (currencies.size !== 1) {
        throw new HttpError(400, 'All products must use the same currency');
      }
      const currency = products[0]?.currency;
      if (!currency) throw new HttpError(400, 'Order must contain products');

      let totalCents = 0;
      const orderItems = items.map((item) => {
        const product = productsById.get(item.productId);
        if (!product) {
          throw new HttpError(404, `Product not found: ${item.productId}`);
        }
        if (
          !Number.isSafeInteger(product.priceCents) ||
          product.priceCents < 0
        ) {
          throw new Error(`Product ${product.id} has an invalid price`);
        }

        const lineTotal = product.priceCents * item.quantity;
        if (!Number.isSafeInteger(lineTotal)) {
          throw new HttpError(400, 'Order total is too large');
        }
        totalCents += lineTotal;
        if (
          !Number.isSafeInteger(totalCents) ||
          totalCents > DATABASE_INT_MAX
        ) {
          throw new HttpError(400, 'Order total is too large');
        }

        return {
          productId: product.id,
          quantity: item.quantity,
          productName: product.name,
          unitPriceCents: product.priceCents,
        };
      });

      return transaction.order.create({
        data: {
          userId,
          status: OrderStatus.PENDING,
          totalCents,
          currency,
          items: { create: orderItems },
        },
        select: orderSelect,
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  );
}

export function getOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: orderSelect,
  });
}

export function getOrderForUser(orderId: string, userId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    select: orderSelect,
  });
}
