
from django.urls import path
# from rest_framework.authtoken.views import obtain_auth_token
from user_app.api.views import get_doctors_view, login_view, registration_view, logout_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('login/',obtain_auth_token, name='login'),
    path('login/',login_view, name='login'),
    path('register/',registration_view, name='register'),
    path('logout/',logout_view, name='logout'),
    path('doctor-group-members/', get_doctors_view, name='doctor-group-members'),
        
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'), 
]
