#!/usr/bin/env bash

type=${BASH_ARGV[0]}
echo $BASH_ARGV

case "$type" in
    "--unit" | "-u")
        find ./app/api -name '*\.test.js' |  cross-env NODE_PATH=. xargs mocha -R spec
        ;;
    "--lint" | "-l")
        npm run eslint app/ && npm run eslint index.js
        ;;
    *)
       echo "error"
        ;;
esac