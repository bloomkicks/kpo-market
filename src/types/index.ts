export interface PaginationParams {
  limit: number;
  cursor: string;
}
export interface Product {
  productId: string;
  title: string;
  description: string;
  price: number;
  updatedAt: string;
  createdAt: string;
  url: string;
}

// export interface Profile {
//   id: number;
//   image: string;
//   full_name: string;
//   email: string;
//   phone_number: string;
//   city: string;
//   address: string;
// }

// export interface Product {
//   id: number;
//   price: number;
//   title: string;
//   images: string[];
//   review_amount: number;
//   review_value: number;
//   sizes: number[];
//   description: string;
// }