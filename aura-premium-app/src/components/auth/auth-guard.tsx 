"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./auth-provider";

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user) {
      const query = searchParams?.toString();
      const currentPath = query ? `${pathname}?${query}` : pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, router, pathname, searchParams]);

  if (!user) {
    return (
      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[640px] rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-10 text-center shadow-[0_24px_64px_rgba(30,20,10,0.08)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Redirecting
          </p>
          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Taking you to sign in
          </h1>
          <p className="mx-auto mt-4 max-w-[42ch] text-[15px] leading-7 text-[var(--text-muted)]">
            Please sign in to continue to your Aura account experience.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}