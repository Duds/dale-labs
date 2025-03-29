#!/bin/bash

APPS_DIR="./apps"

TSCONFIG='{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}'

ESLINTRC='{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "rules": {}
}'

ENV_EXAMPLE='# Example environment variables
# NEXT_PUBLIC_API_URL=https://api.example.com
'

TAILWIND_CONFIG='import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {}
  },
  plugins: []
}

export default config
'

POSTCSS_CONFIG='export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'

for app in "$APPS_DIR"/*; do
  if [ -d "$app" ]; then
    echo "$TSCONFIG" > "$app/tsconfig.json"
    echo "$ESLINTRC" > "$app/.eslintrc.json"
    echo "$ENV_EXAMPLE" > "$app/.env.example"
    echo "# $(basename $app)" > "$app/README.md"

    # Only write Tailwind/PostCSS config if missing
    [ ! -f "$app/tailwind.config.ts" ] && echo "$TAILWIND_CONFIG" > "$app/tailwind.config.ts"
    [ ! -f "$app/postcss.config.js" ] && echo "$POSTCSS_CONFIG" > "$app/postcss.config.js"

    echo "✅ Scaffolded: $(basename $app)"
  fi
done
