from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from models import Block, Sequence, Slider

from time import time
from django.http import JsonResponse
from django.core import serializers

@csrf_exempt
def index(request):
    if request.method == 'POST': #Zpracovani kliknuti na RUN tlacitko
        text = request.POST.get('button_text')
        print(text)
    elif request.is_ajax(): #Pokud je pozadavek ajax, vrati posuvniky z databaze
        id = request.GET.get('id')
        qs = serializers.serialize('json',Slider.objects.filter(block__name__contains=id))      
        return JsonResponse({'qs' : qs},status=200)
    all_block = Block.objects.all()
    return render(request, "home.html", {'all_block' : all_block})
