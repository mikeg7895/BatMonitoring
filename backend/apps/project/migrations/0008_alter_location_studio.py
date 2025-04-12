# Generated by Django 5.1.7 on 2025-04-04 03:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0007_studio_alter_location_unique_together_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='studio',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='project.studio'),
        ),
    ]
