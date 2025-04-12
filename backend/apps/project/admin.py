from django.contrib.gis import admin
from apps.project.models import Location, Studio


admin.site.register(Location, admin.GISModelAdmin)
admin.site.register(Studio)