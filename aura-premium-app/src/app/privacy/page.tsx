import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)] sm:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Legal
          </p>
          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Privacy Policy
          </h1>
          <div className="mt-6 space-y-5 text-[15px] leading-8 text-[var(--text-muted)]">
            <p>
              This demo project does not use real customer authentication or
              production-grade personal data processing.
            </p>
            <p>
              Any sign-in, sign-up, favorites, and account interactions are
              simulated for interface demonstration purposes only.
            </p>
            <p>
              If this concept is developed into a real product, a full privacy
              policy and compliant data handling process must be added.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}