// src/services/orderService.ts
import { api } from "./api";
import { Order } from "../types/order";

export const orderService = {
  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await api.get("/orders");
    return response.data;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  },
};
