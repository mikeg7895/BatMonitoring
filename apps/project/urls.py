from django.urls import path, include
from rest_framework import routers
from apps.project.views import ProjectViewSet

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename="projects")

urlpatterns = [
    path('', include(router.urls)),
]   