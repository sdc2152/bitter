from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils.text import slugify
from rest_framework import serializers, exceptions
from random import random

from .models import Profile, Post


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", )
        extra_kwargs = {
            "password": {
                "style": {"input_type": "password"},
                "write_only": True
            }
        }

    def ensure_unique_slug(self, slug):
        slug = slugify(slug)
        while Profile.objects.filter(slug=slug).exists():
            slug = slugify("{}-{}".format(slug, random()))
        return slug

    def create(self, validated_data):
        """
        create user so password is saved correctly and profile is generated
        """
        user = User.objects.create(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()

        slug = self.ensure_unique_slug(user.username)
        Profile.objects.create(user=user, slug=slug)

        return user


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
        fields = ("description", "slug", "follows", "followers", )
        extra_kwargs = {"slug": {"validators": []}, }


class UserDetailSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            "id", "username", "email", "first_name", "last_name",
            "is_authenticated", "profile",
        )
        read_only_fields = ("id", "is_authenticated", )

    def validate_profile(self, data):
        """
        ensure that slug is unique but allow user to repost slug
        """
        new_slug = data.get("slug")
        initial_slug = self.instance.profile.slug
        if new_slug and new_slug != initial_slug:
            if Profile.objects.filter(slug=new_slug).exists():
                raise exceptions.ValidationError("@ address must be unique.")
        return data


    # TODO: require that user be logged in to update
    def update(self, instance, validated_data):
        """
        handle updates for nested relationship Profile
        """
        # user update
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get(
            "first_name", instance.first_name
        )
        instance.last_name = validated_data.get(
            "last_name", instance.last_name
        )
        instance.save()

        # profile update
        pro_data = validated_data.get("profile")
        profile = instance.profile
        profile.follows.set(pro_data.get("follows", profile.follows.all()))
        profile.slug = slugify(pro_data.get("slug", profile.slug))
        profile.description = pro_data.get(
            "description", profile.description
        )
        profile.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    # TODO: require login
    # TODO: require ownership for update destroy
    class Meta:
        model = Post
        fields = ("id", "body", "created", "user", )
        read_only_fields = ("id", "user", "created")


class PostCreateSerializer(PostSerializer):

    def create(self, validated_data):
        user = self.context["request"].user
        if not user.is_authenticated:
            raise exceptions.ValidationError("must be logged in to post")
        post = Post.objects.create(user=user, **validated_data)
        return post


class PostDetailSerializer(PostSerializer):
    user = UserDetailSerializer()
