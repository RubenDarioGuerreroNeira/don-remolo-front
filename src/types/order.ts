import { Product } from "./product";
export interface Order {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  total: number;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}
