#!/bin/bash
docker build -t events-backend .
docker run -p 8080:3000 -d --name=event events-backend:latest