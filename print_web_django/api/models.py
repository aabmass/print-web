from django.contrib.auth.models import User
from django.db import models


class PrintJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
            related_name="printjobs")
    created = models.DateTimeField(auto_now_add=True,)
    last_printed = models.DateTimeField(blank=True, null=True)
    file_uploaded = models.FileField()

    def __str__(self):
        return "PrintJob by {} from {}".format(self.user, self.created)


class PrintRun(models.Model):
    print_job = models.ForeignKey(PrintJob, on_delete=models.CASCADE,
            related_name='printruns')
    submitted_on = models.DateTimeField(auto_now_add=True)
    has_completed = models.BooleanField(default=False)
