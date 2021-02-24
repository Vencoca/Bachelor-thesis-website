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
    all_block = Block.objects.all()
    if request.method == 'POST':
        text = request.POST.get('button_text')
        print(text)
    elif request.is_ajax():
        id = request.GET.get('id')
        t = time() #Slider.objects.get(name = id)
        qs = serializers.serialize('json',Slider.objects.filter(block__name__contains=id))
        print(Slider.objects.filter(block__name__contains=id))
        print(qs)
        print(id)
        
        return JsonResponse({'qs' : qs},status=200)

    return render(request, "home.html", {'all_block' : all_block})
    # return HttpResponse("Hello, world you are on index page")
