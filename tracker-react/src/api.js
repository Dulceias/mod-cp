import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'https://cp-tracker-6b4v.onrender.com';
export const api = axios.create({ baseURL: API_URL });