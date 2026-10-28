import type { Product } from "@/types";

export type ProductResponse = { product: Product }

export type ProductsResponse = { nextCursor?: string, products: ProductResponse[] }

export interface AddProductRequest {
  title: string;
  description?: string;
  price: number;
  quantity: number;
}

export type AddProductResponse = ProductResponse

export type AddImageResponse = ProductResponse
