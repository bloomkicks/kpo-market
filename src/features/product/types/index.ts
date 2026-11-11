import type { Product } from "@/types";

export type ProductResponse = { product: Product }

export type CatalogueResponse = { nextCursor?: string, products: { product: Product }[] }

export interface AddProductRequest {
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export type AddProductResponse = { product: Product }

export interface BusinessProduct {
  product_id: string,
  title: string,
  description: string,
  price: number,
  image_url: string | null,
  rating: number,
  feedbacks_count: number,
  created_at: string,
  updated_at: string
}

export interface BusinessProductsResponse {
  products: BusinessProduct[],
  next_cursor: string | null
}

export interface EditProductRequest {
  title: string;
  description: string;
  price: number;
}

export type EditProductResponse = { product: Product }

export type UploadImageRequest = File

export type UploadImageResponse = { product: Product }

export interface LikeRequest {
  action: "add" | "remove",
  id: string
}

export interface Like {
  product_id: string,
  added_at: string
}

export type LikesResponse = Like[]
