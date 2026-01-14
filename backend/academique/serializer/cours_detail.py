from rest_framework import serializers
from academique.models import Cours
from documents.serializer import document  # à créer après


class CoursDetailSerializer(serializers.ModelSerializer):
    encadreurs = serializers.StringRelatedField(many=True)
    promotions = serializers.StringRelatedField(many=True)
    documents = document(many=True, read_only=True)

    class Meta:
        model = Cours
        fields = '__all__'
