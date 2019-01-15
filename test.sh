#!/usr/bin/env bash

type=${BASH_ARGV[0]}

case "$type" in
    "--unit" | "-u")
        find ./app/api -name '*\.test.js' | NODE_PATH=. xargs npm run mocha -R spec
        ;;
    "--lint" | "-l")
        npm run eslint app/ && npm run eslint index.js && npm run eslint integration/
        ;;
    "--integration" | "-i")
        npm run seed initial
        NODE_PATH=. mocha -c -b --no-warnings --exit integration/integration.test
        ;;
    *)
       echo "error"
        ;;
esac