from rest_framework_simplejwt.authentication import JWTAuthentication

from django.conf import settings


class CookieJWTAuthentication(JWTAuthentication) :
    def authenticate(self, request):
        header = self.get_header(request)
        if header is not None:
            return super().authenticate(request)
        

        access_token = request.COOKIES.get(
            settings.SIMPLE_JWT.get("AUTH_COOKIE")
        )

        if access_token is None : 
            return None
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), validated_token