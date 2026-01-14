from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from users.permissions import IsRole

@api_view(['GET'])
def health_check(request) :
    return Response({
        "status": "ok",
        "message" : "Backend is running",
    })



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_view(request):
    user = request.user
    return Response({
        "message": f"Bonjour {user.email} !",
        "id": user.id,
        "is_staff": user.is_staff
    })

# Endpoint pour créer un encadreur → admin ou coordon
@api_view(['POST'])
@permission_classes([IsRole(['ADMIN', 'COORDON'])])
def create_encadreur(request):
    return Response({
        "message": f"{request.user.role} {request.user.email} peut créer un encadreur."
    })


# Endpoint pour supprimer un étudiant → uniquement admin
@api_view(['DELETE'])
@permission_classes([IsRole(['ADMIN'])])
def delete_etudiant(request):
    # logique de suppression ici
    return Response({"message": f"{request.user.role} {request.user.first_name} peut supprimer un étudiant."})
