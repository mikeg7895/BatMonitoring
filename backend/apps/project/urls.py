from django.urls import path, include
from rest_framework import routers
from apps.project.views import StudioViewSet, LocationViewSet

router = routers.DefaultRouter()
router.register(r'studios', StudioViewSet, basename="studios")
router.register(r'locations', LocationViewSet, basename="locations")

urlpatterns = [
    path('', include(router.urls)),
]   