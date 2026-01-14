# academique/serializers/cours_list.py
from rest_framework import serializers
from academique.models import Cours


class CoursListSerializer(serializers.ModelSerializer):
    encadreurs = serializers.StringRelatedField(many=True)
    promotions = serializers.StringRelatedField(many=True)

    class Meta:
        model = Cours
        fields = [
            'id',
            'titre',
            'encadreurs',
            'promotions',
        ]
