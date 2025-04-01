from django.contrib import admin
from apps.monitoring.models import AudioFile, Detection,  Sample, SampleVariable, Variable, Parameter, Characteristic, UnitMeasure


admin.site.register(AudioFile)
admin.site.register(Detection)
admin.site.register(Sample)
admin.site.register(SampleVariable)
admin.site.register(Variable)
admin.site.register(Parameter)
admin.site.register(Characteristic)
admin.site.register(UnitMeasure)