from rest_framework import viewsets
from . import serializers, models


class PrintJobViewSet(viewsets.ModelViewSet):
    # find the current user's print jobs
    queryset = models.PrintJob.objects.all()
    serializer_class = serializers.PrintJobSerializer
