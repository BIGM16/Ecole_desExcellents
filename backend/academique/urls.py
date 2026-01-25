from django.urls import path
from academique.views import (
    cours_list_create, 
    cours_detail, 
    horaire_detail, 
    horaires_list_create,
    stats_overview,
    enrollment_trend,
    coordons_list,
    encadreurs_list,
    horaires_list,
    encadreurs_crud,
    encadreur_detail,
    etudiants_crud,
    etudiant_detail,
    coordons_crud,
    coordon_detail,
    promotions_list,
)

urlpatterns = [
    path('cours/', cours_list_create),
    path('cours/<int:pk>/', cours_detail),
    path('horaires/', horaires_list_create),
    path('horaires/<int:pk>/', horaire_detail),
    path('stats/overview/', stats_overview),
    path('stats/enrollment-trend/', enrollment_trend),
    path('stats/coordons/', coordons_list),
    path('stats/encadreurs/', encadreurs_list),
    path('stats/horaires/', horaires_list),
    # Promotions
    path('promotions/', promotions_list),
    # CRUD Encadreurs
    path('encadreurs/', encadreurs_crud),
    path('encadreurs/<int:pk>/', encadreur_detail),
    # CRUD Étudiants
    path('etudiants/', etudiants_crud),
    path('etudiants/<int:pk>/', etudiant_detail),
    # CRUD Coordons
    path('coordons/', coordons_crud),
    path('coordons/<int:pk>/', coordon_detail),
]
