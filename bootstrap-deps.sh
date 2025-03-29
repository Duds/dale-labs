#!/bin/bash

APPS_DIR="./apps"

DEPS="tailwindcss postcss autoprefixer"
DEV_DEPS="typescript @types/node @types/react @types/react-dom eslint eslint-config-next"

for app in "$APPS_DIR"/*; do
  if [ -d "$app" ]; then
    echo "📦 Bootstrapping dependencies for: $(basename $app)"
    cd "$app"

    pnpm add $DEPS
    pnpm add -D $DEV_DEPS

    echo "✅ Installed in: $(basename $app)"
    cd - > /dev/null
  fi
done
