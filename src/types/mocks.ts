
import type { ProductDetails, Product, Profile } from ".";

export const profile: Profile = {
  id: 1,
  image: "sadfa",
  full_name: "Анна Иванова",
  email: "anna.ivanova@example.com",
  phone_number: "+7 900 123-45-67",
  city: "Москва",
  address: "Москва, ул. Лесная, д. 5"
}

export const productDetails: ProductDetails = {
  id: 1,
  price: 500,
  title: "Название товара и многое другое и т.п.",
  images: ["ye", "ya", 'yo', 'na', 'no'],
  review_amount: 371,
  review_value: 3.7,
  sizes: [39, 40, 41, 42],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit ipsum varius suscipit interdum. Donec vestibulum congue urna dictum pretium. Fusce nec velit dui. Etiam at ipsum erat. Vestibulum finibus lectus ut lectus vestibulum, vel pellentesque justo condimentum. Donec varius eros in tincidunt faucibus. Suspendisse ipsum lorem, vehicula at sodales ut, condimentum et libero. In arcu ex, malesuada at mi vitae, suscipit porta leo. Quisque ut lobortis ligula. Nam iaculis, magna quis dignissim aliquet, nulla metus eleifend sem, ac mattis metus tellus sed mi."
}

export const filterCategories = [
  { label: "Одежда", value: "clothes" },
  { label: "Еда", value: "food" },
  { label: "Бытовая химия", value: "chemistry" },
  { label: "Книги", value: "books" },
  { label: "Техника", value: "tech" },
  { label: "Другое", value: "others" },
]


export const catalogueProducts: Product[] = [
  {
    id: 1,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 2,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 3,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 4,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 5,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 6,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 7,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 8,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 9,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 10,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 11,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 12,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 13,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
  {
    id: 14,
    price: 500,
    title: "Название товара и многое другое и т.п.",
    image: "ye"
  },
];