from rest_framework import serializers, exceptions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Profile, Post


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
            raise exceptions.ValidationError(
                "username or password are incorrect"
            )
        attr["user"] = user
        return attr


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("description", "slug", "follows", )
        extra_kwargs = {"slug": {"required": False}, }


class UserDetailSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            "id", "username", "email", "first_name", "last_name",
            "is_authenticated", "password", "profile",
        )
        read_only_fields = ("id", "is_authenticated", "profile", )
        extra_kwargs = {"password": {"write_only": True}, }

    def create(self, validated_data):
        """
        create user so proper password is generated.
        """
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class PostDetailSerializer(serializers.ModelSerializer):
    # TODO: require login
    # TODO: require ownership for update destroy
    class Meta:
        model = Post
        fields = ("id", "body", "user", )
        read_only_fields = ("id", "user", )

    def create(self, validated_data):
        user = self.context["request"].user
        if not user.is_authenticated:
            raise exceptions.ValidationError("must be logged in to post")
        post = Post.objects.create(user=user, **validated_data)
        return post
