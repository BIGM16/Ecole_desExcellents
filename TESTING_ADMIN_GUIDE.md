# 🧪 Guide de Test - Admin Dashboard

## Préalables

### Backend

```bash
cd backend
python manage.py runserver
# Doit afficher: Starting development server at http://127.0.0.1:8000/
```

### Frontend

```bash
cd frontend
npm run dev
# Doit afficher: ○ - ready started server on 0.0.0.0:3000
```

## 1️⃣ Tester les Endpoints Backend

### Endpoint 1: Stats Overview

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/academique/stats/overview/

# Response Expected:
{
  "coordons": 0,
  "encadreurs": 0,
  "etudiants": 1,
  "cours": 0
}
```

### Endpoint 2: Enrollment Trend

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/academique/stats/enrollment-trend/

# Response Expected:
{
  "etudiants": [
    {"month": "2024-12", "count": 1}
  ],
  "cours": []
}
```

### Endpoint 3: Coordons List

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/academique/stats/coordons/

# Response Expected:
[
  {
    "id": 2,
    "email": "coordon@example.com",
    "first_name": "Jean",
    "last_name": "Dupont",
    "telephone": "0123456789",
    "photo": null
  }
]
```

### Endpoint 4: Encadreurs List

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/academique/stats/encadreurs/
```

### Endpoint 5: Horaires List

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/academique/stats/horaires/
```

## 2️⃣ Tester l'Interface Admin

### Step 1: Login

1. Allez à `http://localhost:3000/auth/login`
2. Entrez:
   - Email: `joanthanmuangala@gmail.com` (admin)
   - Password: `password`
3. Vous devriez être redirigé à `/admin`

### Step 2: Vérifier le Dashboard

1. La page `/admin` doit charger
2. Vous devriez voir 4 cartes de stats:
   - Coordons
   - Encadreurs
   - Étudiants
   - Cours
3. Chaque carte doit afficher un nombre (depuis la BD)

### Step 3: Vérifier les Charts

En bas de la page, deux graphiques:

- **Évolution des Inscriptions** (Line chart)
- **Distribution des Performances** (Bar chart)

### Step 4: Vérifier les Widgets

1. **Horaires Récents** - Liste des horaires (ou "Aucun horaire disponible")
2. **Coordonnateurs** - Liste des coordons avec noms (ou message vide)

## 3️⃣ Tester les Loading States

### Method 1: Network Throttling

1. Ouvrez les DevTools (F12)
2. Allez à l'onglet "Network"
3. Sélectionnez "Slow 3G"
4. Rechargez `/admin`
5. Vous devriez voir les skeletons loading

### Method 2: Arrêt du Backend

1. Arrêtez le backend Django
2. Rechargez `/admin`
3. Vous devriez voir les error messages

## 4️⃣ Tester les Erreurs

### Test Error Handling

1. Modifiez temporairement l'URL dans `stats.service.ts`:
   ```typescript
   const response = await axios.get("/academique/stats/wrong-url/");
   ```
2. Rechargez `/admin`
3. Vous devriez voir un message d'erreur

## 5️⃣ Vérifier les Types TypeScript

```bash
# Frontend
cd frontend
npx tsc --noEmit

# Aucune erreur attendue
```

## 6️⃣ Tester les Autres Pages Admin

### Coordons Page

```
http://localhost:3000/admin/coordons
```

Devrait afficher une liste de coordonnateurs (si disponibles)

### Encadreurs Page

```
http://localhost:3000/admin/encadreurs
```

Devrait afficher une liste d'encadreurs (si disponibles)

### Étudiants Page

```
http://localhost:3000/admin/etudiants
```

Devrait afficher une liste d'étudiants (si disponibles)

### Cours Page

```
http://localhost:3000/admin/cours
```

Devrait afficher une liste de cours (si disponibles)

### Profil Page

```
http://localhost:3000/admin/profil
```

Devrait afficher le profil de l'utilisateur connecté

## 7️⃣ Vérifier la Déconnexion

1. Allez à `/admin`
2. Trouvez le bouton "Logout" (en haut à droite ou dans la sidebar)
3. Cliquez dessus
4. Vous devriez être redirigé à `/login`
5. Vérifiez que les cookies sont supprimés (F12 → Application → Cookies)

## 8️⃣ Vérifier les Autres Rôles

### Login comme Coordon

```
Email: coordon@example.com (si existe en BD)
Password: password
Redirect: /coordon
```

### Login comme Encadreur

```
Email: encadreur@example.com (si existe en BD)
Password: password
Redirect: /encadreur
```

### Login comme Étudiant

```
Email: etudiant@example.com (si existe en BD)
Password: password
Redirect: /etudiant
```

## 🔍 Browser DevTools Checklist

### Console

```javascript
// Pas d'erreurs attendues
// Vous devriez voir:
// ✓ Axios baseURL: http://localhost:8000/api
// ✓ withCredentials: true
```

### Network

```
GET /api/academique/stats/overview/ → 200 OK
GET /api/academique/stats/enrollment-trend/ → 200 OK
GET /api/academique/stats/coordons/ → 200 OK
GET /api/academique/stats/encadreurs/ → 200 OK
GET /api/academique/stats/horaires/ → 200 OK
```

### Application → Cookies

```
access_token: JWT_TOKEN_HERE
refresh_token: REFRESH_TOKEN_HERE
```

## 📱 Responsive Design

1. Testez sur différentes tailles:

   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

2. La sidebar doit:
   - Être visible sur desktop
   - Être cachée sur mobile (avec un menu burger)
   - S'ouvrir au clic du menu burger

## ✅ Checklist de Test Final

- [ ] Backend running sans erreurs
- [ ] Frontend running sans erreurs
- [ ] Login fonctionne
- [ ] Dashboard admin charge
- [ ] Stats cards affichent les nombres corrects
- [ ] Charts affichent les données
- [ ] Widgets affichent les listes
- [ ] Loading states visibles sur slow network
- [ ] Error messages visibles si serveur down
- [ ] Logout fonctionne
- [ ] Autres rôles fonctionnent
- [ ] TypeScript sans erreurs
- [ ] Network tab montre 200 pour tous les endpoints
- [ ] Console sans erreurs
- [ ] Responsive design OK

## 🐛 Troubleshooting

### Problème: "Cannot find module '@/lib/utils'"

**Solution:** Vérifiez que `frontend/lib/utils.ts` existe

```bash
ls frontend/lib/utils.ts
```

### Problème: "Backend returns 401"

**Solution:**

1. Vérifiez le token: `access_token` cookie présent
2. Vérifiez que vous êtes login
3. Vérifiez que le backend a `CORS_ALLOW_CREDENTIALS = true`

### Problème: "Stats affichent 0"

**Solution:** Il n'y a peut-être aucune donnée en BD

1. Créez des objets en BD via Django admin
2. Ou utilisez les fixtures

### Problème: "Les charts sont vides"

**Solution:** Le graphique marche mais les données sont aléatoires

1. C'est normal, les données sont simulées dans ce test
2. Plus tard, elles seront connectées à des vraies métriques

## 📊 Exemple de Données de Test

Créez ces données en Django admin pour tester:

```python
from users.models import User
from academique.models import Cours, Promotion, Horaire

# Créer une promotion
promo = Promotion.objects.create(name='B3', annee=2025)

# Créer des utilisateurs
user1 = User.objects.create_user(
    email='encadreur@test.com',
    password='password',
    first_name='Jean',
    last_name='Encadreur',
    role='ENCADREUR'
)

# Créer un cours
cours = Cours.objects.create(
    titre='Anatomie',
    description='Cours d\'anatomie'
)
cours.encadreurs.add(user1)
cours.promotions.add(promo)

# Créer un horaire
horaire = Horaire.objects.create(
    titre='Cours d\'anatomie',
    cours=cours,
    promotion=promo,
    date_debut='2025-01-20 08:00:00',
    lieu='Amphi A'
)
```

## 🎉 Résultat Attendu

Tous les tests passent ✅

- Dashboard affiche les vraies données ✅
- Loading states fonctionnent ✅
- Error handling fonctionne ✅
- Tous les rôles fonctionnent ✅
- Build passe sans erreur ✅
