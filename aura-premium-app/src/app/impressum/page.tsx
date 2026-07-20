import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)] sm:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Legal
          </p>
          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Impressum
          </h1>
          <div className="mt-6 space-y-5 text-[15px] leading-8 text-[var(--text-muted)]">
            <p>
              This is a demo website created as a design and development
              prototype for the Aura premium electrolyte soda concept.
            </p>
            <p>
              Publisher information, company registration data, and legal
              contact details should be inserted here before any real public
              launch.
            </p>
            <p>
              For a Germany-facing production site, the final Impressum should
              comply with applicable legal disclosure requirements.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}