version: '3'
services:
  frontend:
    build:
      context: ./client
    image: ragu162004/client-app
    ports:
      - "3000:80"