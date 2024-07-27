
from myApp.api.serializer import *
from myApp.models import *
from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.decorators import api_view
from  rest_framework import viewsets, status,generics,mixins
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action

#Vista
class PatientViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PatientSerializer
    
    # def retrieve(self, request, pk=None):
    #     # Retrieve the patient
    #     paciente = self.get_object()

    #     # Retrieve the associated studies
    #     studies = paciente.estudio_set.all()

    #     # Serialize the studies
    #     serializer = StudySerializer(studies, many=True, context={'request': request})

    #     # Return the patient data with the studies list
    #     patient_serializer = PatientSerializer(paciente, context={'request': request})
    #     return Response({'paciente': patient_serializer.data, 'studies': serializer.data})
    
    # @action(detail=True, methods=['get'])
    # def studies(self, request, pk=None):
    #     """
    #     Obtiene la lista de estudios asociados al paciente
    #     """
    #     paciente = self.get_object()
    #     estudios = paciente.estudio_set.all()  # Relacion inversa
    #     serializer = StudySerializer(estudios, many=True)
    #     return Response(serializer.data)
  
class DefunctViewSet(viewsets.ModelViewSet):
    queryset = Fallecido.objects.all()
    serializer_class = DefunctSerializer

class StudyViewSet(viewsets.ModelViewSet):
    queryset = Estudio.objects.all()
    serializer_class = StudySerializer
    lookup_field = 'code'
    
class NecropsyViewSet(viewsets.ModelViewSet):
    queryset = Necropsia.objects.all()
    serializer_class = NecropsySerializer
    lookup_field = 'code'

class ProcessViewSet(viewsets.ModelViewSet):
    queryset = Proceso.objects.all()
    serializer_class = ProcessSerializer
    
    # lookup_field = 'cod_est'
    
    def get_object(self):
        """
        Sobrecarga el método get_object para determinar el identificador en funcion de si es un estudio o una necropsia
        """
        # Obtén el valor del campo de la URL
        code= self.kwargs.get('pk')
        # Determina el campo a utilizar para la búsqueda
        if code[0]=='N':
            try:
                return Proceso.objects.get(cod_necro=code)
            except Proceso.DoesNotExist:
                pass
        elif code[0]=='B' or code[0]=='C':
            try:
                return Proceso.objects.get(cod_est=code)
            except Proceso.DoesNotExist:
                pass
            
    # def get_queryset(self):
    #     pk=self.kwargs['pk']
    #     return Proceso.objects.filter(cod_est=pk)

class DiagnosisViewSet(viewsets.ModelViewSet):
    queryset = Diagnostico.objects.all()
    serializer_class = DiagnosisSerializer
    lookup_field = 'id_proceso'



# class StudyVS(viewsets.ModelViewSet):
#     queryset = Estudio.objects.all()
#     serializer_class = StudySerializer 
    
    #no
    # def retrieve(self,request,code=None):
    #     queryset=TableStudy.object.all()
    #     st=get_object_or_404(queryset,code=code)
    #     serializer=StudySerializer(st) 
    #     return Response(serializer.data)
            

# class StudyListAV(APIView):
#     def get(self,request):
#         myStudies=Estudio.objects.all()
#         serializer=StudySerializer(myStudies,many=True)
#         return Response(serializer.data)
    
#     def post(self,request):
#         de_serializer=StudySerializer(data=request.data)
#         if de_serializer.is_valid():
#             de_serializer.save()
#             return Response(de_serializer.data) 
#         else: return Response(de_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
              
# class StudyDetaillAV(APIView):
#     def get(self,request, code):
#         try:
#            study=Estudio.objects.get(code=code)
#         except Estudio.DoesNotExist:
#             return Response({'Error: el estudio no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
#         serializer=StudySerializer(study)
#         return Response(serializer.data)
    
#     def put(self,request,code):
#         try:
#            study=Estudio.objects.get(code=code)
#         except Estudio.DoesNotExist:
#             return Response({'Error: el estudio no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
#         de_serializer=StudySerializer(study,data=request.data)
#         if de_serializer.is_valid():
#             de_serializer.save()
#             return Response(de_serializer.data)
#         else : return Response(de_serializer.errors,status=status.HTTP_400_BAD_REQUEST  )
        
#     def delete(self,request,code):
#         try:
#             study=Estudio.objects.get(code=code)
#         except Estudio.DoesNotExist:
#             return Response({'Error: el estudio no ha sido encontrado'},status=status.HTTP_404_NOT_FOUND) #NO ENCUENTRA LOS DATOS ENVIADOS EN LA TABLA PACIENTES
        
#         study.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
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
# # class PatientList (mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):      
#     queryset=TablePatient.objects.all()
#     serializer_class=PatientSerializer
    
#     def get(self, request,*args, **kwargs ):
#         return self.list(request,*args, **kwargs)
    
#     def post(self, request,*args, **kwargs ):
#         return self.create(request,*args, **kwargs)
    
# class PatientDetail (mixins.RetrieveModelMixin,generics.GenericAPIView):      
#     queryset=TablePatient.objects.all()
#     serializer_class=PatientSerializer
    
#     def get(self, request,*args, **kwargs ):
#         return self.retrieve(request,*args, **kwargs)
#     def put(self, request,*args, **kwargs ):
#         return self.retrieve(request,*args, **kwargs)



#metodo generico cCONCRETOS
# class PatientList (generics.ListCreateAPIView):      
#     queryset=Paciente.objects.all()
#     serializer_class=PatientSerializer
    
    
# class PatientDetail (generics.RetrieveUpdateDestroyAPIView):      
#     queryset=Paciente.objects.all()
#     serializer_class=PatientSerializer  