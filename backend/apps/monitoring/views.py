from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from apps.monitoring.serializers import SampleSerializer, AudioFileSerializer, VariableSerializer, UnitMeasureSerializer
from apps.monitoring.models import Sample, AudioFile, Variable, UnitMeasure


class SampleViewSet(viewsets.ModelViewSet):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

    def list(self, request, *args, **kwargs):
        return Response(
            {"detail": "This method is not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


class AudioFileViewSet(viewsets.ModelViewSet):
    queryset = AudioFile.objects.all()
    serializer_class = AudioFileSerializer
    parser_classes = (MultiPartParser, FormParser)

    def list(self, request, *args, **kwargs):
        return Response(
            {"detail": "This method is not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
    

class VariableViewSet(viewsets.ModelViewSet):
    queryset = Variable.objects.all()
    serializer_class = VariableSerializer


class UnitMeasureViewSet(viewsets.ModelViewSet):
    queryset = UnitMeasure.objects.all()
    serializer_class = UnitMeasureSerializer