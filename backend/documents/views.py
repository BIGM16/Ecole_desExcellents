from django.http import FileResponse, Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from documents.models import DocumentFile
from rest_framework import status
from academique.permissions import CoursPermission
from documents.models import Document
from documents.serializer.document import (
    DocumentListSerializer,
    DocumentCreateSerializer
)
from documents.serializer.document_file import (
    DocumentFileCreateSerializer,
    DocumentFileSerializer
)
from academique.models import Cours


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_document_file(request, file_id):
    try:
        doc_file = DocumentFile.objects.select_related(
            'document__cours'
        ).get(id=file_id)
    except DocumentFile.DoesNotExist:
        raise Http404()

    cours = doc_file.document.cours

    # réutilisation des permissions cours
    permission = CoursPermission()
    if not permission.has_object_permission(request, None, cours):
        return Response({"detail": "Accès interdit"}, status=403)

    response = FileResponse(
        doc_file.fichier.open('rb'),
        content_type='application/pdf'  # adaptable
    )

    # 🔐 FORCE LECTURE INLINE
    response['Content-Disposition'] = 'inline'
    response['X-Content-Type-Options'] = 'nosniff'

    return response


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def documents_by_cours(request, cours_id):
    try:
        cours = Cours.objects.get(id=cours_id)
    except Cours.DoesNotExist:
        return Response({"detail": "Cours introuvable"}, status=404)

    # 🔐 Permission sur le cours
    permission = CoursPermission()
    if not permission.has_object_permission(request, None, cours):
        return Response({"detail": "Accès interdit"}, status=403)

    # 📄 LIST
    if request.method == 'GET':
        docs = Document.objects.filter(cours=cours)
        serializer = DocumentListSerializer(docs, many=True)
        return Response(serializer.data)

    # ➕ CREATE
    if request.method == 'POST':
        serializer = DocumentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cours=cours)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def document_files_list_create(request, document_id):
    try:
        document = Document.objects.get(id=document_id)
    except Document.DoesNotExist:
        return Response({"detail": "Document introuvable"}, status=404)

    cours = document.cours

    permission = CoursPermission()
    if not permission.has_object_permission(request, None, cours):
        return Response({"detail": "Accès interdit"}, status=403)

    if request.method == 'GET':
        files = DocumentFile.objects.filter(document=document)
        serializer = DocumentFileSerializer(files, many=True, context={'request': request})
        return Response(serializer.data)

    # POST - création
    serializer = DocumentFileCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(document=document)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=400)

