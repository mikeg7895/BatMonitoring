from django.urls import path, include
from rest_framework import routers
from apps.monitoring.views import SampleViewSet, AudioFileViewSet, VariableViewSet, UnitMeasureViewSet

router = routers.DefaultRouter()
router.register(r'samples', SampleViewSet, basename="samples")
router.register(r'audiofiles', AudioFileViewSet, basename="audiofiles")
router.register(r'variables', VariableViewSet, basename="variables")
router.register(r'unitmeasures', UnitMeasureViewSet, basename="unitmeasures")

urlpatterns = [
    path('', include(router.urls)),
]