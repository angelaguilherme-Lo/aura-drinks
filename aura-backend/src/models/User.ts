export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Passwords must be hashed before storage.
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// passwordHash must never be returned by the API.
export type PublicUser = Omit<User, 'passwordHash'>;
