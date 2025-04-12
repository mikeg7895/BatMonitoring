from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from apps.project.models import Studio, Location
from django.contrib.auth import get_user_model

User = get_user_model()


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class StudioSerializer(serializers.ModelSerializer):
    guests = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        write_only=True,
    )
    guests_info = UserListSerializer(source='guests', many=True, read_only=True)
    
    class Meta:
        model = Studio
        fields = ['id', 'name', 'description', "root_path", 'created_by', 'guests', 'guests_info']
        read_only_fields = ['created_by']


class LocationSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Location
        geo_field = 'point'
        fields = ['id', 'studio', 'name', 'folder_name']
