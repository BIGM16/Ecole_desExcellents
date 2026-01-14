from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager
from academique.models import Promotion

class User(AbstractBaseUser, PermissionsMixin) :
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    photo = models.ImageField(upload_to='profils/', blank=True, null=True, default='profils/IMG-20250807-WA0097.jpg')
    bio = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    promotion = models.ForeignKey(Promotion, on_delete=models.SET_NULL, null=True, blank=True)


    ROLE_CHOICES = (
        ('ADMIN', 'Administrateur'),
        ('COORDON', 'Coordonnateur'),
        ('ENCADREUR', 'Encadreur'),
        ('ETUDIANT', 'Etudiant'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='ETUDIANT')

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email