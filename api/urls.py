from django.urls import path, include

from . import views

urlpatterns = [
    path("users/", views.UserListView.as_view()),
    path("users/@<slug:user_slug>/", views.UserDetailView.as_view()),
    path("users/<int:pk>/", views.UserDetailView.as_view()),

    path("posts/", views.PostListCreateView.as_view()),
    path("posts/<int:pk>/", views.PostDetailView.as_view()),

    path("follows/", views.create_destroy_follow),

    path("login_status/", views.LoginStatusView.as_view()),
    path("sign_up/", views.SignUpView.as_view()),
    path("login/", views.LoginView.as_view()),
    path("logout/", views.LogoutView.as_view()),

    path("image/", include("image.urls")),
]
