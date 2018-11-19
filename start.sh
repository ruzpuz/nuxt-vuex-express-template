#!/usr/bin/env bash

docker-compose up -d --no-recreate
npm run knex migrate:latest
npm run seed initial
NODE_PATH=. node index.js