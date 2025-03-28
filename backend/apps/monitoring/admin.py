from django.contrib import admin
from apps.monitoring.models import AudioFile, Detection, Pulse, Sample, SampleVariable, Specie, Variable


admin.site.register(AudioFile)
admin.site.register(Detection)
admin.site.register(Pulse)
admin.site.register(Sample)
admin.site.register(SampleVariable)
admin.site.register(Specie)
admin.site.register(Variable)