import api from "@/lib/axios";

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/users/me/");
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.detail ||
      error.message ||
      "Impossible de récupérer l'utilisateur";
    throw new Error(message);
  }
};