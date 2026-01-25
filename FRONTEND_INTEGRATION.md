# 🔧 Guide d'Intégration Frontend - Authentification API

## 📌 Résumé des Changes Backend

Votre backend a été corrigé pour supporter une authentification complète par cookies JWT. Les problèmes 401 que vous aviez sur `/users/me` et `/login-cookie/` sont maintenant résolus.

---

## 🛠️ Configuration Frontend (Next.js)

### 1. **Configuration Axios avec Credentials**

Modifiez votre `lib/axios.ts`:

```typescript
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ⭐ IMPORTANT: Envoyer les cookies automatiquement
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un intercepteur pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré, essayer de le rafraîchir
      try {
        await apiClient.post("/auth/refresh-cookie/");
        // Retry la requête originale
        return apiClient(error.config);
      } catch (refreshError) {
        // Refresh a échoué, rediriger vers login
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 2. **Service d'Authentification**

Créez `lib/services/authService.ts`:

```typescript
import apiClient from "../axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  bio?: string;
  telephone?: string;
}

export const authService = {
  // 🔐 Login avec cookies
  async loginWithCookie(credentials: LoginPayload) {
    const response = await apiClient.post("/auth/login-cookie/", credentials);
    // Les cookies sont automatiquement stockés par le navigateur
    // Le JWT est dans la réponse JSON aussi
    return response.data;
  },

  // 🔐 Login avec JWT standard (alternative)
  async loginWithToken(credentials: LoginPayload) {
    const response = await apiClient.post("/auth/token/", credentials);
    const { access, refresh } = response.data;
    // Stocker les tokens en localStorage si vous ne voulez pas de cookies
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    return response.data;
  },

  // 👤 Récupérer le profil utilisateur actuel
  async getMe(): Promise<User> {
    const response = await apiClient.get("/auth/users/me/");
    return response.data;
  },

  // 🔄 Rafraîchir le token
  async refreshToken() {
    const response = await apiClient.post("/auth/refresh-cookie/");
    return response.data;
  },

  // 🚪 Se déconnecter
  async logout() {
    await apiClient.post("/auth/logout-cookie/");
    // Cookies supprimés côté serveur
  },

  // ✏️ Modifier le profil
  async updateProfile(data: Partial<User>) {
    const response = await apiClient.patch("/auth/users/me/", data);
    return response.data;
  },
};
```

### 3. **Context d'Authentification Mise à Jour**

Mettez à jour `lib/context/AuthContext.tsx`:

```typescript
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  bio?: string;
  telephone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getMe();
        setUser(userData);
      } catch (error) {
        // Pas authentifié ou token expiré
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.loginWithCookie({ email, password });
      // Récupérer les données utilisateur
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      throw new Error("Identifiants invalides");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    const updated = await authService.updateProfile(data);
    setUser(updated);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### 4. **Composant de Login Mise à Jour**

Exemple: `app/auth/login/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      // ✅ Redirection après login réussi
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
```

### 5. **Route Protégée (ProtectedRoute)**

Créez `components/ProtectedRoute.tsx`:

```typescript
"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

---

## 🧪 Test de l'Authentification

### Workflow Complet:

1. **Se connecter**

   ```bash
   curl -X POST http://localhost:8000/api/auth/login-cookie/ \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass123"}' \
     -v
   ```

   Vérifiez les cookies dans les réponses!

2. **Accéder à `/users/me/` avec le cookie**

   ```bash
   curl -X GET http://localhost:8000/api/auth/users/me/ \
     -b access_token=<token_from_login> \
     -v
   ```

3. **Rafraîchir le token**
   ```bash
   curl -X POST http://localhost:8000/api/auth/refresh-cookie/ \
     -b refresh_token=<token_from_login> \
     -v
   ```

---

## 🔍 Troubleshooting

| Problème            | Cause                                   | Solution                                     |
| ------------------- | --------------------------------------- | -------------------------------------------- |
| CORS Error          | Frontend n'envoie pas `withCredentials` | Ajouter `withCredentials: true` à Axios      |
| 401 sur /users/me   | Token expiré ou pas envoyé              | Vérifier les cookies, rafraîchir le token    |
| Cookies pas stockés | SameSite trop strict                    | Config est en `Lax` pour localhost (OK)      |
| Logout inefficace   | Cookies pas supprimés                   | Backend supprime maintenant les 2 cookies ✅ |

---

## 📝 Checklist d'Intégration

- [ ] Mettre à jour `lib/axios.ts` avec `withCredentials: true`
- [ ] Créer `lib/services/authService.ts`
- [ ] Mettre à jour `lib/context/AuthContext.tsx`
- [ ] Créer composant de login
- [ ] Créer `ProtectedRoute` pour les pages protégées
- [ ] Tester le workflow complet (login → dashboard → logout)
- [ ] Vérifier les cookies dans DevTools (Application > Cookies)
- [ ] Tester le refresh token automatique (laisser expirer 15 min)

---

## 🚀 Prochaines Étapes

1. **Production**: Changer `AUTH_COOKIE_SECURE` à `True` et `SAMESITE` à `None`
2. **HTTPS**: Requiert Secure + SameSite=None
3. **Refresh automatique**: Implémenter une logique de refresh transparent
4. **Rate limiting**: Ajouter une protection contre les attaques brute force

---

**Backend Ready ✅** | Frontend en cours d'intégration 🚀
