# Generated by Django 5.0.6 on 2024-05-30 13:46

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(blank=True, default=api.models.generate_unique_code, max_length=8, unique=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='host',
            field=models.CharField(blank=True, max_length=50, unique=True),
        ),
    ]
