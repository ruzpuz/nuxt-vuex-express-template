#!/usr/bin/env bash

docker-compose up -d --no-recreate

npm run generate-documentation
npm run knex migrate:latest
npm run seed initial

NODE_PATH=. node index.js