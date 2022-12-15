from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.models import User


@receiver(pre_save, sender=User)
def updateUser(sender, **kwargs):
    instance = kwargs.get('instance')

    if instance.email:
        instance.username = instance.email