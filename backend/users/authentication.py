from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings


class CookieJWTAuthentication(JWTAuthentication):
    """
    Classe d'authentification pour lire le JWT depuis les cookies
    Fallback sur l'en-tête Authorization si pas de cookie
    """
    def authenticate(self, request):
        # D'abord, vérifier l'en-tête Authorization standard
        header = self.get_header(request)
        if header is not None:
            return super().authenticate(request)
        
        # Ensuite, vérifier le cookie access_token
        access_token = request.COOKIES.get(
            settings.SIMPLE_JWT.get("AUTH_COOKIE", "access_token")
        )

        if access_token is None:
            return None  # Pas d'authentification trouvée, laisser d'autres authentificateurs essayer
        
        try:
            validated_token = self.get_validated_token(access_token)
            return (self.get_user(validated_token), validated_token)
        except AuthenticationFailed as e:
            raise AuthenticationFailed(str(e))
