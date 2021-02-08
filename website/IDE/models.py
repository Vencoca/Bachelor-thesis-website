# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Sequence(models.Model):
    name = models.CharField(max_length = 50)

class Block(models.Model):
    name = models.CharField(max_length = 50)
    code = models.CharField(max_length = 1000)

    def __str__(self):
        return self.name

