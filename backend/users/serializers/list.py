from rest_framework import serializers
from users.models import User

class UserListSerializer(serializers.ModelSerializer) :
    promotion = serializers.StringRelatedField()

    class Meta : 
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'role',
            'promotion',
            'is_active',
        ]
        read_only_fields = fields