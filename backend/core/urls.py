from django.urls import path
from .views import health_check, dashboard_view, delete_etudiant, create_encadreur

urlpatterns = [
    path("health/", health_check),
    path('dashboard/', dashboard_view),
    path('create-encadreur/', create_encadreur),
    path('delete-etudiant/', delete_etudiant),
]