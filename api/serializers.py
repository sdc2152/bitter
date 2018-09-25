from rest_framework import serializers, exceptions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        write_only=True, style={"input_type": "password"}
    )

    def validate(self, attr):
        username = attr.get("username")
        password = attr.get("password")
        user = None
        if username and password:
            user = authenticate(username=username, password=password)
        else:
            raise exceptions.ValidationError("username or password missing")
        if user:
            if not user.is_active:
                raise exceptions.ValidationError("user acount disabled")
        else:
            raise exceptions.ValidationError("unable to log in")
        attr["user"] = user
        return attr


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id", "username", "email", "first_name", "last_name", "password",
        )
        read_only_fields = ("id", "is_active", "is_staff", )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        create user so proper password is generated.
        """
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", "")
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
