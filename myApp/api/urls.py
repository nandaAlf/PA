from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myApp.api import views
from myApp.api.views import *

router=DefaultRouter()
router.register(r'study',StudyVS,basename='study')

urlpatterns = [
    
    path('patient/list/',PatientList .as_view(),name='patient-list'),
    path('patient/<str:pk>',PatientDetail.as_view(),name='patient-detail'),
    
    path('',include(router.urls)),
    
    # path('study/list/',StudyListAV.as_view(),name='study-list'),
    # path('study/<str:code>',StudyDetaillAV.as_view(),name='study-code'),

]
  
  