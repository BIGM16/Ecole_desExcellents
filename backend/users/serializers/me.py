from rest_framework import serializers
from users.models import User

class UserMeSerializer(serializers.ModelSerializer) :

    class Meta :
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'bio',
            'role',
            'promotion',
            'telephone',
        ]
        read_only_fields = [
            'id',
            'email',
            'role',
            'promotion',
        ]