from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from myApp.models import Diagnostico
from rest_framework import permissions as p


# Crear grupo para doctores
# doctor_group, created = Group.objects.get_or_create(name='DoctorsGroup')

# Asignar permisos específicos al grupo
# content_type = ContentType.objects.get_for_model(Diagnostico)
# permissions = Permission.objects.filter(content_type=content_type)
# doctor_group.permissions.set(permissions)

#request.user --que el usuario exista
class DiagnosisPermission(p.BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.is_superuser: return True
            
            if request.method in p.SAFE_METHODS: return True
            else: return request.user.groups.filter(name='StaffGroup').exists()
            
        # return request.user and (request.user.groups.filter(name='DoctorsGroup').exists() or request.user.is_superuser)

    # def has_object_permission(self, request, view, obj):
    #     # Check if the doctor is associated with the diagnosis
    #     return obj.id_proceso.cod_est.medico == request.user.username

class IsStaffGroupPermission(p.BasePermission):
     def has_permission(self, request, view):
        if request.user:
            if request.user.is_superuser: return True
            else: return request.user.groups.filter(name='StaffGroup').exists()
                                                          
            
class IsDoctorGroupPermission(p.BasePermission):
     def has_permission(self, request, view):
        if request.user:
            if request.user.is_superuser: return True
            else: return request.user.groups.filter(name='DoctorsGroup').exists()
    
# class CanViewAssociatedPatient(p.BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.groups.filter(name='DoctorsGroup').exists()

    # def has_object_permission(self, request, view, obj):
    #   # Verificar si el paciente está asociado con un diagnóstico que el doctor puede ver
    #     return Diagnostico.objects.filter(
    #         id_proceso__cod_est__hc_paciente=obj.hc, 
    #         id_proceso__cod_est__medico=request.user.username
    #     ).exists()