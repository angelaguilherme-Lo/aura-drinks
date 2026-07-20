import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)] sm:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Legal
          </p>
          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Terms & Conditions
          </h1>
          <div className="mt-6 space-y-5 text-[15px] leading-8 text-[var(--text-muted)]">
            <p>
              This website is a demo concept project created for presentation,
              design, and prototype purposes only.
            </p>
            <p>
              No real purchases, payment processing, or legally binding customer
              transactions are completed through this demo experience.
            </p>
            <p>
              Product descriptions, account functionality, and sign-in methods
              are simulated for demonstration purposes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}