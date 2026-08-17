'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../components/auth/auth-provider';
import { Header } from '../../components/header';
import { getSafeRedirectTarget } from '../../lib/auth-api';

function SignupContent() {
  const { signUp, isLoading, error } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectTarget = getSafeRedirectTarget(searchParams.get('redirect'));

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await signUp({ firstName, lastName, email, password });
      router.push(redirectTarget);
    } catch {
      // The provider exposes a user-safe error message.
    }
  }

  return (
    <>
      <Header />
      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[520px] rounded-[32px] border border-[var(--surface-line)] bg-white/90 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Create account
          </p>

          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Join Aura
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-[var(--text-muted)]">
            Create your profile to access your Aura account.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">
                First name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[var(--surface-line)] bg-white px-4 text-[var(--text)] outline-none focus:border-[#476F57]"
                placeholder="Your first name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">
                Last name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[var(--surface-line)] bg-white px-4 text-[var(--text)] outline-none focus:border-[#476F57]"
                placeholder="Your last name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[var(--surface-line)] bg-white px-4 text-[var(--text)] outline-none focus:border-[#476F57]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[var(--surface-line)] bg-white px-4 text-[var(--text)] outline-none focus:border-[#476F57]"
                placeholder="At least 8 characters"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#476F57] px-5 text-sm font-medium text-white transition hover:bg-[#3D5F4A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creating account...' : 'Create account with email'}
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--text-muted)]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[var(--text)]">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}