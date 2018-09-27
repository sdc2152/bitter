# from django.db import models
# from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver


# TODO: check out about slugs
# class Profile(models.Model):
#     slug = models.SlugField("username")
#     user = models.OneToOneField(User, on_delete=models.CASCADE)


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)


# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()


# TODO: maybe add a user reference ??? if someone has an @ sign
# TODO: how to calculate a large number of followers ? cache ??
# class Post(models.Model):
#     body = models.CharField() # TODO: what about images and links
#     author = models.ForeignKey("User")
#     tags = models.ManyToManyKey("Tag")
#     following = models.ManyToManyKey("User")
#     created = models.DateField()
#     modified = models.DateField()


# class Comment(models.Model):
#     body = models.CharField()
#     author = models.ForeignKey("User")
#     post = models.ForeingKey("Post")
#     comment = models.ForeingKey("Comment")
#     created = models.DateField()
#     modified = models.DateField()


# class Tag(models.Model):
#     name = models.CharField()
#     created = models.DateField()
#     modified = models.DataField()
