from django.db import models
import random
import string

# Create your models here.


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    is_host = models.BooleanField(null=False, default=False, blank=False)
    guest_can_pause = models.BooleanField(null=False, default=False, blank=False)
    votes_to_skip = models.IntegerField(null=False, default=1, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    