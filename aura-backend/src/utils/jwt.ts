import jwt from 'jsonwebtoken';

import type { UserRole } from '../generated/prisma/enums.js';

export interface AuthTokenPayload {
  sub: string;
  role: UserRole;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured');
  return secret;
}

function getJwtExpiresIn(): jwt.SignOptions['expiresIn'] {
  return (process.env.JWT_EXPIRES_IN ?? '7d') as jwt.SignOptions['expiresIn'];
}

export function assertJwtConfig(): void {
  getJwtSecret();
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: getJwtExpiresIn() });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  const payload = jwt.verify(token, getJwtSecret());
  if (
    typeof payload === 'string' ||
    typeof payload.sub !== 'string' ||
    (payload.role !== 'CUSTOMER' && payload.role !== 'ADMIN')
  ) {
    throw new jwt.JsonWebTokenError('Invalid token payload');
  }
  return { sub: payload.sub, role: payload.role };
}
