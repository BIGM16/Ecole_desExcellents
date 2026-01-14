from django.db import models
from django.conf import settings

# Create your models here.
class Promotion(models.Model):
    PROMOTION_CHOICES = [
        ('L0', 'Préparatoire'),
        ('B1', 'BioMédical1'),
        ('B2', 'BioMédical2'),
        ('B3', 'BioMédical3'),
        ('M1', 'Master1'),
    ]
    name = models.CharField(max_length=50, null=True, choices=PROMOTION_CHOICES, default='L0')
    annee = models.IntegerField(default=2025)

    def __str__(self):
        return self.name

class Cours(models.Model):
    titre = models.CharField(max_length=100)
    description = models.TextField(max_length=300)

    encadreurs = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='cours_encadres',
        limit_choices_to={'role': 'ENCADREUR'},
        blank=True
    )

    promotions = models.ManyToManyField(
        'Promotion',
        related_name='cours',
        blank=True
    )

    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre
    
class Horaire(models.Model):
	titre = models.CharField(max_length=200)
	description = models.TextField(blank=True, null=True)
	cours = models.ForeignKey(Cours, on_delete=models.SET_NULL, null=True, blank=True)
	date_debut = models.DateTimeField()
	date_fin = models.DateTimeField(blank=True, null=True)
	lieu = models.CharField(max_length=200, blank=True, null=True)
	promotion = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.titre} — {self.promotion}"
