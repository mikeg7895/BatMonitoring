from rest_framework import serializers
from apps.project.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project 
        fields = ['id', 'name', 'description', 'created_by', 'guests']
        read_only_fields = ['created_by']