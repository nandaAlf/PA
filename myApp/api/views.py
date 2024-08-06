from abc import abstractmethod
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
#Filtros para las vistas
class BaseStudyFilter(rest_framework.FilterSet):
    
    finalizado = rest_framework.BooleanFilter(method='filter_by_finalizado')
    search_code = rest_framework.CharFilter(field_name='code', lookup_expr='icontains') 
    class Meta:
        fields = ['search_code']
        
    @classmethod
    @abstractmethod
    def filter_by_finalizado(self, queryset, name, value):
        pass
class StudyFilter(BaseStudyFilter):
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
    
    def filter_by_finalizado(self, queryset, name, value):
        
        subquery = Diagnostico.objects.filter(
            id_proceso__cod_necro=OuterRef('code'), 
            finalizado=value
        ).values('id_proceso__cod_necro')

        return queryset.filter(code__in=Subquery(subquery))
    
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
    class Meta:
        model = Paciente
        fields = ['search_name', 'search_id', 'search_hc', 'es_fallecido']
        
#Vista
class PatientViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PatientSerializer
    
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = PacienteFilter
    
    permission_classes=[IsAuthenticated,DiagnosisPermission]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='DoctorsGroup').exists():
            # Filtrar pacientes que están asociados a diagnósticos donde el doctor es responsable del estudio
            return Paciente.objects.filter(
                hc__in=Diagnostico.objects.filter(
                    id_proceso__cod_est__medico=user.username
                ).values_list('id_proceso__cod_est__hc_paciente', flat=True)
            ).distinct()
        else: return Paciente.objects.all()
    
class DefunctViewSet(viewsets.ModelViewSet):
    queryset = Fallecido.objects.all()
    serializer_class = DefunctSerializer
    
    permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
class StudyViewSet(viewsets.ModelViewSet):
    queryset = Estudio.objects.all()
    serializer_class = StudySerializer
    lookup_field = 'code'
    
    permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
    filter_backends = [rest_framework.DjangoFilterBackend,filters.OrderingFilter]
    filterset_class = StudyFilter  
class NecropsyViewSet(viewsets.ModelViewSet):
    queryset = Necropsia.objects.all()
    serializer_class = NecropsySerializer
    lookup_field = 'code'
    
    permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
    filter_backends = [rest_framework.DjangoFilterBackend,filters.OrderingFilter]
    filterset_class = NecropsyFilter
class ProcessViewSet(viewsets.ModelViewSet):
    queryset = Proceso.objects.all()
    serializer_class = ProcessSerializer
    
    permission_classes=[IsAuthenticated,IsStaffGroupPermission]
    
    # Sobrecarga el método get_object para determinar el identificador en funcion de si es un estudio o una necropsia
    def get_object(self):
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
              
class DiagnosisViewSet(viewsets.ModelViewSet):
    queryset = Diagnostico.objects.all()
    serializer_class = DiagnosisSerializer
    lookup_field = 'id_proceso'
  
    filter_backends = [filters.OrderingFilter]
    
    permission_classes = [IsAuthenticated, DiagnosisPermission]
    print("hola ,",IsStaffGroupPermission or IsDoctorGroupPermission)
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='DoctorsGroup').exists():
            return Diagnostico.objects.filter(id_proceso__cod_est__medico=user.username)
        else:
            return Diagnostico.objects.all()

    
