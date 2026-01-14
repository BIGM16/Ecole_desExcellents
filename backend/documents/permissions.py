from rest_framework.permissions import BasePermission


class CoursPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.role == 'ADMIN':
            return True

        if user.role == 'COORDON':
            return obj.promotion == user.promotion

        if user.role == 'ENCADREUR':
            return obj.encadreurs.filter(id=user.id).exists()

        if user.role == 'ETUDIANT':
            return obj.promotion == user.promotion

        return False
