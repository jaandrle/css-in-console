#!/usr/bin/env bash
bs/lint.sh || {
	exit 1
}
bs/dev/docs.sh || {
	exit 1
}
bs/dev/cjs.sh || {
	exit 1
}
