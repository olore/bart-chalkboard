#!/bin/sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
PATH=$PATH:$HOME/.nvm/versions/node/v8.11.2/bin
nvm use default

cd $HOME/apps/bart-chalkboard
npm run start

