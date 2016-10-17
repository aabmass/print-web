from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class PrintJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PrintJob
        fields = ('created', 'last_printed')
