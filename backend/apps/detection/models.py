from django.db import models
from apps.monitoring.models import Location, Sampling


class AudioFolder(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subfolders')
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='folders')
    sampling = models.ForeignKey(Sampling, on_delete=models.CASCADE, related_name='folders', null=True)

    def __str__(self):
        return self.name

    
class AudioFile(models.Model):
    file_type = models.CharField(max_length=255)
    file_name = models.CharField(max_length=255, blank=True)
    folder = models.ForeignKey(AudioFolder, on_delete=models.CASCADE, related_name='audio_files', null=True)

    def __str__(self):
        return f"{self.sample.location.name} - {self.audio_file.name}"
    

class TypeAnnotation(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class Annotation(models.Model):
    label = models.CharField(max_length=255)
    description = models.TextField()
    type_annotation = models.ForeignKey(TypeAnnotation, on_delete=models.CASCADE, related_name='type_annotations')

    def __str__(self):
        return self.label
    

class Feature(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name
    

class AnnotationAudio(models.Model):
    audio_file = models.ForeignKey(AudioFile, on_delete=models.CASCADE, related_name='annotations_audio')
    annotation = models.ForeignKey(Annotation, on_delete=models.CASCADE, related_name='annotations_audio')
    is_global = models.BooleanField(default=False)
    second_start = models.DurationField(null=True, blank=True)
    second_end = models.DurationField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.audio_file.audio_file.name} - {self.annotation.label}"


class FeatureAnnotationAudio(models.Model):
    annotation_audio = models.ForeignKey(AnnotationAudio, on_delete=models.CASCADE, related_name='features')
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE, related_name='features')
    value = models.FloatField()

    def __str__(self):
        return f"{self.annotation_audio.audio_file.audio_file.name} - {self.feature.name}"
