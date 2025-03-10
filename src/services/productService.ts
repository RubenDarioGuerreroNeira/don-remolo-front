import axios, { AxiosError } from "axios";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// URL base de tu API - ajusta esto según tu entorno
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://don-remolo-api-s2pd.onrender.com" // URL de producción
    : "http://localhost:3000"; // URL de desarrollo

// Función auxiliar para verificar la conexión con la API
const checkApiConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    console.log("API Status:", response.status);
    console.log("Swagger docs available at:", `${API_BASE_URL}/api/docs`);
    return response.data;
  } catch (error) {
    console.error("Error checking API:", error);
    throw error;
  }
};

export const productService = {
  // Método para verificar la conexión
  checkConnection: checkApiConnection,

  // Método para obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    console.log(
      "Attempting to fetch products from:",
      `${API_BASE_URL}/products`
    );

    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error details:", {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        config: {
          url: axiosError.config?.url,
          method: axiosError.config?.method,
        },
      });

      // Sugerencias de debugging
      console.log("Debugging suggestions:");
      console.log("1. Verify the API is running");
      console.log("2. Check Swagger docs at:", `${API_BASE_URL}/api/docs`);
      console.log("3. Verify CORS settings in the backend");
      console.log("4. Check network tab for detailed error information");

      throw new Error(`Failed to fetch products: ${axiosError.message}`);
    }
  },

  // Método para obtener un producto específico por ID
  async getProductById(id: string): Promise<Product> {
    console.log(`Fetching product with ID: ${id}`);
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(`Error fetching product ${id}:`, axiosError.response?.data);
      throw new Error(`Failed to fetch product ${id}: ${axiosError.message}`);
    }
  },
};

// import axios, { AxiosError } from "axios";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
// }

// // URL base de tu API - ajusta esto según tu entorno
// const API_BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://don-remolo-api-s2pd.onrender.com/products" // URL de producción
//     : "http://localhost:3000/products"; // URL de desarrollo

// // Función auxiliar para verificar la conexión con la API
// const checkApiConnection = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api`);
//     console.log("API Status:", response.status);
//     console.log("Swagger docs available at:", `${API_BASE_URL}/api/docs`);
//     return response.data;
//   } catch (error) {
//     console.error("Error checking API:", error);
//     throw error;
//   }
// };

// export const productService = {
//   // Método para verificar la conexión
//   checkConnection: checkApiConnection,

//   // Método para obtener todos los productos
//   async getAllProducts(): Promise<Product[]> {
//     console.log(
//       "Attempting to fetch products from:",
//       `${API_BASE_URL}/api/products`
//     );

//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/products`);
//       console.log("Response status:", response.status);
//       console.log("Response data:", response.data);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       console.error("Error details:", {
//         status: axiosError.response?.status,
//         statusText: axiosError.response?.statusText,
//         data: axiosError.response?.data,
//         config: {
//           url: axiosError.config?.url,
//           method: axiosError.config?.method,
//         },
//       });

//       // Sugerencias de debugging
//       console.log("Debugging suggestions:");
//       console.log("1. Verify the API is running");
//       console.log("2. Check Swagger docs at:", `${API_BASE_URL}/api/docs`);
//       console.log("3. Verify CORS settings in the backend");
//       console.log("4. Check network tab for detailed error information");

//       throw new Error(`Failed to fetch products: ${axiosError.message}`);
//     }
//   },

//   // Método para obtener un producto específico por ID
//   async getProductById(id: string): Promise<Product> {
//     console.log(`Fetching product with ID: ${id}`);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       console.error(`Error fetching product ${id}:`, axiosError.response?.data);
//       throw new Error(`Failed to fetch product ${id}: ${axiosError.message}`);
//     }
//   },
// };
