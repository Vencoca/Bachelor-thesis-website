# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2021-03-28 11:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('IDE', '0005_auto_20210313_1210'),
    ]

    operations = [
        migrations.CreateModel(
            name='Robot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('ip', models.CharField(max_length=50)),
                ('port', models.CharField(max_length=50)),
            ],
        ),
    ]