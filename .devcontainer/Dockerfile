FROM python:3.12-slim

WORKDIR /workspace

COPY .. .

RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev 

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["tail", "-f", "/dev/null"]