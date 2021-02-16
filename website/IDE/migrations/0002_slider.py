# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2021-02-16 15:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('IDE', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Slider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minimum', models.IntegerField()),
                ('maximum', models.IntegerField()),
                ('default', models.IntegerField()),
                ('block', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IDE.Block')),
            ],
        ),
    ]