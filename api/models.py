from django.contrib.auth.models import User
from django.utils.text import slugify
from django.db import models


class DateTimeModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Profile(DateTimeModel):
    slug = models.SlugField(max_length=200, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, default="", blank=True)
    follows = models.ManyToManyField(
        "self",
        related_name="followers",
        symmetrical=False,
        blank=True
    )
    avatar = models.OneToOneField(
        "image.Image",
        on_delete=models.CASCADE,
        related_name="avatar_profile",
        blank=True,
        null=True
    )
    banner = models.OneToOneField(
        "image.Image",
        on_delete=models.CASCADE,
        related_name="banner_profile",
        blank=True,
        null=True
    )


class Tag(DateTimeModel):
    name = models.SlugField(max_length=200, unique=True)


# TODO: tags - save method --- or --- signal???
# TODO: how to calculate a large number of followers ? cache ??
# TODO: add custom queryset to return feeds and handle params now handled in
#       view
class Post(DateTimeModel):
    body = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name="posts", blank=True)
    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        related_name="replies",
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.create_tags()

    def create_tags(self):
        tag_set = set(self.parse_tags())
        for tag in tag_set:
            t, created = Tag.objects.get_or_create(name=tag)
            t.save()
            self.tags.add(t)

    def parse_tags(self):
        return [slugify(i) for i in self.body.split() if i.startswith("#")]
