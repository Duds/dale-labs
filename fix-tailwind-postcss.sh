#!/bin/bash

APPS_DIR="./apps"

for app in "$APPS_DIR"/*; do
  if [ -d "$app" ]; then
    echo "🧶 Fixing Tailwind config in: $(basename $app)"
    cd "$app"

    pnpm add -D @tailwindcss/postcss

    cat > postcss.config.js <<EOL
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
EOL

    cd - > /dev/null
    echo "✅ Fixed: $(basename $app)"
  fi
done
