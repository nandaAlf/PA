from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from user_app.api.serializer import RegistrationSerializaer
from user_app import models
from rest_framework_simplejwt.tokens import RefreshToken


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
        