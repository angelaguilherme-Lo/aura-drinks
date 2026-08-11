'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  AUTH_TOKEN_STORAGE_KEY,
  getMe,
  login,
  register,
  type User,
} from '../../lib/auth-api';

export type { User } from '../../lib/auth-api';

type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignInInput = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signUp: (input: SignUpInput) => Promise<void>;
  signIn: (input: SignInInput) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function restoreSession() {
      const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

      if (token) {
        try {
          const authenticatedUser = await getMe(token);
          if (isActive) setUser(authenticatedUser);
        } catch {
          window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
          if (isActive) setUser(null);
        }
      }

      if (isActive) setIsLoading(false);
    }

    void restoreSession();

    return () => {
      isActive = false;
    };
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      const result = await register(input);
      window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, result.token);
      setUser(result.user);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Unable to create your account.';
      setError(message);
      throw caughtError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (input: SignInInput) => {
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      const result = await login(input);
      window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, result.token);
      setUser(result.user);
    } catch (caughtError) {
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Unable to sign in.';
      setError(message);
      throw caughtError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setUser(null);
    setError(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, error, signUp, signIn, signOut }),
    [user, isLoading, error, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
