"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/auth/auth-provider";
import { Header } from "../../components/header";

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectTarget = searchParams.get("redirect") || "/account";

  function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn({ email, password });
    router.push(redirectTarget);
  }

  function handleGoogleLogin() {
    signInWithGoogle();
    router.push(redirectTarget);
  }

  return (
    <>
      <Header />
      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[520px] rounded-[32px] border border-[var(--surface-line)] bg-white/90 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Sign in
          </p>

          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Welcome back to Aura
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-[var(--text-muted)]">
            Use your email or the demo Google sign-in to access your account.
          </p>

          <form onSubmit={handleEmailLogin} className="mt-8 space-y-4">
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
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3d5f4a]"
            >
              Sign in with email
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-sm text-[var(--text-muted)]">
            New to Aura?{" "}
            <Link href="/signup" className="font-medium text-[var(--text)]">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}