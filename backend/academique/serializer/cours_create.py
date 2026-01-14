from rest_framework import serializers
from academique.models import Cours

class CoursCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cours
        fields = [
            'titre',
            'description',
            'encadreurs',
            'promotions',
        ]

    def validate_encadreurs(self, encadreurs):
        for user in encadreurs:
            if user.role != 'ENCADREUR':
                raise serializers.ValidationError(
                    "Seuls des encadreurs peuvent être associés à un cours."
                )
        return encadreurs
