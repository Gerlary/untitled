from django.shortcuts import render

# Create your views here.
from django.template import loader
from django.http import HttpResponse
from django import forms


def index(request):

    template = loader.get_template('asteroids.html')
    return HttpResponse(template.render())

def tetris(request):

    template = loader.get_template('tetris.html')
    return HttpResponse(template.render())

def mario(request):

    template = loader.get_template('mario.html')
    return HttpResponse(template.render())



def back_to_main(request):
    template = loader.get_template('main.html')
    return HttpResponse(template.render())