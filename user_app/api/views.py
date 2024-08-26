from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from user_app.api.serializer import RegistrationSerializaer
from user_app import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib import auth



@api_view(['POST'])
def logout_view(request):
    if request.method=='POST':
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    
#
#make a random password and user option changes password
#
@api_view(['POST'])
def registration_view(request):
    if not request.user.is_superuser:
        return Response({"detail": "No tiene permisos para realizar esta acción."}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method=='POST':
        serializer=RegistrationSerializaer(data=request.data) 
        data={}
        
        if serializer.is_valid():
           account= serializer.save()
           data['response']='Registro de usuario exitoso'
           data['username']=account.username
           data['email']=account.email
           data['first_name']=account.first_name
           data['last_name']=account.last_name
        #    token=Token.objects.get(user=account).key #return data in Base64 enncoding
        #    data['token']=token
         
           refresh=RefreshToken.for_user(account)
           data['token']={
                'refresh' : str(refresh), #token refresh(5 min) =>access endpoints since backend
                'access':str(refresh.access_token) #token access(24h) =>generate new access token 
            }
           return Response(data)

        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def login_view(request):
    data = {}
    if request.method=='POST':
        username = request.data.get('username')
        password = request.data.get('password')
        account = auth.authenticate(username=username, password=password)
        
        print("account",account)
        if account is not None:
            data['response']='El Login fue exitoso'
            data['username']=account.username
            data['email']=account.email
            data['first_name']=account.first_name
            data['last_name']=account.last_name
            refresh = RefreshToken.for_user(account)
            data['token'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
            return Response(data)
        else:
            data['error'] = "Credenciales incorrectas"
            return Response(data, status.HTTP_401_UNAUTHORIZED)
