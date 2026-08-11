import cors from 'cors';
import express from 'express';

import { errorMiddleware } from './middleware/error.middleware.js';
import { notFoundMiddleware } from './middleware/not-found.middleware.js';
import { authRouter } from './routes/auth.routes.js';
import { collectionRouter } from './routes/collection.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { orderRouter } from './routes/order.routes.js';
import { productRouter } from './routes/product.routes.js';

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  })
);
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', healthRouter);
app.use('/api', productRouter);
app.use('/api', collectionRouter);
app.use('/api', orderRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
