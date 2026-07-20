import { benefits } from "./aura-data";

export function Benefits() {
  return (
    <section id="benefits" className="section-space">
      <div className="container-shell">
        <div className="premium-card rounded-[34px] p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
                Functional value
              </p>
              <h2 className="display-font mt-3 text-5xl leading-none md:text-6xl">
                Pure Hydration, Powered by the Seasons
              </h2>
              <p className="mt-5 max-w-[48ch] leading-7 text-[var(--text-muted)]">
                Seasonally Inspired Flavors: We capture the peak taste of every season, 
                bringing you fresh, limited-run profiles that keep hydration exciting year-round.
                Clean, Functional Hydration: Packed with essential electrolytes and zero refined 
                sugars, Aura delivers targeted support for recovery, focus, and daily vitality.
                A Better-for-You Experience: We offer the crisp, satisfying refreshment of traditional 
                sodas—reimagined through a lens of modern wellness and active performance.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[24px] border border-[var(--surface-line)] bg-white/30 p-5"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}