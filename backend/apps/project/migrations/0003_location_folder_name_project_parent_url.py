# Generated by Django 5.1.7 on 2025-03-28 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_alter_project_guests'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='folder_name',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='parent_url',
            field=models.CharField(default=1),
            preserve_default=False,
        ),
    ]
