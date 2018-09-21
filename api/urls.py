from django.urls import path

from django.conf.urls import include

from . import views

urlpatterns = [
    path("users/", views.UserListView.as_view()),
    path("users/<int:pk>/", views.UserDetailView.as_view()),
    path("", include("rest_framework.urls")),
]
