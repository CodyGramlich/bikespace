# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-08-15 23:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bicycleparking', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='surveyanswer',
            name='comment',
        ),
        migrations.AddField(
            model_name='surveyanswer',
            name='comments',
            field=models.TextField(default=None),
        ),
        migrations.AddField(
            model_name='surveyanswer',
            name='photo_desc',
            field=models.TextField(default=None),
        ),
        migrations.AddField(
            model_name='surveyanswer',
            name='photo_uri',
            field=models.TextField(default=None),
        ),
    ]
