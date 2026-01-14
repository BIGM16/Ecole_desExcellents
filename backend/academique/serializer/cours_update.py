from rest_framework import serializers
from academique.models import Cours

class CoursUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cours
        fields = [
            'titre',
            'description',
            'encadreurs',
            'promotions',
        ]
