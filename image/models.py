from django.db import models


class Image(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField()

    def save(self, *args, **kwargs):
        """
        if the image already exists delete the saved image from media file
        """
        try:
            this = Image.objects.get(id=self.id)
            if this.image != self.image:
                this.image.delete(save=False)
        except Image.DoesNotExist:
            pass
        return super().save(*args, **kwargs)
