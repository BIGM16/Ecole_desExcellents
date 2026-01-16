import api from "@/lib/axios";

export const login = async (email: string, password: string) => {
  await api.post("/auth/login-cookie/", { email, password });
};

export const logout = async () => {
  await api.post("/auth/logout-cookie/");
};
