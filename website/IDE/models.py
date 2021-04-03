# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible
from django.db import models
from django import forms

class Robot(models.Model):
    name = models.CharField(max_length=50)
    ip = models.CharField(max_length = 50)
    port = models.CharField(max_length = 50)
    def __unicode__(self):
        return u'%s' % self.name

class Lib(models.Model):
    name = models.CharField(max_length = 50)
    def __unicode__(self):
        return u'%s' % self.name

class Sequence(models.Model):
    name = models.CharField(max_length = 50)

class Block(models.Model):
    name = models.CharField(max_length = 50)
    code = models.TextField('code')
    alternative = models.CharField(max_length = 300,default='')
    lib = models.ForeignKey(Lib, on_delete=models.CASCADE,default='') #Odkaz ke které knihovně je přiřazen blok
    def __unicode__(self):
        return u'%s : %s' % (self.lib.name, self.name)

class Slider(models.Model):
    name =  models.CharField(max_length = 50, default='') #Jméno posuvníku
    alternative = models.CharField(max_length = 300,default='')
    minimum = models.IntegerField() 
    maximum = models.IntegerField()
    default = models.IntegerField() #Výchozí hodnota posuvníku
    block = models.ForeignKey(Block, on_delete=models.CASCADE) #Odkaz ke kterému bloku je přiřazen posuvník
    def __unicode__(self):
        return u'%s : %s' % (self.block.name, self.name)

class NuField(models.Model): #Number Field
    name =  models.CharField(max_length = 50, default='') #Jméno pole
    alternative = models.CharField(max_length = 300,default='')
    minimum = models.IntegerField() 
    maximum = models.IntegerField()
    default = models.IntegerField() #Výchozí hodnota pole
    block = models.ForeignKey(Block, on_delete=models.CASCADE) #Odkaz ke kterému bloku je přiřazeno pole

    def __unicode__(self):
        return u'%s : %s' % (self.block.name, self.name)

class ChField(models.Model): #Character Field
    name =  models.CharField(max_length = 50, default='') #Jméno pole
    alternative = models.CharField(max_length = 300,default='')
    block = models.ForeignKey(Block, on_delete=models.CASCADE) #Odkaz ke kterému bloku je přiřazeno pole

    def __unicode__(self):
        return u'%s : %s' % (self.block.name, self.name)