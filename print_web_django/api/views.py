from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializers, models


class PrintJobViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PrintJobSerializer

    def get_queryset(self):
        return self.request.user.printjobs.all().order_by('-created')

    def perform_create(self, serializer):
        # need to also pass the requests user on a create
        serializer.save(user=self.request.user)


# Only allow querying of print runs. They can be created from a separate view
# corresponding to the PrintJob
class PrintRunViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.PrintRunSerializer

    def get_queryset(self):
        # return only print jobs on the current user
        return models.PrintRun.objects.filter(print_job__user=self.request.user)

# For the sake of semantics, have a 'performprint' api endpoint, don't make the
# client directly create a print run. This way we can dispatch, as well.
class PerformPrint(APIView):
    def post(self, request, format=None):
        serializer = serializers.PrintRunSerializer(data=request.data)
        if serializer.is_valid():
            # submit the actual print job here!
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
