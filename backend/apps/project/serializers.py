from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from apps.project.models import Project, Location


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project 
        fields = ['id', 'name', 'description', "parent_url", 'created_by', 'guests']
        read_only_fields = ['created_by']


class LocationSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Location
        geo_field = 'point'
        fields = ['id', 'project', 'name', 'folder_name']