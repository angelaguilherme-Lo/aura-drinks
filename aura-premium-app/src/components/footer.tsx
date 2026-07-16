import { AuraLogo } from "./aura-logo";

export function Footer() {
  return (
    <footer className="pb-8 pt-10">
      <div className="container-shell">
        <div className="premium-card rounded-[30px] p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <AuraLogo />
              <p className="mt-4 max-w-[52ch] text-sm leading-6 text-[var(--text-muted)]">
                Premium electrolyte soda, reimagined through seasonal flavor
                design, wellness positioning, and elevated digital merchandising.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#products"
                className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--text-inverse)] transition hover:opacity-90"
              >
                Shop flavors
              </a>
              <a
                href="#collections"
                className="rounded-full border border-[var(--surface-line)] px-5 py-3 text-sm font-medium text-[var(--text)] transition hover:bg-white/30"
              >
                Seasonal menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}