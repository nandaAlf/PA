# from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from django.forms import ValidationError
from rest_framework.authtoken.models import Token
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
# Create your models here.

#crear un token
# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender,instance=None,created=False,**kwargs):
#     if created:
#         Token.objects.create(user=instance)
    
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     cid = models.CharField(max_length=11, blank=True, null=True)
#     dpto= models.CharField(max_length=20, blank=True, null=True)
#     titulo= models.CharField(max_length=10, blank=True, null=True, choices=[('Dr.', 'Doctor'), ('Admin.', 'Admin')])
    
#     # titulo=models.S
    
#     # address = models.CharField(max_length=255, blank=True, null=True)
#     # birth_date = models.DateField(null=True, blank=True)

#     def __str__(self):
#         return f'{self.user.username} Profile'
    
    
class CustomUserManager(BaseUserManager):
    def create_user(self,username,first_name,last_name,cid,email, password=None):
        if not username:
            raise ValueError('The Username field must be set')
        if not first_name:
            raise ValueError('The First Name field must be set')
        if not last_name:
            raise ValueError('The Last Name field must be set')
        if not cid:
            raise ValueError('The cid field must be set')
        if not email:
            raise ValueError('The email field must be set')
        # email = self.normalize_email(email)
        user = self.model(username=username,
                          email=self.normalize_email(email),
                          first_name=first_name,
                          last_name=last_name,
                          cid=cid,
                          )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username,first_name,last_name,cid,email, password=None):
      
        user = self.create_user(username=username,
                            first_name=first_name,
                            last_name=last_name,
                            cid=cid,
                            email=email,
                            password=password,
                            )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user
        # user = self.create(username=username,
        #                   email=self.normalize_email(email),
        #                   first_name=first_name,
        #                   last_name=last_name,
        #                   cid=cid,
        #                   password=password,
        #                   **extra_fields)
        # user.is_admin=True
        # user.is_Staff=True
        # user.is_superadmin=True
        # user.is_active=True
        
        # user.save(using=self._db)
        # return user
        # extra_fields.setdefault('is_staff', True)
        # extra_fields.setdefault('is_superuser', True)

        # if extra_fields.get('is_staff') is not True:
        #     raise ValueError('Superuser must have is_staff=True.')
        # if extra_fields.get('is_superuser') is not True:
        #     raise ValueError('Superuser must have is_superuser=True.')

        # return self.create_user(username, password, **extra_fields)
class CustomUser(AbstractUser):
    # Campos por defecto
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(unique=True, max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    # Campos adicionales personalizados
    cid = models.CharField(max_length=11, blank=True, null=True)
    dpto = models.CharField(max_length=20, blank=True, null=True)
    titulo= models.CharField(max_length=10, blank=True, null=True, choices=[('Dr.', 'Doctor'), ('Admin.', 'Admin')])
    
    # Indicadores de estado
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)

    # Campo para la imagen de perfil
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

  
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [ 'first_name', 'last_name','email','cid']

    objects = CustomUserManager()

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.username or "Usuario sin nombre"

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True




    # class Meta:
    #     verbose_name = 'user'
    #     verbose_name_plural = 'users'
    
def validate_image(image):
    # Validar el tamaño de la imagen (máximo 2MB)
    file_size = image.file.size
    limit_kb = 2048  # 2 MB
    if file_size > limit_kb * 1024:
        raise ValidationError(f"El tamaño máximo de archivo es de {limit_kb} KB")

    # Validar el tipo de archivo (permitir solo JPG y PNG)
    valid_mime_types = ['image/jpeg', 'image/png']
    file_mime_type = image.file.content_type
    if file_mime_type not in valid_mime_types:
        raise ValidationError("Solo se permiten archivos JPG y PNG")