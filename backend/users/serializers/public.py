from rest_framework import serializers
from users.models import User
from academique.models import Promotion

class UserPublicSerializer(serializers.ModelSerializer) :
    promotion = serializers.StringRelatedField()

    class Meta :
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'telephone',
            'bio',
            'promotion',
        ]
        read_only_fields = fields