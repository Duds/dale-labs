#!/bin/bash

APPS_DIR="./apps"

for app in "$APPS_DIR"/*; do
  if [ -d "$app" ]; then
    echo "🧼 Setting up Prettier in: $(basename $app)"
    cd "$app"

    # Install Prettier as a dev dependency
    pnpm add -D prettier

    # Create .prettierrc.json (extending root config)
    echo '{ "extends": "../../.prettierrc.json" }' > .prettierrc.json

    # Create .prettierignore
    cat > .prettierignore <<EOL
.next
node_modules
dist
build
*.log
EOL

    # Update package.json scripts
    PRETTIER_CMD="prettier --write '**/*.{js,ts,jsx,tsx,css,md}'"
    jq --arg fmt "$PRETTIER_CMD" '.scripts.format = $fmt' package.json > package.tmp.json && mv package.tmp.json package.json


    echo "✅ Prettier ready in: $(basename $app)"
    cd - > /dev/null
  fi
done
