from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from .serializers import (
    UserDetailSerializer,
    UserSignUpSerializer,
    LoginSerializer
)

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView


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
    serializer_class = UserSignUpSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
