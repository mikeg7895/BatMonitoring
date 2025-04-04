from django.contrib import admin
from apps.monitoring.models import AudioFile, Detection,  Sample, SampleVariable, Variable, UnitMeasure, Annotation, TypeAnnotation


admin.site.register(AudioFile)
admin.site.register(Detection)
admin.site.register(Sample)
admin.site.register(SampleVariable)
admin.site.register(Variable)
admin.site.register(Annotation)
admin.site.register(TypeAnnotation)
admin.site.register(UnitMeasure)