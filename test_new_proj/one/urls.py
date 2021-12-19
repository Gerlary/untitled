from django.urls import path

from . import views

urlpatterns = [
   path(r'asteroids', views.index,name = 'asteroids'),
   path(r'tetris', views.tetris,name = 'tetris'),
   path(r'mario', views.mario,name = 'mario'),
   path('',views.back_to_main,name = 'main')
]