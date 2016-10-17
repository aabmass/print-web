from rest_framework import viewsets
from . import serializers, models


class PrintJobViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PrintJobSerializer

    def get_queryset(self):
        return self.request.user.printjobs.all()
