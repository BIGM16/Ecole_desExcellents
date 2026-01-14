from django.urls import path
from academique.views import cours_list_create, cours_detail, horaire_detail, horaires_list_create

urlpatterns = [
    path('cours/', cours_list_create),
    path('cours/<int:pk>/', cours_detail),
    path('horaires/', horaires_list_create),
    path('horaires/<int:pk>/', horaire_detail),
]
