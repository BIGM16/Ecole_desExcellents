from rest_framework import serializers
from users.models import User

class UserAdminDetailSerializer(serializers.ModelSerializer) :
    promotion = serializers.StringRelatedField(read_only = True)

    class Meta : 
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'telephone',
            'bio',
            'role',
            'promotion',
            'is_active',
            'is_staff',
            'date_joined',
        ]
        read_only_fields = [
            'id',
            'email',
            'date_joined',
        ]