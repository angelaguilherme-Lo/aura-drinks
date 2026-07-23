import bcrypt from 'bcryptjs';

import { prisma } from '../db/prisma.js';
import { HttpError } from '../errors/http-error.js';
import { Prisma, UserRole } from '../generated/prisma/client.js';
import { signAuthToken } from '../utils/jwt.js';

const PASSWORD_SALT_ROUNDS = 12;
const publicUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  if (existingUser) throw new HttpError(409, 'Email is already registered');

  const passwordHash = await bcrypt.hash(input.password, PASSWORD_SALT_ROUNDS);
  try {
    const user = await prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        passwordHash,
        role: UserRole.CUSTOMER,
      },
      select: publicUserSelect,
    });
    return {
      token: signAuthToken({ sub: user.id, role: user.role }),
      user,
    };
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new HttpError(409, 'Email is already registered');
    }
    throw error;
  }
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new HttpError(401, 'Invalid email or password');
  }
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return {
    token: signAuthToken({ sub: user.id, role: user.role }),
    user: publicUser,
  };
}

export async function getAuthenticatedUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: publicUserSelect,
  });
  if (!user) throw new HttpError(401, 'Authentication required');
  return user;
}
