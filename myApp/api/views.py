
from myApp.api.serializer import PatientSerializer, StudySerializer
from myApp.models import TablePatient, TableStudy
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.decorators import api_view
from  rest_framework import viewsets, status,generics,mixins
from django.shortcuts import get_object_or_404

class StudyVS(viewsets.ModelViewSet):
    # def list(self,request):
    queryset = TableStudy.objects.all()
    serializer_class = StudySerializer 
        # return Response(serializer.data)
    
    # def retrieve(self,request,code=None):
    #     queryset=TableStudy.object.all()
    #     st=get_object_or_404(queryset,code=code)
    #     serializer=StudySerializer(st) 
    #     return Response(serializer.data)
            

class StudyListAV(APIView):
    def get(self,request):
        myStudies=TableStudy.objects.all()
        serializer=StudySerializer(myStudies,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        de_serializer=StudySerializer(data=request.data)
        if de_serializer.is_valid():
            de_serializer.save()
            return Response(de_serializer.data) 
        else: return Response(de_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
              
class StudyDetaillAV(APIView):
    def get(self,request, code):
        try:
           study=TableStudy.objects.get(code=code)
        except TableStudy.DoesNotExist:
            return Response({'Error: el estudio no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
        serializer=StudySerializer(study)
        return Response(serializer.data)
    
    def put(self,request,code):
        try:
           study=TableStudy.objects.get(code=code)
        except TableStudy.DoesNotExist:
            return Response({'Error: el estudio no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
        de_serializer=StudySerializer(study,data=request.data)
        if de_serializer.is_valid():
            de_serializer.save()
            return Response(de_serializer.data)
        else : return Response(de_serializer.errors,status=status.HTTP_400_BAD_REQUEST  )
        
    def delete(self,request,code):
        try:
            study=TableStudy.objects.get(code=code)
        except TableStudy.DoesNotExist:
            return Response({'Error: el estudio no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
        study.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# class PatientListAV(APIView):
#     def get(self,request):
#         myPatient=TablePatient.objects.all()
#         serializer=PatientSerializer(myPatient,many=True,context={'request':request})
#         return Response(serializer.data)
    
#     def post(self,request):
#         de_serializer=PatientSerializer(data=request.data)
#         if de_serializer.is_valid():
#             de_serializer.save()
#             return Response(de_serializer.data) 
#         else: return Response(de_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            
# class PatientDetaillAV(APIView):
#     def get(self,request, cid):
#         try:
#             patient=TablePatient.objects.get(cid=cid)
#         except TablePatient.DoesNotExist:
#             return Response({'Error: el paciente no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
#         serializer=PatientSerializer(patient,context={'request': request})
#         return Response(serializer.data)
    
#     def put(self,request,cid):
#         try:
#             patient=TablePatient.objects.get(cid=cid)
#         except TablePatient.DoesNotExist:
#             return Response({'Error: el paciente no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
#         de_serializer=PatientSerializer(patient,data=request.data)
#         if de_serializer.is_valid():
#             de_serializer.save()
#             return Response(de_serializer.data)
#         else : return Response(de_serializer.errors,status=status.HTTP_400_BAD_REQUEST  )
        
#     def delete(self,request,cid):
#         try:
#             patient=TablePatient.objects.get(cid=cid)
#         except TablePatient.DoesNotExist:
#             return Response({'Error: el paciente no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
#         patient.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
      
#modelo generico
# class PatientList (mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):      
    queryset=TablePatient.objects.all()
    serializer_class=PatientSerializer
    
    def get(self, request,*args, **kwargs ):
        return self.list(request,*args, **kwargs)
    
    def post(self, request,*args, **kwargs ):
        return self.create(request,*args, **kwargs)
    
# class PatientDetail (mixins.RetrieveModelMixin,generics.GenericAPIView):      
#     queryset=TablePatient.objects.all()
#     serializer_class=PatientSerializer
    
#     def get(self, request,*args, **kwargs ):
#         return self.retrieve(request,*args, **kwargs)
#     def put(self, request,*args, **kwargs ):
#         return self.retrieve(request,*args, **kwargs)



#metodo generico cCONCRETOS
class PatientList (generics.ListCreateAPIView):      
    queryset=TablePatient.objects.all()
    serializer_class=PatientSerializer
    
    
class PatientDetail (generics.RetrieveUpdateDestroyAPIView):      
    queryset=TablePatient.objects.all()
    serializer_class=PatientSerializer  