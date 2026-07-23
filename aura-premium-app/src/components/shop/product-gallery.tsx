import type { Product } from '../aura-data';

export function ProductGallery({ product }: { product: Product }) {
  const gallery = product.gallery?.length
    ? product.gallery
    : [product.image].filter(Boolean);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
      <div className="premium-card overflow-hidden rounded-[34px] p-4 md:p-6">
        {product.heroImage || product.image ? (
          <img
            src={product.heroImage || product.image}
            alt={product.name}
            className="h-[560px] w-full rounded-[28px] object-cover object-center"
          />
        ) : (
          <div
            className="rounded-[34px] p-6 md:p-8"
            style={{
              background: `linear-gradient(160deg, ${product.palette.from} 0%, ${product.palette.via} 58%, ${product.palette.to} 100%)`,
            }}
          >
            <div className="mx-auto flex min-h-[520px] max-w-[340px] items-center justify-center">
              <div className="relative h-[420px] w-[150px] rounded-[44px] border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.18))] shadow-2xl">
                <div className="absolute left-1/2 top-[-14px] h-9 w-14 -translate-x-1/2 rounded-t-[12px] border border-[#d1b46d] bg-[linear-gradient(180deg,#f5deb1,#bc9653)]" />
                <div className="absolute inset-x-4 top-14 rounded-[18px] bg-white/78 px-3 py-5 text-center text-stone-900 shadow-lg">
                  <div className="display-font text-4xl tracking-[0.12em]">
                    AURA
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-stone-600">
                    Premium Electrolyte Soda
                  </div>
                  <div className="mt-6 text-sm font-medium">{product.name}</div>
                  <div className="mt-1 text-xs text-stone-600">
                    {product.flavor}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="premium-card overflow-hidden rounded-[24px] p-2"
          >
            <img
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className="h-[176px] w-full rounded-[18px] object-cover object-center"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
