from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from models import Block, Sequence

@csrf_exempt
def index(request):
    all_block = Block.objects.all()
    if request.method == 'POST':
        text = request.POST.get('button_text')
        print(text)
    return render(request, "home.html", {'all_block' : all_block})
    # return HttpResponse("Hello, world you are on index page")
