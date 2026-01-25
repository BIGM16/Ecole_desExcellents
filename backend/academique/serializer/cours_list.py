# academique/serializers/cours_list.py
from rest_framework import serializers
from academique.models import Cours


class CoursListSerializer(serializers.ModelSerializer):
    encadreurs = serializers.SerializerMethodField()
    promotions = serializers.SerializerMethodField()

    class Meta:
        model = Cours
        fields = [
            'id',
            'titre',
            'encadreurs',
            'promotions',
            'description',
        ]

    def get_encadreurs(self, obj):
        """Retourne liste des encadreurs avec id et nom"""
        return [
            {'id': enc.id, 'first_name': enc.first_name, 'last_name': enc.last_name}
            for enc in obj.encadreurs.all()
        ]

    def get_promotions(self, obj):
        """Retourne liste des promotions avec id et nom"""
        return [
            {'id': promo.id, 'name': promo.name}
            for promo in obj.promotions.all()
        ]
