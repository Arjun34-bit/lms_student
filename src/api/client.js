import axios from "axios";

const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
