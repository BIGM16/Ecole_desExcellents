import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/',
  withCredentials: true, // IMPORTANT pour cookies JWT
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionnel : interceptor réponse (pour plus tard)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ici on gérera le logout plus tard
      console.warn("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default api;
