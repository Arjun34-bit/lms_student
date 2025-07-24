import axios from 'axios';

const apiBaseUrl = undefined                                   ;
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 1e4
});

export { api as a };
