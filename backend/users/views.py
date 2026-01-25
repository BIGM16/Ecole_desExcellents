from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.models import User
from users.permissions import CanAccessUser
from users.serializers import (
    UserListSerializer,
    UserCreateSerializer,
    UserPublicSerializer,
    UserAdminDetailSerializer,
    UserMeSerializer
)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_cookie_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email et mot de passe requis"}, status=400)
    user = authenticate(request, username=email, password=password)
    if user is None:
        return Response({"error": "Identifiants invalides"}, status=401)

    # # Crée les tokens
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    # Réponse JSON avec access token et info user
    response = Response({
        "message": "Connexion réussie",
        "access": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "is_staff": user.is_staff
        }
    })

    response.set_cookie(
        key=settings.SIMPLE_JWT["AUTH_COOKIE"],
        value=str(refresh.access_token),
        httponly=True,
        secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
        samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        path="/",
        max_age=15*60 # 5 minutes
    )

    # Mettre refresh token dans cookie HttpOnly
    response.set_cookie(
        key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
        value=str(refresh),
        httponly=True,
        secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
        samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        path="/",
        max_age=7*24*3600  # 7 jours
    )

    return response


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_cookie_view(request):
    refresh_token = request.COOKIES.get(settings.SIMPLE_JWT.get('AUTH_COOKIE_REFRESH'))

    if not refresh_token:
        return Response({"error": "Pas de refresh token"}, status=401)

    try:
        refresh = RefreshToken(refresh_token)
        new_access = str(refresh.access_token)
        return Response({"access": new_access})
    except Exception:
        return Response({"error": "Refresh token invalide ou expiré"}, status=401)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_cookie_view(request):
    response = Response({"message": "Déconnexion réussie"})
    # Supprimer les cookies
    response.delete_cookie(settings.SIMPLE_JWT.get('AUTH_COOKIE'))
    response.delete_cookie(settings.SIMPLE_JWT.get('AUTH_COOKIE_REFRESH'))
    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    """Endpoint /me pour vérifier l'authentification et obtenir les données utilisateur"""
    serializer = UserMeSerializer(request.user)
    return Response(serializer.data)


class UserListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request) :
        user = request.user

        if user.role == 'ADMIN' : 
            queryset = User.objects.all()
        elif user.role == 'COORDON' :
            queryset = User.objects.filter(
                role = 'ETUDIANT',
                promotion = user.promotion
            )
        else :
            return Response(
                {"detail" : "Accès non autorisé."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = UserListSerializer(queryset, many= True)
        return Response(serializer.data)
    
    def post(self, request) : 
        user = request.user

        if user.role not in ['ADMIN', 'COORDON'] : 
            return Response(
                {"detail" : "Accès non autorisé."},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = UserCreateSerializer(
            data = request.data,
            context={'request' : request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message" : "Utilisateur créé avec succès"},
            status=status.HTTP_201_CREATED
        )

class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, CanAccessUser]

    def get_object(self, pk):
        return User.objects.get(pk=pk)

    def get_serializer_class(self, request, obj):
        if request.user.role == 'ADMIN':
            return UserAdminDetailSerializer
        return UserPublicSerializer

    def get(self, request, pk):
        user_obj = self.get_object(pk)
        self.check_object_permissions(request, user_obj)

        serializer_class = self.get_serializer_class(request, user_obj)
        serializer = serializer_class(user_obj)
        return Response(serializer.data)

    def patch(self, request, pk):
        user_obj = self.get_object(pk)
        self.check_object_permissions(request, user_obj)

        serializer = UserAdminDetailSerializer(
            user_obj,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request, pk):
        user_obj = self.get_object(pk)
        self.check_object_permissions(request, user_obj)

        user_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserMeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserMeSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserMeSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)