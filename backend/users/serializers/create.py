from rest_framework import serializers
from users.models import User
from academique.models import Promotion

class UserCreateSerializer(serializers.ModelSerializer) :
    password = serializers.CharField(write_only=True, required=False)

    class Meta :
        model = User
        fields = [
            'email',
            'first_name',
            'last_name',
            'telephone',
            'role',
            'promotion',
            'password',
        ]
    def validate(self, attrs):
        request = self.context['request']
        creator = request.user

        if creator.role == 'COORDON' :
            if attrs.get('role') != 'ETUDIANT' :
                raise serializers.ValidationError(
                    "Un coordonnateur ne peut créer que des étudiants."
                )
            if attrs.get('promotion') != creator.promotion :
                raise serializers.ValidationError(
                    "Un coordonnateur ne peut créer un étudiant que de sa promotion."
                )
        return attrs
    
    def create(self, validated_data) :
        password = validated_data.pop('password', None)

        user = User(**validated_data)

        if password :
            user.set_password(password)
        else :
            user.set_unusable_password()

        user.save
        return user

