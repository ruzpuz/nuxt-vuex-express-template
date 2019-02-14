#!/usr/bin/env bash

type=${BASH_ARGV[0]}
RANDOM_SECURITY=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 512 | head -n 1)

case "$type" in
    "--production" | "-p")
        echo "Not yet implemented"
        ;;
    "--testing" | "-t")
        echo "Not yet implemented"
        ;;
    "--development" | "-d")

        docker-compose up -d --no-recreate

        npm run generate-documentation
        npm run knex migrate:latest
        npm run seed initial

        NODE_PATH=. RANDOM_SECURITY=$RANDOM_SECURITY node index.js

        ;;
    *)
       echo "error"
        ;;
esac