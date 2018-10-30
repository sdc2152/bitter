from django.urls import path

from . import views

urlpatterns = [
    path("", views.ImageCreateView.as_view()),
]
