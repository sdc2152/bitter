from django.urls import path

from . import views

urlpatterns = [
    path("users/", views.UserSignUpView.as_view()),
    path("users/@<slug:user_slug>/", views.UserDetailView.as_view()),
    # TODO: change this so no access by id
    path("users/<int:pk>/", views.UserDetailView.as_view()),
    path("posts/", views.PostListView.as_view()),
    path("posts/<int:pk>/", views.PostDetailView.as_view()),
    path("login_status/", views.LoginStatusView.as_view()),
    path("login/", views.LoginView.as_view()),
    path("logout/", views.LogoutView.as_view()),
]
