#!/bin/bash
git pull
npm install
npm run lerna
sh ./buildFrontend.sh

change instruction
