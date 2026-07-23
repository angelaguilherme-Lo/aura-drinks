import { Header } from '../components/header';
import { Hero } from '../components/hero';
import { Collections } from '../components/collections';
import { Benefits } from '../components/benefits';
import { Story } from '../components/story';
import { Footer } from '../components/footer';
import { BundleBuilder } from '../components/shop/bundle-builder';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Collections />
      <BundleBuilder />
      <Benefits />
      <Story />
      <Footer />
    </main>
  );
}
