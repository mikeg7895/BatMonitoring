from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from apps.project.serializers import ProjectSerializer, LocationSerializer
from apps.project.models import Studio, Location


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Studio.objects.filter(Q(created_by=user) | Q(guests=user)).distinct()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(
            {"detail": "This method is not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    @action(detail=False, methods=['get'], url_path="groups/(?P<project_id>[^/.]+)")
    def groups(self, request, project_id=None):
        qs = self.get_queryset().filter(project_id=project_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
