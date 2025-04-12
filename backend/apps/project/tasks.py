import os
from celery import shared_task
from celery_progress.backend import ProgressRecorder
from django.conf import settings
from apps.project.models import Studio, Location


@shared_task(bind=True)
def scan_audios(self, instance):
    studio = Studio.objects.get(pk=instance)
    formats = ('.wav', '.mp3', '.flac')
    directory = studio.parent_url
    nas_path = settings.NAS_BASE_PATH   
    folder_path = os.path.join(nas_path, directory)

    total_files = sum(
        len([f for f in files if f.lower().endswith(formats)])
        for _, _, files in os.walk(folder_path)
    )
    files_processed = 0
    progress_recorder = ProgressRecorder(self)

    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        if os.path.isdir(item_path):
            location = Location.objects.create(
                studio=studio,
                name=item,
                folder_name=item
            )
            folder_cache = {}
            for dirpath, dirnames, files in os.walk(item_path):
                rel_path = os.path.relpath(dirpath, item_path)
                folder_name = os.path.basename(dirpath)

                parent_path = os.path.dirname(rel_path)
                parent_folder = folder_cache.get(parent_path) if parent_path != '.' else None

                folder_obj = folder_cache.get(rel_path)
                if not folder_obj:
                    # folder_obj = Folder.objects.create(
                    #     name=folder_name,
                    #     parent=parent_folder.id if parent_folder else None,
                    #     location=location
                    # )
                    folder_cache[rel_path] = folder_obj

                for file in files:
                    if file.endswith(formats):
                        # AudioFile.objects.create(
                        #     file_type=os.path.splitext(file)[1][1:],
                        #     scrubbed=False,
                        #     file_name=file,
                        #     folder=folder_obj,
                        # )
                        files_processed += 1
                        progress_recorder.set_progress(files_processed, total_files)

