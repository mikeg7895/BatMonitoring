from apps.project.models import Location
from django.db import models
from django.utils import timezone


class Sample(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='samples')
    timestamp = models.DateTimeField(default=timezone.now)
    variables = models.ManyToManyField('Variable', through='SampleVariable', related_name='samples')
    audio_file = models.ForeignKey('AudioFile', on_delete=models.CASCADE, related_name='samples')

    def __str__(self):
        return f"{self.location.name} - {self.timestamp}"


class Variable(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class SampleVariable(models.Model):
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE, related_name='sample_variables')
    variable = models.ForeignKey(Variable, on_delete=models.CASCADE, related_name='sample_variables')
    variable_value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.sample.location.name} - {self.variable.name}"

    
class AudioFile(models.Model):
    file_type = models.CharField(max_length=255)
    scrubbed = models.BooleanField(default=False)
    file_path = models.CharField(max_length=1024)

    def __str__(self):
        return f"{self.sample.location.name} - {self.audio_file.name}"


class Specie(models.Model):
    scientific_name = models.CharField(max_length=255)
    common_name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.common_name


class Pulse(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class Detection(models.Model):
    audio_file = models.ForeignKey(AudioFile, on_delete=models.CASCADE, related_name='detections')
    specie = models.ForeignKey(Specie, on_delete=models.CASCADE, related_name='detections')
    pulse = models.ForeignKey(Pulse, on_delete=models.CASCADE, related_name='detections')
    start_time = models.DurationField()
    end_time = models.DurationField()

    def __str__(self):
        return f"{self.specie.common_name} - {self.start_time}"