from rest_framework import viewsets
from . import serializers, models


class PrintJobViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PrintJobSerializer

    def get_queryset(self):
        return self.request.user.printjobs.all().order_by('-created')

    def perform_create(self, serializer):
        # need to also pass the requests user on a create
        serializer.save(user=self.request.user)
