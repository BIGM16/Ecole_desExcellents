from django.db import models
from academique.models import Cours
from users.models import User

# Create your models here.
class Document(models.Model):
    # Types de documents (notes, items, résumé, etc.)
    DOCUMENT_TYPE_CHOICES = [
        ('notes', 'Notes'),
        ('items', 'Items'),
        ('resume', 'Résumé'),
        ('autre', 'Autre'),
    ]
    cours = models.ForeignKey(Cours, on_delete=models.CASCADE)
    titre = models.CharField(max_length=200)
    categorie = models.CharField(max_length=20, choices=DOCUMENT_TYPE_CHOICES, default='notes')
    date_ajout = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


    def __str__(self):
        return f"{self.titre} ({self.cours.titre}) - {self.categorie}"


class DocumentFile(models.Model):
    """Permet d'attacher plusieurs fichiers à un même Document.

    Exemple d'utilisation : créer un Document, puis plusieurs DocumentFile liés à ce Document.
    """
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='fichiers')
    fichier = models.FileField(upload_to='fichiers/')
    nom = models.CharField(max_length=200, blank=True, null=True)
    date_ajout = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


    def __str__(self):
        return f"{self.nom or self.fichier.name} ({self.document.titre})"

