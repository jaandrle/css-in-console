#!/usr/bin/env bash
input=index.js
output=index.cjs
npx esbuild "$input" --platform=node --bundle --outfile="$output"
