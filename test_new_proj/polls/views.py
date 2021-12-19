from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Question
#Create your views here.


def index(request):
    last_question_list = Question.objects.order_by('-pub_date')[:5]
    #output = ', '.join([q.question_text for q in last_question_list])
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': last_question_list,
    }
    return HttpResponse(template.render(context,request))
    #return HttpResponse("Hello,world! You`re at the polls index.")

def detail(request,question_id):
    return HttpResponse( 'You`re looking at question %s.' % question_id)

def result(request,question_id):
    responce = 'You`re looking at the result of question %s.'
    return HttpResponse(responce%question_id)

def vote(request,question_id):
    return HttpResponse('You`re voting on question %s'%question_id)

