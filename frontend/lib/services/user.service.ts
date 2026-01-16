import api from "@/lib/axios";

export const getCurrentUser = async () => {
  const res = await api.get("/auth/users/me/");
  return res.data;
};
