from abc import abstractmethod

from django.db import connection
from myApp.api.pagination import PatientPagination
from myApp.api.permissions import  DiagnosisPermission, IsDoctorGroupPermission, IsStaffGroupPermission
from myApp.api.serializer import *
from myApp.models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from  rest_framework import viewsets, status,generics,mixins
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework 
from rest_framework import filters
from django.db.models import Q, OuterRef, Subquery
from django.views.generic import ListView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import action
class BaseStudyFilter(rest_framework.FilterSet):
    
    # finalizado = rest_framework.BooleanFilter(method='filter_by_finalizado')
    
    finalizado=rest_framework.BooleanFilter(field_name='finalizado')
    search_code = rest_framework.CharFilter(field_name='code', lookup_expr='icontains') 
    
    class Meta:
        fields = ['search_code']
        
    # @classmethod
    # @abstractmethod
    # def filter_by_finalizado(self, queryset, name, value):
    #     pass
class StudyFilter(BaseStudyFilter):
    
    tipo=rest_framework.CharFilter(field_name='tipo')
    class Meta(BaseStudyFilter.Meta):
        model = Estudio
        
    # def filter_by_finalizado(self, queryset, name, value):
    #     subquery = Diagnostico.objects.filter(
    #         id_proceso__cod_est=OuterRef('code'), 
    #         finalizado=value
    #     ).values('id_proceso__cod_est')
        
    #     return queryset.filter(code__in=Subquery(subquery))
    
    def filter_by_doctor(self, queryset, name, value):
        return queryset.filter(id_proceso__cod_est__medico=value)
class NecropsyFilter(BaseStudyFilter):
    class Meta(BaseStudyFilter.Meta):
        model = Necropsia
    
    
    
# class DiagnosisFilter(rest_framework.FilterSet):
    
#     doctor = rest_framework.CharFilter(method='filter_by_doctor')
#     class Meta:
#         model = Diagnostico
#         fields = ['doctor']

#     # def filter_by_doctor(self, queryset, name, value):
#     #     subquery = Diagnostico.objects.filter(id_proceso__cod_est__medico=value)
#     #     return subquery
    
#     def filter_by_doctor(self, queryset, name, value):
#         return queryset.filter(id_proceso__cod_est__medico=value)
    
class PacienteFilter(rest_framework.FilterSet):
    
    search_name = rest_framework.CharFilter(field_name='nombre', lookup_expr='icontains')
    search_id = rest_framework.CharFilter(field_name='cid', lookup_expr='icontains')
    search_hc = rest_framework.CharFilter(field_name='hc', lookup_expr='icontains')
    es_fallecido=rest_framework.BooleanFilter(field_name='es_fallecido')
    class Meta:
        model = Paciente
        fields = ['search_name', 'search_id', 'search_hc', 'es_fallecido']
        
#Vista
class PatientViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PatientSerializer
    
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = PacienteFilter
    
    # permission_classes=[IsAuthenticated,DiagnosisPermission]
    # pagination_class=PatientPagination
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='DoctorsGroup').exists():
            # Filtrar pacientes que están asociados a diagnósticos donde el doctor es responsable del estudio
            return Paciente.objects.filter(
                hc__in=Diagnostico.objects.filter(
                    id_proceso__cod_est__medico=user.id
                ).values_list('id_proceso__cod_est__hc_paciente', flat=True)
            ).distinct()
        else: return Paciente.objects.all()
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
      
    
    @action(detail=False, methods=['post'])  
    def create_with_fallecido(self, request):
        # Crear el paciente
        paciente_serializer = PatientSerializer(data=request.data)
        if paciente_serializer.is_valid():
            paciente = paciente_serializer.save()

            # Si el paciente es fallecido, crear también el registro en la tabla Fallecido
            if request.data.get('es_fallecido'):
                fallecido_data = request.data.get('fallecido', {})
                fallecido_data['hc'] = paciente.hc  # Asociar el hc del paciente creado
                fallecido_serializer = DefunctSerializer(data=fallecido_data)
                if fallecido_serializer.is_valid():
                    fallecido_serializer.save()
                else:
                    paciente.delete()  # Si falla, revertir la creación del paciente
                    return Response(fallecido_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(paciente_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(paciente_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DefunctViewSet(viewsets.ModelViewSet):
    queryset = Fallecido.objects.all()
    serializer_class = DefunctSerializer
    
    # permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
class StudyViewSet(viewsets.ModelViewSet):
    queryset = Estudio.objects.all()
    # study=Estudio.objects.prefetch_related('proceso_est__diagnostico').get(code='some_code')
    serializer_class = StudySerializer
    lookup_field = 'code'
    
    # def list(self, request, *args, **kwargs):
    #     response = super().list(request, *args, **kwargs)
    #     print('Response Data:', response.data)
    #     return response
    
    # permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
    filter_backends = [rest_framework.DjangoFilterBackend,filters.OrderingFilter]
    filterset_class = StudyFilter  
class NecropsyViewSet(viewsets.ModelViewSet):
    queryset = Necropsia.objects.all()
    serializer_class = NecropsySerializer
    lookup_field = 'code'
    
    # permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
    filter_backends = [rest_framework.DjangoFilterBackend,filters.OrderingFilter]
    filterset_class = NecropsyFilter
class ProcessViewSet(viewsets.ModelViewSet):
    queryset = Proceso.objects.all()
    serializer_class = ProcessSerializer
    
    # permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
    # Sobrecarga el método get_object para determinar el identificador en funcion de si es un estudio o una necropsia
    def get_object(self):
        # Obtén el valor del campo de la URL
        code= self.kwargs.get('pk')
        # Determina el campo a utilizar para la búsqueda
        if code[0]=='N':
            try:
                return Proceso.objects.get(cod_necro=code)
            except Proceso.DoesNotExist:
                raise Http404("Proceso con necropsia no encontrado.")
        elif code[0]=='B' or code[0]=='C':
            try:
                return Proceso.objects.get(cod_est=code)
            except Proceso.DoesNotExist:
                raise Http404("Proceso con estudio no encontrado.")
            
    def update(self, request, *args, **kwargs):
        # Obtén el proceso que se está actualizando
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Actualiza el proceso usando el serializer
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Si en la request también vienen datos para el diagnóstico, actualízalo
        diagnostico_data = request.data.get('diagnostico')
        if diagnostico_data:
            # Busca el diagnóstico relacionado
            try:
                diagnostico = instance.diagnostico # Asumiendo que es una relación uno a uno
                # if diagnostico:
                if hasattr(instance, 'diagnostico'):
                    diagnostico = instance.diagnostico
                    # Si se encuentra, actualiza el diagnóstico
                    diagnostico_serializer = DiagnosisSerializer(diagnostico, data=diagnostico_data, partial=partial)
                    diagnostico_serializer.is_valid(raise_exception=True)
                    diagnostico_serializer.save()
            except Diagnostico.DoesNotExist:
                pass

        return Response(serializer.data)
              
class DiagnosisViewSet(viewsets.ModelViewSet):
    queryset = Diagnostico.objects.all()
    serializer_class = DiagnosisSerializer
    lookup_field = 'id_proceso'
  
    filter_backends = [filters.OrderingFilter]
    
    # permission_classes = [IsAuthenticated, DiagnosisPermission]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='DoctorsGroup').exists():
            return Diagnostico.objects.filter(id_proceso__cod_est__medico=user.id)
        else:
            return Diagnostico.objects.all()


from django.http import Http404, JsonResponse

@api_view(['GET'])
# @permission_classes([IsAuthenticated, DiagnosisPermission])
def all_patient_detail(request, hc):
    # Obtener el paciente por su hc (historia clínica)
    paciente = get_object_or_404(Paciente, hc=hc)
    
    # Inicializar los datos de respuesta con la información del paciente
    paciente_data = {
        'hc': paciente.hc,
        'cid': paciente.cid,
        'nombre': paciente.nombre,
        'edad': paciente.edad,
        'sexo': paciente.sexo,
        'raza': paciente.raza,
        'es_fallecido': paciente.es_fallecido,
    }

    # Si el paciente es fallecido, agregar los detalles de la tabla fallecido
    if paciente.es_fallecido:
        fallecido = Fallecido.objects.filter(hc=paciente).first()  # Obtener detalles si existe
        if fallecido:
            paciente_data['fallecido'] = {
                'provincia': fallecido.provincia,
                'municipio': fallecido.municipio,
                'direccion': fallecido.direccion,
                'app': fallecido.app,
                'apf': fallecido.apf,
                'hea': fallecido.hea,
                'apgar': fallecido.apgar,
                'edad_gest': fallecido.edad_gest,
                'fecha_muerte': fallecido.fecha_muerte,
            }
    
    return JsonResponse(paciente_data)

@api_view(['GET'])
def get_patient_statistics(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM get_patient_stats()")
        result = cursor.fetchone()
        data = {
            "total_patients": result[0],
            "total_men": result[1],
            "total_women": result[2],
            "total_deceased": result[3],
            "total_under_16": result[4],
            "total_under_1": result[5],
        }
    return JsonResponse(data)