# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-02-24 00:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bicycleparking', '0012_edmonton_raw'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='picture',
            name='answer',
        ),
    ]
