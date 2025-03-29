#!/bin/bash

APPS_DIR="./apps"

COMMONJS_POSTCSS="module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"

for app in "$APPS_DIR"/*; do
  FILE="$app/postcss.config.js"
  if [ -f "$FILE" ]; then
    echo "🔧 Fixing PostCSS config in: $(basename $app)"
    echo "$COMMONJS_POSTCSS" > "$FILE"
  fi
done

echo "✅ All postcss.config.js files updated to CommonJS format."
