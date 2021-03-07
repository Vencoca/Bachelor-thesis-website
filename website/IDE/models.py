# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class Sequence(models.Model):
    name = models.CharField(max_length = 50)

class Block(models.Model):
    name = models.CharField(max_length = 50)
    code = models.CharField(max_length = 1000)

    def __str__(self):
        return self.name

class Slider(models.Model):
    name =  models.CharField(max_length = 50, default='def_name') #Jméno posuvníku
    minimum = models.IntegerField() 
    maximum = models.IntegerField()
    default = models.IntegerField() #Výchozí hodnota posuvníku
    block = models.ForeignKey(Block, on_delete=models.CASCADE) #Odkaz ke kterému bloku je přiřazen posuvník

    def __str__(self):
        return self.block.name