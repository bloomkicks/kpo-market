export interface Profile {
  id: number;
  image: string;
  full_name: string;
  email: string;
  phone_number: string;
  city: string;
  address: string;
}

export interface Product {
  id: number;
  price: number;
  title: string;
  image: string;
}

export interface ProductDetails {
  id: number;
  price: number;
  title: string;
  images: string[];
  review_amount: number;
  review_value: number;
  sizes: number[];
  description: string;
}