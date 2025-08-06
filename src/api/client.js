import axios from "axios";

const apiBaseUrl = import.meta.env.PROD_PUBLIC_API_BASE_URL;

console.log("API Base URL:", apiBaseUrl);

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
