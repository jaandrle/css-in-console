#!/usr/bin/env bash
set -euo pipefail # this can be harmful, see https://www.youtube.com/watch?v=4Jo3Ml53kvc

npx jshint --show-non-errors -- *.js src/*.js
npx size-limit
