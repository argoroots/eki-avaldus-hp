#!/bin/bash

set -o errexit -o nounset

rm -rf ./build
mkdir -p ./build/assets

cp -r ./assets/* ./build/assets
cp ./assets/robots.txt ./build/
cp ./assets/favicon.ico ./build/

npm run build
