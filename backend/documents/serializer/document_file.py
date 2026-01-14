from rest_framework import serializers
from documents.models import DocumentFile


class DocumentFileSerializer(serializers.ModelSerializer):
    view_url = serializers.SerializerMethodField()

    class Meta:
        model = DocumentFile
        fields = ['id', 'nom', 'view_url']

    def get_view_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(
            f"/api/documents/files/{obj.id}/view/"
        )

class DocumentFileCreateSerializer(serializers.ModelSerializer):
    class Meta :
        model = DocumentFile
        fields = ['nom', 'fichier']