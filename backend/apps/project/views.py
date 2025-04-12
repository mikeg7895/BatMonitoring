from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from apps.project.serializers import StudioSerializer, LocationSerializer
from apps.project.models import Studio, Location
from core.permissions import IsAdminOrCreator   


class StudioViewSet(viewsets.ModelViewSet):
    serializer_class = StudioSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Studio.objects.filter(Q(created_by=user) | Q(guests=user)).distinct()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action == ["update", "partial_update", "destroy"]:
            permission_class = [IsAdminOrCreator]
        else:
            permission_class = []
        return [permission() for permission in permission_class]


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(
            {"detail": "This method is not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
    
    def get_permissions(self):
        if self.action == ["update", "partial_update", "destroy"]:
            permission_class = [IsAdminOrCreator]
        else:
            permission_class = []
        return [permission() for permission in permission_class]

    @action(detail=False, methods=['get'], url_path="groups/(?P<studio_id>[^/.]+)")
    def groups(self, request, studio_id=None):
        qs = self.get_queryset().filter(studio_id=studio_id)
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
