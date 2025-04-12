# Generated by Django 5.1.7 on 2025-04-04 03:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0008_alter_location_studio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='project.studio'),
        ),
    ]
