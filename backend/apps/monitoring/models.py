from apps.project.models import Location
from django.db import models
from django.utils import timezone


class Sample(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='samples')
    timestamp = models.DateTimeField(default=timezone.now)
    variables = models.ManyToManyField('Variable', through='SampleVariable', related_name='samples')

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


class SampleVariable(models.Model):
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE, related_name='sample_variables')
    variable = models.ForeignKey(Variable, on_delete=models.CASCADE, related_name='sample_variables')
    unit_measure = models.ForeignKey(UnitMeasure, on_delete=models.CASCADE, related_name='sample_variables')
    variable_value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.sample.location.name} - {self.variable.name}"

    
class AudioFile(models.Model):
    file_type = models.CharField(max_length=255)
    scrubbed = models.BooleanField(default=False)
    file_path = models.CharField(max_length=1024)
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE, related_name='audio_files')

    def __str__(self):
        return f"{self.sample.location.name} - {self.audio_file.name}"
    

class Parameter(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class Characteristic(models.Model):
    label = models.CharField(max_length=255)
    description = models.TextField()
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE, related_name='characteristics')

    def __str__(self):
        return self.label
    

class Detection(models.Model):
    audio_file = models.ForeignKey(AudioFile, on_delete=models.CASCADE, related_name='detections')
    second_start = models.DurationField(null=True, blank=True)
    second_end = models.DurationField(null=True, blank=True)

    parameters = models.ManyToManyField(Parameter, related_name='detections')

    def __str__(self):
        return f"{self.specie.common_name} - {self.start_time}"