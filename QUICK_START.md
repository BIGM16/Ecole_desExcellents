# 🚀 QUICK START - Après les Corrections

## ⚡ 3 Étapes pour Tester

### 1️⃣ Démarrer le Backend

```bash
cd backend
python manage.py runserver
```

✅ Server sur http://localhost:8000

### 2️⃣ Démarrer le Frontend

```bash
cd frontend
npm run dev
```

✅ App sur http://localhost:3000

### 3️⃣ Aller au Login

```
http://localhost:3000/auth/login
```

---

## 🧪 Tester le Flow Complet

### Test 1: Login Correct ✅

```
Email: joanthanmuangala@gmail.com
Password: Kadanga2003
→ Devrait rediriger vers /admin (ou votre rôle)
```

**Vérifier dans DevTools**:

- Network tab → POST /api/auth/login-cookie/ → 200 OK
- Application tab → Cookies → Voir `access_token`, `refresh_token` (HttpOnly ✓)

---

### Test 2: /users/me Fonctionne ✅

**Après login, tester manuellement**:

```bash
curl -b "access_token=YOUR_TOKEN" \
  http://localhost:8000/api/auth/users/me/
```

→ Devrait retourner vos données utilisateur

**Ou via REST client**:

```rest
GET http://127.0.0.1:8000/api/auth/users/me/
Authorization: Bearer YOUR_TOKEN
```

---

### Test 3: Credentials Invalides ❌

```
Email: test@test.com
Password: wrongpassword
→ Devrait afficher erreur: "Identifiants invalides"
```

---

### Test 4: Logout

```
Dans l'app (après login):
→ Cliquer sur Logout (ou tester via API)
→ POST /api/auth/logout-cookie/
→ Devrait rediriger vers /auth/login
→ Cookies supprimés dans DevTools
```

---

## 🔍 Vérifications Importantes

### Avant de déclarer "ça marche":

1. **Cookies visibles** ✅

   ```
   DevTools → Application → Cookies → localhost:3000
   - access_token: présent + HttpOnly
   - refresh_token: présent + HttpOnly
   ```

2. **Network tab** ✅

   ```
   POST /api/auth/login-cookie/ → 200 ✓
   GET /api/auth/users/me/ → 200 ✓
   POST /api/auth/logout-cookie/ → 200 ✓
   ```

3. **Redirections** ✅

   ```
   Après login → /admin, /coordon, /encadreur, ou /etudiant
   Après logout → /auth/login
   ```

4. **Console** ✅
   ```
   Pas d'erreurs JavaScript (sauf warnings normaux)
   Pas de "Unauthorized" log
   ```

---

## 🚨 Si ça ne marche pas

### Problème: Erreur "Authentication credentials were not provided"

```
Solution 1: Vérifier credentials
  → Tester dans REST client backend d'abord

Solution 2: CORS error dans console?
  → Vérifier backend CORS settings (OK par défaut)

Solution 3: Cookies pas envoyés?
  → Vérifier axios.ts a "withCredentials: true"
```

### Problème: 401 sur /users/me après login

```
Solution 1: Cookies pas définis?
  → Vérifier DevTools Cookies tab

Solution 2: Middleware bloquerait?
  → Vérifier middleware.ts cherche "access_token" (pas "accessToken")

Solution 3: Token expiré?
  → Attendre 15min et tester? Sinon c'est un bug
```

### Problème: Rien ne marche, tout est cassé

```
1. Arrêter frontend: Ctrl+C
2. Arrêter backend: Ctrl+C
3. Vider cache browser: Ctrl+Shift+Delete
4. Redémarrer les deux:
   - Backend: python manage.py runserver
   - Frontend: npm run dev
5. Aller à http://localhost:3000/auth/login
```

---

## 📚 Documentation de Référence

| Document                                         | Pour Quoi              | Lire Si                   |
| ------------------------------------------------ | ---------------------- | ------------------------- |
| [RAPPORT_AUDIT_FINAL.md](RAPPORT_AUDIT_FINAL.md) | Résumé complet         | Vous voulez l'overview    |
| [AUDIT_FRONTEND.md](AUDIT_FRONTEND.md)           | Détail bugs frontend   | Vous debuggez frontend    |
| [AUDIT_BACKEND.md](backend/AUDIT_BACKEND.md)     | Détail bugs backend    | Vous debuggez backend     |
| [TESTING_GUIDE.md](TESTING_GUIDE.md)             | Guide testing complet  | Vous testez les features  |
| [DASHBOARD_CHANGES.md](DASHBOARD_CHANGES.md)     | Vue d'ensemble changes | Vous voulez une checklist |

---

## ⏱️ Temps de Test Estimé

```
Quick test (5 min):
  - Login → Dashboard → Logout

Full test (30 min):
  - Login (valid, invalid credentials)
  - Check /users/me
  - Check cookies in DevTools
  - Test logout
  - Test token refresh
  - Test error messages
  - Test protected routes
```

---

## 🎯 Prochaines Étapes Après Testing

1. ✅ Si tests réussis:

   - Créer les pages de dashboard
   - Implémenter navigation par rôle
   - Ajouter les autres endpoints API

2. ⚠️ Si tests échouent:

   - Consulter [TESTING_GUIDE.md](TESTING_GUIDE.md)
   - Vérifier DevTools Network + Console
   - Lire le troubleshooting ci-dessus

3. 🚀 Avant production:
   - [Lire FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
   - Configuration HTTPS
   - Variables d'environnement
   - Tests en production-like

---

## 📞 Fichiers d'Aide Rapide

### REST Client Tests

- 📄 [backend/users/test.rest](backend/users/test.rest) - Tests endpoints backend
- 📄 [backend/api_test.rest](backend/api_test.rest) - Tests complets (nouveau)

### Scripts Automatiques

- 🐍 [backend/test_auth.py](backend/test_auth.py) - Verify auth setup

### Reference Rapide

**Endpoints clés**:

- POST /api/auth/login-cookie/ → Login
- GET /api/auth/users/me/ → Profil
- POST /api/auth/refresh-cookie/ → Refresh token
- POST /api/auth/logout-cookie/ → Logout

**Cookies**:

- `access_token` (15 min) - JWT access
- `refresh_token` (7 jours) - JWT refresh

**Routes protégées** (nécessite token):

- /admin/\*
- /coordon/\*
- /encadreur/\*
- /etudiant/\*

---

## 🎉 C'est tout!

Vous êtes maintenant **prêt à tester**!

```
✅ Backend: Fixed & Running
✅ Frontend: Fixed & Running
✅ Documentation: Complete
✅ Tests: Ready

→ Il ne vous reste qu'à TESTER! 🧪
```

**Bonne chance! 🚀**

---

**Dernière mise à jour**: 20 janvier 2026
**Statut**: ✅ PRÊT À TESTER
**Support**: Lire les documents dans le dossier racine
