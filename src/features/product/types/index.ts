import type { Product } from "@/types";
import { v7 as uuidv7 } from 'uuid';

export const product = {
  productId: uuidv7(),
  title: "Продукт с очень длинным названием и т.п.",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit ipsum varius suscipit interdum. Donec vestibulum congue urna dictum pretium. Fusce nec velit dui. Etiam at ipsum erat. Vestibulum finibus lectus ut lectus vestibulum, vel pellentesque justo condimentum. Donec varius eros in tincidunt faucibus. Suspendisse ipsum lorem, vehicula at sodales ut, condimentum et libero. In arcu ex, malesuada at mi vitae, suscipit porta leo. Quisque ut lobortis ligula. Nam iaculis, magna quis dignissim aliquet, nulla metus eleifend sem, ac mattis metus tellus sed mi.",
  price: 24102,
  updatedAt: (new Date()).toISOString(),
  createdAt: (new Date()).toISOString(),
  url: '/df/djfads'
}

export const productsData = [
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
];

export type ProductResponse = Product

export type ProductsResponse = { cursor: string, products: Product[] }

export interface AddProductRequest {
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export type AddProductResponse = Product

export interface AddImageRequest { }

export type AddImageResponse = Product
