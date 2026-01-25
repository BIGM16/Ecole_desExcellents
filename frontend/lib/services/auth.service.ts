import api from "@/lib/axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login-cookie/", { email, password });
    return response.data; // ✅ Retourner les données
  } catch (error: any) {
    const message =
      error.response?.data?.error || error.message || "Erreur de connexion";
    throw new Error(message);
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout-cookie/");
  } catch (error: any) {
    console.error("Erreur logout:", error);
    throw error;
  }
};
