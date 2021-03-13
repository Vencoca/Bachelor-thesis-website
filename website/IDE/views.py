# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from models import Lib,Block, Sequence, Slider,ChField,NuField

from time import time
from django.http import JsonResponse
from json import dumps 
from django.core import serializers

@csrf_exempt
def index(request):
    if request.method == 'POST': #Zpracovani kliknuti na RUN tlacitko
        text = request.POST.get('button_text')
        print(text)
    elif request.is_ajax(): #Pokud je pozadavek ajax, vrati posuvniky z databaze
        id = request.GET.get('id')
        slider = serializers.serialize('json',Slider.objects.filter(block__name__contains=id)) 
        nu_field =  serializers.serialize('json',NuField.objects.filter(block__name__contains=id)) 
        cha_field = serializers.serialize('json',ChField.objects.filter(block__name__contains=id))      
        data = {
            'slider' : slider,
            'nu_field':nu_field,
            'cha_field':cha_field
        }
        return JsonResponse(data,status=200)
    lib = serializers.serialize('json',Lib.objects.all())
    all_block = serializers.serialize('json',Block.objects.all())
    data = {
        'all_block' : all_block,
        'lib' : lib
    }

    return render(request, "home.html", data)
