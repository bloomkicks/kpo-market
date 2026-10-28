export type OrderStatus = "created" | "paid" | "failed"

export interface Order {
  createdAt: string;
  id: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  totalPrice: number;
  updatedAt: string;
  userId: string;
}

export interface OrderRequest {
  operationId: string;
  productId: string;
  quantity: number;
}

export interface OrderResponse {
  order: Order;
}
