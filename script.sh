#!/bin/bash
lastCommit=`git log -1 --pretty=oneline`
fix='fix'
feat='feat'
major='major'

if [[ "$lastCommit" == *"$feat"* ]]; then
  execute=`npm version minor`
  echo "Creating a feature version: $execute"
  push=`git push origin main -f`
  echo "$push"
  publish=`npm publish`
  echo "$publish"
  exit
fi

if [[ "$lastCommit" == *"$major"* ]]; then
  execute=`npm version major`
  echo "Creating a major version: $execute"
  push=`git push origin main -f`
  echo "$push"
  publish=`npm publish`
  echo "$publish"
  exit
fi

if [[ "$lastCommit" == *"$fix"* ]]; then
  execute=`npm version patch`
  echo "Creating a major version: $execute"
  push=`git push origin main -f`
  echo "$push"
  publish=`npm publish`
  echo "$publish"
  exit
fi

exit
