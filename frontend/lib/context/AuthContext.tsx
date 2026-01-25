"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/services/user.service";
import { login as loginService } from "@/lib/services/auth.service";
import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<User | null>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      setError(null);
      const data = await getCurrentUser();
      setUser(data);
      return data;
    } catch (err: any) {
      const message =
        err.message || "Erreur lors du chargement de l'utilisateur";
      setError(message);
      setUser(null);
      console.error("Erreur refreshUser:", message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      // Appeler le service de login
      await loginService(email, password);

      // Petit délai pour laisser les cookies être traités
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Récupérer les données utilisateur
      await refreshUser();
    } catch (err: any) {
      const message = err.message || "Erreur de connexion";
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      // Appeler le service de logout
      import("@/lib/services/auth.service").then((module) => {
        module.logout();
      });

      // Effacer l'utilisateur
      setUser(null);
    } catch (err: any) {
      const message = err.message || "Erreur de déconnexion";
      setError(message);
      console.error("Erreur logout:", message);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, refreshUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return ctx;
}
