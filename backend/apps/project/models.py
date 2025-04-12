import os
import shutil
from django.contrib.gis.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Studio(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    root_path = models.CharField(max_length=255, unique=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='studios')
    guests = models.ManyToManyField(User, related_name='guest_studios', blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        nas_path = settings.NAS_BASE_PATH
        folder_path = os.path.join(nas_path, self.root_path)

        if self.pk:
            old_project = Studio.objects.get(pk=self.pk)
            old_folder = os.path.join(nas_path, old_project.root_path)

            if old_project.root_path != self.root_path:
                if os.path.exists(old_folder):
                    os.rename(old_folder, folder_path)
                else:
                    os.makedirs(folder_path)
        elif not os.path.exists(folder_path):
            os.makedirs(folder_path)

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        nas_path = settings.NAS_BASE_PATH
        folder_path = os.path.join(nas_path, self.root_path)

        if os.path.exists(folder_path):
            shutil.rmtree(folder_path, ignore_errors=True)

        super().delete(*args, **kwargs)


class Location(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='locations',)
    name = models.CharField(max_length=255)
    folder_name = models.CharField(max_length=255)
    point = models.PointField(null=True, blank=True)

    class Meta:
        unique_together = ('studio', 'folder_name')

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        nas_path = settings.NAS_BASE_PATH
        folder_path = os.path.join(nas_path, self.studio.root_path, self.folder_name)

        if self.pk:
            old_location = Location.objects.get(pk=self.pk)
            old_folder = os.path.join(nas_path, self.studio.root_path, old_location.folder_name)

            if old_location.folder_name != self.folder_name:
                if os.path.exists(old_folder):
                    os.rename(old_folder, folder_path)
                else:
                    os.makedirs(folder_path)
        elif not os.path.exists(folder_path):
            os.makedirs(folder_path)

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        nas_path = settings.NAS_BASE_PATH
        folder_path = os.path.join(nas_path, self.studio.root_path, self.folder_name)

        if os.path.exists(folder_path):
            shutil.rmtree(folder_path, ignore_errors=True)

        super().delete(*args, **kwargs)
