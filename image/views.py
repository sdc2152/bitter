from rest_framework import generics, status
from rest_framework.response import Response

from .serializers import ImageSerializer
from .models import Image


class ImageCreateView(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        data = {key: value for key, value in request.data.items()}
        data["profile"] = request.user.profile.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        image = serializer.save()
        result = self.get_serializer(image)
        return Response(result.data, status=status.HTTP_201_CREATED)
