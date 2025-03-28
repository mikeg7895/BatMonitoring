from django.urls import path, include
from rest_framework import routers
from apps.project.views import ProjectViewSet, LocationViewSet

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename="projects")
router.register(r'locations', LocationViewSet, basename="locations")

urlpatterns = [
    path('', include(router.urls)),
]   