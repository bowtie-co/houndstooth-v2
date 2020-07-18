#!/bin/bash

export REACT_APP_VERSION=${COMMIT:-dev}

NODE_VERSION=v10

. "$NVM_DIR/nvm.sh" && nvm install $NODE_VERSION

npm install
npm run build
