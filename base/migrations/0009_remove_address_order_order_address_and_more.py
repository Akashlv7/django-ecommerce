# Generated by Django 4.1.2 on 2022-11-03 10:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_address_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='order',
        ),
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.address'),
        ),
        migrations.DeleteModel(
            name='ShippingAddress',
        ),
    ]
