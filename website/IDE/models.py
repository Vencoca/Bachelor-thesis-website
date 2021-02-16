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

class Slider(models.Model):
    name =  models.CharField(max_length = 50, default='def_name')
    minimum = models.IntegerField()
    maximum = models.IntegerField()
    default = models.IntegerField()
    block = models.ForeignKey(Block, on_delete=models.CASCADE)

    def __str__(self):
        return self.block.name