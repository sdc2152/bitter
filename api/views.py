from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import generics, status, exceptions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view


from api.models import Post, Profile
from api.permissions import IsOwnerOrReadOnly
from api.serializers import (
    UserDetailSerializer,
    SignUpSerializer,
    LoginSerializer,
    PostCreateSerializer,
    PostDetailSerializer
)


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


class SignUpView(generics.CreateAPIView):
    serializer_class = SignUpSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        response_serializer = UserDetailSerializer(
            instance=user, context={"request": request}
        )
        return Response(
            response_serializer.data, status=status.HTTP_201_CREATED
        )


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    def get_object(self):
        queryset = self.get_queryset()
        user_slug = self.kwargs.get("user_slug", None)
        if user_slug is not None:
            user = get_object_or_404(queryset, profile__slug=user_slug)
        user_id = self.kwargs.get("pk", None)
        if user_id is not None:
            user = get_object_or_404(queryset, id=user_id)
        return user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance != request.user:
            raise exceptions.ValidationError(
                "Must be logged into account to update."
            )
        serializer = self.serializer_class(
            instance, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST", "DELETE", ])
def create_destroy_follow(request):
    user = request.user
    profile = user.profile
    other_profile = get_object_or_404(Profile, user__id=request.data["id"])

    if request.method == "POST":
        profile.follows.add(other_profile)
        return_status = status.HTTP_201_CREATED
    elif request.method == "DELETE":
        profile.follows.remove(other_profile)
        return_status = status.HTTP_200_OK

    profile.save()
    user.profile = profile
    response_serializer = UserDetailSerializer(
        instance=user, context={"request": request}
    )
    return Response(data=response_serializer.data, status=return_status)


class PostListCreateView(generics.ListCreateAPIView):
    # TODO: require login
    serializer_class = PostDetailSerializer

    def get_serializer_class(self):
        method = self.request.method
        if method == "POST":
            return PostCreateSerializer
        return PostDetailSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        params = self.request.query_params

        replies_to = params.get("REPLIES_TO", None)
        if replies_to:
            queryset = queryset.filter(parent=replies_to)

        user_slug = params.get("USER_SLUG", None)
        if user_slug:
            queryset = queryset.filter(user__profile__slug=user_slug)

        user_id = params.get("USER_ID", None)
        if user_id:
            queryset = queryset.filter(user__id=user_id)

        tag_name = params.get("TAG_NAME", None)
        if tag_name:
            queryset = queryset.filter(tags__name=tag_name)

        queryset = queryset.order_by("-created")
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        result = PostDetailSerializer(post)
        return Response(result.data, status=status.HTTP_201_CREATED)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    # TODO: require login/ownership for update and destroy
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = (IsOwnerOrReadOnly, )
