from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from academique.models import Cours, Horaire, Promotion
from academique.serializer.cours_list import CoursListSerializer
from academique.serializer.cours_create import CoursCreateSerializer
from academique.serializer.cours_detail import CoursDetailSerializer
from academique.serializer.cours_update import CoursUpdateSerializer
from academique.serializer.horaire import HoraireSerializer
from academique.permissions import CoursPermission, HorairePermission
from django.shortcuts import get_object_or_404
from users.models import User
from users.serializers import UserListSerializer, UserCreateSerializer, UserAdminDetailSerializer
from django.db.models import Count


@api_view(['GET', 'POST'])
@permission_classes([CoursPermission])
def cours_list_create(request):

    if request.method == 'GET':
        user = request.user

        if user.role == 'ETUDIANT':
            cours = Cours.objects.filter(promotions=user.promotion)
        else:
            cours = Cours.objects.all()

        serializer = CoursListSerializer(cours, many=True)
        return Response(serializer.data)

    serializer = CoursCreateSerializer(data=request.data)
    if serializer.is_valid():
        cours = serializer.save()
        return Response(
            CoursDetailSerializer(cours).data,
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([CoursPermission])
def cours_detail(request, pk):

    cours = get_object_or_404(Cours, pk=pk)
    request.user  # force auth

    # permission objet
    permission = CoursPermission()
    if not permission.has_object_permission(request, None, cours):
        return Response(
            {"detail": "Accès interdit."},
            status=status.HTTP_403_FORBIDDEN
        )

    if request.method == 'GET':
        serializer = CoursDetailSerializer(cours)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = CoursUpdateSerializer(cours, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    if request.user.role not in ['ADMIN', 'COORDON']:
        return Response(
            {"detail": "Suppression non autorisée."},
            status=status.HTTP_403_FORBIDDEN
        )

    cours.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
@permission_classes([HorairePermission])
def horaires_list_create(request):
    user = request.user

    if request.method == 'GET':
        if user.role == 'ETUDIANT' or user.role == 'ENCADREUR':
            horaires = Horaire.objects.filter(promotion=user.promotion)
        else:
            horaires = Horaire.objects.all()

        serializer = HoraireSerializer(horaires, many=True)
        return Response(serializer.data)

    # POST
    serializer = HoraireSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([HorairePermission])
def horaire_detail(request, pk):
    try:
        horaire = Horaire.objects.get(pk=pk)
    except Horaire.DoesNotExist:
        return Response({"detail": "Horaire introuvable"}, status=404)

    permission = HorairePermission()
    if not permission.has_object_permission(request, None, horaire):
        return Response({"detail": "Accès interdit"}, status=403)

    if request.method == 'GET':
        serializer = HoraireSerializer(horaire)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = HoraireSerializer(horaire, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    # DELETE
    if request.user.role not in ['ADMIN', 'COORDON']:
        return Response({"detail": "Suppression non autorisée"}, status=403)
    horaire.delete()
    return Response(status=204)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def promotions_list(request):
    """Retourne la liste de toutes les promotions"""
    promotions = Promotion.objects.all().values('id', 'name', 'annee')
    return Response(list(promotions))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def stats_overview(request):
    """Retourne les stats globales du tableau de bord admin"""
    # Compter les utilisateurs par rôle
    coordons = User.objects.filter(role='COORDON').count()
    encadreurs = User.objects.filter(role='ENCADREUR').count()
    etudiants = User.objects.filter(role='ETUDIANT').count()
    
    # Compter les cours
    cours = Cours.objects.count()
    
    return Response({
        'coordons': coordons,
        'encadreurs': encadreurs,
        'etudiants': etudiants,
        'cours': cours,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def enrollment_trend(request):
    """Retourne l'évolution des inscriptions par mois"""
    from django.db.models.functions import TruncMonth
    from django.utils import timezone
    from datetime import timedelta
    
    # Dernier 6 mois
    six_months_ago = timezone.now() - timedelta(days=180)
    
    # Étudiants par mois
    etudiants_by_month = User.objects.filter(
        role='ETUDIANT',
        date_joined__gte=six_months_ago
    ).annotate(month=TruncMonth('date_joined')).values('month').annotate(count=Count('id')).order_by('month')
    
    # Cours par mois
    cours_by_month = Cours.objects.filter(
        date_creation__gte=six_months_ago
    ).annotate(month=TruncMonth('date_creation')).values('month').annotate(count=Count('id')).order_by('month')
    
    return Response({
        'etudiants': list(etudiants_by_month),
        'cours': list(cours_by_month),
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def coordons_list(request):
    """Retourne la liste des coordons avec leurs infos"""
    user = request.user
    queryset = User.objects.filter(role='COORDON')
    
    # Support filtrage par promotion en query param (pour les listes admin)
    promotion_id = request.query_params.get('promotion_id')
    if promotion_id:
        queryset = queryset.filter(promotion_id=promotion_id)
    # Sinon, si c'est depuis le dashboard, filtrer par promotion de l'utilisateur
    elif user.promotion:
        queryset = queryset.filter(promotion=user.promotion)
    
    coordons = queryset.values(
        'id', 'email', 'first_name', 'last_name', 'telephone', 'photo'
    )
    return Response(list(coordons))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def encadreurs_list(request):
    """Retourne la liste des encadreurs"""
    user = request.user
    queryset = User.objects.filter(role='ENCADREUR')
    
    # Support filtrage par promotion en query param (pour les listes admin)
    promotion_id = request.query_params.get('promotion_id')
    if promotion_id:
        queryset = queryset.filter(promotion_id=promotion_id)
    # Sinon, si c'est depuis le dashboard, filtrer par promotion de l'utilisateur
    elif user.promotion:
        queryset = queryset.filter(promotion=user.promotion)
    
    encadreurs = queryset.values(
        'id', 'email', 'first_name', 'last_name', 'telephone', 'photo'
    )
    return Response(list(encadreurs))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def horaires_list(request):
    """Retourne les horaires de la semaine"""
    user = request.user
    queryset = Horaire.objects.all()
    
    # Support filtrage par promotion en query param (pour les listes admin)
    promotion_id = request.query_params.get('promotion_id')
    if promotion_id:
        queryset = queryset.filter(promotion_id=promotion_id)
    # Sinon, si c'est depuis le dashboard, filtrer par promotion de l'utilisateur
    elif user.promotion:
        queryset = queryset.filter(promotion=user.promotion)
    
    horaires = queryset.values(
        'id', 'titre', 'date_debut', 'date_fin', 'lieu', 'cours__titre', 'promotion__name', 'promotion_id'
    ).order_by('date_debut')[:10]
    return Response(list(horaires))


# ============================================
# VUES CRUD POUR LES RÔLES
# ============================================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def encadreurs_crud(request):
    """GET: Récupère la liste des encadreurs
    POST: Crée un nouvel encadreur (admin only)"""
    
    if request.method == 'GET':
        encadreurs = User.objects.filter(role='ENCADREUR')
        serializer = UserListSerializer(encadreurs, many=True)
        return Response(serializer.data)
    
    # POST - Créer un encadreur
    if request.user.role not in ['ADMIN', 'COORDON']:
        return Response(
            {"detail": "Accès non autorisé"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = UserCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.save(role='ENCADREUR')
        return Response(UserListSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def encadreur_detail(request, pk):
    """Détail d'un encadreur"""
    try:
        encadreur = User.objects.get(pk=pk, role='ENCADREUR')
    except User.DoesNotExist:
        return Response({"detail": "Encadreur non trouvé"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserListSerializer(encadreur)
        return Response(serializer.data)
    
    if request.method == 'PATCH':
        if request.user.role not in ['ADMIN', 'COORDON']:
            return Response({"detail": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserAdminDetailSerializer(encadreur, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        if request.user.role not in ['ADMIN']:
            return Response({"detail": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
        encadreur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def etudiants_crud(request):
    """GET: Récupère la liste des étudiants
    POST: Crée un nouvel étudiant (admin/coordon only)"""
    
    if request.method == 'GET':
        user = request.user
        if user.role == 'ADMIN':
            etudiants = User.objects.filter(role='ETUDIANT')
        elif user.role == 'COORDON':
            etudiants = User.objects.filter(role='ETUDIANT', promotion=user.promotion)
        else:
            return Response(
                {"detail": "Accès non autorisé"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = UserListSerializer(etudiants, many=True)
        return Response(serializer.data)
    
    # POST - Créer un étudiant
    if request.user.role not in ['ADMIN', 'COORDON']:
        return Response(
            {"detail": "Accès non autorisé"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = UserCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.save(role='ETUDIANT')
        return Response(UserListSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def etudiant_detail(request, pk):
    """Détail d'un étudiant"""
    try:
        etudiant = User.objects.get(pk=pk, role='ETUDIANT')
    except User.DoesNotExist:
        return Response({"detail": "Étudiant non trouvé"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserListSerializer(etudiant)
        return Response(serializer.data)
    
    if request.method == 'PATCH':
        if request.user.role not in ['ADMIN', 'COORDON']:
            return Response({"detail": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserAdminDetailSerializer(etudiant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        if request.user.role not in ['ADMIN']:
            return Response({"detail": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
        etudiant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def coordons_crud(request):
    """GET: Récupère la liste des coordonnateurs
    POST: Crée un nouveau coordonnateur (admin only)"""
    
    if request.method == 'GET':
        if request.user.role != 'ADMIN':
            return Response(
                {"detail": "Accès non autorisé"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        coordons = User.objects.filter(role='COORDON')
        serializer = UserListSerializer(coordons, many=True)
        return Response(serializer.data)
    
    # POST - Créer un coordon
    if request.user.role not in ['ADMIN']:
        return Response(
            {"detail": "Accès non autorisé"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = UserCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.save(role='COORDON')
        return Response(UserListSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def coordon_detail(request, pk):
    """Détail d'un coordonnateur"""
    try:
        coordon = User.objects.get(pk=pk, role='COORDON')
    except User.DoesNotExist:
        return Response({"detail": "Coordon non trouvé"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        if request.user.role != 'ADMIN':
            return Response({"detail": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserListSerializer(coordon)
        return Response(serializer.data)
    
    if request.method == 'PATCH':
        if request.user.role not in ['ADMIN']:
            return Response({"detail": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserAdminDetailSerializer(coordon, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        if request.user.role not in ['ADMIN']:
            return Response({"detail": "Accès non autorisé"}, status=status.HTTP_403_FORBIDDEN)
        coordon.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
