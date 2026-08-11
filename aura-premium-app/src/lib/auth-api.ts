export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
};

type AuthResult = {
  token: string;
  user: User;
};

type ApiResponse<T> = {
  data: T;
};

type ApiErrorResponse = {
  status?: string;
  message?: string;
};

export const AUTH_TOKEN_STORAGE_KEY = 'aura-auth-token';

export function getSafeRedirectTarget(
  value: string | null,
  fallback = '/account'
) {
  return value && /^\/(?!\/)/.test(value) && !value.includes('\\')
    ? value
    : fallback;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
).replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch {
    throw new Error(
      'Unable to reach the server. Check your connection and try again.'
    );
  }

  const payload = (await response.json().catch(() => null)) as
    ApiResponse<T> | ApiErrorResponse | null;

  if (!response.ok) {
    const message = payload && 'message' in payload ? payload.message : null;
    throw new Error(message || 'Something went wrong. Please try again.');
  }

  if (!payload || !('data' in payload)) {
    throw new Error('The server returned an unexpected response.');
  }

  return payload.data;
}

export function register(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  return request<AuthResult>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function login(input: { email: string; password: string }) {
  return request<AuthResult>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function getMe(token: string) {
  return request<User>('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}
