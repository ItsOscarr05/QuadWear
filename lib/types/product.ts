export type { Product } from "@prisma/client";

import type { Product as PrismaProduct } from "@prisma/client";

/** Product as returned by GET /api/products and GET /api/products/[slug] (JSON dates as strings). */
export type ProductFromApi = Omit<
  PrismaProduct,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

/** Fields used on catalog grids and cards. */
export type ProductCatalog = Pick<
  ProductFromApi,
  | "id"
  | "name"
  | "slug"
  | "price"
  | "designImage"
  | "mockupImage"
  | "badges"
  | "university"
  | "major"
>;

/** Quick view modal: catalog fields plus optional detail fields from full product rows. */
export type ProductQuickView = ProductCatalog & {
  description?: string;
  colors?: string;
  sizes?: string;
};
