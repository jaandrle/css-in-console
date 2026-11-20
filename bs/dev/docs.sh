#!/usr/bin/env bash
# depends on
declare -r typedoc=node_modules/.bin/typedoc

declare -r typedoc_params=(
	 index.d.ts
	--readme none
	--defaultCategory 'Internal'
	--categoryOrder 'Public'
	--categoryOrder 'Internal'
	--sort visibility
	--disableSources
	--plugin typedoc-plugin-markdown
)
$typedoc "${typedoc_params[@]}" || {
	exit 1
}
# add back link
sed -i 's/^\*\*css-in-console\*\*/[← Home](..\/..\/..)/' docs/README.md
