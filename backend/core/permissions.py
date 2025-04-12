from rest_framework import permissions
from apps.project.models import Studio, Location

class IsAdminOrCreator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Studio):
            return request.user.is_staff or obj.created_by == request.user
        elif isinstance(obj, Location):
            return request.user.is_staff or obj.studio.created_by == request.user
