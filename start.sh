#!/usr/bin/env bash

type=${BASH_ARGV[0]}

case "$type" in
    "--production" | "-p")
        echo "Not yet implemented"
        ;;
    "--testing" | "-t")
        echo "Not yet impmlemented"
        ;;
    "--development" | "-d")

        docker-compose up -d --no-recreate

        npm run generate-documentation
        npm run knex migrate:latest
        npm run seed initial

        NODE_PATH=. node index.js

        ;;
    *)
       echo "error"
        ;;
esac