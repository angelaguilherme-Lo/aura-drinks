export type BackendProductCollectionDto = {
  id: string;
  slug: string;
  name: string;
};

export type BackendProductListDto = {
  id: string;
  slug: string;
  name: string;
  flavor: string;
  description: string;
  priceCents: number;
  currency: string;
  size: string;
  image: string;
  active: boolean;
  collection: BackendProductCollectionDto;
};

export type BackendProductDetailDto = BackendProductListDto & {
  longDescription: string;
  heroImage: string;
  createdAt: string;
  updatedAt: string;
  benefits: string[];
  ingredients: string[];
  galleryImages: {
    url: string;
    altText: string | null;
  }[];
};

export type BackendCollectionListDto = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  productCount: number;
};

export type BackendCollectionDetailDto = Omit<
  BackendCollectionListDto,
  'productCount'
> & {
  products: Omit<BackendProductListDto, 'collection'>[];
};

// Storefront aliases keep list and detail data deliberately separate while
// allowing UI-only presentation metadata to remain outside business objects.
export type ProductSummary = BackendProductListDto;
export type ProductDetail = BackendProductDetailDto;
export type CollectionSummary = BackendCollectionListDto;
export type CollectionDetail = BackendCollectionDetailDto;

export type CartProduct = Pick<
  ProductSummary,
  'id' | 'slug' | 'name' | 'priceCents' | 'currency' | 'image' | 'size'
>;
