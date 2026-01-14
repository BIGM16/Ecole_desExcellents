from rest_framework import serializers
from academique.models import Horaire

class HoraireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horaire
        fields = [
            'id',
            'titre',
            'description',
            'cours',
            'date_debut',
            'date_fin',
            'lieu',
            'promotion'
        ]
