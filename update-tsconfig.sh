#!/bin/bash

APPS_DIR="./apps"
CONFIG_CONTENT='{
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

for app in "$APPS_DIR"/*; do
  if [ -d "$app" ]; then
    echo "$CONFIG_CONTENT" > "$app/tsconfig.json"
    echo "✅ Updated: $app/tsconfig.json"
  fi
done
