from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class PrintJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PrintJob
        fields = ('created', 'last_printed', 'file_uploaded')

class PrintRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PrintRun
        fields = '__all__'
