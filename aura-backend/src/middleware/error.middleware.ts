import type { NextFunction, Request, Response } from 'express';

import { HttpError } from '../errors/http-error.js';

export function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
    return;
  }

  // Record error classifications without logging credentials, request bodies,
  // SQL statements, or the raw exception message.
  console.error('Unhandled API error', JSON.stringify(errorClassification(error)));

  const message =
    process.env.NODE_ENV !== 'production' && error instanceof Error
      ? error.message
      : 'Internal server error';

  response.status(500).json({
    status: 'error',
    message,
  });
}

function errorClassification(error: unknown, depth = 0): unknown {
  if (depth > 4) return {};
  if (!error || typeof error !== 'object') return { type: typeof error };
  const record = error as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const key of ['name', 'code', 'kind', 'originalCode']) {
    if (typeof record[key] === 'string') result[key] = record[key];
  }
  for (const key of ['cause', 'meta', 'driverAdapterError']) {
    if (record[key]) result[key] = errorClassification(record[key], depth + 1);
  }
  return result;
}
