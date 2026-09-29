import axios from 'axios';

// Esto enlaza tu frontend con el puerto 3000 de tu servidor actual
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});