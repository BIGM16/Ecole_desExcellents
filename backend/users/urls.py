from django.urls import path
from .views import login_cookie_view, me_view, refresh_cookie_view, logout_cookie_view, UserListCreateAPIView, UserDetailAPIView, UserMeAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('users/me/', UserMeAPIView.as_view(), name='user-me'),
    path('login-cookie/', login_cookie_view),
    path('refresh-cookie/', refresh_cookie_view),
    path('logout-cookie/', logout_cookie_view),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('user/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
]
