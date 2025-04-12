from django.contrib import admin
from apps.monitoring.models import Sampling, SamplingVariable, Variable, UnitMeasure


admin.site.register(Sampling)
admin.site.register(SamplingVariable)
admin.site.register(Variable)
admin.site.register(UnitMeasure)