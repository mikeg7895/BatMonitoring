# Generated by Django 5.1.7 on 2025-03-24 02:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0002_remove_audiofile_sample_sample_audio_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sample',
            name='audio_file',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='samples', to='monitoring.audiofile'),
        ),
    ]
