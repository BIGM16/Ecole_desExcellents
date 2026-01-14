from rest_framework.permissions import BasePermission, SAFE_METHODS


class CoursPermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if not user.is_authenticated:
            return False

        # Lecture autorisée pour tous
        if request.method in SAFE_METHODS:
            return True

        # Création
        if request.method == 'POST':
            return user.role in ['ADMIN', 'COORDON']

        return True

    def has_object_permission(self, request, view, obj):
        user = request.user

        # Lecture
        if request.method in SAFE_METHODS:
            if user.role == 'ETUDIANT':
                return obj.promotions.filter(id=user.promotion_id).exists()
            return True

        # ADMIN → tout
        if user.role == 'ADMIN':
            return True

        # COORDON → autorisé (logique promotion extensible)
        if user.role == 'COORDON':
            return True

        # ENCADREUR → seulement s’il est affilié
        if user.role == 'ENCADREUR':
            return obj.encadreurs.filter(id=user.id).exists()

        return False
    

class HorairePermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        user = request.user

        # ADMIN → tout
        if user.role == 'ADMIN':
            return True

        # COORDON → autorisé (logique promotion extensible)
        if user.role == 'COORDON':
            return obj.promotion == user.promotion

        # ENCADREUR → seulement s’il est affilié
        if user.role == 'ENCADREUR':
            return obj.promotion == user.promotion
        
        if user.role == 'ETUDIANT' :
            return obj.promotion == user.promotion and request.method in SAFE_METHODS

        return False


