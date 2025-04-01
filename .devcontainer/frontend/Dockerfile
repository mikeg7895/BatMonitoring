FROM node:latest

WORKDIR /workspace

COPY ../.. .

WORKDIR /workspace/frontend

RUN npm install

CMD ["tail", "-f", "/dev/null"]

