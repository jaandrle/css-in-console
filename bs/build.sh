#!/usr/bin/env bash
set -euo pipefail # this can be harmful, see https://www.youtube.com/watch?v=4Jo3Ml53kvc

bs/lint.sh

bs/build/docs.sh
bs/build/cjs.sh
