from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from .serializers import UserSerializer, LoginSerializer

from rest_framework import generics, status
from rest_framework.response import Response


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        response_serializer = UserSerializer(
            instance=user, context={"request": request}
        )
        return Response(response_serializer.data, status=status.HTTP_200_OK)


# TODO: write logout view and serializer


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
