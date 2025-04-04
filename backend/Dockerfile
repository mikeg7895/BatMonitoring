FROM python:3.12-slim

WORKDIR /app-backend

COPY . .

RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev 

RUN pip install --upgrade pip

RUN pip install -r requirements.txt 

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
