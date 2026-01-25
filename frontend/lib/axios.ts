import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  withCredentials: true, // ✅ IMPORTANT pour cookies JWT
  headers: {
    "Content-Type": "application/json",
  },
});

// console.log("🔧 Axios baseURL:", api.defaults.baseURL);
// console.log("🔧 withCredentials:", api.defaults.withCredentials);

// Track des requêtes en refresh pour éviter les boucles
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = () => {
  failedQueue.forEach(({ resolve }) => {
    resolve();
  });
  isRefreshing = false;
  failedQueue = [];
};

// Interceptor de réponse pour gérer les erreurs 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 et pas déjà en retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Si déjà en refresh, mettre en queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Retry la requête originale
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Essayer de refresh le token
        await api.post("/auth/refresh-cookie/");
        processQueue();
        // Retry la requête originale
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh a échoué, rediriger vers login
        failedQueue = [];
        isRefreshing = false;

        // Redirection côté client uniquement
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
