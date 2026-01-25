from rest_framework import serializers
from users.models import User
from academique.models import Promotion

class UserCreateSerializer(serializers.ModelSerializer) :
    password = serializers.CharField(write_only=True, required=False)
    role = serializers.CharField(required=False)  # Optional car passé via .save()

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

        # Ne valider que si le role est fourni dans les données
        role = attrs.get('role')
        if role is None:
            return attrs

        if creator.role == 'COORDON' :
            if role != 'ETUDIANT' :
                raise serializers.ValidationError(
                    "Un coordonnateur ne peut créer que des étudiants."
                )
            # Valider la promotion si elle est fournie
            promotion = attrs.get('promotion')
            if promotion and promotion != creator.promotion :
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

        user.save()
        return user

