from django.contrib import admin
from django.urls import path

from django.http import HttpResponse

def post_vars(request):
  name = request.POST.get("name","")
  age = request.POST.get("age","")

  html = "<html><body>" + name + " " + age + "</body></html>"
  return HttpResponse(html)

urlpatterns = [ 
    path("e/zhangr75/lab7/" , post_vars) ,
]
