from rest_framework.permissions import BasePermission

def IsRole(allowed_roles):
    """
    Permission factory pour rôles multiples
    Usage :
        @permission_classes([IsRole(['ADMIN', 'COORDON'])])
    """

    class RolePermission(BasePermission):
        def has_permission(self, request, view):
            user = request.user
            if not user or not user.is_authenticated:
                return False
            return getattr(user, 'role', None) in allowed_roles

    return RolePermission

class CanAccessUser(BasePermission) : 
    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.role == 'ADMIN' :
            return True
        
        if user.role == 'COORDON' : 
            return (
                obj.role == 'ETUDIANT'
                and obj.promotion == user.promotion
            )
        
        if user.role == 'ETUDIANT' :
            return (
                request.method == 'GET'
                and obj.promotion  == user.promotion
            )
        return False
