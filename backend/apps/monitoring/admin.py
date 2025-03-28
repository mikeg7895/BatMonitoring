from django.contrib import admin
from apps.monitoring.models import AudioFile, Detection, Sample, SampleVariable, Variable, UnitMeasure, Parameter, Characteristic


admin.site.register(AudioFile)
admin.site.register(Detection)
admin.site.register(Sample)
admin.site.register(SampleVariable)
admin.site.register(Variable)
admin.site.register(UnitMeasure)
admin.site.register(Parameter)
admin.site.register(Characteristic)