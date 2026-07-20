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
              From empty-calorie soda and wellness
            </h2>
            <p className="mt-5 leading-7 text-[var(--text-muted)]">
              At Aura, we believe you shouldn’t have to choose between drinks 
              that taste amazing and drinks that actually do good for your body.
              Born from a desire to break free from high-sugar sodas and artificial energy drinks, 
              Aura was created to elevate your daily hydration routine. We craft seasonal, flavor-forward 
              electrolyte wellness drinks designed to support your performance, invigorate your day, 
              and satisfy your cravings—completely guilt-free.
            </p>
            <p className="mt-4 leading-7 text-[var(--text-muted)]">
              Our Mission,
              to transform hydration into a joyful wellness ritual by creating vibrant, 
              seasonal beverages that replace sugary habits with clean, functional refreshment.
            </p>
          </div>

          <div className="premium-card rounded-[32px] p-7 md:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(183,142,79,0.15),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  The Clean Soda Replacement
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Experience the vibrant taste and crisp, icy refreshment of a traditional soda—without the high sugar, artificial sweeteners, 
                  or post-sugar crash. It’s the ultimate guilt-free ritual to break bad habits.
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(53,95,74,0.12),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  Functional Performance & Recovery
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Formulated with essential electrolytes and trace minerals, Aura works as hard as you do. 
                  Whether powering through an intense workout 
                  or beating the 3 PM office fatigue, it restores balance and sustains daily vitality.
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(126,45,57,0.12),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  Flavor-First Wellness
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Health shouldn't feel like a compromise or a chore. Aura merges science-backed hydration with chef-inspired flavor design, 
                  delivering a premium "better-for-you" experience where taste and performance live in total harmony.
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(61,122,122,0.12),rgba(255,255,255,0.08))] p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                  Limited-Edition Seasonal Flavors
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  Say goodbye to boring, static drink options. Aura captures the peak taste of each season, offering limited-run flavor profiles 
                  that keep your hydration routine fresh, exciting, and something to look forward to year-round.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}