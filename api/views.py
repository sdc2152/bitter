from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from .serializers import (
    UserDetailSerializer,
    LoginSerializer,
    PostDetailSerializer
)
from .models import Post


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        response_serializer = UserDetailSerializer(
            instance=user, context={"request": request}
        )
        return Response(response_serializer.data, status=status.HTTP_200_OK)


class LoginStatusView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, *ags, **kwargs):
        user = request.user
        response = {}
        if (user.is_authenticated):
            response = UserDetailSerializer(
                instance=request.user, context={"request": request}
            ).data
        return Response(response, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kawargs):
        logout(request)
        return Response(
            {"detail": "logout successful"},
            status=status.HTTP_200_OK
        )


# TODO: change this to just create view after testing
class UserSignUpView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        response_serializer = UserDetailSerializer(
            instance=user, context={"request": request}
        )
        return Response(response_serializer.data, status=status.HTTP_200_OK)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    def get_object(self):
        queryset = self.get_queryset()
        user_slug = self.kwargs.get("user_slug")
        user = get_object_or_404(queryset, profile__slug=user_slug)
        return user


class PostListView(generics.ListCreateAPIView):
    # TODO: require login
    # TODO: Filters: tag
    serializer_class = PostDetailSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        params = self.request.query_params
        slug = params.get("slug", None)
        if slug is not None:
            queryset = queryset.filter(user__profile__slug=slug)
        queryset = queryset.order_by("-created")
        return queryset


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    # TODO: require login/ownership for update and destroy
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
