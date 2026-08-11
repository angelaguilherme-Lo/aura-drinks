export function CatalogError({ message }: { message?: string }) {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="rounded-[28px] border border-[var(--surface-line)] bg-white/90 p-8 text-center shadow-[0_14px_34px_rgba(30,20,10,0.05)]">
          <h2 className="text-2xl text-[var(--text)]">Catalog unavailable</h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-7 text-[var(--text-muted)]">
            {message ??
              'We could not load the Aura catalog. Please try again in a moment.'}
          </p>
        </div>
      </div>
    </section>
  );
}
