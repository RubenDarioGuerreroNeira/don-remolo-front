// usando paginador funciona perfecto
import axios, { AxiosError } from "axios";
import { Product } from "../types/product";
import { handleApiError } from "../utils/apiErrorHandler";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_BASE_URL =
  "https://don-remolo-front.onrender.com/" || "http://localhost:3000";

export const productService = {
  async getAllProducts(
    page: number
  ): Promise<{ items: Product[]; total: number; page: number; limit: number }> {
    try {
      console.log(
        "Intentando obtener productos de:",
        `${API_BASE_URL}/products?page=${page}`
      );

      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: { page },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Verificar si la respuesta es válida
      if (!response.data) {
        throw new Error("No se recibieron datos del servidor");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        console.error("Detalles del error:", {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          headers: axiosError.response?.headers,
          url: axiosError.config?.url,
        });

        if (axiosError.response?.status === 404) {
          throw new Error("El endpoint de productos no fue encontrado");
        }

        if (axiosError.response?.status === 500) {
          throw new Error("Error interno del servidor");
        }

        throw new Error(`Error al obtener productos: ${axiosError.message}`);
      }

      throw new Error("Error desconocido al obtener productos");
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw handleApiError(error);
      }
      throw error;
    }
  },
};

// import axios, { AxiosError } from "axios";
// import { Product } from "../types/product";
// import { handleApiError } from "../utils/apiErrorHandler";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export const productService = {
//   async getAllProducts(): Promise<{
//     items: Product[];
//     total: number;
//     page: number;
//     limit: number;
//   }> {
//     try {
//       console.log(
//         "Intentando obtener productos de:",
//         `${API_BASE_URL}/products`
//       );

//       const response = await axios.get(`${API_BASE_URL}/products`, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });

//       // Verificar si la respuesta es válida
//       if (!response.data) {
//         throw new Error("No se recibieron datos del servidor");
//       }

//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError;

//         console.error("Detalles del error:", {
//           status: axiosError.response?.status,
//           statusText: axiosError.response?.statusText,
//           data: axiosError.response?.data,
//           headers: axiosError.response?.headers,
//           url: axiosError.config?.url,
//         });

//         if (axiosError.response?.status === 404) {
//           throw new Error("El endpoint de productos no fue encontrado");
//         }

//         if (axiosError.response?.status === 500) {
//           throw new Error("Error interno del servidor");
//         }

//         throw new Error(`Error al obtener productos: ${axiosError.message}`);
//       }

//       throw new Error("Error desconocido al obtener productos");
//     }
//   },

//   async getProductById(id: string): Promise<Product> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/products/${id}`);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw handleApiError(error);
//       }
//       throw error;
//     }
//   },
// };
