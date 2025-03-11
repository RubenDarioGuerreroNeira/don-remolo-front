// src/utils/apiErrorHandler.ts
import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public originalError?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new ApiError(
      axiosError.response?.status || 500,
      axiosError.message,
      error
    );
  }
  throw error;
};
