# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-17 17:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='printjob',
            name='last_printed',
            field=models.DateTimeField(),
        ),
    ]
