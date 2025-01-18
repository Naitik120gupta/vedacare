from django.db import models

class NailData(models.Model):
    username = models.CharField(max_length=100)
    nail_color = models.CharField(max_length=50)
    nail_shape = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
