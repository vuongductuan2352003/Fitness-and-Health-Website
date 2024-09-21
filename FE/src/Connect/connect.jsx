import axios from "axios";
export const Client = axios.create({ 
    baseURL: 'http://localhost:8000',
    timeout: 1000 * 60 * 30 * 3, // 90 minutes
  });