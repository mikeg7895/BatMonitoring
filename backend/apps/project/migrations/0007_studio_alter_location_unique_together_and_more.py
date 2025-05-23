# Generated by Django 5.1.7 on 2025-04-04 03:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_alter_project_parent_url_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Studio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('description', models.TextField()),
                ('parent_url', models.CharField(max_length=255, unique=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='studios', to=settings.AUTH_USER_MODEL)),
                ('guests', models.ManyToManyField(blank=True, related_name='guest_studios', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='location',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='location',
            name='studio',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='project.studio'),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='location',
            unique_together={('studio', 'folder_name')},
        ),
        migrations.RemoveField(
            model_name='location',
            name='project',
        ),
        migrations.DeleteModel(
            name='Project',
        ),
    ]
