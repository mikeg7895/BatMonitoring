# Generated by Django 5.1.7 on 2025-04-11 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0009_alter_audiofile_folder_delete_folders'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='audiofile',
            name='file_path',
        ),
        migrations.AddField(
            model_name='audiofile',
            name='file_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
