export function Story() {
  return (
    <section id="story" className="section-space">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="premium-card rounded-[32px] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
              Brand story
            </p>
            <h2 className="display-font mt-3 text-5xl leading-none md:text-6xl">
              From empty-calorie soda to elevated ritual
            </h2>
            <p className="mt-5 leading-7 text-[var(--text-muted)]">
              AuraFizz describes its mission as creating healthier beverages
              that still deliver taste and refreshment, replacing sugary soda
              habits with a better-for-you experience shaped around wellness and
              performance.
            </p>
            <p className="mt-4 leading-7 text-[var(--text-muted)]">
              That means the interface should feel closer to premium beauty,
              boutique hospitality, and luxury food merchandising than to
              aggressive sports-drink branding.
            </p>
          </div>

          <div className="premium-card rounded-[32px] p-7 md:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(183,142,79,0.15),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  Design language
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Warm neutrals, frosted glass surfaces, elegant serif accents,
                  and restrained seasonal colors.
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(53,95,74,0.12),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  UX direction
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Curated discovery, premium catalog browsing, and app-like
                  product detail interactions.
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(126,45,57,0.12),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  Tone of voice
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Refined, clean, confident, and specific rather than generic
                  wellness hype.
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(61,122,122,0.12),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  Product framing
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Seasonal flavor worlds, ingredient-led narratives, and bundle
                  creation instead of flat SKU listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}