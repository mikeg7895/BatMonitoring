from rest_framework import serializers
from apps.monitoring.models import Sample, AudioFile, SampleVariable, Variable, UnitMeasure


class SampleVariableInSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleVariable
        fields = ["variable", "unit_measure", "variable_value"]


class SampleSerializer(serializers.ModelSerializer):
    sample_variables = SampleVariableInSampleSerializer(many=True, write_only=True, required=False)
    
    class Meta:
        model = Sample
        fields = ["id", "location", "timestamp", "sample_variables"]

    
class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = ["id", "file_type", "scrubbed", "file_path", "sample"]


class VariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variable
        fields = ["id", "name", "description"]


class UnitMeasureSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitMeasure
        fields = ["id", "name", "description"]
