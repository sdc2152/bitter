from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify


class DateTimeModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Profile(DateTimeModel):
    slug = models.SlugField(max_length=200)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    follows = models.ManyToManyField(
        "self",
        related_name="followers",
        blank=True
    )
    description = models.CharField(max_length=200, default="")


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, slug=slugify(instance.username))


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


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
