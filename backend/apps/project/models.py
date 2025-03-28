from django.contrib.gis.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    parent_url = models.CharField(unique=True, max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    guests = models.ManyToManyField(User, related_name='guest_projects', blank=True)

    def __str__(self):
        return self.name


class Location(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='locations')
    folder_name = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    point = models.PointField()

    def __str__(self):
        return self.name
