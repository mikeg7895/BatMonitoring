from django.urls import path, include
from rest_framework import routers
from apps.user.views import DecoratedTokenObtainPairView, DecoratedTokenRefreshView, DecoratedTokenVerifyView, UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('auth/token/', DecoratedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', DecoratedTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', DecoratedTokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
]