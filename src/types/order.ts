// src/types/order.ts
export interface Order {
  id: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
