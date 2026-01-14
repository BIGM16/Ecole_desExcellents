from django.urls import path
from documents.views import documents_by_cours, document_files_list_create, view_document_file

urlpatterns = [
    path('cours/<int:cours_id>/documents/', documents_by_cours),
    path('documents/<int:document_id>/files/', document_files_list_create),
    path('documents/files/<int:file_id>/view/', view_document_file),
]
