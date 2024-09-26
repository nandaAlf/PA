from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
# from user_app.api.serializer import LoginSerializer, RegistrationSerializer
from user_app import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib import auth
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from user_app.api.serializer import ChangePasswordSerializer, CustomUserSerializer, RegistrationSerializer
from user_app.models import CustomUser
from django.contrib.auth.models import Group
from rest_framework.views import APIView

@api_view(['POST'])
def logout_view(request):
    # if request.method=='POST':
    #     request.user.auth_token.delete()
    #     return Response(status=status.HTTP_200_OK)
    pass
    
#
#make a random password and user option changes password
#
# @api_view(['POST'])
# def registration_view(request):
    # if not request.user.is_superuser:
    #     return Response({"detail": "No tiene permisos para realizar esta acción."}, status=status.HTTP_403_FORBIDDEN)
    
    # if request.method=='POST':
    #     serializer=RegistrationSerializer(data=request.data) 
    #     data={}
        
    #     if serializer.is_valid():
    #        account= serializer.save()
    #        data = {
    #             'response': 'Registro de usuario exitoso',
    #             'username': account.username,
    #             'email': account.email,
    #             'first_name': account.first_name,
    #             'last_name': account.last_name,
    #         }
    #     #    data['response']='Registro de usuario exitoso'
    #     #    data['username']=account.username
    #     #    data['email']=account.email
    #     #    data['first_name']=account.first_name
    #     #    data['last_name']=account.last_name
         
    #        refresh=RefreshToken.for_user(account)
    #        data['token'] = {
    #             'refresh': str(refresh),
    #             'access': str(refresh.access_token)
    #         }
    #     #    data['token']={
    #     #         'refresh' : str(refresh), #token refresh(5 min) =>access endpoints since backend
    #     #         'access':str(refresh.access_token) #token access(24h) =>generate new access token 
    #     #     }
    #        return Response(data,status=status.HTTP_201_CREATED)

    #     else:
    #         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    pass



@api_view(['POST'])
def login_view(request):
    username= request.data.get('username')
    password = request.data.get('password')
    account = auth.authenticate(username=username, password=password)
    # serializer = LoginSerializer(data=request.data)
    # if serializer.is_valid():
    if account is not None:
        refresh = RefreshToken.for_user(account)
        data = {
            # "response": "El Login fue exitoso",
            "username": account.username,
            "email": account.email,
            "first_name": account.first_name,
            "last_name": account.last_name,
            "token": {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            },
            "dpto": account.dpto,
            "cid": account.cid,
            "titulo": account.titulo,
        }
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response({"error":"Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST',])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}

        if serializer.is_valid():
            account = serializer.save()
            # data['response'] = 'El registro del usuario fue exitoso'
            data['username'] = account.username
            data['email'] = account.email
            data['first_name'] = account.first_name
            data['last_name'] = account.last_name
            data['cid'] = account.cid
            data['titulo'] = account.titulo
            data['dpto'] = account.dpto

            #token = Token.objects.get(user=account).key
            #data['token'] = token

            refresh = RefreshToken.for_user(account)
            data['token'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            return Response(data)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
@api_view(['GET'])
def get_doctors_view (request):
    try:
        # Obtén el grupo 'DoctorGroup'
        group = Group.objects.get(name='DoctorsGroup')
        
        # Obtén todos los usuarios en ese grupo
        members = group.user_set.all()

        # Serializa la información de los usuarios
        users_data = [{
            'username': user.username,
            'name':user.full_name(),
            'email': user.email
        } for user in members]

        return Response(users_data, status=status.HTTP_200_OK)
    
    except Group.DoesNotExist:
        return Response({'error': 'El grupo DoctorsGroup no existe.'}, status=status.HTTP_404_NOT_FOUND)
    
    
class UserProfileView(APIView):
    # permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder a esta vista

    def get(self, request):
        user = request.user
        if request.user.is_anonymous:
            return Response({"detail": "No estás autenticado."}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ChangePasswordView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Contraseña cambiada exitosamente"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_lab_staff_view (request):
    try:
        # Obtén el grupo 'DoctorGroup'
        group = Group.objects.get(name='LabStaffGroup')
        
        # Obtén todos los usuarios en ese grupo
        members = group.user_set.all()

        # Serializa la información de los usuarios
        users_data = [{
            'name':user.full_name(),
            'id': user.id
        } for user in members]

        return Response(users_data, status=status.HTTP_200_OK)
    
    except Group.DoesNotExist:
        return Response({'error': 'El grupo LabStaff no existe.'}, status=status.HTTP_404_NOT_FOUND)
 
 
