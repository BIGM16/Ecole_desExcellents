from django.contrib import admin

# Register your models here.
from django.contrib import admin
from documents.models import Document, DocumentFile
from users.models import User

# Register your models here.

class DocumentAdmin(admin.ModelAdmin) :
    list_display = ('titre', 'cours', 'categorie', 'uploaded_by')

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "uploaded_by" :
            kwargs["queryset"] = User.objects.filter(role="ENCADREUR")
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(Document, DocumentAdmin)
admin.site.register(DocumentFile)
