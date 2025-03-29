#!/bin/bash

APPS_DIR="./apps"

for app in "$APPS_DIR"/*; do
  if [ -d "$app" ] && [ -f "$app/package.json" ]; then
    echo "🔧 Updating scripts in: $(basename $app)"

    # Use jq to update the scripts block
    jq '.scripts = {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    }' "$app/package.json" > "$app/package.tmp.json" && mv "$app/package.tmp.json" "$app/package.json"

    echo "✅ Scripts updated in $(basename $app)"
  fi
done
