#!/usr/bin/env python
"""
Script de test pour vérifier l'authentification Django
À exécuter: python test_auth.py
"""
import os
import django
import sys

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
sys.path.insert(0, os.path.dirname(__file__))

django.setup()

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User

print("=" * 60)
print("🧪 TEST D'AUTHENTIFICATION DJANGO")
print("=" * 60)

# Test 1: Vérifier que le modèle User est correctement configuré
print("\n1️⃣  Vérification du modèle User...")
try:
    user_count = User.objects.count()
    print(f"   ✅ Modèle User OK - {user_count} utilisateurs en base")
except Exception as e:
    print(f"   ❌ Erreur: {e}")

# Test 2: Vérifier les backends d'authentification
print("\n2️⃣  Vérification des backends d'authentification...")
from django.conf import settings
from django.contrib.auth.backends import ModelBackend

backends = settings.AUTHENTICATION_BACKENDS
print(f"   Backends configurés: {len(backends)}")
for backend in backends:
    print(f"   ✅ {backend}")

# Test 3: Vérifier la config JWT
print("\n3️⃣  Vérification de la configuration JWT...")
jwt_config = settings.SIMPLE_JWT
print(f"   - ACCESS_TOKEN_LIFETIME: {jwt_config.get('ACCESS_TOKEN_LIFETIME')}")
print(f"   - AUTH_COOKIE: {jwt_config.get('AUTH_COOKIE')}")
print(f"   - AUTH_COOKIE_REFRESH: {jwt_config.get('AUTH_COOKIE_REFRESH')}")
print(f"   - AUTH_COOKIE_SECURE: {jwt_config.get('AUTH_COOKIE_SECURE')}")
print(f"   - AUTH_COOKIE_SAMESITE: {jwt_config.get('AUTH_COOKIE_SAMESITE')}")

# Test 4: Vérifier REST_FRAMEWORK
print("\n4️⃣  Vérification de REST_FRAMEWORK...")
drf_config = settings.REST_FRAMEWORK
auth_classes = drf_config.get('DEFAULT_AUTHENTICATION_CLASSES', [])
print(f"   Authentificateurs DRF ({len(auth_classes)}):")
for auth_class in auth_classes:
    print(f"   ✅ {auth_class}")

# Test 5: Créer un utilisateur de test
print("\n5️⃣  Test de création d'utilisateur...")
try:
    test_user, created = User.objects.get_or_create(
        email='test@example.com',
        defaults={
            'first_name': 'Test',
            'last_name': 'User',
            'role': 'ETUDIANT',
        }
    )
    if created:
        test_user.set_password('testpass123')
        test_user.save()
        print(f"   ✅ Nouvel utilisateur créé: {test_user.email}")
    else:
        print(f"   ℹ️  Utilisateur existant: {test_user.email}")
except Exception as e:
    print(f"   ❌ Erreur: {e}")

# Test 6: Authentifier l'utilisateur
print("\n6️⃣  Test d'authentification...")
try:
    user = authenticate(username='test@example.com', password='testpass123')
    if user is not None:
        print(f"   ✅ Authentification réussie: {user.email}")
    else:
        print(f"   ❌ Authentification échouée")
except Exception as e:
    print(f"   ❌ Erreur: {e}")

# Test 7: Générer des tokens JWT
print("\n7️⃣  Test de génération JWT...")
try:
    user = User.objects.get(email='test@example.com')
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)
    print(f"   ✅ Access Token généré (longueur: {len(access)})")
    print(f"   ✅ Refresh Token généré (longueur: {len(str(refresh))})")
except Exception as e:
    print(f"   ❌ Erreur: {e}")

# Test 8: Vérifier CookieJWTAuthentication
print("\n8️⃣  Test de CookieJWTAuthentication...")
try:
    from users.authentication import CookieJWTAuthentication
    print(f"   ✅ CookieJWTAuthentication importée avec succès")
except Exception as e:
    print(f"   ❌ Erreur d'import: {e}")

print("\n" + "=" * 60)
print("✅ TESTS COMPLÉTÉS")
print("=" * 60)
