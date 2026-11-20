#!/usr/bin/env bash

# depends on
declare -r jshint=node_modules/.bin/jshint
declare -r size=bs/dev/size.sh

$jshint --show-non-errors -- *.js src/*.js || {
	exit 1
}
$size || {
	exit 0 # not blocking?
}
