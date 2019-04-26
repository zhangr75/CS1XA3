from django.contrib import admin
from django.urls import path

from django.http import HttpResponse

def hello_world(request):
    html = "<html><body>Hello World</body></html>"
    return HttpResponse(html)

urlpatterns = [
    path('e/zhangr75/' , hello_world) ,
]
