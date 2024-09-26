
from django.urls import path
# from rest_framework.authtoken.views import obtain_auth_token
from user_app.api.views import ChangePasswordView, UserProfileView, get_doctors_view, get_lab_staff_view, login_view, registration_view, logout_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from django.contrib.auth.views import PasswordChangeView

urlpatterns = [
    # path('login/',obtain_auth_token, name='login'),
    path('login/',login_view, name='login'),
    path('register/',registration_view, name='register'),
    path('logout/',logout_view, name='logout'),
    path('password-change/',ChangePasswordView.as_view(), name='password-change'),
    path('doctor-group-members/', get_doctors_view, name='doctor-group-members'),
    path('lab-group-members/', get_lab_staff_view, name='lab-group-members'),
    path('user-profile/', UserProfileView.as_view(), name='user-profile'),

        
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'), 
]
