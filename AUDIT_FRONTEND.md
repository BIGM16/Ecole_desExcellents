# 🔍 Audit Frontend Next.js - Authentification

## 🐛 Problèmes Identifiés

### 1. **CRITIQUE: Le login ne retourne rien** ❌

**Fichier**: `lib/services/auth.service.ts`

```typescript
export const login = async (email: string, password: string) => {
  await api.post("/auth/login-cookie/", { email, password });
};
```

**Problème**: La fonction `login()` ne retourne PAS les données, juste `undefined`
**Impact**: Sur le login, vous appelez `refreshUser()` mais pas certain que les cookies sont bien définies
**Solution**: ✅ Retourner la réponse pour tracer les erreurs

---

### 2. **RACE CONDITION: refreshUser() appelé trop vite** ⚠️

**Fichier**: `app/auth/login/page.tsx` ligne 26-27

```typescript
await login(email, password);
await refreshUser(); // Les cookies peuvent pas être lus immédiatement!
```

**Problème**: Après le login, le cookie est SET par le serveur, mais vous appelez `refreshUser()` immédiatement
**Impact**: La requête `/users/me/` peut ne pas inclure le cookie car le navigateur ne l'a pas traité
**Solution**: ✅ Vérifier que les cookies sont bien transmis avec Axios

---

### 3. **AXIOS: Pas de retry après 401** ❌

**Fichier**: `lib/axios.ts`

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized"); // Juste log, pas d'action
    }
    return Promise.reject(error);
  }
);
```

**Problème**: Pas de gestion d'erreur 401, pas de refresh automatique
**Impact**: Les endpoints qui retournent 401 crashent sans retry
**Solution**: ✅ Implémenter un interceptor de refresh automatique

---

### 4. **CONTEXT: Pas de sync après login** ⚠️

**Fichier**: `lib/context/AuthContext.tsx`

```typescript
const refreshUser = async () => {
  try {
    const data = await getCurrentUser();
    setUser(data); // Mais pas retourné!
    return data;
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};
```

**Problème**: `refreshUser()` retourne `data` mais on attend pas le résultat dans la page de login
**Impact**: `user?.role` peut être `null` juste après le login
**Solution**: ✅ Attendre et vérifier que user est défini

---

### 5. **SERVICE: Pas de gestion d'erreur** ❌

**Fichier**: `lib/services/user.service.ts`

```typescript
export const getCurrentUser = async () => {
  const res = await api.get("/auth/users/me/");
  return res.data;
};
```

**Problème**: Pas de try/catch, pas de message d'erreur clair
**Impact**: Erreurs 401 retournées brutes sans contexte
**Solution**: ✅ Ajouter meilleure gestion d'erreur

---

### 6. **TYPE: User type incomplet** ⚠️

**Fichier**: `types/user.ts`

```typescript
export type User = {
  // Voir contenu
};
```

Lisons le fichier pour vérifier

---

## ✅ Corrections à Appliquer

### Fix 1: Améliorer le service d'authentification

```typescript
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login-cookie/", { email, password });
    return response.data; // ✅ Retourner les données
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur de connexion");
  }
};
```

### Fix 2: Améliorer le service utilisateur

```typescript
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/users/me/");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "Impossible de récupérer l'utilisateur"
    );
  }
};
```

### Fix 3: Ajouter interceptor de refresh

```typescript
let isRefreshing = false;
let failedQueue: Array<(token: string) => void> = [];

const processQueue = (token: string | null) => {
  failedQueue.forEach((prom) => {
    if (token) prom(token);
  });
  isRefreshing = false;
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(resolve);
        }).then((token) => {
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-cookie/");
        processQueue(null);
        return api(originalRequest);
      } catch {
        failedQueue = [];
        // Redirect to login
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
```

### Fix 4: Améliorer le contexte

```typescript
const refreshUser = async () => {
  try {
    const data = await getCurrentUser();
    setUser(data);
    return data; // ✅ Attendable
  } catch (error) {
    console.error("Erreur refreshUser:", error);
    setUser(null);
    throw error; // ✅ Propager l'erreur
  } finally {
    setLoading(false);
  }
};
```

### Fix 5: Améliorer la page de login

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    // ✅ Login
    await login(email, password);

    // ✅ Refresh user (avec attente)
    const userData = await refreshUser();

    // ✅ Vérifier que l'user est bien récupéré
    if (!userData || !userData.role) {
      throw new Error("Utilisateur non reconnu");
    }

    // ✅ Redirection
    redirectByRole(userData.role, router);
  } catch (err: any) {
    setError(err.message || "Erreur de connexion");
  } finally {
    setLoading(false);
  }
};
```

---

## 🔐 Configuration à Vérifier

### .env.local ✅

```dotenv
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/
```

✅ Correct ! Trailing slash présent

### next.config.ts

À vérifier s'il y a besoin de config spéciale

### middleware.ts

À vérifier s'il intercepte les requêtes

---

## 📊 État Actuel vs Attendu

| Composant    | État            | Problème                     |
| ------------ | --------------- | ---------------------------- |
| Axios        | ✅ Config OK    | ❌ Pas d'interceptor refresh |
| Auth Service | ✅ Structure OK | ❌ Pas de retour données     |
| User Service | ✅ Structure OK | ❌ Pas d'erreur handling     |
| Auth Context | ✅ Structure OK | ❌ Pas de sync post-login    |
| Login Page   | ✅ Structure OK | ❌ Race condition            |
| Types User   | ?               | À vérifier                   |

---

## 🚀 Checklist des Fixes

- [ ] Fix auth.service.ts (retourner les données)
- [ ] Fix user.service.ts (gestion erreur)
- [ ] Améliorer axios.ts (interceptor refresh)
- [ ] Améliorer AuthContext (meilleur refresh)
- [ ] Améliorer login page (attendre les données)
- [ ] Vérifier types/user.ts
- [ ] Tester le flow complet: login → /users/me → redirect

---

**Prochaine étape**: Implémenter les fixes ✅
