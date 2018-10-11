from django.contrib.auth.models import User
from django.db import models


class DateTimeModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Profile(DateTimeModel):
    slug = models.SlugField(max_length=200, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    follows = models.ManyToManyField(
        "self",
        related_name="followers",
        symmetrical=False,
        blank=True
    )
    description = models.CharField(max_length=200, default="")


# class Tag(DateTimeModel):
    # name = models.CharField(max_length=200)


# # TODO: maybe add a user reference ??? if someone has an @ sign
# # TODO: how to calculate a large number of followers ? cache ??
class Post(DateTimeModel):
    body = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # tags = models.ManyToManyKey(Tag)


# class Comment(DateTimeModel):
    # body = models.CharField(max_length=200)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # post = models.ForeingKey(Post, on_delete=models.CASCADE)
    # comment = models.ForeingKey("self", on_delete=models.CASCADE)
