#!/usr/bin/env bash
input=index.js
output=index.cjs

# depends on
declare -r esbuild=node_modules/.bin/esbuild

$esbuild "$input" --platform=node --bundle --outfile="$output"
