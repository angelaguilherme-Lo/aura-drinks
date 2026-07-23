import type { Request, Response } from 'express';

import { HttpError } from '../errors/http-error.js';
import {
  getAuthenticatedUser,
  loginUser,
  registerUser,
} from '../services/auth.service.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
interface RegisterBody {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  password?: unknown;
}
interface LoginBody {
  email?: unknown;
  password?: unknown;
}

function requireNonEmptyString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new HttpError(400, `${fieldName} is required`);
  }
  return value.trim();
}

function normalizeEmail(value: unknown): string {
  const email = requireNonEmptyString(value, 'email').toLowerCase();
  if (!EMAIL_PATTERN.test(email)) throw new HttpError(400, 'Email is invalid');
  return email;
}

function validatePassword(
  value: unknown,
  enforceMinimumLength: boolean
): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new HttpError(400, 'password is required');
  }
  if (enforceMinimumLength && value.length < MIN_PASSWORD_LENGTH) {
    throw new HttpError(
      400,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    );
  }
  return value;
}

export async function register(
  request: Request<Record<string, never>, unknown, RegisterBody>,
  response: Response
): Promise<void> {
  const result = await registerUser({
    firstName: requireNonEmptyString(request.body.firstName, 'firstName'),
    lastName: requireNonEmptyString(request.body.lastName, 'lastName'),
    email: normalizeEmail(request.body.email),
    password: validatePassword(request.body.password, true),
  });
  response.status(201).json({ data: result });
}

export async function login(
  request: Request<Record<string, never>, unknown, LoginBody>,
  response: Response
): Promise<void> {
  const result = await loginUser({
    email: normalizeEmail(request.body.email),
    password: validatePassword(request.body.password, false),
  });
  response.status(200).json({ data: result });
}

export async function getMe(
  request: Request,
  response: Response
): Promise<void> {
  if (!request.auth) throw new HttpError(401, 'Authentication required');
  const user = await getAuthenticatedUser(request.auth.userId);
  response.status(200).json({ data: user });
}
