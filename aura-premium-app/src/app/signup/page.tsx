'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../components/auth/auth-provider';
import { Header } from '../../components/header';

export default function SignupPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectTarget = searchParams.get('redirect') || '/account';

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signUp({ name, email, password });
    router.push(redirectTarget);
  }

  function handleGoogleSignup() {
    signInWithGoogle();
    router.push(redirectTarget);
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
            Create a demo profile to save favorites and access your account.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--text)]">
                Full name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[var(--surface-line)] bg-white px-4 text-[var(--text)] outline-none focus:border-[#476f57]"
                placeholder="Your name"
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
                className="h-12 w-full rounded-2xl border border-[var(--surface-line)] bg-white px-4 text-[var(--text)] outline-none focus:border-[#476f57]"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[var(--surface-line)] bg-white px-4 text-[var(--text)] outline-none focus:border-[#476f57]"
                placeholder="Create password"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3d5f4a]"
            >
              Create account with email
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            Continue with Google
          </button>

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
