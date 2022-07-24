#!/bin/bash

npm run build

cp package.pro.json ./dist/package.json

cd dist

npm install --registry=https://registry.npmmirror.com