#!/usr/bin/env bash
typedoc_params=(
	 index.d.ts
	--readme none
	--defaultCategory 'Internal'
	--categoryOrder 'Public'
	--categoryOrder 'Internal'
	--sort visibility
	--disableSources
	--plugin typedoc-plugin-markdown
)
npx typedoc "${typedoc_params[@]}"
# add back link
sed -i 's/^\*\*css-in-console\*\*/[← Home](..\/..\/..)/' docs/README.md
