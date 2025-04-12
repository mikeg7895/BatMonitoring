from django.contrib import admin
from apps.detection.models import AudioFolder, AudioFile, TypeAnnotation, Annotation, Feature, AnnotationAudio, FeatureAnnotationAudio


admin.site.register(AudioFolder)
admin.site.register(AudioFile)
admin.site.register(TypeAnnotation)
admin.site.register(Annotation)
admin.site.register(Feature)
admin.site.register(AnnotationAudio)
admin.site.register(FeatureAnnotationAudio)
