#!/usr/bin/env bash
# Minimalistic, indicative size lint (replaces `size-limit`).
declare -ri limit_bytes=7680 # 7.5 kB (gzip of all files together)
declare -r files=(index.js src/*.js)
declare verbose=false

sizeLimit() {
	local -i total_raw=0
	local file
	for file in "${files[@]}"; do
		[[ -f "$file" ]] || {
			echo "[error] Missing file: $file" >&2;
			exit 1;
		}
		local -i file_raw
		file_raw=$(wc -c < "$file") || {
			echo "[error] Failed to calculate size of $file." >&2
			exit 1
		}
		file_raw=${file_raw//[^0-9]/}
		file_raw=${file_raw:-0}
		total_raw+=file_raw
	done

	local -i total_gzip
	total_gzip=$(cat "${files[@]}" | gzip -c | wc -c) || {
		echo '[error] Failed to calculate gzip size.' >&2
		exit 1
	}
	total_gzip=${total_gzip//[^0-9]/}
	total_gzip=${total_gzip:-0}

	printf '[info] Total: %d bytes (gzip: %d bytes), limit: %d bytes.\n' \
		"$total_raw" "$total_gzip" "$limit_bytes"

	if (( total_gzip > limit_bytes )); then
		echo '[error] Total gzip size exceeds limit.' >&2
		exit 1
	fi
}

main() {
	while [[ $# -gt 0 ]]; do
		case "$1" in
			-v|--verbose) verbose=true; shift ;;
			*) echo "[error] Unknown option: $1" >&2; exit 1 ;;
		esac
	done

	if $verbose; then
		set -x
	fi

	sizeLimit
}

main "$@"
