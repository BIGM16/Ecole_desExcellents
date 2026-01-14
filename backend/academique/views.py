from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from academique.models import Cours, Horaire
from serializer.cours_list import CoursListSerializer
from serializer.cours_create import CoursCreateSerializer
from serializer.cours_detail import CoursDetailSerializer
from serializer.cours_update import CoursUpdateSerializer
from serializer.horaire import HoraireSerializer
from academique.permissions import CoursPermission, HorairePermission
from django.shortcuts import get_object_or_404


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