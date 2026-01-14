from django.contrib import admin
from .models import User

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin) :
    list_display = ('email', 'is_staff', 'is_active')
    search_fields = ('email',)
    
    def save_model(self, request, obj, form, change):
        # Si le mot de passe est en clair (pas de $ indiquant un mot de passe hashé), le hacher.
        pwd = obj.password or ''
        if pwd and ('$' not in pwd):
            obj.set_password(pwd)
        super().save_model(request, obj, form, change)