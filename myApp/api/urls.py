from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myApp.api import views
from myApp.api.views import *

router=DefaultRouter()
router.register(r'pacientes', PatientViewSet)
router.register(r'fallecidos', DefunctViewSet)
router.register(r'estudios', StudyViewSet)
router.register(r'necropsias', NecropsyViewSet)
router.register(r'procesos', ProcessViewSet)
router.register(r'diagnosticos', DiagnosisViewSet)
router.register(r'doctores', DoctorViewSet)


urlpatterns = [
    
    path('', include(router.urls)),
    #  path('paciente/<str:hc>/', views.all_patient_detail, name='paciente-detail'),
    path('pacientes-estadisticas/', views.get_patient_statistics, name='paciente-stats'),
    path('estudios-estadisticas/', views.get_study_statistics, name='study-stats'),
    path('necropsias-estadisticas/', views.get_necro_statistics, name='necro-stats'),
    path('entidad-estadisticas/', views.get_entity_count, name='entity-stats'),
    path('departamento-estadisticas/', views.get_department_count, name='depto-stats'),
    path('inventario-estadisticas/', views.get_process_stats_by_month, name='process-stats'),
    
    #  path('paciente/estudios/<str:hc>/',PatientStudies.as_view(),name='patient-studies-detail'),
    #  path('estudios/<str:code>', StudyViewSet.as_view({'get_estudios': 'list'}),name='estudio-detail'),
    
    # path('patient/list/',PatientList .as_view(),name='patient-list'),
    # path('patient/<str:pk>',PatientDetail.as_view(),name='patient-detail'),
    
    # path('',include(router.urls)),
    
    # path('study/list/',StudyListAV.as_view(),name='study-list'),
    # path('study/<str:code>',StudyDetaillAV.as_view(),name='study-code'),

]
  
  