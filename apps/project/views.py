from rest_framework import viewsets
from django.db.models import Q
from apps.project.serializers import ProjectSerializer
from apps.project.models import Project


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(Q(created_by=user) | Q(guests=user)).distinct()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
