import Link from 'next/link';
import { AuraLogo } from './aura-logo';

const shopLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/#collections', label: 'Collections' },
  { href: '/#benefits', label: 'Benefits' },
  { href: '/favorites', label: 'Favorites' },
];

const legalLinks = [
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/impressum', label: 'Impressum' },
];

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px] rounded-[36px] border border-white/60 bg-[rgba(255,252,246,0.88)] p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)] backdrop-blur-xl sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-[520px]">
            <AuraLogo className="h-12 w-auto text-[var(--text)]" />
            <p className="mt-6 text-[15px] leading-8 text-[var(--text-muted)]">
              Premium electrolyte soda, reimagined through seasonal flavor
              design, wellness positioning, and elevated digital merchandising.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
              Explore
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              {shopLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
              Legal
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--surface-line)] pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--text-soft)]">
              © 2026 Aura. Demo premium electrolyte soda experience.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--text-soft)] transition hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
