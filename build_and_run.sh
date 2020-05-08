#!/bin/sh

# Bauen der App
npm run build

# Container bauen, sofern noch nicht geschehen
docker build . -t vetprovieh-app:dev

# Container entfernen sofern vorhanden
if [ "$(docker ps -aq -f status=exited -f name=vetprovieh-app-dev)" ]; then      
   docker rm vetprovieh-app-dev -f
fi

# Container ausführen
docker run --name vetprovieh-app-dev -v $PWD/www:/var/www -p 80:80 -d vetprovieh-app:dev