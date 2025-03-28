# Generated by Django 5.1.7 on 2025-03-23 04:23

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pulse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Specie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scientific_name', models.CharField(max_length=255)),
                ('common_name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Variable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Sample',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='samples', to='project.location')),
            ],
        ),
        migrations.CreateModel(
            name='AudioFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_type', models.CharField(max_length=255)),
                ('scrubbed', models.BooleanField(default=False)),
                ('file_path', models.CharField(max_length=1024)),
                ('sample', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='audio_files', to='monitoring.sample')),
            ],
        ),
        migrations.CreateModel(
            name='Detection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DurationField()),
                ('end_time', models.DurationField()),
                ('audio_file', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detections', to='monitoring.audiofile')),
                ('pulse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detections', to='monitoring.pulse')),
                ('specie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detections', to='monitoring.specie')),
            ],
        ),
        migrations.CreateModel(
            name='SampleVariable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('variable_value', models.CharField(max_length=255)),
                ('sample', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sample_variables', to='monitoring.sample')),
                ('variable', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sample_variables', to='monitoring.variable')),
            ],
        ),
        migrations.AddField(
            model_name='sample',
            name='variables',
            field=models.ManyToManyField(related_name='samples', through='monitoring.SampleVariable', to='monitoring.variable'),
        ),
    ]
