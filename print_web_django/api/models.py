from django.contrib.auth.models import User
from django.db import models


class PrintJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    last_printed = models.DateField()

    # file will go here
