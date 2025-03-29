#!/bin/bash

APPS_DIR="./apps"
START_PORT=3000
PORT=$START_PORT

for app in "$APPS_DIR"/*; do
  if [ -d "$app" ]; then
    ENV_FILE="$app/.env.local"
    echo "PORT=$PORT" > "$ENV_FILE"
    echo "✅ Set $(basename $app) to PORT $PORT"
    ((PORT++))
  fi
done