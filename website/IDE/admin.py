# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Lib,Block,Slider,ChField,NuField,Robot

admin.site.register(Lib)
admin.site.register(Block)
admin.site.register(Slider)
admin.site.register(ChField)
admin.site.register(NuField)
admin.site.register(Robot)
