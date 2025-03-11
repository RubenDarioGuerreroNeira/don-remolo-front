// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptores para desarrollo
if (import.meta.env.DEV) {
  api.interceptors.request.use(request => {
    console.log('Starting Request:', request.url)
    return request
  })

  api.interceptors.response.use(response => {
    console.log('Response:', response.data)
    return response
  })
}