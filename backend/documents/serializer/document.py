from rest_framework import serializers
from documents.models import Document


class DocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            'id',
            'titre',
            'categorie',
            'date_ajout'
        ]


class DocumentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            'titre',
            'categorie'
        ]
