from rest_framework import serializers
from users.models import User

class UserListSerializer(serializers.ModelSerializer) :
    promotion = serializers.SerializerMethodField()

    class Meta : 
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'telephone',
            'role',
            'bio',
            'promotion',
            'is_active',
        ]
        read_only_fields = fields

    def get_promotion(self, obj):
        """Retourne l'ID et le nom de la promotion"""
        if obj.promotion:
            return {
                'id': obj.promotion.id,
                'name': obj.promotion.name,
            }
        return None