-- Domain constraints not expressible in the Prisma schema
ALTER TABLE "orders" ADD CONSTRAINT "orders_total_cents_non_negative" CHECK ("total_cents" >= 0);
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_quantity_positive" CHECK ("quantity" > 0 AND "quantity" <= 99);
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_unit_price_cents_non_negative" CHECK ("unit_price_cents" >= 0);
