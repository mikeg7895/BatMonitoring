from apps.project.models import Location
from django.db import models
from django.utils import timezone


class Sampling(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='samples')
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.location.name} - {self.timestamp}"


class Variable(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name
    
    
class UnitMeasure(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class SamplingVariable(models.Model):
    sampling = models.ForeignKey(Sampling, on_delete=models.CASCADE, related_name='sample_variables')
    variable = models.ForeignKey(Variable, on_delete=models.CASCADE, related_name='sample_variables')
    unit_measure = models.ForeignKey(UnitMeasure, on_delete=models.CASCADE, related_name='sample_variables')
    variable_value = models.FloatField()

    def __str__(self):
        return f"{self.sample.location.name} - {self.variable.name}"
    
