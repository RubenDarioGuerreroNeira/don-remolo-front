import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import axios from "axios";
import { productService } from "./productService";

// No usar jest.mock("axios") directamente si da problemas con ESM
// jest.mock("axios"); 

describe("productService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAllProducts", () => {
    it("should fetch all products successfully", async () => {
      const mockResponse = {
        data: {
          items: [
            { id: "1", name: "Pizza Margherita", price: 10, description: "Rica", image: "img", category: "pizza", stockIn: 10 }
          ],
          total: 1,
          page: 1,
          limit: 10
        }
      };

      const axiosGetSpy = jest.spyOn(axios, 'get');
      axiosGetSpy.mockResolvedValueOnce(mockResponse);

      const result = await productService.getAllProducts(1);

      expect(axiosGetSpy).toHaveBeenCalledWith(expect.stringContaining("/products"), expect.any(Object));
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe("Pizza Margherita");
    });

    it("should throw an error when API returns no data", async () => {
      const axiosGetSpy = jest.spyOn(axios, 'get');
      axiosGetSpy.mockResolvedValueOnce({ data: null });

      await expect(productService.getAllProducts(1)).rejects.toThrow("No se recibieron datos del servidor");
    });

    it("should throw a specific error for 404 status", async () => {
      const mockError = {
        isAxiosError: true,
        response: {
          status: 404,
          statusText: "Not Found"
        },
        config: { url: "/products" }
      };

      const axiosGetSpy = jest.spyOn(axios, 'get');
      axiosGetSpy.mockRejectedValueOnce(mockError);
      
      const axiosIsAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError');
      axiosIsAxiosErrorSpy.mockReturnValueOnce(true);

      await expect(productService.getAllProducts(1)).rejects.toThrow("El endpoint de productos no fue encontrado");
    });
  });

  describe("getProductById", () => {
    it("should fetch a product by id", async () => {
      const mockProduct = { id: "1", name: "Pizza Margherita", price: 10, description: "Rica", image: "img", category: "pizza", stockIn: 10 };
      
      const axiosGetSpy = jest.spyOn(axios, 'get');
      axiosGetSpy.mockResolvedValueOnce({ data: mockProduct });

      const result = await productService.getProductById("1");

      expect(axiosGetSpy).toHaveBeenCalledWith(expect.stringContaining("/products/1"));
      expect(result.name).toBe("Pizza Margherita");
    });
  });
});