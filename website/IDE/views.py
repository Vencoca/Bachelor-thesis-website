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
    if request.is_ajax(): #Pokud je pozadavek ajax, vrati posuvniky z databaze
        if request.method == 'GET':
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
        elif request.method == 'POST':
            data = request.POST.get('DTA')
            prepare_data(data)
            return HttpResponse('')
    lib = serializers.serialize('json',Lib.objects.all())
    all_block = serializers.serialize('json',Block.objects.all())
    data = {
        'all_block' : all_block,
        'lib' : lib
    }

    return render(request, "home.html", data)


def prepare_data(data):
    split_strings = data.split(";")
    split_strings.pop()
    for i in split_strings: #projde všechny bloky
        splited_i = i.split(":")
        block = Block.objects.filter(name__contains=splited_i[0])[0]
        code_array = splited_i[1].split(",")
        code_array.pop()
        j = 1
        code = block.code
        for cd in code_array:
            code = code.replace("$r" + str(j),cd.split("_")[1])
            j = j + 1
        try:
            exec(code)
        except:
            print("Cant execute code")
    