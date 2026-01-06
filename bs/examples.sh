#!/usr/bin/env bash
set -euo pipefail # this can be harmful, see https://www.youtube.com/watch?v=4Jo3Ml53kvc

echo "Examples found:"
find examples -iname '*.js'
echo
echo "Running examples for testing:"
find examples -iname '*.js' -exec node {} +
