import { Suspense } from 'react';
import { AuthGuard } from '../../components/auth/auth-guard';
import { CatalogError } from '../../components/catalog-error';
import { FavoritesContent } from '../../components/favorites/favorites-content';
import { Header } from '../../components/header';
import { getProducts } from '../../lib/catalog/api';

export default async function FavoritesPage() {
  let products;

  try {
    products = await getProducts();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to load favorites.';

    return (
      <>
        <Header />
        <Suspense fallback={null}>
          <AuthGuard>
            <CatalogError message={message} />
          </AuthGuard>
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <AuthGuard>
          <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <FavoritesContent products={products} />
          </main>
        </AuthGuard>
      </Suspense>
    </>
  );
}