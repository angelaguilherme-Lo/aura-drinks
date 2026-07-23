import type { NextFunction, Request, Response } from 'express';

import { HttpError } from '../errors/http-error.js';
import { verifyAuthToken } from '../utils/jwt.js';

export function requireAuth(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const authorization = request.headers.authorization;
  if (!authorization) throw new HttpError(401, 'Authentication required');

  const [scheme, token, extra] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token || extra) {
    throw new HttpError(401, 'Invalid authorization header');
  }

  try {
    const payload = verifyAuthToken(token);
    request.auth = { userId: payload.sub, role: payload.role };
    next();
  } catch {
    throw new HttpError(401, 'Invalid or expired token');
  }
}
