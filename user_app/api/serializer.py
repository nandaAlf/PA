from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate

from django.contrib.auth.password_validation import validate_password

from user_app.models import CustomUser

# from user_app.models import Profile

# class RegistrationSerializaer(serializers.ModelSerializer):
#     password2=serializers.CharField(style={'input_type':'password'},write_only=True)
#     group = serializers.ChoiceField(choices=['StaffGroup', 'DoctorsGroup'], write_only=True)
#     class Meta:
#         model=User
#         fields=['username','email','password','password2','group','first_name','last_name']
#         extra_kwarg={
#             'password':{'write_only':True}
#          }
        
#     def save(self):
#         password=self.validated_data['password']
#         password2=self.validated_data['password2']
#         group_name = self.validated_data['group']
        
#         if password!=password2:raise serializers.ValidationError({'error': 'El password de confirmacion no coincide'})
        
#         if User.objects.filter(email=self.validated_data['email']).exists():
#             raise serializers.ValidationError({'error':'El email del usuario ya esta registrado'})
        
        
#         # account=User(email=self.validated_data['email'],username=self.validated_data['username'])
#         account=User(email=self.validated_data['email'],username=self.validated_data['username'],first_name=self.validated_data['first_name'],last_name=self.validated_data['last_name'])
       
#         account.set_password(password)
#         account.save()
        
#         try:
#             group = Group.objects.get(name=group_name)
#             account.groups.add(group)
#         except Group.DoesNotExist:
#             raise serializers.ValidationError({'error': 'El grupo especificado no existe'})
#         return account
    
# class RegistrationSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
#     group = serializers.ChoiceField(choices=['StaffGroup', 'DoctorsGroup'], write_only=True)
    
#     # Nuevos campos de perfil
#     cid = serializers.CharField(max_length=11, write_only=True, required=False)
#     dpto = serializers.CharField(max_length=20, write_only=True, required=False)
#     titulo = serializers.ChoiceField(choices=[('Dr.', 'Doctor'), ('Admin.', 'Admin')], write_only=True, required=False)

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'password2', 'group', 'first_name', 'last_name', 'cid', 'dpto', 'titulo']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
    
#     def save(self):
#         password = self.validated_data['password']
#         password2 = self.validated_data['password2']
#         group_name = self.validated_data['group']
        
#         if password != password2:
#             raise serializers.ValidationError({'error': 'El password de confirmación no coincide'})
        
#         if User.objects.filter(email=self.validated_data['email']).exists():
#             raise serializers.ValidationError({'error': 'El email ya está registrado'})

#         # Creación del usuario
#         user = User(
#             email=self.validated_data['email'],
#             username=self.validated_data['username'],
#             first_name=self.validated_data['first_name'],
#             last_name=self.validated_data['last_name']
#         )
#         user.set_password(password)
#         user.save()
        
#          # Añadir el grupo
#         try:
#             group = Group.objects.get(name=group_name)
#             user.groups.add(group)
#         except Group.DoesNotExist:
#             raise serializers.ValidationError({'error': 'El grupo especificado no existe'})

#         # Crear el perfil asociado
#         Profile.objects.create(
#             user=user,
#             cid=self.validated_data.get('cid', ''),
#             dpto=self.validated_data.get('dpto', ''),
#             titulo=self.validated_data.get('titulo', '')
#         )
        
#         return user

#         # Añadir el grupo

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    # group = serializers.ChoiceField(choices=['StaffGroup', 'DoctorsGroup'], write_only=True)
    group_name = serializers.ChoiceField(choices=['DoctorsGroup', 'LabStaffGroup'], required=False)
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name', 'cid','dpto','titulo','group_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'cid': {'required': True},
            'email': {'required': True},
        }
    def validate(self, data):
        """
        Validación personalizada:
        - Verificar que las contraseñas coincidan.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})

        # Verificar si el email ya existe
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'El email ya está registrado.'})

        return data

    def save(self):

        account =CustomUser.objects.create_user(
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            password=self.validated_data['password'],
            cid=self.validated_data['cid'],
           
        )
        # Encriptar la contraseña correctamente
        account.set_password = self.validated_data['password']
        
       # Agregar los campos opcionales solo si están presentes en la data
        account.dpto = self.validated_data.get('dpto', '')
        account.titulo = self.validated_data.get('titulo', '')

        account.save()
        
         # Asignar el grupo si se proporcionó el nombre del grupo
        group_name = self.validated_data.get('group_name') or None
        if group_name:
            try:
                group = Group.objects.get(name=group_name)
                account.groups.add(group)
            except Group.DoesNotExist:
                raise serializers.ValidationError({'error': 'El grupo especificado no existe'})
        return account
    
    
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username', 'first_name', 'last_name', 'email', 'cid', 'dpto', 'titulo', 'is_admin', 'is_staff', 'is_active', 'is_superadmin','profile_image']
        
    

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("La contraseña actual no es correcta")
        return value

    def validate(self, attrs):
        # Validación adicional si es necesaria
        return attrs

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user