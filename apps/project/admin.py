from django.contrib.gis import admin
from apps.project.models import Location, Project


admin.site.register(Location, admin.GISModelAdmin)
admin.site.register(Project)
